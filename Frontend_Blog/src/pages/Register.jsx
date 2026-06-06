import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    username: "",
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

    dispatch(register(formData));
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 shadow-lg rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-4">
          Register
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

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
          {loading ? "Loading..." : "Register"}
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

export default Register;