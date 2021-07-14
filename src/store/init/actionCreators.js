import * as type from "./type.js";
import http from "../../utils/http";
const actionCreators = {
  getUserList() {
    return async (dispatch) => {
      const result = await http({
        url: "/users/getAllUsers",
        method: "GET",
        params: {},
      });
      const action = {
        type: type.GET_USERLIST_INFO,
        payload: result.data.res,
      };
      dispatch(action);
    };
  },
};
export default actionCreators;
