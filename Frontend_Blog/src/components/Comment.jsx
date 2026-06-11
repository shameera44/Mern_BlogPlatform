

import { useState } from "react"

const Comment = () => {

  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])

  const handleSubmit = () => {
    if (!name || !comment) return

    const newComment = { name, comment, time: new Date().toLocaleString() }

    setComments([...comments, newComment])

    setName("")
    setComment("")
  }

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-4">Comments({comments.length})</h2>

      <input
        type="text"
        placeholder="Your Name"
        className="border p-2 w-full mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Write your comment..."
        className="border p-2 w-full mb-2"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Post Comment
      </button>

      {/* comment list */}

      <div className="mt-5">


        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet</p>
        ) : (comments.map((c, index) => (
          <div key={index} className="border-b py-2">
            <p className="font-semibold">{c.name}</p>
            <p>{c.comment}</p>
            <p className="text-sm text-gray-500">{c.time}</p>
          </div>
        )))}
      </div>

    </div>
  )
}

export default Comment