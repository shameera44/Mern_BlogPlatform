
import BlogCard from "../components/BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, fetchBlogs } from "../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import Pagination from "../components/Pagination";

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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">


      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-3 py-3">


        {/* Hero Section */}

        {currentPage === 1 && (
          <>
            <HeroSection
              blogs={blogs}
              user={user}
            />



            {/* Category Section */}

            <CategorySection
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory} />



            {/* TITLE */}
            <h1 className="text-4xl font-bold mb-4 mt-2 bg-orange-100 text-orange-600 text-center py-2 rounded-full">
              Latest Blogs
            </h1>

          </>
        )}

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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />

      </div>
    </div>
  );
};

export default Home;