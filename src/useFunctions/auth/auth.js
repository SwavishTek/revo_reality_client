import axios from "axios";
import Apis from "../../utils/apis";
import { API_AXIOS } from "../../http/interceptor";
import { showError, showSuccess } from "../../utils/toastHelpers";

export const verifyOtp = async ({ email, otp }) => {
  try {
    const { data } = await axios.post(Apis.verifyOTP, { email, otp });
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("refreshToken", data.data.refreshToken);
    return data;
  } catch (error) {
    console.log(error);
    showError(error?.response?.data?.message);
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
    showError(error?.response?.data?.message);
    console.log(error);
  }
};

// auth/forgotPassword
export const forgotPassword = async ({ email }) => {
  try {
    const { data } = await API_AXIOS.post(`auth/forgotPassword`, { email });
    console.log('resForgetPawword', data)
    showSuccess(data?.message);
    return data;   
  } catch (error) {
    showError(error?.response?.data?.message);
    throw new Error(error);
  }
}

//resetPassword
export const resetPassword = async ({ id, password }) => {
  try {
    const { data } = await API_AXIOS.post(`auth/resetPassword/${id}`, { id, password });
    showSuccess(data?.message);
    return data;
  } catch (error) {
    showError(error?.response?.data?.message);
    throw new Error(error);
  }
}
