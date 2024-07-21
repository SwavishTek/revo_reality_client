import { API_AXIOS } from "../../http/interceptor";
import Apis from "../../utils/apis";

export const applyLeave = async (values) => {
  try {
    const { data } = await API_AXIOS.post(`${Apis.leave}`, values);
    return data || {};
  } catch (error) {
    throw new Error(error.response.data.error || "Something went wrong");
    // console.log(error);
  }
};
