import Sidebar from "../components/Sidebar";
import BlogCard from "../components/BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, fetchBlogs } from "../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Home = ({ searchTerm }) => {

  const blogs = useSelector(state => state.blog.posts || []);
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageCount = 3;
  const otherPageCount = 6;

  // CATEGORY FILTER

  const categoryFiltered =
    selectedCategory === "all"
      ? blogs
      : blogs.filter(blog =>
        blog.category?.toLowerCase().replace(/\s/g, "") === selectedCategory
      );

  // SEARCH FILTER
  const searchFiltered = categoryFiltered.filter(blog =>
    blog.title?.toLowerCase().includes(searchTerm?.toLowerCase() || "") ||
    blog.author?.toLowerCase().includes(searchTerm?.toLowerCase() || "") ||
    blog.category?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );

  // PAGINATION LOGIC

  let currentBlogs = [];

  if (currentPage === 1) {

    currentBlogs = searchFiltered.slice(0, firstPageCount);

  } else {

    const start = firstPageCount + (currentPage - 2) * otherPageCount;
    const end = start + otherPageCount;
    currentBlogs = searchFiltered.slice(start, end);
  }

  const totalPages = Math.max(
    1,
    Math.ceil(
      searchFiltered.length <= firstPageCount
        ? 1
        : 1 + (searchFiltered.length - firstPageCount) / otherPageCount
    )
  );

  //fetch blogs
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);


  // RESET PAGE ON FILTER CHANGE
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-5 bg-white dark:bg-black text-black dark:text-white">
      {/* SIDEBAR */}
      <Sidebar setSelectedCategory={setSelectedCategory} />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-2 ">

        {/* HERO SECTION */}
        {currentPage === 1 && (
          <div className="w-full h-80 lg:h-[500px] relative rounded-lg overflow-hidden">
            <img
              src="https://freerangestock.com/sample/178096/modern-workspace-with-laptop-coffee-and-plant-on-wooden-desk.jpg"
              alt="Hero"
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-5">
              <h1 className="text-3xl lg:text-5xl font-bold mb-3">
                Welcome to BlogSphere
              </h1>
              <p className="text-lg lg:text-2xl">
                Explore blogs with BlogSphere.
              </p>
            </div>
          </div>
        )}

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-4 mt-5 bg-gray-500 text-white text-center py-2 rounded">
          Latest Blogs
        </h1>

        {/* BLOG GRID */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {currentBlogs.length > 0 ? (
            currentBlogs.map(blog => (
              <div key={blog._id} className="relative">

                <BlogCard
                  id={blog._id}
                  title={blog.title}
                  description={blog.description}
                  author={blog.author}
                  category={blog.category}
                  image={blog.image}
                  content={blog.content}
                  searchTerm={searchTerm}

                  onEdit={() => {
                    console.log("User:", user);
                    console.log("Blog Owner:", blog.owner);

                    // 1. check login
                    if (!user) {
                      toast.error("Please login to edit blog");
                      navigate("/login");
                      return;
                    }

                    // 2. check ownership
                    if (user.id !== blog.owner) {
                      toast.error("You are not the author of this blog");
                      return;
                    }

                    navigate(`/edit/${blog._id}`);
                  }}

                  onDelete={async () => {
                    console.log("User:", user);
                    console.log("Blog Owner:", blog.owner);

                    // 1. login check
                    if (!user) {
                      toast.error("Please login to delete blog");
                      navigate("/login");
                      return;
                    }

                    // 2. ownership check
                    if (user.id !== blog.owner) {
                      toast.error("You are not the author of this blog");
                      return;
                    }

                    try {
                      await dispatch(deleteBlog(blog._id)).unwrap();
                      toast.success("Blog deleted");
                    } catch (err) {
                      toast.error(err || "Delete failed");
                    }
                  }}
                />


              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-red-500 font-bold text-xl">
              No Blogs Found
            </div>
          )}

        </div>

        {/* PAGINATION */}

        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
};

export default Home;