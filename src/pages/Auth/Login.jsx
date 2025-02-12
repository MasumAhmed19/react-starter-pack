import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { setUser, signIn } = useAuth();
  const navigate = useNavigate();

  // Handle Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await signIn(email, password);
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      toast.error("Login Failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-[#ECE5FE] p-4">
      {/* Header */}
      <div className="w-full max-w-md text-center mb-6">
        <Link to="/">
          <h4 className="text-2xl font-bold uppercase">Crimes</h4>
        </Link>
      </div>

      {/* Login Container */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h4 className="text-center text-2xl font-semibold mb-2">Welcome back to Suggestify!</h4>
        <p className="text-center text-gray-600 mb-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up for free
          </Link>
        </p>

        {/* Email Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h5 className="text-center text-sm">Log in with email:</h5>

          <div className="form-control">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="form-control">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-all"
          >
            Log in
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-indigo-600 hover:underline">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
