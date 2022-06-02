import { createSlice } from "@reduxjs/toolkit";

export default ItemsSlice = createSlice({
  name: "itemList",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      let isAdded = false;
      state.map((item) => {
        if (item.id == action.payload.id) isAdded = true;
      });

      // if (action.payload) state.push(action.payload);
      if (!isAdded) state.push(action.payload);
    }, // => { type: 'itemList/addItem' }
    fetchItem: (state, action) => {
      return action.payload;
    }, // => { type: 'itemList/fetchItem' }
    resetState: (state, action) => [],
    updateItem: (state, action) => {
      const temp = state.map((item) => {
        if (item.id == action.payload.id) return { ...item, ...action.payload };
        return item;
      });

      return temp;
    },
    // => { type: 'itemList/resetState' }
  },
});

/* 
  item = {
    id: String(),
    imgUrl: String(),
    lng: Number(),
    lat: Number(),
    latestLocation: String(),
    mode: Number(),
    name: String(),
  }
  NOTE: To call the action addItem in UI:
  1. Import file:
    import ItemsSlice from 'redux/reducers/ItemsSlice'
    import { useDispatch } from 'react-redux';
  2. In function UI, initializing dispatch
    const dispatch = useDispatch();
  3. Then passing the action to store:
    Example: 
    item = {
      id: "EdeZmbpqGiNka0truTaD",
      lng: 106.927398,
      lat: 12.076924,
      latestLocation: "",
      mode: 0,
      name: "AirTag",
      imgUrl: "",
    }
    dispatch(ItemsSlice.actions.addItem(item))
*/
