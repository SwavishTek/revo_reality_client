// leaveFunctions.js

import { useQueryClient } from "@tanstack/react-query";
import { API_AXIOS } from "../../http/interceptor";
import Apis from "../../utils/apis";
import { showError, showSuccess } from "../../utils/toastHelpers";


export const applyLeave = async (values) => {
  try {
    
    const payload = {
      _id: "", 
      startDate: values.start ? values.start.toISOString() : "",
      endDate: values.end ? values.end.toISOString() : "",
      type: values.payType || "",
      days: calculateDays(values.start, values.end),
      organizationId: "", 
      user: "", 
      name: `${values.name} ${values.lastName}`,
      message: values.reason || "",
    };

    const { data } = await API_AXIOS.post(`${Apis.leave}`, payload);
    return data || {};
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Something went wrong";
    console.error("Error applying leave:", errorMessage);
    throw new Error(errorMessage);
  }
};

// Function to calculate days between two dates
const calculateDays = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

// Function to get leaves with pagination and filtering options
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
    } catch (error) {
      console.error("Error approving leave:", error);
    }
  };

  const rejectLeaveById = async (id) => {
    try {
      const { data } = await API_AXIOS.post(`${Apis.leaveRejectById}/${id}`);
      queryClient.refetchQueries(["leaves"]);
      queryClient.setQueriesData(["leave", id], () => data.data);
    } catch (error) {
      console.error("Error rejecting leave:", error);
    }
  };

  const onHoldLeaveById = async (id) => {
    try {
      const { data } = await API_AXIOS.post(`${Apis.leaveOnHoldById}/${id}`);
      queryClient.refetchQueries(["leaves"]);
      queryClient.setQueriesData(["leave", id], () => data.data);
    } catch (error) {
      console.error("Error putting leave on hold:", error);
    }
  };

  return {
    approveLeaveById,
    rejectLeaveById,
    onHoldLeaveById,
  };
};
