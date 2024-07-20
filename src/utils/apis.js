// let baseUrl = "http://localhost:5000/api/";
let baseUrl = "http://192.168.0.1:5000/api/";

const Apis = {
  baseUrl,
  login: baseUrl + "auth/login",
  verifyOTP: baseUrl + "auth/verifyOTP",
  profile: baseUrl + "auth/profile",
  user: baseUrl + "users",
};

export default Apis;
