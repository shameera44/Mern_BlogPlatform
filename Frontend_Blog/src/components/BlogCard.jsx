import { Link } from "react-router-dom";
import { calculateReadingTime } from "../utils/readingTime";
import { Pencil, Trash2 } from "lucide-react";

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


        <div className="relative">

          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
          />

          {showActions && (
            <div className="absolute top-3 right-3 flex gap-2">

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit();
                }}
                className="bg-white/90 dark:bg-gray-800 p-2 rounded-full
        hover:bg-orange-500 hover:text-white transition shadow-lg"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete this blog?"
                  );
                  if (confirmDelete) {
                    onDelete();
                  }
                }}
                className="bg-white/90 dark:bg-gray-800 p-2 rounded-full
        hover:bg-red-500 hover:text-white transition shadow-lg"
              >
                <Trash2 size={18} />
              </button>

            </div>
          )}

        </div>

        {/* Image
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        /> */}

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
          {/* {showActions && (
            <div className="flex justify-end gap-3 mt-5 border-t pt-4">

              <button
                onClick={(e) => {
                  e.preventDefault();
                  onEdit();
                }}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl
      bg-orange-100 dark:bg-orange-900/30
      text-orange-600 dark:text-orange-400
      hover:bg-orange-500 hover:text-white
      transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Pencil size={18} />
                <span className="text-sm font-medium">Edit</span>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDelete();
                }}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl
      bg-red-100 dark:bg-red-900/30
      text-red-600 dark:text-red-400
      hover:bg-red-500 hover:text-white
      transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Trash2 size={18} />
                <span className="text-sm font-medium">Delete</span>
              </button>

            </div>
          )} */}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;