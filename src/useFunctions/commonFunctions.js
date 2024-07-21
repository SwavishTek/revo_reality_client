import dayjs from "dayjs";
import { API_AXIOS } from "../http/interceptor";
import Apis from "../utils/apis";

export const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const uploadImg = async (files = []) => {
  try {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const { data } = await API_AXIOS.post(Apis.uploadImg, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (err) {
    throw new Error("Uploading image failed");
  }
};
