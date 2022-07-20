import { createSelector } from '@reduxjs/toolkit';
import { ImageState } from '../feature/imageSlice';
import { RootState } from '../store';

export const imageSlector: (state: RootState) => ImageState = (
  state: RootState
) => state.image;

export const imgSelector = createSelector(imageSlector, (image) => {
    return image.image;
  });