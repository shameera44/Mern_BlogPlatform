import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

/* =========================
   GET ALL BLOGS
========================= */
export const fetchBlogs = createAsyncThunk(
  "blog/fetchBlogs",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/blogs");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =========================
   CREATE BLOG
========================= */
export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (blogData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const res = await API.post(
        "/blogs/create",
        blogData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data.blog;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =========================
   UPDATE BLOG
========================= */
export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async (updatedBlog, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const res = await API.put(
        `/blogs/${updatedBlog.id}`,
        updatedBlog,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =========================
   DELETE BLOG
========================= */


export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      await API.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return id;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );

    }
  }
);

/* =========================
   SLICE
========================= */

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CREATE */
      .addCase(createBlog.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })

      /* UPDATE */

      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;

        const updatedBlog = action.payload.updatedBlog;

        const index = state.posts.findIndex(
          (blog) => blog._id === updatedBlog._id
        );

        if (index !== -1) {
          state.posts[index] = updatedBlog;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (blog) => String(blog._id) !== String(action.payload)
        );
      });
  },
});

export default blogSlice.reducer;