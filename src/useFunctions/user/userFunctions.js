import { API_AXIOS } from "../../http/interceptor";
import Apis from "../../utils/apis";
import { useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../../utils/toastHelpers";

export const getUsers = async ({
  pageParam = 1,
  limit = 10,
  status = "new",
  search,
  role
}) => {
  try {
    const { data } = await API_AXIOS.get(`${Apis.user}`, {
      params: { page: pageParam, status, limit, search, role },
    });
    return data || {};
  } catch (error) {
    showError(error?.response?.data?.message);
    // throw new Error(error.response.data.error);
    console.log(error);
  }
};

export const addUser = async (values) => {
  try {
    const { data } = await API_AXIOS.post(`${Apis.user}`, values);
    return data || {};
  } catch (error) {
    console.log(error);
    showError(error?.response?.data?.message);
    throw new Error(error.response.data.message || "Something went wrong");
  }
};

export const changeUserStatus = async ({ userId = "", status = "" }) => {
  try {
    const { data } = await API_AXIOS.post(`${Apis.userStatusChangeById}`, {
      userId,
      status,
    });
    showSuccess(data?.message);
    return data || {};
  } catch (error) {
    showError(error?.response?.data?.message);
    throw new Error(error.response.data.error || "Something went wrong");
    // console.log(error);
  }
};

export const getUserDetailsById = async (id) => {
  try {
    const { data } = await API_AXIOS.post(`${Apis.getUserDetailsById}`, {
      userId: id,
    });
    return data.data || {};
  } catch (error) {
    showError(error?.response?.data?.message);
    console.log("user details", error);
  }
};

export const userPermanantDelete = async ({ userId = "" }) => {
  try {
    const response = await API_AXIOS.post(`${Apis.userPermanentDelete}`, { userId });
    const data = response.data;
    showSuccess(data?.message);
    return data || {};
  } catch (error) {
    showError(error?.response?.data?.message || "Something went wrong");
    throw new Error(error.response.data.error || "Something went wrong");
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
