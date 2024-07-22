import { API_AXIOS } from "../../http/interceptor";
import Apis from "../../utils/apis";
import { useQueryClient } from "@tanstack/react-query";

export const getUsers = async ({
  pageParam = 1,
  limit = 10,
  status = "new",
  search,
}) => {
  try {
    const { data } = await API_AXIOS.get(`${Apis.user}`, {
      params: { page: pageParam, status, limit, search },
    });
    return data || {};
  } catch (error) {
    // throw new Error(error.response.data.error);
    console.log(error);
  }
};

export const addUser = async (values) => {
  try {
    const { data } = await API_AXIOS.post(`${Apis.user}`, values);
    return data || {};
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message || "Something went wrong");
  }
};

export const changeUserStatus = async ({ userId = "", status = "" }) => {
  try {
    const { data } = await API_AXIOS.post(`${Apis.userStatusChangeById}`, {
      userId,
      status,
    });
    return data || {};
  } catch (error) {
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
  } catch (err) {
    console.log("user details", err);
  }
};

export const userPermanantDelete = async ({ userId = "" }) => {
  try {
    const { data } = await API_AXIOS.post(`${Apis.userPermanentDelete}`, {
      userId,
    });
    return data || {};
  } catch (error) {
    throw new Error(error.response.data.error || "Something went wrong");
    // console.log(error);
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
