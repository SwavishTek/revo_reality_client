import axios from "axios";
import { API_AXIOS } from "../../http/interceptor";
import Apis from "../../utils/apis";
import useCustomToast from "../../hooks/useCustomToast";
import { showSuccess } from "../../utils/toastHelpers";


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
    // useCustomToast().showError({
    //   message: error || 'internal server Errror '
    // })
  }
}

export const updateTeam = async ({ data, id }) => {
  try {
    const res = await API_AXIOS.put(`team/updateById/${id}`, data);
    return res.data;
  } catch (error) {
    console.log('AddTeam Error', error);
  }
}

