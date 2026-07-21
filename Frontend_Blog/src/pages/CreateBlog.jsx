import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [formData, setFormData] = useState({

    title: "",
   // author: "",
    category: "",
    description: "",

  });

  const [image, setImage] = useState(null);
  const [imageType, setImageType] = useState("upload");
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = new FormData();

    const content = quillRef.current.root.innerHTML;

    if (content === "<p><br></p>") {
      alert("Please write blog content");
      return;
    }

    blogData.append("title", formData.title);
    //blogData.append("author", formData.author);
    blogData.append("category", formData.category);
    blogData.append("description", formData.description);
    blogData.append("content", content);

    if (imageType === "upload" && image) {
      blogData.append("image", image);
    }

    if (imageType === "url" && imageUrl) {
      blogData.append("imageUrl", imageUrl);
    }

    try {
      await dispatch(createBlog(blogData)).unwrap();

      alert("Blog Created Successfully");

      navigate("/");
    } catch (error) {
      alert(error);
    }
  };


  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog content...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ header: [1, 2, 3, false] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
          ],
        },
      });
    }
  }, []);

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

        {/* <input
          type="text"
          name="author"
          placeholder="Author Name"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
          required
        /> */}

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

        <label className="font-semibold mb-2 block">
          Blog Content
        </label>

        <div
          ref={editorRef}
          className="bg-white h-[350px] border rounded mb-3"
        ></div>

        <h3 className="font-semibold mb-2">Image Source</h3>

        <div className="flex gap-6 mb-4">
          <label>
            <input
              type="radio"
              value="upload"
              checked={imageType === "upload"}
              onChange={(e) => setImageType(e.target.value)}
            />
            <span className="ml-2">Upload Image</span>
          </label>

          <label>
            <input
              type="radio"
              value="url"
              checked={imageType === "url"}
              onChange={(e) => setImageType(e.target.value)}
            />
            <span className="ml-2">Image URL</span>
          </label>
        </div>

        {imageType === "upload" ? (
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />
        ) : (
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full border p-2 rounded"
          />
        )}



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