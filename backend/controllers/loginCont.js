var pool = require("../db/db");
const { setUser } = require("../utils/authUtil");

const studentLogin = async (req, res) => {
    
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Fetch data from db and check if user exists
    const [studentDets] = await pool.query(
      "SELECT * FROM students WHERE email = ? and password = ?",
      [email, password],
    );

    // console.log(studentDets[0]);
    

    // If user doesn't exist, return error
    if (studentDets.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // If user exists, create session and return success response
    const student = studentDets[0];
    const sessionID = setUser({ id: student.student_id, role: "student" });

    // Clear prev cookies if exist 
    res.clearCookie("sessionID");

    // set new cookie 
    res.cookie("sessionID", sessionID, { httpOnly: true });

    // return 
    return res.status(200).json({
      message: "Login successful"
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const librarianLogin = async (req, res) => {
    
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Fetch data from db and check if user exists
    const [librarianDets] = await pool.query(
      "SELECT * FROM librarian WHERE email = ? and password = ?",
      [email, password],
    );

    // If user doesn't exist, return error
    if (librarianDets.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    
    // If user exists, create session and return success response
    const librarian = librarianDets[0];
    console.log(librarian);
    const sessionID = setUser({ id: librarian.librarian_id, role: "librarian" });

    // Clear prev cookies if exist 
    res.clearCookie("sessionID");

    // set new cookie 
    res.cookie("sessionID", sessionID, { httpOnly: true });

    // return 
    return res.status(200).json({
      message: "Login successful"
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { studentLogin, librarianLogin };
    