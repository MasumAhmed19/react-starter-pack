import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const SignUp = () => {
  const { setUser, createUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const first_name = form.firstname.value;
    const last_name = form.secondname.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;
    const phone_number = "123456987"; // Hardcoded for now
    const gender = "Male"; // Hardcoded for now

    if (password !== confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    const userInfo = {
      first_name,
      last_name,
      email,
      gender,
      phone_number,
      password,
      confirm_password,
    };

    try {
      const response = await createUser(userInfo);

      const token = response.access_token; // Update to match response structure
      // const userId = response.id; // Ensure this matches API response structure
      // if (!token || !userId) throw new Error("Invalid response from server.");

      localStorage.setItem("authToken", token);
      // localStorage.setItem("userId", userId); // Store user ID in localStorage
      setUser(response.user); // Ensure this matches API response structure
      navigate("/");
    } catch (error) {
      console.error("Registration Error:", error.response?.data); // Log the error response
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again later."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 via-white to-[#ECE5FE] p-4">
      <div className="flex w-full justify-between items-center p-5">
        <div>
          <Link to="/">
            <h4 className="uppercase font-bold">Crimes</h4>
          </Link>
        </div>
        <div>
          <Link className="btn1" to="/">
            Back to Home
          </Link>
        </div>
      </div>
      <div className="w-full max-w-md bg-white rounded-md shadow-lg p-8">
        <h4 className="text-center text-xl font-semibold mb-2">Welcome to Suggestify!</h4>
        <h5 className="text-center text-[#8b8c8f] mb-6">
          Have an account?{" "}
          <Link to="/login" className="text-[#7201FF]">Log In</Link>
        </h5>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h5 className="text-center text-sm">Sign up with email:</h5>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            className="input input-bordered w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="secondname"
            placeholder="Second Name"
            className="input input-bordered w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            className="input input-bordered w-full px-4 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="btn1 w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
