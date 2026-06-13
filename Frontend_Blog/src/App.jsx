import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PostDetails from "./pages/PostDetails";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<ProtectedRoute><CreateBlog /> </ProtectedRoute>} />
        <Route path="/postdetails/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;