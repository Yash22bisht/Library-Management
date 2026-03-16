const pool = require("../db/db");

const getBooks = async (req, res) => {
    try{

        const [books] = await pool.query("SELECT * FROM books");
        // console.log(books[0]);
        
        return res.status(200).json(books);
    }
    catch(error){
        console.error("Error fetching books:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const addBook = async(req,res)=>{

    try {
        const { title, author, category ,total_copies } = req.body;

        if (!title || !author || !category || !total_copies) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const [result] = await pool.query("INSERT INTO books (title, author, category, total_copies, available_copies) VALUES (?, ?, ?, ?, ?)", [title, author, category, total_copies, total_copies]);
        return res.status(201).json({ message: "Book added successfully", bookId: result.insertId });


    } catch (error) {
        console.error("Error adding book:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

const editBook = async(req,res)=>{
    try{
        const { id } = req.params;
        const { title, author, category ,total_copies } = req.body;

        if (!title || !author || !category || !total_copies) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const [result] = await pool.query("UPDATE books SET title = ?, author = ?, category = ?, total_copies = ?, available_copies = ? WHERE book_id = ?", [title, author, category, total_copies, total_copies, Number(id)]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book updated successfully" });

    }
    catch(error){
        console.error("Error editing book:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteBook = async(req,res)=>{
    try{
        const { id } = req.params;  
        const [result] = await pool.query("DELETE FROM books WHERE book_id = ?", [Number(id)]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book deleted successfully" });
    }
    catch(error){
        console.error("Error deleting book:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {getBooks, addBook, editBook, deleteBook};