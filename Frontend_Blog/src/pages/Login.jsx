import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const { loading, error, success, user } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData)); // 🔥 thunk call
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 shadow-lg rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-4">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <button
          className="bg-black text-white px-4 py-2 w-full"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {error && (
          <p className="text-red-500 mt-3">{error}</p>
        )}

        {success && (
          <p className="text-green-600 mt-3">
            {success}
          </p>
        )}

        {user && (
          <p className="text-blue-600 mt-3">
            Welcome {user?.user?.username || "User"}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;