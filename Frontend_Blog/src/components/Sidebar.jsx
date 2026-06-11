const Sidebar = ({ setSelectedCategory }) => {
  const categories = [
    "all",
    "webdevelopment",
    "react",
    "javascript",
    "python",
    "artificialintelligence",
  ];

  return (
    <div className="w-full md:w-64 bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow shrink-0">
      <h2 className="text-2xl font-bold mb-6 text-orange-600">
        Categories
      </h2>

     <ul className="flex md:flex-col gap-4 md:gap-6 overflow-x-auto whitespace-nowrap">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => setSelectedCategory(category)}
              className="w-full text-left hover:text-blue-600"
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;