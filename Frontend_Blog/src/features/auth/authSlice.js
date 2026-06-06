import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./authService";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  success: null,
};

/////////////////////////
// REGISTER THUNK
/////////////////////////
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

/////////////////////////
// LOGIN THUNK
/////////////////////////
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await loginUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

/////////////////////////
// AUTH SLICE
/////////////////////////
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.success = null;

      // optional: clear storage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder

      /////////////////////////
      // REGISTER
      /////////////////////////
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;

        state.success = "Registration successful";
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /////////////////////////
      // LOGIN
      /////////////////////////
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;

        state.success = "Login successful";

        // optional persistence
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
        localStorage.setItem(
          "token",
          action.payload.token
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;