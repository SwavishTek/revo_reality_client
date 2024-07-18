import { API_AXIOS } from "../../http/interceptor";
import Apis from "../../utils/apis";

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
