import { configureStore } from "@reduxjs/toolkit";
import ItemsSlice from "./reducers/ItemsSlice";
import UserSlice from "./reducers/UserSlice";
import MapSettingSlice from "./reducers/MapSettingSlice";

/*
  To take the itemList from the store in UI:
  1. import { useSelector } from 'react-redux;
     import { itemListSelector } from 'redux/selectors'
  2. In function UI,
    const itemList = useSelector(itemListSelector);
*/

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    itemList: ItemsSlice.reducer,
    mapSetting: MapSettingSlice.reducer,
  },
});

export default store;
