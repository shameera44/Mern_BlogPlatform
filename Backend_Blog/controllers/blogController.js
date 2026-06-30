import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";
import axios from "axios";


// Create Blog

export const createBlog = async (req, res) => {
    try {
        const {
            title,
            author,
            category,
            content,
            description,
            imageUrl
        } = req.body;

        if (!title || !author || !category || !content || !description) {
            return res.status(400).json({
                message: "Some fields are empty"
            });
        }

        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (author !== user.username) {
            return res.status(403).json({
                message: "Author name must match logged in username"
            });
        }

        let image = "";

        // Upload image to Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            image = result.secure_url;
        }

        // Use image URL directly
        else if (imageUrl) {
            image = imageUrl;
        }

        else {
            return res.status(400).json({
                message: "Please upload an image or provide an image URL"
            });
        }

        
        const blog = await blogModel.create({
            title,
            author,
            category,
            content,
            description,
            image,
            owner: req.user.id,
            
        });

        res.status(201).json({
            message: "Blog created successfully",
            blog
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Blogs

export const getAllBlog = async (req, res) => {
    try {
        const blogs = await blogModel.find();

        res.json(blogs);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get Single Blog
export const getSingleBlog = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json(blog);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Blog
export const updateBlog = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if (!blog.owner) {
            return res.status(400).json({
                message: "Blog has no owner field"
            });
        }

        if (blog.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only update your own blogs"
            });
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Blog updated successfully",
            updatedBlog,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Blog
export const deleteBlog = async (req, res) => {
     console.log("DELETE CONTROLLER HIT");

    try {
        const blog = await blogModel.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if (!blog.owner) {
            return res.status(400).json({
                message: "Blog has no owner field"
            });
        }

        if (blog.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only delete your own blogs"
            });
        }

        await blogModel.findByIdAndDelete(req.params.id);

        res.json({
            message: "Blog Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Search / Filter Blogs
export const searchBlog = async (req, res) => {
    try {
        const keyword = req.query.keyword;

        const blogs = await blogModel.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { author: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } }
            ]
        });

        res.json(blogs);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// AI SUMMARY


export const generateSummary = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content required" });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Summarize this blog in 3-4 lines:\n\n${content}`,
              },
            ],
          },
        ],
      }
    );

    const summary =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({ summary });

  } catch (error) {
    console.log("GEMINI ERROR:", error.response?.data || error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};