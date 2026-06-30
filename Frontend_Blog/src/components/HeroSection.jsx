
import { SquarePen, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const HeroSection = ({ blogs, user }) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    document.getElementById("blogs")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleCreate = () => {
    if (!user) {
      toast.error("Please login to create a blog");
      navigate("/login");
      return;
    }

    navigate("/create");
  };

  return (
    <section className="py-10">
      <div className="grid lg:grid-cols-2 gap-12 items-stretch min-h-[550px]">
        {/* Left */}
        <div className="flex flex-col justify-center h-full">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full font-medium mb-5">
            🚀 Welcome to BlogSphere
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Explore
            <span className="text-orange-500"> Ideas,</span>
            <br />
            Stories &
            <br />
            Technology.
          </h1>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-8">
            A modern platform to discover, share, and learn through
            high-quality technical articles written by developers.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={handleExplore}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition"
            >
              Explore Blogs
              <ArrowDown size={18} />
            </button>

            <button
              onClick={handleCreate}
              className="flex items-center gap-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-full transition"
            >
              <SquarePen size={18} />
              Create Blog
            </button>
          </div>

          <div className="flex gap-5 mt-6">
            <div>
              <h2 className="text-3xl font-bold text-orange-500">
                {blogs.length}+
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Blogs
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-orange-500">
                10+
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Categories
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-orange-500">
                100%
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Free
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="h-full">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900"
            alt="Blog Hero"
            className="w-full h-full object-cover rounded-3xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;