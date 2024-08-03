import { API_AXIOS } from "../../http/interceptor";


export const getHolidayCount = async ({type }) => {
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

export const uploadHoliday = async ({
  data
}) => {
  try {
    const res = await API_AXIOS.post('holiday', data);
    return res;
  } catch (error) {
    console.log('ErrorUploadHoliday:', error);
  }

}



