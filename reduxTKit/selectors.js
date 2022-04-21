import { createSelector } from "@reduxjs/toolkit";

/* 
  Create selector for itemList:
*/

export const itemListSelector = (state) => {
  /* We can take the exact data we want:
    Example: To get all item at mode 1
      return state.itemList.filter((item) => {
        return item.mode == 1
      });
  */
  return state.itemList;
};

export const getCurItem = (state, index) => {
  // console.log(state.itemList[index]);
  console.log(state);
  console.log(index);
};

export const userSelector = (state) => {
  return state.user;
};

/*
  If we have a selector dependent on other selector, then
  export const todosRemainingSelector = createSelector(todoListSelector, searchTextSelector, (todoList, searchText) => {
    return todoList.filter((todo) => {
      return todo.name.includes(searchText)
    })
  })
  where     
    1: todoList: return value from todoListSelector
    2: searchText: return value from searchTextSelector 
*/
