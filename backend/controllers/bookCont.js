const { get } = require("mongoose");
const pool = require("../db/db");

const getBooks = async (req, res) => {
  try {
    const [books] = await pool.query("SELECT * FROM books");
    // console.log(books[0]);

    return res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getBooksForStudent = async (req, res) => {

  const studentId = req.user.id;
  if (!studentId) {
    return res.status(400).json({ message: "Bad request: Student ID not found" });
  }
  try {
    
    const [books] = await pool.query("SELECT b.*, bi.status FROM books b LEFT JOIN ( SELECT * FROM book_issued bi1 WHERE bi1.student_id = ? AND bi1.issue_id = (SELECT MAX(bi2.issue_id) FROM book_issued bi2 WHERE bi2.book_id = bi1.book_id AND bi2.student_id = bi1.student_id)) bi ON b.book_id = bi.book_id;", [studentId]);

    return res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books for student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

}

const getMyBooks = async(req,res)=>{
  console.log(req.user);
  
    const studentId = req.user.id;
    if(!studentId){
        return res.status(400).json({message: "Bad request: Student ID not found"});
    }
    try{
        const [myBooks] = await pool.query("SELECT bi.*, b.title FROM book_issued bi INNER JOIN books b ON bi.book_id = b.book_id WHERE bi.student_id = ?",[studentId]);

        if(myBooks.length === 0){
            return res.status(404).json({message: "No books found for this student"});
        }
        return res.status(200).json(myBooks.reverse());
    } catch (error) {
        console.error("Error fetching my books:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getBorrowLog = async (req, res) => {
  try {
    const [borrowLog] = await pool.query(
      "SELECT  bi.*, s.name, b.title FROM book_issued bi INNER JOIN students s ON bi.student_id = s.student_id INNER JOIN books b ON bi.book_id = b.book_id ;");

    return res.status(200).json(borrowLog.reverse());
  } catch (error) {
    console.error("Error fetching borrow log:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addBook = async (req, res) => {
  console.log('req.body', req.body);
  try {
    const { title, author, category, total_copies } = req.body;

    if (!title || !author || !category || !total_copies) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [result] = await pool.query(
      "INSERT INTO books (title, author, category, total_copies, available_copies) VALUES (?, ?, ?, ?, ?)",
      [title, author, category, total_copies, Number(total_copies)],
    );
    return res
      .status(201)
      .json({ message: "Book added successfully", bookId: result.insertId });
  } catch (error) {
    console.error("Error adding book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, category, total_copies } = req.body;

    if (!title || !author || !category || !total_copies) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [existingBook] = await pool.query(
      "SELECT total_copies, available_copies FROM books WHERE book_id = ?",
      [Number(id)],
    );

    const totalCopiesDiff = total_copies - existingBook[0].total_copies;
    const newAvailableCopies = existingBook[0].available_copies + totalCopiesDiff;

    const [result] = await pool.query(
      "UPDATE books SET title = ?, author = ?, category = ?, total_copies = ?, available_copies = ? WHERE book_id = ?",
      [title, author, category, total_copies, newAvailableCopies, Number(id)],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Error editing book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBook = async (req, res) => {
  try {

    const [issuedBooks] = await pool.query("SELECT * FROM book_issued WHERE book_id = ? AND status = 'issued'",[Number(req.params.id)],);

    for(let i=0; i<issuedBooks.length; i++){
      
      if(["APPROVED","PENDING","RETURN_INITATED"].includes(issuedBooks[i].status)){
        return res.status(400).json({message: "Cannot delete book that is currently issued"});
      }
    }

    

    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM books WHERE book_id = ?", [
      Number(id),
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getBooks,getBooksForStudent, addBook, editBook, deleteBook ,getBorrowLog,getMyBooks};
