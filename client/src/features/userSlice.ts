import { createSlice } from "@reduxjs/toolkit";
import { Quiz } from "../utils/Question";

interface Data {
  user: null | string;
  token: null | string;
  questions: Quiz[];
  isLoading: boolean;
  errMsg: null;
  startQuiz: boolean;
}

const info = localStorage.getItem("user");
const userData = info !== null ? JSON.parse(info) : "";

const initialState: Data = {
  user: userData.name,
  token: userData.token,
  questions: [],
  isLoading: false,
  errMsg: null,
  startQuiz: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    createUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    loginUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoading = false;
    },
    getQuestions: (state, action) => {
      state.questions = action.payload;
      state.startQuiz = true;
    },
    logError: (state, action) => {
      state.errMsg = action.payload;
      state.isLoading = false;
    },
    reset: (state) => {
      state.questions = [];
      state.startQuiz = false;
      state.isLoading = false;
    },
  },
});

export const {
  setLoading,
  createUser,
  loginUser,
  getQuestions,
  logError,
  reset,
} = UserSlice.actions;
export default UserSlice.reducer;
