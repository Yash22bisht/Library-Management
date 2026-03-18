const BASE_URL = "/api";

//  Helper 
const request = async (url, options = {}) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", 
    ...options,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

//  Auth 
export const authAPI = {
  registerStudent: (body) =>
    request("/register/student", { method: "POST", body: JSON.stringify(body) }),

  loginStudent: (email, password) =>
    request("/login/student", { method: "POST", body: JSON.stringify({ email, password }) }),

  loginLibrarian: (email, password) =>
    request("/login/librarian", { method: "POST", body: JSON.stringify({ email, password }) }),

  logout: () =>
    request("/logout", { method: "POST" }),
};

//  Student 
export const studentAPI = {
  getBooks: () =>
    request("/books/Student/getBooks"),

  getMyBooks: () =>
    request("/books/Student/getMyBooks"),

  requestBook: (body) =>
    request("/issue/requestBook", { method: "POST", body: JSON.stringify(body) }),

  returnBookRequest: (body) =>
    request("/issue/returnBookRequest", { method: "POST", body: JSON.stringify(body) }),
};

//  Librarian 
export const librarianAPI = {
  getBooks: () =>
    request("/books/Librarian/getBooks"),

  getBorrowLog: () =>
    request("/books/Librarian/getBorrowLog"),

  addBook: (body) =>
    request("/books/librarian/addBook", { method: "POST", body: JSON.stringify(body) }),

  editBook: (id, body) =>
    request(`/books/librarian/editBook/${id}`, { method: "PUT", body: JSON.stringify(body) }),

  deleteBook: (id) =>
    request(`/books/librarian/deleteBook/${id}`, { method: "DELETE" }),

  approveRequest: (body) =>
    request("/books/approve/approveRequest", { method: "POST", body: JSON.stringify(body) }),

  approveReturnRequest: (body) =>
    request("/books/approve/approveReturnRequest", { method: "POST", body: JSON.stringify(body) }),

  rejectRequest: (body) =>
    request("/books/approve/rejectRequest", { method: "POST", body: JSON.stringify(body) }),
};