import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();

  const userName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-800/60 backdrop-blur-lg shadow-xl border-b border-slate-700 px-8 py-4 z-50">
      <div className="flex items-center justify-between w-full">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">
              SE
            </div>
            <h1 className="text-2xl font-bold text-green-400 whitespace-nowrap">
              Smart Expense Splitter
            </h1>
          </Link>
        </div>

        {/* CENTER SECTION */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6 text-gray-300">
          <Link to="/" className="hover:text-green-400 transition-colors">
            Home
          </Link>
          {user && (
            <Link to="/dashboard" className="hover:text-green-400 transition-colors">
              Dashboard
            </Link>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded text-sm text-white transition-colors"
            >
              Login
            </Link>
          ) : (
            <>
              <span className="hidden md:block text-gray-300">
                {userName}
              </span>

              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={userName}
                  className="w-10 h-10 rounded-full border-2 border-green-400 object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-slate-700 text-white flex items-center justify-center rounded-full border-2 border-green-400 text-lg font-semibold">
                  {userName[0].toUpperCase()}
                </div>
              )}

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-sm text-white transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;