import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { createApiClient } from "./api.js";

const Dashboard = () => {
  const { user, idToken, logout } = useAuth();
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");

  useEffect(() => {
    if (!idToken) return;
    const api = createApiClient(idToken);

    api
      .get("/groups")
      .then((res) => setGroups(res.data)) // FIXED
      .catch((err) => console.error(err));
  }, [idToken]);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const api = createApiClient(idToken);
    const res = await api.post("/groups", { name: newGroupName }); // FIXED URL

    setGroups((prev) => [...prev, res.data]);
    setNewGroupName("");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex justify-between items-center shadow-lg">
        {/* Left - Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">
            SE
          </div>
          <h1 className="text-2xl font-bold text-green-400">
            Smart Expense Splitter
          </h1>
        </div>


        {/* Right - Profile / Logout */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300 hidden md:block">
            {user?.email}
          </span>

          <div className="w-10 h-10 rounded-full bg-slate-600 flex justify-center items-center text-white font-semibold">
            {user?.email?.[0]?.toUpperCase()}
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4">
        <section>
          <h2 className="text-lg font-semibold mb-3">Create Group</h2>

          <form
            onSubmit={handleCreateGroup}
            className="flex gap-2 items-center"
          >
            {" "}
            {/* FIXED */}
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded bg-slate-800 text-white outline-none"
              placeholder="Group name (Roommates, trip, friends)"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded">
              Add
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Your Groups</h2>

          <div className="grid gap-4">
            {groups.map((g) => (
              <Link
                key={g._id}
                to={`/groups/${g._id}`} // FIXED
                className="bg-slate-800 p-4 rounded shadow hover:bg-slate-700 transition" // FIXED
              >
                <h3 className="font-semibold">{g.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
