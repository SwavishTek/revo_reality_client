import { useQueryClient } from "@tanstack/react-query";
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

export const getLeaves = async ({
  pageParam = 1,
  limit = 10,
  status = "new",
  search,
  start,
  end,
}) => {
  try {
    const { data } = await API_AXIOS.get(`${Apis.leave}`, {
      params: { page: pageParam, status, limit, search, start, end },
    });
    return data || {};
  } catch (error) {
    // throw new Error(error.response.data.error);
    console.log(error);
  }
};

export const getLeaveById = async (id) => {
  try {
    const { data } = await API_AXIOS.get(`${Apis.leaveDetailsById}/${id}`);
    return data.data || {};
  } catch (err) {
    console.log("leave details", err);
  }
};

// export const useLeaveRejectById = async (id) => {
//   try {
//     const { data } = await API_AXIOS.post(`${Apis.leaveRejectById}/${id}`);

//     useRemoveLeaveData("pending");

//     // return data || {};
//   } catch (error) {
//     console.log("leave reject", error);
//   }
// };

// const useRemoveLeaveData = (oldStatus) => {
//   const queryClient = useQueryClient();

//   // Update the old status cache
//   queryClient.setQueryData(["leaves", oldStatus], (oldData) => {
//     if (!oldData) return oldData;

//     const newPages = oldData.pages.map((page) => ({
//       ...page,
//       leaves: page.leaves.filter((leave) => leave.id !== id),
//     }));

//     return { ...oldData, pages: newPages };
//   });
// };

// const useUpdateLeaveData = (newStatus, data) => {
//   const queryClient = useQueryClient();
//   // Update the new status cache
//   queryClient.setQueryData(["leaves", newStatus], (oldData) => {
//     if (!oldData) return oldData;

//     // Adding the new data on top of the list
//     const firstPage = oldData.pages[0] || { leaves: [] };
//     firstPage.leaves = [data, ...firstPage.leaves];

//     return {
//       ...oldData,
//       pages: [firstPage, ...oldData.pages.slice(1)],
//     };
//   });
// };

export const useLeaveActions = () => {
  const queryClient = useQueryClient();

  const rejectLeaveById = async (id) => {
    try {
      const { data } = await API_AXIOS.post(`${Apis.leaveRejectById}/${id}`);
      //   removeLeaveData("new", id);
      //   updateLeaveData("rejected", data.data);
      queryClient.refetchQueries(["leaves"]);

      //updating details api
      queryClient.setQueriesData(["leave", id], (oldData) => {
        return data.data;
      });
    } catch (error) {
      console.log("leave reject", error);
    }
  };

  const removeLeaveData = (oldStatus, id) => {
    queryClient.setQueryData(["leaves", { status: oldStatus }], (oldData) => {
      // Provide default structure if oldData is undefined or missing
      const defaultData = { pages: [], pageParams: [] };
      const data = oldData || defaultData;

      // Log data for debugging
      console.log("Old Data before removal:", data);

      const newPages = data.pages.map((page) => ({
        ...page,
        data: page.data.filter((leave) => leave._id !== id),
      }));

      // Log updated data
      const updatedData = { ...data, pages: newPages };
      console.log("Updated Data after removal:", updatedData);

      return updatedData;
    });
  };

  const updateLeaveData = (newStatus, data) => {
    queryClient.setQueryData(["leaves", { status: newStatus }], (oldData) => {
      if (!oldData) return oldData;

      // Adding the new data on top of the list
      const firstPage = oldData.pages[0] || { data: [] };
      firstPage.data = [data, ...firstPage.data];

      return {
        ...oldData,
        pages: [firstPage, ...oldData.pages.slice(1)],
      };
    });
  };

  return {
    rejectLeaveById,
  };
};
