import { Link } from "react-router-dom";
import { calculateReadingTime } from "../utils/readingTime";

const BlogCard = ({
  id,
  title,
  description,
  author,
  category,
  image,
  content,
  onEdit,
  onDelete,
  searchTerm,
  showActions = false,
}) => {

  const readingTime = calculateReadingTime(content);

  // Highlight search text
  const highlightText = (text) => {
    if (!searchTerm || !text) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");

    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span
          key={index}
          className="bg-yellow-300 px-1 rounded"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Link to={`/postdetails/${id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition dark:bg-gray-900 text-black dark:text-white">

        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />

        <div className="p-4">

          {/* Category */}
          <span className="text-xs text-blue-600 font-semibold">
            {category}
          </span>

          {/* Title */}
          <h2 className="text-lg font-bold mt-2">
            {highlightText(title)}
          </h2>

          {/* Description */}
          <p className="text-sm mt-2">
            {highlightText(description)}
          </p>

          {/* Author + Reading Time */}
          <div className="flex justify-between text-sm text-gray-600 mt-3">
            <span>By {highlightText(author)}</span>
            <span>⏱️ {readingTime} min read</span>
          </div>

          {/* Buttons */}
          {/* <div className="flex gap-2 mt-3">

            <button
              onClick={(e) => {
                e.preventDefault();
                onEdit();
              }}
              className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
              className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
            >
              Delete
            </button>

          </div> */}

          {/* Buttons */}
          {showActions && (
            <div className="flex gap-2 mt-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onEdit();
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDelete();
                }}
                className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
              >
                Delete
              </button>
            </div>
          )}

        </div>
      </div>
    </Link>
  );
};

export default BlogCard;