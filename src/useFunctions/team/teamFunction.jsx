import { API_AXIOS } from "../../http/interceptor";
import Apis from "../../utils/apis";


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

