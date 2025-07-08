const SummaryUserCard = ({ title, count, onClick }) => {
  return (
    <div
      className={`group bg-white rounded-2xl shadow-xl p-8 transition-transform transform hover:scale-105 hover:shadow-2xl w-full sm:w-1/2 lg:w-1/3`}
    >
      <div className="flex flex-col items-start justify-between h-full space-y-4">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-5xl font-bold text-${color}-900">{count}</p>

        <button
          onClick={onClick}
          className={`mt-4 text-black font-medium py-2 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg`}
        >
          View Users
        </button>
      </div>
    </div>
  );
};

export default SummaryUserCard;
