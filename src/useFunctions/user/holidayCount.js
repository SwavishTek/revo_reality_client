import { API_AXIOS } from "../../http/interceptor";
import { showError, showSuccess } from "../../utils/toastHelpers";


export const getHolidayCount = async ({ type }) => {
  try {
    const { data } = await API_AXIOS.get(`holiday/stats`, {
      params: {
        type
      }
    });
    return data || {};
  } catch (error) {

    console.log('getHolidayCountError', error);
  }
};

export const uploadHoliday = async ({ data }) => {
  try {
    const res = await API_AXIOS.post('holiday', data);
    showSuccess(data?.message);
    return res.data;  // Assuming the response data is needed
  } catch (error) {
    console.log('first error', error?.response);
    showError(error?.response?.data?.error);
    throw new Error(error);
  }
};




