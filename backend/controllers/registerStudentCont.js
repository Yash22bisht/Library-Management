const pool = require("../db/db");

const registerStudent = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });
  }
  try {

    if(password.length < 6){
      return res.status(400).json({ message: "Password should be at least 6 characters long" });
    }

    const [existingStudent] = await pool.query("SELECT * FROM students WHERE email = ?", [email]);

    if(existingStudent.length > 0){
      return res.status(400).json({ message: "Email is already registered" });
    }

    await pool.query("INSERT INTO students (name, email, password) VALUES (?, ?, ?)", [name, email, password]);

    return res.status(201).json({ message: "Student registered successfully" });

  } catch (error) {
    console.error("Error registering student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerStudent
};
