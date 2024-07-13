import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { AxiosError } from "axios";
import { MediaItemType } from "../../api/types";
import { RootState } from "../../redux/store";

type MediaUploadStatus = "initial" | "uploading" | "success" | "fail"

export interface AuthState {
  items: MediaItemType[] | null;
  isLoading: boolean;
  error: null | string;
  deletedIds: string[];
  status: MediaUploadStatus //for uploading media
}

const initialState: AuthState = {
  items: null,
  isLoading: false,
  error: null,
  deletedIds: [],
  status: "initial"
};

export const mediaSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setdeletedIds: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        state.deletedIds.push(action.payload);
      } else {
        state.deletedIds = []
      }
    },
    setStatus: (state, action: PayloadAction<MediaUploadStatus>) => {
      state.status = action.payload
    },
  },
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
      }),
    builder.addCase(removeMediaItemThunk.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.items = (state.items as MediaItemType[]).filter(el => el.id !== action.payload);
    }),
      builder.addCase(removeMediaItemThunk.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(removeMediaItemThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.error.message || "Some Error!";
      })
      builder.addCase(uploadMediaThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.status = "success";
      })
      builder.addCase(uploadMediaThunk.pending, (state) => {
        state.status = "uploading";
      })
      builder.addCase(uploadMediaThunk.rejected, (state, action: any) => {
        state.status = "fail";
        state.error = action.error.message || "Some Error!";
        alert(action.error.message)
        state.status = 'initial'
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
    }
    else {
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

export const uploadMediaThunk = createAsyncThunk<
  void,
  FileList,
  { rejectValue: string }
>("media/uploadMedia", async (data, { dispatch, rejectWithValue }) => {
  const res = await api.uploadMedia(data);

  try {
   /*  if(res.data.status === "ok") {
      dispatch(setStatus('success'))
    } else  */if (res.data.status === 470) {
      return rejectWithValue("Limit has been reached!");
    }
  } catch (error) {
    const axiosError = error as any; /*  AxiosError<ErrorResponse> */
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data.error_text);
    }
    return rejectWithValue("Unknown error occurred");
  }
});

export const removeMediaItemThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("media/removeItem", async (id, { dispatch, rejectWithValue }) => {

  dispatch(setdeletedIds(id));
  const res = await api.removeMediaItem(id);

  try {
    if (res.data.status === "ok") {
      dispatch(setdeletedIds(null))
      return id;
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

export const { setdeletedIds, setStatus } = mediaSlice.actions;

export default mediaSlice.reducer;
