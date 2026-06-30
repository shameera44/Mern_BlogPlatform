
import { Layers3, Globe, Atom, FileJson, FileCode2, Server, Cloud, Bot, Shield, Cog } from "lucide-react";

const categories = [
  {
    value: "all",
    label: "All",
    icon: <Layers3 size={18} />,
    iconColor: "text-orange-500",
  },
  {
    value: "webdevelopment",
    label: "Web Development",
    icon: <Globe size={18} />,
    iconColor: "text-blue-500",
  },
  {
    value: "react",
    label: "React",
    icon: <Atom size={18} />,
    iconColor: "text-cyan-500",
  },
  {
    value: "javascript",
    label: "JavaScript",
    icon: <FileJson size={18} />,
    iconColor: "text-yellow-500",
  },
  {
    value: "python",
    label: "Python",
    icon: <FileCode2 size={18} />,
    iconColor: "text-green-500",
  },
  {
    value: "nodejs",
    label: "Node.js",
    icon: <Server size={18} />,
    iconColor: "text-lime-500",
  },
  {
    value: "cloud",
    label: "Cloud Computing",
    icon: <Cloud size={18} />,
    iconColor: "text-sky-500",
  },
  {
    value: "ai",
    label: "AI",
    icon: <Bot size={18} />,
    iconColor: "text-purple-500",
  },
  {
    value: "cybersecurity",
    label: "Cyber Security",
    icon: <Shield size={18} />,
    iconColor: "text-red-500",
  },
  {
    value: "devops",
    label: "DevOps",
    icon: <Cog size={18} />,
    iconColor: "text-slate-600 dark:text-slate-300",
  },
];

const CategorySection = ({ selectedCategory, setSelectedCategory }) => {

  return (

    <section className="py-8">
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (

          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all
    ${selectedCategory === category.value
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white dark:bg-gray-900 border-orange-700 dark:border-orange-300 hover:border-orange-500 hover:shadow-md"
              }`}
          >
            <span className={category.iconColor}>
              {category.icon}
            </span>

            <span>{category.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;