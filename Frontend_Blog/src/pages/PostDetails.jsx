

import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import Comment from "../components/comment"
import ShareButtons from "../components/ShareButton"
import BlogCard from "../components/BlogCard"
import { calculateReadingTime } from "../utils/readingTime";


const PostDetails = () => {

  const { id } = useParams()
  const blogs = useSelector(state => state.blog.posts)

  const blog = blogs.find(post => post.id === Number(id))

  const [summary, setSummary] = useState("")
const [loading, setLoading] = useState(false);

  if (!blog) {
    return <h1 className="text-center mt-20">Blog not found</h1>
  }

  //  Reading time
  const readingTime = calculateReadingTime(blog.content);

  //  Related posts
  const relatedPosts = blogs
    .filter(post =>
      post.category?.toLowerCase() === blog.category?.toLowerCase() &&
      post.id !== blog.id
    )
    .slice(0, 3);

  //  Summary function
  const generateSummary = () => {
    const cleanText = blog.content.replace(/<[^>]+>/g, "")
    const words = cleanText.split(" ").slice(0, 30).join(" ")
    setSummary(words + "...")
  }

  const speakSummary = () => {
    if (!summary) return;

    const speech = new SpeechSynthesisUtterance(summary);
    speech.lang = "en-US";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };
  return (
    <div className="max-w-4xl mx-auto p-5 mt-20 bg-white  dark:bg-gray-700 text-black dark:text-white  ">

      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-96 object-cover rounded-lg"
      />

      <h1 className="text-4xl font-bold mt-5">
        {blog.title}
      </h1>

      {/*  Author , Reading Time */}
      <p className="text-gray-500 mt-2">
        By {blog.author} • ⏱️ {readingTime} min  read
      </p>

      <span className="text-blue-600 font-semibold">
        {blog.category}
      </span>

      {/*  FULL CONTENT */}
      <div
        className="mt-5 text-lg text-gray-700"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>

      {/*  Summary Button */}
      {!summary && (
        <button
          onClick={generateSummary}
          className="bg-green-600 text-white px-4 py-2 mt-5 rounded cursor-pointer hover:bg-green-700"
        >
          AI Summary
        </button>
      )}

      {/*  Summary */}
      {summary && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold text-lg mb-2">
             Summary
          </h3>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {summary && (
        <button
          onClick={speakSummary}
          className="bg-blue-600 text-white px-4 py-2 mt-3 rounded cursor-pointer hover:bg-blue-700"
        >
          🔊 Listen Summary
        </button>
      )}

      {summary && (
        <button
          onClick={stopSpeech}
          className="bg-red-500 text-white px-4 py-2 mt-3 ml-2 rounded"
        >
          ⏹ Stop
        </button>
      )}

      {/*  Share */}
      <ShareButtons title={blog.title} />

      {/*  Comments */}
      <Comment />

      {/*  RELATED POSTS */}
      <h2 className="text-2xl font-bold mt-10 mb-4 border-b pb-2">
        Related Posts
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.length > 0 ? (
          relatedPosts.map(post => (
            <BlogCard
              key={post.id}
              {...post}
              searchTerm=""
              onEdit={() => { }}
              onDelete={() => { }}
            />
          ))
        ) : (
          <p className="text-gray-500">No related posts found</p>
        )}
      </div>

    </div>
  )
}

export default PostDetails