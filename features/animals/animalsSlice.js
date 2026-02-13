import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAnimals = createAsyncThunk(
  'animals/fetchAnimals',
  async () => {
    // TODO (Signpost 2): fetch 10 random dog images and return an array of URLs
    // API: https://dog.ceo/api/breeds/image/random/10
    // Expected: return data.message
    throw new Error('Not implemented');
  }
);

const animalsSlice = createSlice({
  name: 'animals',
  initialState: {
    animals: [],
    favorites: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      // TODO (Signpost 5): add the URL in action.payload to favorites (avoid duplicates)
    },
    removeFavorite: (state, action) => {
      // TODO (Signpost 5): remove the URL in action.payload from favorites
    },
    setFavorites: (state, action) => {
      // TODO (Signpost 7): replace favorites with action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimals.pending, (state) => {
        // TODO (Signpost 2): set status to 'loading' and clear error
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        // TODO (Signpost 2): set status to 'succeeded' and set animals = action.payload
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        // TODO (Signpost 2): set status to 'failed' and set error = action.error.message
      });
  },
});

export const { addFavorite, removeFavorite, setFavorites } = animalsSlice.actions;
export default animalsSlice.reducer;