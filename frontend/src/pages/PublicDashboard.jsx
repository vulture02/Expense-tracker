const PublicDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-4xl font-bold text-green-400 mb-4">
        Smart Expense Splitter
      </h1>

      <p className="max-w-lg text-gray-300 mb-6">
        Track expenses, split bills, and settle balances effortlessly.
        Login to create your groups and manage your expenses.
      </p>

      <a
        href="/login"
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold"
      >
        Login →
      </a>

    </div>
  );
};

export default PublicDashboard;
