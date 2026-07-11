import {
  BookOpen,
  PenSquare,
  Search,
  Brain,
  Moon,
  Cloud,
  MonitorSmartphone,
  Code2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: <PenSquare size={36} className="text-orange-500" />,
    title: "Create Blogs",
    desc: "Write and publish engaging blog posts with a modern editor.",
  },
  {
    icon: <Search size={36} className="text-orange-500" />,
    title: "Smart Search",
    desc: "Quickly find blogs by title, category or author.",
  },
  {
    icon: <Brain size={36} className="text-orange-500" />,
    title: "AI Summary",
    desc: "Generate quick summaries for long blog posts instantly.",
  },
  {
    icon: <Moon size={36} className="text-orange-500" />,
    title: "Dark Mode",
    desc: "Enjoy a beautiful reading experience day and night.",
  },
  {
    icon: <Cloud size={36} className="text-orange-500" />,
    title: "Cloud Images",
    desc: "Upload and manage blog images with Cloudinary.",
  },
  {
    icon: <MonitorSmartphone size={36} className="text-orange-500" />,
    title: "Responsive",
    desc: "Looks great on desktop, tablet and mobile devices.",
  },
];

const technologies = [
  "React",
  "Redux Toolkit",
  "Tailwind CSS",
  "React Router",
  "Node.js",
  "Express.js",
  "MongoDB",
  "JWT",
  "Cloudinary",
  "Gemini AI",
];

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-white mt-20">

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          <h1 className="text-5xl font-bold">
            About{" "}
            <span className="text-orange-500">
              BlogSphere
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-8">
            BlogSphere is a modern blogging platform where users can
            create, explore and share knowledge. It offers AI-powered
            summaries, responsive design, beautiful UI and a seamless
            writing experience.
          </p>

        </div>

      </section>

      {/* About */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900"
            alt="Blog"
            className="rounded-3xl shadow-2xl"
          />

          <div>

            <h2 className="text-4xl font-bold mb-6">
              Build. Share. Inspire.
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-8 mb-5">
              BlogSphere is designed for developers, writers,
              students and creators who love sharing knowledge.
              Publish blogs, discover new ideas and connect with readers
              through a clean and modern interface.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-8">
              Built using the MERN Stack with Redux Toolkit,
              Tailwind CSS, Cloudinary image uploads,
              JWT authentication and AI-powered blog summaries.
            </p>

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-orange-100 dark:bg-gray-900 rounded-2xl p-8 text-center shadow-lg">
            <h2 className="text-4xl font-bold text-orange-500">
              20+
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Features
            </p>
          </div>

          <div className="bg-orange-100 dark:bg-gray-900 rounded-2xl p-8 text-center shadow-lg">
            <h2 className="text-4xl font-bold text-orange-500">
              AI
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Quick Summary
            </p>
          </div>

          <div className="bg-orange-100 dark:bg-gray-900 rounded-2xl p-8 text-center shadow-lg">
            <h2 className="text-4xl font-bold text-orange-500">
              100%
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Responsive
            </p>
          </div>

          <div className="bg-orange-100 dark:bg-gray-900 rounded-2xl p-8 text-center shadow-lg">
            <h2 className="text-4xl font-bold text-orange-500">
              🌙
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Dark Mode
            </p>
          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-bold text-center mb-14">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((item, index) => (

            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >

              {item.icon}

              <h3 className="text-2xl font-semibold mt-6">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-7">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Technologies */}

      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="text-center">

          <Code2
            size={45}
            className="mx-auto text-orange-500 mb-4"
          />

          <h2 className="text-4xl font-bold mb-10">
            Technologies Used
          </h2>

          <div className="flex flex-wrap justify-center gap-4">

            {technologies.map((tech) => (

              <span
                key={tech}
                className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 px-5 py-3 rounded-full font-semibold"
              >
                {tech}
              </span>

            ))}

          </div>

        </div>

      </section>

      {/* Why Choose */}

      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="bg-orange-50 dark:bg-gray-900 rounded-3xl p-10">

          <h2 className="text-4xl font-bold text-center mb-10">
            Why Choose BlogSphere?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="flex gap-4">
              <ShieldCheck className="text-orange-500" />
              <p>Secure JWT Authentication</p>
            </div>

            <div className="flex gap-4">
              <Sparkles className="text-orange-500" />
              <p>Modern 2026 User Interface</p>
            </div>

            <div className="flex gap-4">
              <Brain className="text-orange-500" />
              <p>AI Powered Blog Summaries</p>
            </div>

            <div className="flex gap-4">
              <MonitorSmartphone className="text-orange-500" />
              <p>Responsive on All Devices</p>
            </div>

          </div>

        </div>

      </section>

      {/* Footer */}

      <section className="text-center py-16 border-t border-gray-200 dark:border-gray-800">

        <BookOpen
          size={45}
          className="mx-auto text-orange-500"
        />

        <h2 className="text-3xl font-bold mt-6">
          Thank You for Visiting BlogSphere ❤️
        </h2>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Built with React, Redux Toolkit, Node.js,
          Express, MongoDB and Tailwind CSS.
        </p>

      </section>

    </div>
  );
};

export default About;