import axios from "axios";
import { API_AXIOS } from "../../http/interceptor";
import Apis from "../../utils/apis";
import useCustomToast from "../../hooks/useCustomToast";
import { showSuccess, showError } from "../../utils/toastHelpers";


export const getTeams = async ({
  pageParam = 1,
  search = ''
}) => {
  try {
    const { data } = await API_AXIOS.get(`team`, {
      params: {
        page: pageParam,
        search
      },
    });
    return data || {};
  } catch (error) {

    console.log(error);
  }
};

export const addTeam = async ({ data }) => {
  try {
    const res = await API_AXIOS.post('team', data);
    showSuccess(res?.data?.message || "Team Added successfully M");
    return res.data;
  } catch (error) {
    console.log('AddTeam Error', error);
    showError(error?.response?.data?.message || "Something went wrong");
    // useCustomToast().showError({
    //   message: error || 'internal server Errror '
    // })
  }
}

export const updateTeam = async ({ data, id }) => {
  try {
    const res = await API_AXIOS.put(`team/updateById/${id}`, data);
    showSuccess(res?.data?.message || "Team Updated successfully M");
    return res.data;
  } catch (error) {
    showError(error?.response?.data?.message || "Something went wrong");
    console.log('AddTeam Error', error);
  }
}
export const getTeamDetailsById = async (id) => {
  try {
    const res = await API_AXIOS.get(`team/${id}`);
    return res.data;
  } catch (error) {
    console.error('Team Details Error:', error);
    throw error;
  }
};

export const teamDelete = async (data) => {
  console.log('data',data);
  try {
    console.log('inn');
    const {data: resData} = await API_AXIOS.post(`team/teamDelete`,{data});
    
    showSuccess(resData?.message);
    return resData || {};
  } catch (error) {
    console.log(error);
    showError(error?.response?.data?.message || "Something went wrong");
    throw new Error(error.response.data.error || "Something went wrong");
  }
};