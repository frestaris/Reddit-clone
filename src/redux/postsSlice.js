import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (subreddit = "") => {
    const res = await fetch(`https://www.reddit.com/${subreddit}.json`);
    const data = await res.json();
    return data.data.children.map((post) => post.data);
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    searchTerm: "",
    category: "",
    votes: {},
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    toggleVote: (state, action) => {
      const { postId, vote } = action.payload;
      const currentVote = state.votes[postId] || 0;
      if (currentVote === vote) {
        state.votes[postId] = 0;
        const post = state.items.find((p) => p.id === postId);
        if (post) post.ups -= vote;
      } else {
        state.votes[postId] = vote;
        const post = state.items.find((p) => p.id === postId);
        if (post) {
          post.ups += vote - currentVote;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, setCategory, clearError, toggleVote } =
  postsSlice.actions;
export default postsSlice.reducer;
