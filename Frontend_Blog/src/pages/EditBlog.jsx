

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../features/blog/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const EditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const blogs = useSelector(state => state.blog.posts);
  const blog = blogs.find(b => b.id === parseInt(id));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [readingTime, setReadingTime] = useState(5);
  const [image, setImage] = useState("");


  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setDescription(blog.description);
      setContent(blog.content);
      setAuthor(blog.author);
      setCategory(blog.category);
      setReadingTime(blog.readingTime);
      setImage(blog.image);
    }
  }, [blog]);

  //  Initialize Quill 
  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Edit your blog content...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ header: [1, 2, 3, false] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"]
          ]
        }
      });

      // update content when typing
      quillRef.current.on("text-change", () => {
        setContent(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  // Set existing content into editor
  useEffect(() => {
    if (quillRef.current && blog) {
      quillRef.current.root.innerHTML = blog.content || "";
    }
  }, [blog]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBlog = {
      id: blog.id,
      title,
      description,
      content,
      author,
      category,
      readingTime,
      image,
    };

    dispatch(updateBlog(updatedBlog));
    toast.success("Your blog is updated");
    navigate("/");
  };

  if (!blog) return <p className="p-6">Blog not found!</p>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-20 shadow-2xl">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

      <form
        className="space-y-4 border-2 border-gray-200 p-5 rounded-xl shadow-xl"
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        {/* Description */}
        <input
          type="text"
          placeholder="Description"
          className="w-full border p-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />

        {/* CONTENT */}
        <label className="font-semibold">Edit Content</label>
        <div
          ref={editorRef}
          className="bg-white h-[400px] border rounded"
        ></div>

        {/* Author */}
        <input
          type="text"
          placeholder="Author"
          className="w-full border p-2"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />

        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          className="w-full border p-2"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />

        {/* Reading Time */}
        <input
          type="number"
          placeholder="Reading Time (min)"
          className="w-full border p-2"
          value={readingTime}
          onChange={e => setReadingTime(e.target.value)}
          required
        />

        {/* Image */}
        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2"
          value={image}
          onChange={e => setImage(e.target.value)}
        />

        {/* Submit */}
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;