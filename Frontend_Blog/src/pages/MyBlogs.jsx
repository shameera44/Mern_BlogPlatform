import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { fetchMyBlogs, deleteBlog } from "../features/blog/blogSlice";
import toast from "react-hot-toast";


const MyBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myBlogs = useSelector((state) => state.blog.myBlogs);

  useEffect(() => {
     console.log("TOKEN:", localStorage.getItem("token"));
    dispatch(fetchMyBlogs());
  }, [dispatch]);
  

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBlog(id)).unwrap();
      toast.success("Blog deleted");
      dispatch(fetchMyBlogs());
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="flex justify-between items-center mb-8">
        <div >
          <h1 className="text-4xl font-bold text-center">My Blogs</h1>
          <p className="text-gray-500 mt-2">
            Manage your published blogs.
          </p>
        </div>

        <button
          onClick={() => navigate("/create")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full"
        >
          Create Blog
          
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myBlogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            title={blog.title}
            description={blog.description}
            author={blog.author}
            category={blog.category}
            image={blog.image}
            content={blog.content}
             showActions={true}
            onEdit={() => navigate(`/edit/${blog._id}`)}
            onDelete={() => handleDelete(blog._id)}
          />
        ))}
      </div>

    </div>
  );
};

export default MyBlogs;