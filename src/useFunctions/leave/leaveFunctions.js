// leaveFunctions.js

import { useQueryClient } from "@tanstack/react-query";
import { API_AXIOS } from "../../http/interceptor";
import Apis from "../../utils/apis";
import { showError, showSuccess } from "../../utils/toastHelpers";


export const applyLeave = async (values) => {
  try {

    // const payload = {
    //   start: values.start ? values.start.toISOString() : "",
    //   end: values.end ? values.end.toISOString() : "",
    //   type: values.type || "", 
    //   reason: values.reason || "",
    //   payType:values.payType || "",
    // };

    const { data } = await API_AXIOS.post(`${Apis.leave}`, values);
    showSuccess(data?.message);
    return data || {};
  } catch (error) {
    console.log('$$', error);
    const errorMessage = error.response?.data?.message || "Something went wrong";
    showError(errorMessage || "Something went wrong");
    throw new Error(errorMessage);
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
    console.error("Error fetching leaves:", error);
    throw new Error("Failed to fetch leaves");
  }
};

// Function to get leave details by ID
export const getLeaveById = async (id) => {
  try {
    const { data } = await API_AXIOS.get(`${Apis.leaveDetailsById}/${id}`);
    return data.data || {};
  } catch (error) {
    console.error("Error fetching leave details:", error);
    throw new Error("Failed to fetch leave details");
  }
};

// Approve leave by ID
export const approveLeaveById = async (id) => {
  try {
    const { data } = await API_AXIOS.post(`leave/leaveApproveById/${id}`);
    showSuccess(data?.data.message || "Leave approved successfully");
    return data.data || {};
  } catch (error) {
    console.error("Error approving leave:", error);
    showError(error.response?.data?.message || "Something went wrong");
    throw new Error(error.response?.data?.error || "Something went wrong");
  }
};

// Reject leave by ID
export const rejectLeaveById = async (id) => {
  try {
    const { data } = await API_AXIOS.post(`leave/leaveRejectById/${id}`);
    showSuccess(data?.message || "Leave successfully rejected");
    return data.data || {};
  } catch (error) {
    console.error("Error rejecting leave:", error);
    showError(error.response?.data?.message || "Something went wrong");
    throw new Error(error.response?.data?.error || "Something went wrong");
  }
};


// Put leave on hold by ID
export const onHoldLeaveById = async (id) => {
  try {
    const { data } = await API_AXIOS.post(`leave/leaveOnHoldById/${id}`);
    showSuccess(data?.message || "Leave successfully onHold");
    return data.data || {};
  } catch (error) {
    console.error("Error OnHold leave:", error);
    showError(error.response?.data?.message || "Something went wrong");
    throw new Error(error.response?.data?.error || "Something went wrong");
  }
};

// Use leave actions hook
export const useLeaveActions = () => {
  const queryClient = useQueryClient();

  const approveLeaveById = async (id) => {
    try {
      const { data } = await API_AXIOS.post(`${Apis.leaveApproveById}/${id}`);
      queryClient.refetchQueries(["leaves"]);
      queryClient.setQueriesData(["leave", id], () => data.data);
      showSuccess(data?.message || "Leave successfully onHold");
    } catch (error) {
      showError(error?.response?.data?.message);
      throw new Error(error);
    }
  };

  const rejectLeaveById = async (id) => {
    try {
      const { data } = await API_AXIOS.post(`${Apis.leaveRejectById}/${id}`);
      queryClient.refetchQueries(["leaves"]);
      queryClient.setQueriesData(["leave", id], () => data.data);
      showSuccess(data?.message || "Leave successfully onHold");
    } catch (error) {
      console.log('error', error)
      showError(error?.response?.data);
      throw new Error(error);
    }
  };

  const onHoldLeaveById = async (id) => {
    try {
      const { data } = await API_AXIOS.post(`${Apis.leaveOnHoldById}/${id}`);
      queryClient.refetchQueries(["leaves"]);
      queryClient.setQueriesData(["leave", id], () => data.data);
      showSuccess(data?.message || "Leave successfully onHold");
    } catch (error) {
      showError(error?.response?.data?.message);
      throw new Error(error);
    }
  };

  const reviseLeaveById = async ({ id, sendData }) => {
    try {
      const { data } = await API_AXIOS.post(`leave/reviseLeavesById/${id}`, sendData);
      showSuccess(data?.message || "Leave successfully onHold");
      return data.data || {};
    } catch (error) {
      showError(error?.response?.data?.message);
      throw new Error(error);
    }
  };

  const reviseAcceptRejById = async ({ id, status }) => {
    try {
      const { data } = await API_AXIOS.post(`leave/reviseAcceptRejById/${id}`, {status});
      showSuccess(data?.message || "Leave Dates approved successfully");
      return data.data || {};
    } catch (error) {
      showError(error?.response?.data?.message);
      throw new Error(error);
    }
  };

  const cancelLeaveById = async ({ id }) => {
    try {
      const { data } = await API_AXIOS.post(`leave/cancelLeaveById/${id}`);
      showSuccess(data?.message || "Leave Cancelled successfully");
      return data.data || {};
    } catch (error) {
      showError(error?.response?.data?.message);
      throw new Error(error);
    }
  };


  return {
    approveLeaveById,
    rejectLeaveById,
    onHoldLeaveById,
    reviseLeaveById,
    reviseAcceptRejById,
    cancelLeaveById
  };
};
