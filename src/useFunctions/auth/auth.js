import axios from "axios";
import Apis from "../../utils/apis";
import { API_AXIOS } from "../../http/interceptor";

export const verifyOtp = async ({ email, otp }) => {
  try {
    const { data } = await axios.post(Apis.verifyOTP, { email, otp });
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

export const getProfile = async () => {
  try {
    const { data } = await API_AXIOS.get(Apis.profile);
    let refreshToken = data?.data?.refreshToken;
    localStorage.setItem("refreshToken", refreshToken);
    return data?.data?.user || {};
  } catch (error) {
    // throw new Error(error.response.data.error);
    console.log(error);
  }
};
