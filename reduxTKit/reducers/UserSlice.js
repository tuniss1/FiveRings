// const initState = {
//   email: String(),
//   userId: String(),
//   username: String(),
// };

// const userReducer = (state = initState, action) => {
//   /*
//     Note that: action, which has type and payload
//     Example:
//     action = {
//       type: 'user/updateUserInfo',
//       payload: {
//         email: "retdkhoa@gmail.com",
//         userId: "rTbUGihPM8aCvE7RyOqmZ38u22c2",
//         username: "Khoa"
//       }
//     }
//   */
//   switch (action.type) {
//     case "user/updateUserInfo":
//       return {
//         ...state,
//         email: action.payload.email,
//         userId: action.payload.userId,
//         username: action.payload.username,
//       };
//     default:
//       return state;
//   }
// };

// export default userReducer;

import { createSlice } from "@reduxjs/toolkit";

export default UserSlice = createSlice({
  name: "user",
  initialState: {
    email: String(),
    userId: String(),
    username: String(),
    coords: null,
  },
  reducers: {
    updateUserInfo: (state, action) => {
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    }, // => { type: 'user/updateUserInfo' }
    updateUserLocation: (state, action) => {
      state.coords = action.payload.coords;
    },
  },
});

/* 
  NOTE: To call the action updateUserInfo in UI:
  1. Import file:
    import UserSlice from 'redux/reducers/UserSlice'
    import { useDispatch } from 'react-redux';
  2. In function UI, initializing dispatch
    const dispatch = useDispatch();
  3. Then passing the action to store:
    Example: 
    user = {
      email: "retdkhoa@gmail.com",
      userId: "rTbUGihPM8aCvE7RyOqmZ38u22c2",
      username: "Khoa"
    }
    dispatch(UserSlice.actions.updateUserInfo(user))
*/
