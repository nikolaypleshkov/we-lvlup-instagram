import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ImageState{
    image: string | null;
}
const initialState: ImageState = {
  image: null,
};

interface PayLoad {
  image: string | null;
}

export const saveImage = createAsyncThunk<ImageState, string>(
    'saveImage',
     (image) => {
            return {  image }  as PayLoad;
    }
  );
  export const resetImage = createAsyncThunk(
    'resetImage',
     (_) => {
         console.log("reset");
         
    }
  );
export const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(saveImage.fulfilled, (state, action) => {
        state.image = action.payload.image;
      });
      builder.addCase(resetImage.fulfilled, (state, action) => {
        state.image = null;
      });
    },
  });