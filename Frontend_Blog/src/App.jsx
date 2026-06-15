import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";
import PostDetails from "./pages/PostDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>

      <Toaster position="top-right" />
      <Navbar setSearchTerm={setSearchTerm} />

      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<ProtectedRoute><CreateBlog /> </ProtectedRoute>} />
        <Route path="/postdetails/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;