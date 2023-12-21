import axios from "axios";
const customFetch = axios.create({
  baseURL: "http://localhost:3000/api/",
  //baseURL:'/api',
  withCredentials: true,
});

export default customFetch;
