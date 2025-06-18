import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../utils/axiosClient';
import { toast } from 'sonner';

export const fetchMemes = createAsyncThunk('memes/fetchMemes', async () => {
  const response = await axiosClient.get('/api/memes');
  return response.data;
});

export const voteMeme = createAsyncThunk('memes/voteMeme', async ({ memeId, voteType }) => {
  await axiosClient.post(`/api/memes/${memeId}/vote`, { voteType, userId: "cyberpunk420" });
  return { memeId, voteType };
});

export const biddingMeme = createAsyncThunk('memes/biddingMeme', async ({ memeId, bidAmount }) => {
  try {
    const response = await axiosClient.post(`/api/memes/${memeId}/bid`,
      { bidAmount, userId: "cyberpunk420" }
    );
    toast.success(`Bid of ${bidAmount} credits placed successfully!`);
    return { memeId, current_bid: response.data.current_bid };
  } catch (error) {
    toast.error('Failed to place bid. Please try again.');
    console.error('Error placing bid:', error);
  }
});

const memeSlice = createSlice({
  name: 'memes',
  initialState: {
    memes: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMeme: (state, action) => {
      state.memes.unshift(action.payload);
    },
    updateVote: (state, action) => {
      const { memeId, upvotes, downvotes } = action.payload;
      const meme = state.memes.find(m => m.id === memeId);
      if (meme) {
        meme.upvotes = upvotes;
        meme.downvotes = downvotes;
      }
    },
    updateBid: (state, action) => {
      const { memeId, current_bid } = action.payload;
      const meme = state.memes.find(m => m.id === memeId);
      if (meme) {
        meme.current_bid = current_bid;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.loading = false;
        state.memes = action.payload;
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addMeme, updateVote, updateBid } = memeSlice.actions;
export default memeSlice.reducer;
