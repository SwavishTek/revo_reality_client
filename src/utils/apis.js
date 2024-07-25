<<<<<<< HEAD
// let baseUrl = "http://localhost:8000/api/";
// let baseUrl = "http://192.168.0.108:5000/api/"
// let baseUrl = "http://192.168.0.119:8000/api/"
let baseUrl = `https://revo-reality-api.onrender.com/api/`

=======
// let baseUrl = "http://localhost:5000/api/";
let baseUrl = "http://192.168.0.108:5000/api/";
// let baseUrl = process.env.REACT_API_URL;
console.log(process.env.REACT_APP_API_URL);
>>>>>>> daa5c7f (react env)
const Apis = {
  baseUrl,
  login: baseUrl + "auth/login",
  verifyOTP: baseUrl + "auth/verifyOTP",
  changePassword: baseUrl + "auth/changePassword",
  profile: baseUrl + "auth/profile",
  user: baseUrl + "users",
  userStatusChangeById: baseUrl + "users/userStatusChangeById",
  userPermanentDelete: baseUrl + "users/permanentDelete",
  getUserDetailsById: baseUrl + "users/getUserDetailsById",

  uploadImg: baseUrl + "upload",
  //
  // leaves,
  leave: baseUrl + "leave",
  leaveDetailsById: baseUrl + "leave/leaveDetailsById",
  leaveRejectById: baseUrl + "leave/leaveRejectById",
  leaveApproveById: baseUrl + "leave/leaveApproveById",
  leaveOnHoldById: baseUrl + "leave/leaveOnHoldById",
  leaveReviseById: baseUrl + "leave/leaveOnHoldById",

  /* Team */
  team: baseUrl + "team",
  updateTeam: baseUrl + "team/updateById",
  getTeamSelect: baseUrl + "users",
};

export default Apis;
