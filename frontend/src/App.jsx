// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ThemeProvider } from "@/components/theme-provider";
import Login from "./pages/Login";
import StudentPanel from "./pages/StudentPanel";
import LibrarianPanel from "./pages/LibrarianPanel";
import PageNotFound from "./pages/PageNotFound";
import { LibraryProvider } from "./context/LibraryContext";

// const queryClient = new QueryClient();

const App = () => (
  <LibraryProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentPanel />} />
        <Route path="/librarian" element={<LibrarianPanel />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </LibraryProvider>
);

export default App;