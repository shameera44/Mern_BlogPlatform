import { Link, NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import menuIcon from "../images/menu.svg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const Navbar = ({ setSearchTerm }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");

    console.log(document.documentElement.className);

    const isDark =
      document.documentElement.classList.contains("dark");

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );

    setDarkMode(isDark);
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 shadow-md bg-white/90 backdrop-blur-md text-black dark:bg-gray-900/90 dark:text-white transition-colors">
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="logo"
          className="w-10 h-10"
        />

        <h1 className="text-3xl font-extrabold">
          Blog
          <span className="text-orange-600">
            Sphere
          </span>
        </h1>
      </div>

      {/* search input */}

      <input
        type="text"
        placeholder="Search title, author, category..."
        className="hidden lg:block px-5 py-2.5 rounded-full bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-black dark:text-white"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-5">


        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium transition-colors duration-200 ${isActive
              ? "text-orange-600 dark:text-orange-400"
              : "text-gray-600 dark:text-gray-300 hover:text-violet-600"
            }`
          }
        >
          Home
        </NavLink>



        <NavLink
          to="/about"
          className={({ isActive }) =>
            `font-medium transition-colors duration-200 ${isActive
              ? "text-orange-600 dark:text-orange-400"
              : "text-gray-600 dark:text-gray-300 hover:text-violet-600"
            }`
          }> About</NavLink>


        {/* my blog after login */}
        {user && (
          <NavLink
            to="/myblogs"
            className={({ isActive }) =>
              `font-medium transition-colors duration-200 ${isActive
                ? "text-orange-600 dark:text-orange-400"
                : "text-gray-600 dark:text-gray-300 hover:text-violet-600"
              }`
            }
          >
            My Blogs
          </NavLink>
        )}


        {/* dark/light */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg   bg-orange-200 hover:bg-orange-400 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {!user ? (
          <>
            <Link
              to="/login"
              className="border border-orange-500 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-orange-500  hover:bg-orange-700 text-white px-4 py-2 rounded-full"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={() => dispatch(logout())}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <img
        src={menuIcon}
        alt="menu"
        className="w-8 h-8 cursor-pointer md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      />

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-gray-800 p-4 rounded flex flex-col gap-3 md:hidden">

          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>


          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>


          {user && (
            <Link
              to="/myblogs"
              onClick={() => setMenuOpen(false)}
            >
              My Blogs
            </Link>
          )}



          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>




          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
              > Login </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
              > Register
              </Link>

            </>

          ) : (
            <button
              onClick={() => {
                dispatch(logout());
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;