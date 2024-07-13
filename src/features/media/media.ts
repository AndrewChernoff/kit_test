import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { AxiosError } from "axios";
import { MediaItemType } from "../../api/types";
import { RootState } from "../../redux/store";

export interface AuthState {
  items: MediaItemType[] | null;
  isLoading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  items: null,
  isLoading: false,
  error: null,
};

export const mediaSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMediaThunk.fulfilled, (state, action: PayloadAction<MediaItemType[]>) => {
      state.isLoading = false;
      state.items = action.payload;
    }),
      builder.addCase(fetchMediaThunk.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(fetchMediaThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.error.message || "Some Error!";
      })
  },
});

export const fetchMediaThunk = createAsyncThunk<
MediaItemType[],
  void,
  { rejectValue: string }
>("media/fetchMedia", async (__, { rejectWithValue }) => {
  const res = await api.getMedia();

  try {
    if (res.data.status === "ok") {
      return res.data.files;
      
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

export const mediaItems = (state: RootState) => state.media.items 


export default mediaSlice.reducer;
