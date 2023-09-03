import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLocation: {},
  topics: [],
  filteredTopics: [],
  sellZoneItems: [],
  filteredSellZoneItems: [],
  watchPosts: [],
  filterWatchPosts: [],
  skillHub: [],
  filterSkillHub: [],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setTopics: (state, action) => {
      state.topics = action.payload;
    },
    addReplyState: (state, action) => {
      const { topicId, reply } = action.payload;
      const topicIndex = state.topics.findIndex(
        (topic) => topic._id === topicId
      );
      if (topicIndex !== -1) {
        const newReplies = [...state.topics[topicIndex].replies, reply];
        const updatedTopic = {
          ...state.topics[topicIndex],
          replies: newReplies,
        };
        const newTopics = [...state.topics];
        newTopics[topicIndex] = updatedTopic;
        state.topics = newTopics;
      }
    },
    deleteReplyState: (state, action) => {
      const { topicId, replyId } = action.payload;
      const topicIndex = state.topics.findIndex(
        (topic) => topic._id === topicId
      );
      if (topicIndex !== -1) {
        const updatedReplies = state.topics[topicIndex].replies.filter(
          (reply) => reply._id !== replyId
        );

        state.topics = [
          ...state.topics.slice(0, topicIndex),
          {
            ...state.topics[topicIndex],
            replies: updatedReplies,
          },
          ...state.topics.slice(topicIndex + 1),
        ];
      }
    },
    setItems: (state, action) => {
      state.sellZoneItems = action.payload;
    },
    setWatchPosts: (state, action) => {
      state.watchPosts = action.payload;
    },
    setSearchResults: (state, action) => {
      const searchQuery = action.payload;
      if (searchQuery === "") {
        state.filteredSellZoneItems = state.sellZoneItems;
      } else {
        state.filteredSellZoneItems = state.sellZoneItems.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    },
    setWatchSearchResults: (state, action) => {
      const searchQuery = action.payload;
      if (searchQuery === "") {
        state.filterWatchPosts = state.watchPosts;
      } else {
        state.filterWatchPosts = state.watchPosts.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    },
    handleHelpful: (state, action) => {
      const { postId, userId } = action.payload;
      const updatedPosts = state.watchPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              helpful_count: post.helpful_by.includes(userId)
                ? post.helpful_count - 1
                : post.helpful_count + 1,
              helpful_by: post.helpful_by.includes(userId)
                ? post.helpful_by.filter((id) => id !== userId)
                : [...post.helpful_by, userId],
            }
          : post
      );
      state.watchPosts = updatedPosts;
    },
    setFilterTopics: (state, action) => {
      const searchQuery = action.payload;
      if (searchQuery === "") {
        state.filteredTopics = state.topics;
      } else {
        state.filteredTopics = state.topics.filter((item) =>
          item.topic.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateLocation,
  setTopics,
  addReplyState,
  deleteReplyState,
  setItems,
  setSearchResults,
  setWatchSearchResults,
  setWatchPosts,
  handleHelpful,
  setSkillHub,
  setFilterTopics,
} = globalSlice.actions;

export default globalSlice.reducer;
