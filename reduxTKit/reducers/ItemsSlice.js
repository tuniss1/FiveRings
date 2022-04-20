// const initState = [
//   {
//     id: String(),
//     imgUrl: String(),
//     lng: Number(),
//     lat: Number(),
//     latestLocation: String(),
//     mode: Number(),
//     name: String(),
//   },
// ];

// const itemListReducer = (state = initState, action) => {
//   /*
//     Note that: action, which has type and payload
//     Example:
//     action = {
//       type: 'itemList/addItem',
//       payload: {
//         id: "EdeZmbpqGiNka0truTaD",
//         imgUrl: "",
//         lng: 106.927398,
//         lat: 12.076924,
//         latestLocation: "",
//         mode: 0,
//         name: "AirTag",
//       }
//     }
//   */
//   switch (action.type) {
//     case "itemList/addItem":
//       return [...state, action.payload];
//     default:
//       return state;
//   }
// };

// export default itemListReducer;

import { createSlice } from "@reduxjs/toolkit";

export default ItemsSlice = createSlice({
  name: "itemList",
  initialState: [
    {
      id: String(),
      imgUrl: String(),
      lng: Number(),
      lat: Number(),
      latestLocation: String(),
      mode: Number(),
      name: String(),
    },
  ],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    }, // => { type: 'itemList/addItem' }
  },
});

/* 
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
