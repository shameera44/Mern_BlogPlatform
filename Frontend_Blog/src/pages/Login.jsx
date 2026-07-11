import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, BookOpen } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, user } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white dark:from-gray-950 dark:to-black flex items-center justify-center px-4">

      <div className="grid lg:grid-cols-2 max-w-6xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">

        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-orange-500 to-orange-700 text-white p-12">

          <BookOpen size={70} />

          <h1 className="text-4xl font-bold mt-6">
            Welcome Back!
          </h1>

          <p className="text-center mt-4 text-orange-100 leading-7">
            Continue exploring technology,
            stories and ideas with
            <span className="font-bold"> BlogSphere.</span>
          </p>

          <div className="mt-10 space-y-3 text-lg">

            <p>📚 Read Amazing Blogs</p>

            <p>✍️ Publish Your Stories</p>

            <p>✨ AI Powered Summary</p>

            <p>🌙 Light & Dark Mode</p>

          </div>

        </div>

        {/* Right Section */}
        <div className="p-8 md:p-12 flex items-center">

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto"
          >

            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
              Welcome Back 👋
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">
              Sign in to continue to BlogSphere.
            </p>

            {/* Email */}
            <div className="relative mb-5">

              <Mail
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
              />

            </div>

            {/* Password */}
            <div className="relative mb-6">

              <Lock
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
              />

            </div>


            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-300"
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  Login
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-center mt-4">
                {error}
              </p>
            )}

            {/* Success */}
            {success && (
              <p className="text-green-600 text-center mt-4">
                {success}
              </p>
            )}

            {/* Register */}
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-orange-500 font-semibold hover:underline"
              >
                Create Account
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;