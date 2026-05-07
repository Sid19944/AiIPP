import { createSlice } from "@reduxjs/toolkit";

type userState = {
  user: { _id: string; username: string; email: string } | null;
  isLoading: boolean;
};

const initialState: userState = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
