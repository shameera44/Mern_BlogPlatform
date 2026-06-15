import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./authService";

// safer localStorage parsing
const storedUser = JSON.parse(localStorage.getItem("user") || "null");
const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  loading: false,
  error: null,
  success: null,
};

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message || "Registration failed"
      );
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await loginUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // LOGOUT
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.success = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    // RESET ERROR + SUCCESS
    resetAuthState: (state) => {
      state.error = null;
      state.success = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.success = action.payload.message;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, resetAuthState } = authSlice.actions;

export default authSlice.reducer;