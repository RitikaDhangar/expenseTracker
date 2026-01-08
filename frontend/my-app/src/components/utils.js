import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { store } from "../store";
import toast from "react-hot-toast";
import { STORE_USER_TOKEN } from "../features/UserSlice";
const isTokenExpired = (token) => {
  const decode = jwtDecode(token);
  return decode.exp * 1000 < Date.now();
};
console.log(process.env.REACT_APP_BACKEND_URL,'process.env.BACKEND_URL')
const HttpApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

HttpApi.interceptors.request.use(
  (config) => {
    const token = store.getState().UserInfo.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
   return Promise.reject(error);
  }
);

HttpApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const isOffline = !window?.navigator?.onLine;
    if (isOffline) {
      return toast.error("No internet connection. Please check your network.");
    }
    if (!error?.response) {
      return toast.error("Unable to reach server. Please try again later.");
    }
    const { status, data } = error?.response;
    if (status === 401) {
      store.dispatch(STORE_USER_TOKEN(""));
      toast.error("Session expired. Please login again.");
      window.location.replace("/login");
      return;
    }
    return error;
  }
);

export  {isTokenExpired,HttpApi};
