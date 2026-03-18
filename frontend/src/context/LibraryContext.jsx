import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { studentAPI, librarianAPI } from "../service";

const LibraryContext = createContext(null);

//  Student Provider 
export function StudentProvider({ children }) {
  const queryClient = useQueryClient();

  // Fetch all books
  const {
    data: books = [],
    isLoading: booksLoading,
    error: booksError,
  } = useQuery({
    queryKey: ["student-books"],
    queryFn: studentAPI.getBooks,
  });

  // Fetch my borrowed books
  const {
    data: myBooks = [],
    isLoading: myBooksLoading,
  } = useQuery({
    queryKey: ["my-books"],
    queryFn: studentAPI.getMyBooks,
  });

  // Borrow a book
  const borrowMutation = useMutation({
    mutationFn: (book_id) => studentAPI.requestBook({ book_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-books"] });
      queryClient.invalidateQueries({ queryKey: ["my-books"] });
    },
  });

  // Return a book
  const returnMutation = useMutation({
    mutationFn: (issue_id) => studentAPI.returnBookRequest({ issue_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-books"] });
      queryClient.invalidateQueries({ queryKey: ["my-books"] });
    },
  });

  return (
    <LibraryContext.Provider
      value={{
        books,
        myBooks,
        booksLoading,
        myBooksLoading,
        booksError,
        borrowBook: (book_id) => borrowMutation.mutate(book_id),
        returnBook: (issue_id) => returnMutation.mutate(issue_id),
        borrowing: borrowMutation.isPending,
        returning: returnMutation.isPending,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

// Librarian Provider 
export function LibrarianProvider({ children }) {
  const queryClient = useQueryClient();

  const {
    data: books = [],
    isLoading: booksLoading,
    error: booksError,
  } = useQuery({
    queryKey: ["librarian-books"],
    queryFn: librarianAPI.getBooks,
  });

  const {
    data: borrowLog = [],
    isLoading: borrowLogLoading,
  } = useQuery({
    queryKey: ["borrow-log"],
    queryFn: librarianAPI.getBorrowLog,
  });

  const addBookMutation = useMutation({
    mutationFn: librarianAPI.addBook,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["librarian-books"] }),
  });

  const editBookMutation = useMutation({
    mutationFn: ({ id, ...body }) => librarianAPI.editBook(id, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["librarian-books"] }),
  });

  const deleteBookMutation = useMutation({
    mutationFn: (id) => librarianAPI.deleteBook(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["librarian-books"] }),
  });

  const approveMutation = useMutation({
    mutationFn: librarianAPI.approveRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["librarian-books"] });
      queryClient.invalidateQueries({ queryKey: ["borrow-log"] });
    },
  });

  const approveReturnMutation = useMutation({
    mutationFn: librarianAPI.approveReturnRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["librarian-books"] });
      queryClient.invalidateQueries({ queryKey: ["borrow-log"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: librarianAPI.rejectRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["librarian-books"] });
      queryClient.invalidateQueries({ queryKey: ["borrow-log"] });
    },
  });

  return (
    <LibraryContext.Provider
      value={{
        books,
        borrowLog,
        booksLoading,
        borrowLogLoading,
        booksError,
        addBook: (book) => addBookMutation.mutate(book),
        editBook: (id, book) => editBookMutation.mutate({ id, ...book }),
        deleteBook: (id) => deleteBookMutation.mutate(id),
        approveRequest: (body) => approveMutation.mutate(body),
        approveReturnRequest: (body) => approveReturnMutation.mutate(body),
        rejectRequest: (body) => rejectMutation.mutate(body),
        addingBook: addBookMutation.isPending,
        deletingBook: deleteBookMutation.isPending,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

// Hook 
export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) throw new Error("useLibrary must be used inside StudentProvider or LibrarianProvider");
  return context;
};