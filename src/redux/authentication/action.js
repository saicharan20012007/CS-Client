import axios from "axios";
import * as types from "./actionTypes";

export const memberLogin = (otp) => async (dispatch) => {
  dispatch({ type: types.AUTH_REQUEST });
 
  return axios
    .post("https://cs-server-three.vercel.app/api/user/auth/login", { otp: otp })
    .then((res) =>
      dispatch({ type: types.AUTH_SUCCESS, payload: res.data.token })
    )
    .catch((error) =>
      dispatch({ type: types.AUTH_FAILURE, payload: error.response })
    );
};



