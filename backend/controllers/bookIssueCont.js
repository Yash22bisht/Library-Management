const { app } = require("../app");
const pool = require("../db/db");
const { getUser } = require("../utils/authUtil");

const requestBook = async (req, res) => {
  const student_id = req.user.id;
  const role = req.user.role;
  if (role !== "student") {
    return res
      .status(403)
      .json({ message: "Forbidden: You do not have permission to perform this action" });
  }
  if (!student_id) {
    return res
      .status(400)
      .json({ message: "Bad request: Student ID not found" });
  }
  try {
    console.log('req.body', req.body)
    const { book_id} = req.body;

    if (!book_id) {
      return res
        .status(400)
        .json({ message: "Book ID are required" });
    }

    // Check if the book exists and has available copies
    const [bookAvailability] = await pool.query(
      "SELECT available_copies FROM books WHERE book_id = ?",
      [book_id],
    );
    if (bookAvailability.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    } else if (bookAvailability[0].available_copies <= 0) {
      return res
        .status(400)
        .json({ message: "No copies available for this book" });
    }

    // check if the user has already requested or issued the same book
    const [prevIssued] = await pool.query(
      "Select * from book_issued where student_id = ? and book_id = ? ",
      [student_id, book_id],
    );

    if (prevIssued.length > 0) {
      let status = prevIssued[0].status;
      if (status === "pending") {
        return res.status(400).json({
          message: "You have already requested this book and it's pending",
        });
      } else if (status === "approved") {
        return res
          .status(400)
          .json({ message: "You have already issued this book" });
      }
    }

    // Insert the book issue request into the database with "pending" status
    const [requestResult] = await pool.query(
      "INSERT INTO book_issued (student_id,book_id, status,request_date) VALUES (?, ?, ?, ?)",
      [student_id, book_id, "pending", new Date()],
    );

    return res.status(201).json({
      message: "Book requested successfully",
      requestId: requestResult.insertId,
    });
  } catch (error) {
    console.error("Error requesting book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const approveBookRequest = async (req, res) => {
  const { issue_id } = req.body;
  if (!issue_id) {
    return res.status(400).json({ message: "Issue ID is required" });
  }

  // get details of the librarian
  const [sessionId] = req.cookies.sessionID ? [req.cookies.sessionID] : [null];

  if (!sessionId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No session ID provided" });
  }
  const librarianDetails = getUser(sessionId);
  if (!librarianDetails || librarianDetails.role !== "librarian") {
    return res.status(403).json({
      message: "Forbidden: You do not have permission to perform this action",
    });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // check issue and it's status
    const [issueDetails] = await connection.query(
      "Select status , book_id from book_issued where issue_id = ?",
      [issue_id],
    );
    if (issueDetails.length === 0) {
      return res.status(404).json({ message: "Issue request not found" });
    } else if (issueDetails[0].status !== "PENDING") {
      return res
        .status(400)
        .json({
          message: `Cannot approve this request as its current status is ${issueDetails[0].status}`,
        });
    }

    const book_id = issueDetails[0].book_id;

    // Check avialiblity of the book
    const [bookAvailability] = await connection.query(
      "SELECT available_copies FROM books WHERE book_id = ?",
      [book_id],
    );
    if (bookAvailability.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    } else if (bookAvailability[0].available_copies <= 0) {
      return res
        .status(400)
        .json({ message: "No copies available for this book" });
    }

    // Update the book issue request status to "approved"
    await connection.query(
      "UPDATE book_issued SET status = ? , issue_date = NOW() , due_date = DATE_ADD(NOW(), INTERVAL 14 DAY) , approved_by = ? WHERE issue_id = ?",
      ["approved", librarianDetails.id, issue_id],
    );

    // Decrease the available copies of the book by 1
    await connection.query(
      "UPDATE books SET available_copies = available_copies - 1 WHERE book_id = ?",
      [book_id],
    );

    await connection.commit();
    return res
      .status(200)
      .json({ message: "Book request approved successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Error approving book request:", error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    connection.release();
  }
};

const rejectBookRequest = async (req, res) => {
  const { issue_id } = req.body;

  const [sessionId] = req.cookies.sessionID ? [req.cookies.sessionID] : [null];

  if (!sessionId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No session ID provided" });
  }
  const librarianDetails = getUser(sessionId);
  if (!librarianDetails || librarianDetails.role !== "librarian") {
    return res.status(403).json({
      message: "Forbidden: You do not have permission to perform this action",
    });
  }

  try {
    await pool.query(
      "UPDATE book_issued SET status = ? , approved_by = ? WHERE issue_id = ?",
      ["rejected", librarianDetails.id, issue_id],
    );
    return res
      .status(200)
      .json({ message: "Book request rejected successfully" });
  } catch (error) {
    console.error("Error rejecting book request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const returnBookRequest = async (req, res) => {
  const { issue_id } = req.body;
  if (!issue_id) {
    return res.status(400).json({ message: "Issue ID is required" });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [issueDetail] = await connection.query(
      "SELECT due_date, status FROM book_issued WHERE issue_id = ?",
      [issue_id],
    );

    // console.log(issueDetail[0]);

    const today = new Date().toISOString();
    // console.log(today, issueDetail[0].due_date);

    if (issueDetail[0].status === "RETURN_INITIATED") {
      return res.status(400).json({
        message: "You have already initiated a return request for this book",
      });
    } else if (issueDetail[0].status !== "APPROVED") {
      return res
        .status(400)
        .json({ message: "Invalid request: Book is not currently issued " });
    }

    const late_return = today > issueDetail[0].due_date ? true : false;

    await connection.query(
      "UPDATE book_issued SET status = ? , late_return = ? WHERE issue_id = ?",
      ["RETURN_INITIATED", late_return, issue_id],
    );

    await connection.commit();
    return res
      .status(200)
      .json({ message: "Book return request initiated successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Error returning book:", error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    connection.release();
  }
};

const approveReturnRequest = async (req, res) => {
  const { issue_id } = req.body;
  if (!issue_id) {
    return res
      .status(400)
      .json({ message: "Issue ID is required" });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // check issue and it's status
    const [issueDetails] = await connection.query(
      "Select status from book_issued where issue_id = ?",
      [issue_id],
    );

    if (issueDetails.length === 0) {
      return res.status(404).json({ message: "Return request not found" });
    } else if (issueDetails[0].status !== "RETURN_INITIATED") {
      return res
        .status(400).json({
          message: `Cannot approve this return request as its current status is ${issueDetails[0].status}`,
        });
    }

    const book_id = issueDetails[0].book_id;

    // Update the book issue request status to "returned"
    await connection.query(
      "UPDATE book_issued SET status = ? , return_date = NOW() WHERE issue_id = ?",
      ["returned", issue_id],
    );

    // Increase the available copies of the book by 1
    await connection.query(
      "UPDATE books SET available_copies = available_copies + 1 WHERE book_id = ?",
      [book_id],
    );

    await connection.commit();
    return res
      .status(200)
      .json({ message: "Book return approved successfully" });
  } catch (error) {
    connection.rollback();
    console.error("Error approving return request:", error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    connection.release();
  }
};

module.exports = {
  requestBook,
  returnBookRequest,
  approveBookRequest,
  approveReturnRequest,
  rejectBookRequest,
};
