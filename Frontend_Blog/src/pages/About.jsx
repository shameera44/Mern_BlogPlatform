


const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 mt-20 px-6 py-10">

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          About Our Blog Platform
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A modern blogging platform where users can share ideas, write articles,
          and explore content created by others.
        </p>
      </div>

      {/* About Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto mb-16">

        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
          alt="blog"
          className="rounded-xl shadow-lg"
        />

        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            What is this platform?
          </h2>
          <p className="text-gray-700 mb-4">
            This platform allows users to create, read, edit, and delete blog
            posts easily. It is designed with a clean interface and responsive
            layout for a smooth user experience.
          </p>
          <p className="text-gray-700">
            The project is built using modern frontend technologies like
            React, Redux, React Router, and Tailwind CSS.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Create Blogs</h3>
            <p className="text-gray-600">
              Users can easily create and publish blog posts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Edit & Delete</h3>
            <p className="text-gray-600">
              Manage your blogs with simple editing and delete options.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Search Blogs</h3>
            <p className="text-gray-600">
              Quickly find blog posts using the search functionality.
            </p>
          </div>

        </div>
      </div>

      {/* Technology Section */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Technologies Used
        </h2>

        <div className="flex flex-wrap justify-center gap-4">

          <span className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full">
            React
          </span>

          <span className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full">
            Redux Toolkit
          </span>

          <span className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full">
            React Router
          </span>

          <span className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full">
            Tailwind CSS
          </span>
          <span className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full">
            Quill-text Editor
          </span>

          <span className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full">
            Pagination
          </span>

        </div>
      </div>

    </div>
  )
}

export default About