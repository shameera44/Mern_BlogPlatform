
const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      <button
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 disabled:opacity-50 hover:bg-orange-500 hover:text-white transition"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`px-4 py-2 rounded-lg transition ${
            currentPage === index + 1
              ? "bg-orange-500 text-white"
              : "bg-gray-200 dark:bg-gray-800 hover:bg-orange-100 dark:hover:bg-gray-700"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 disabled:opacity-50 hover:bg-orange-500 hover:text-white transition"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;