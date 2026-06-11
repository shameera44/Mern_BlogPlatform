

const ShareButtons = ({ title }) => {

  const url = window.location.href

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${url}`
  const twitterShare = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`

  return (
    
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-3">Share this post</h3>

      <div className="flex gap-3">

        <a
          href={facebookShare}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Facebook
        </a>

        <a
          href={twitterShare}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-500 text-white px-4 py-2 rounded"
        >
          Twitter
        </a>

        <a
          href={linkedinShare}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-800 text-white px-4 py-2 rounded"
        >
          LinkedIn
        </a>

      </div>
    </div>
  )
}

export default ShareButtons