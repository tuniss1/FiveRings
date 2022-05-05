import { createSlice } from "@reduxjs/toolkit";
import { Dimensions } from "react-native";

export default MapSettingSlice = createSlice({
  name: "mapSetting",
  initialState: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01 * (Dimensions.get("window").width / 225),
  },
  reducers: {
    // setMapSetting: (state, action) => {
    //   return { ...state, ...action.payload };
    // }, // => { type: 'mapSetting/setMapSetting' }
    updateMapSetting: (state, action) => {
      return { ...state, ...action.payload };
    }, // => { type: 'mapSetting/updateMapSetting' }
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
