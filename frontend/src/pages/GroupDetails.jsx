import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createApiClient } from "./api.js";

const GroupDetails = () => {
  const { groupId } = useParams();
  const { idToken } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const api = createApiClient(idToken);

  const fetchExpenses = async () => {
    const res = await api.get(`/groups/${groupId}/expenses`);
    setExpenses(res.data);
  };

  useEffect(() => {
    if (idToken) fetchExpenses();
  }, [idToken]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    await api.post(`/groups/${groupId}/expenses`, {
      amount: Number(amount),
      description
    });
    setAmount("");
    setDescription("");
    fetchExpenses();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-xl font-bold mb-4">Group Details</h1>

        <form onSubmit={handleAddExpense} className="flex gap-2 mb-6">
          <input
            type="number"
            className="px-3 py-2 rounded bg-slate-800 flex-1"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="text"
            className="px-3 py-2 rounded bg-slate-800 flex-1"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="px-4 py-2 bg-indigo-500 rounded">Add</button>
        </form>

        <div className="space-y-2">
          {expenses.map((exp) => (
            <div
              key={exp._id}
              className="bg-slate-800 p-3 rounded flex justify-between"
            >
              <div>
                <p className="font-medium">{exp.description || "Expense"}</p>
                <p className="text-xs text-gray-400">
                  Paid by: {exp.paidBy?.name || exp.paidBy?.email}
                </p>
              </div>
              <p className="font-semibold">₹{exp.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
