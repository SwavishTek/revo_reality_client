import { API_AXIOS } from "../../http/interceptor";


export const getTeams = async ({
    pageParam = 1,
  }) => {
    try {
      const { data } = await API_AXIOS.get(`${Apis.AllTeamList}`, {
        params: { page: pageParam },
      });
      return data || {};
    } catch (error) {
      
      console.log(error);
    }
  };

  export const getTeamSelect = async ({ status, role
  }) => {
    try {
      const { data } = await API_AXIOS.get(`${Apis.getTeamSelect}`, {
        params: {status, role },
      });
      return data || {};
    } catch (error) {
      
      console.log(error);
    }
  };
  