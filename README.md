# Register
http://localhost:3000/api/register/student

# Login 
http://localhost:3000/api/login/student
http://localhost:3000/api/login/librarian

# Students:
get Books 
http://localhost:3000/api/books/Student/getBooks
getMyBooks
http://localhost:3000/api/books/Student/getMyBooks

http://localhost:3000/api/issue/requestBook
http://localhost:3000/api/issue/returnBookRequest


# Librarian
http://localhost:3000/api/books/Librarian/getBooks
http://localhost:3000/api/books/Librarian/getBorrowLog
http://localhost:3000/api/books/librarian/addBook
http://localhost:3000/api/books/librarian/editBook/:id
http://localhost:3000/api/books/librarian/deleteBook/:id


http://localhost:3000/api/books/approve/approveRequest
http://localhost:3000/api/books/approve/approveReturnRequest
http://localhost:3000/api/books/approve/rejectRequest