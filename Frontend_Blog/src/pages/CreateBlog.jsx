import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    content: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = new FormData();

    blogData.append("title", formData.title);
    blogData.append("author", formData.author);
    blogData.append("category", formData.category);
    blogData.append("description", formData.description);
    blogData.append("content", formData.content);
    blogData.append("image", image);

    try {
      await dispatch(createBlog(blogData)).unwrap();

      alert("Blog Created Successfully");

      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 shadow-lg">
      <h1 className="text-3xl font-bold mb-5">
        Create Blog
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author Name"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Content"
          rows="6"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-5 py-2"
        >
          Create Blog
        </button>

      </form>
    </div>
  );
};

export default CreateBlog;