import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import menuIcon from "../images/menu.svg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState, useEffect } from "react";

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
    <nav className="bg-gray-700 text-white px-6 py-4 flex justify-between items-center shadow-md">

      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="logo"
          className="w-10 h-10"
        />

        <h1 className="text-2xl font-bold">
          Blog
          <span className="text-yellow-300">
            Sphere
          </span>
        </h1>
      </div>

      {/* search input */}

      <input
        type="text"
        placeholder="Search title, author, category..."
        className="px-3 py-1 rounded text-black bg-white"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-5">

        <Link to="/">Home</Link>

        {user && (
          <Link to="/create">
            Create Blog
          </Link>
        )}

        <button
          onClick={toggleDarkMode}
          className="bg-white text-black px-3 py-1 rounded"
        >
          {darkMode ? "Light" : "Dark"}
        </button>

        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-blue-600 px-3 py-1 rounded"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-600 px-3 py-1 rounded"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={() => dispatch(logout())}
            className="bg-red-600 px-3 py-1 rounded"
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

          {user && (
            <Link
              to="/create"
              onClick={() => setMenuOpen(false)}
            >
              Create Blog
            </Link>
          )}

          <button
            onClick={toggleDarkMode}
            className="bg-white text-black px-3 py-1 rounded"
          >
            {darkMode ? "Light" : "Dark"}
          </button>

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
              >
                Register
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