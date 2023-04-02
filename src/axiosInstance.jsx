import axios from "axios";

const instance = axios.create({
  baseURL: "https://hotelbookingappbackend-production.up.railway.app",
  // baseURL:"http://localhost:4000",


  //   withCredentials: true,
  //   credentials: 'include',
  //   headers: {
  //     'Access-Control-Allow-Origin' : '*',
  //     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //     }
});

export default instance;
