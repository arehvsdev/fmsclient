import { type ChangeEvent, type FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { FiMail, FiLock } from "react-icons/fi";
import { setUser } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await loginUser(formData);
      console.log(response.data);
      if( response.data.success){
        const days = 7;
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "; expires=" + date.toUTCString();
        const token = response.data.token;
        // Set the cookie (Secure ensures it only transmits over HTTPS)
        document.cookie = `authToken=${token}${expires}; path=/; Secure; SameSite=Strict`;
      }
      const user = response.data.user;
      if (user.role === "student") {
        navigate("/student/dashboard");
      } else if (user.role === "faculty") {
        navigate("/faculty/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/login");
      }
      dispatch(setUser(response.data.user));
      
      // navigate("/");
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900 p-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="grid md:grid-cols-2">
          {/* Left Side */}
          <div className="hidden flex-col justify-center bg-gradient-to-br from-sky-600 to-cyan-500 p-12 text-white md:flex">
            <h1 className="text-4xl font-bold">Feedback Management System</h1>

            <p className="mt-6 text-lg leading-8 text-sky-100">
              Manage vehicles, drivers, trips and reports from one centralized
              dashboard.
            </p>

            <div className="mt-12">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <p className="text-sm text-sky-100">
                  Efficient Feedback management starts with a secure and simple
                  login experience.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-8 md:p-12">
            <div className="mx-auto max-w-md">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-slate-800">
                  Welcome Back
                </h2>

                <p className="mt-3 text-slate-500">
                  Login to continue to your dashboard
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>

                  <div className="relative">
                    <FiMail className="absolute left-4 top-4 text-slate-400" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <div className="relative">
                    <FiLock className="absolute left-4 top-4 text-slate-400" />

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-sky-600 hover:text-sky-700"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-sky-600 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:opacity-60"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              {error && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <p className="mt-8 text-center text-sm text-slate-500">
                © 2026 Feedback Management System
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
