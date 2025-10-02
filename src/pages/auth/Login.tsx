import { useState } from "react";
import { FiLoader, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { toast, Toaster } from "sonner";
import { MdErrorOutline } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import companyLogo from "../../assets/company_logo.png";
import { supabase } from "../../lib/supabase";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    console.log("email", email);
    console.log("password", password);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.log(error);
        toast.error(error.message, {
          icon: <MdErrorOutline size={20} color="#FF3B30" />,
        });
      } else {
        toast.success("Login successful", {
          icon: <CiCircleCheck size={20} color="#01BF5B" />,
        });
        navigate("/invoice");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/invoice`,
        },
      });
      if (error) {
        toast.error(error.message, {
          icon: <MdErrorOutline size={20} color="#FF3B30" />,
        });
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <img
              src={companyLogo}
              className="mx-auto h-12 mb-4"
              alt="Company Logo"
            />
            <h1 className="text-2xl font-bold text-coal">Welcome Back</h1>
            <p className="text-primary mt-2">Sign in to your account</p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <FiLoader className="w-5 h-5 animate-spin text-primary" />
            ) : (
              <>
                <FcGoogle className="w-5 h-5" />
                <span className="font-medium text-primary cursor-pointer">
                  Continue with Google
                </span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-primary">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Email Address
              </label>
              <input
                autoComplete="email"
                required
                type="email"
                name="email"
                value={formData.email}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  autoComplete="current-password"
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all pr-12"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-brand hover:text-brand font-medium"
              >
                Forgot password?
              </a>
            </div>

            <button
              disabled={!formData.email || !formData.password || loading}
              type="submit"
              className="cursor-pointer w-full flex items-center justify-center gap-3 py-3 px-4 bg-brand hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand"
            >
              {loading ? (
                <FiLoader className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-sm text-primary">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-brand hover:text-blue-700 font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
