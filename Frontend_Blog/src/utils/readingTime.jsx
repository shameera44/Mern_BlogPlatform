
export const calculateReadingTime = (content) => {
  const text = content.replace(/<[^>]+>/g, "");
  const words = text.trim().split(/\s+/).length;
  const wordsPerMinute = 100;

  return Math.ceil(words / wordsPerMinute);
};