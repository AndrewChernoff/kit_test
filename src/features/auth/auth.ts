import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { LoginType } from "../../api/types";
import { RootState } from "../../redux/store";

export interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  isLoading: false,
  isAuth: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authMe: (state, action: PayloadAction<boolean>) => {
        state.isAuth = action.payload; 
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuth = true;
    }),
      builder.addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(loginThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.error.message || "Some Error!";
      }),
      builder.addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
      }),
      builder.addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(logoutThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.error.message || "Some Error!";
      })
  },
});

export const loginThunk = createAsyncThunk<
  void,
  LoginType,
  { rejectValue: string }
>("auth/authUser", async (data, { rejectWithValue }) => {
  const res = await api.login(data);

  try {
    if (res.data.status === "ok") {
      const token = res.data.token;
      localStorage.setItem("auth-token", token);
    } else {
      return rejectWithValue("Some Error!");
    }
  } catch (error) {
    const axiosError = error as any; /*  AxiosError<ErrorResponse> */
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data.error_text);
    }
    return rejectWithValue("Unknown error occurred");
  }
});

export const logoutThunk = createAsyncThunk<
  void,
  object,
  { rejectValue: string }
// eslint-disable-next-line no-empty-pattern
>("auth/logout", async ({}, { rejectWithValue }) => {
  const res = await api.logout();

  try {
    if (res.data.status === "ok") {
      localStorage.removeItem("auth-token");
    } else {
      return rejectWithValue("Some Error!");
    }
  } catch (error) {
    const axiosError = error as any; /*  AxiosError<ErrorResponse> */
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data.error_text);
    }
    return rejectWithValue("Unknown error occurred");
  }
});

export const isAuth = (state: RootState) => state.auth.isAuth;

export const { authMe, setAuthError } = authSlice.actions;

export default authSlice.reducer;
