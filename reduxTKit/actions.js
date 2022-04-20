/* 
  To use this function in UI, we need to:
  1. import { addItem } from 'redux/actions';
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
    dispatch(addItem(item))
*/

export const addItem = (item) => {
  return {
    type: "itemList/addItem",
    payload: item,
  };
};

export const updateUserInfo = (userInfo) => {
  return {
    type: "user/updateUserInfo",
    payload: userInfo,
  };
};
