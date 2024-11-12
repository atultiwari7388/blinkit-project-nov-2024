import axios from "axios";
import { baseURL } from "../common/Api";

export const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
