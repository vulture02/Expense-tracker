import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword,setShowPassword]=useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/"); 
    } catch (err) {
      console.error("Login error", err);
      setError("Failed to login. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/"); 
    } catch (err) {
      console.error("Google login error", err);
      setError("Failed to login with Google.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Smart Expense Splitter
        </h1>

        {error && (
          <p className="text-red-400 mb-4 text-center text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              autoComplete="email"
              placeholder="email"
              className="w-full px-3 py-2 rounded bg-slate-700 text-white outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "Password"}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full px-3 py-2 rounded bg-slate-700 text-white outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button"
             onClick={()=>setShowPassword(!showPassword)}
             className="absoulte right-3 top-9 transfrom-translate-y-1/2 text-sm text-gray-400">
              {showPassword ? "Hide" : "Show"} 
            </button>
          </div>

          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded font-semibold">
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold mt-4"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
