import axios from "axios";
import { baseURL } from "../api";
const http = ({ url, params, headers, method }) => {
  return new Promise((resolve, reject) => {
    axios({
      baseURL,
      url,
      params,
      headers,
      method,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => console.log(error));
  });
};
export default http;
