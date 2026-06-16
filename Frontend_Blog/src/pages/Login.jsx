import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

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

  // redirect after login success
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
    <div className="flex justify-center mt-20 bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 shadow-lg rounded-lg bg-blue-200"
      >
        <h1 className="text-2xl font-bold mb-4">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          className="border p-2 w-full mb-3 rounded-md"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          className="border p-2 w-full mb-3 rounded-md"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 w-full"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {error && (
          <p className="text-red-500 mt-3">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600 mt-3">
            {success}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;