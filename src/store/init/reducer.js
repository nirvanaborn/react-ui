import state from "./state.js";
import * as type from "./type.js";

const reducer = (previousState = state, action) => {
  let newState = {
    ...previousState,
    userList: [],
  };
  switch (action.type) {
    case type.GET_USERLIST_INFO:
      newState.userList = action.payload;
      break;

    default:
      break;
  }
  return newState;
};
export default reducer;
