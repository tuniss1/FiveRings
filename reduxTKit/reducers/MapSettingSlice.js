import { createSlice } from "@reduxjs/toolkit";

export default MapSettingSlice = createSlice({
  name: "mapSetting",
  initialState: {
    latitude: null,
    latitudeDelta: null,
    longitude: null,
    longitudeDelta: null,
  },
  reducers: {
    setMapSetting: (state, action) => action.payload, // => { type: 'mapSetting/setMapSetting' }
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
