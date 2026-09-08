import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { useToast } from "vue-toast-notification";
import { useRoute } from "vue-router";
import store from "../store";
//pass new generated access token here
//const token = localStorage.getItem('user-token')

const axios = setupCache(Axios);

//apply base url for axios
const API_URL = process.env.VUE_APP_API_URL || "http://localhost:8000";
const toast = useToast();
const route = useRoute();
const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.withCredentials = true;

axiosApi.interceptors.request.use(
  (config) => {
    const token = store.getters.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

axiosApi.interceptors.response.use(
  (response) => response,

  (error) => {
    console.log(error);
    if (
      error?.response?.status === 401 &&
      error?.code === "ERR_BAD_REQUEST" &&
      error?.response.data.message.toLowerCase() === "token expired"
    ) {
      if (store.getters.token) {
        toast.info("Your session as expired", {
          position: "bottom",
        });
      }

      localStorage.clear();
      window.location.href = `/login?info=session_expired&redirected_from=${route.path}`;
    } else {
      return Promise.reject(error);
    }
  }
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config });
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config });
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config });
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config });
}
