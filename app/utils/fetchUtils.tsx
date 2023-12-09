import axios from "axios";
const customFetch = axios.create({
  baseURL: "http://localhost:5100/api/v1",
  //baseURL:'/api'
});

export default customFetch;
