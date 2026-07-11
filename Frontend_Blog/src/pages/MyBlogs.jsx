import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PenSquare } from "lucide-react";
import BlogCard from "../components/BlogCard";
import { fetchMyBlogs, deleteBlog } from "../features/blog/blogSlice";
import toast from "react-hot-toast";

const MyBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myBlogs = useSelector((state) => state.blog.myBlogs);

  useEffect(() => {
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
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white pt-24 pb-12">

      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl text-white p-10 mb-12 shadow-xl">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold">
                My Blogs
              </h1>

              <p className="mt-3 text-orange-100 text-lg">
                Manage, edit and publish your articles with ease.
              </p>
            </div>

            <button
              onClick={() => navigate("/create")}
              className="flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-100 font-semibold px-6 py-3 rounded-full transition duration-300 shadow-lg"
            >
              <PenSquare size={20} />
              Create Blog
            </button>

          </div>

        </div>

        {/* Blog Grid */}
        {myBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-16 text-center">

            <h2 className="text-3xl font-bold mb-3">
              No Blogs Yet
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mb-8">
              You haven't published any blogs yet.
            </p>

            <button
              onClick={() => navigate("/create")}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition"
            >
              <PenSquare size={18} />
              Create Your First Blog
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default MyBlogs;