import dayjs from "dayjs";
import { API_AXIOS } from "../http/interceptor";
import Apis from "../utils/apis";
import * as XLSX from 'xlsx';

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


export const excelToJson = (e) => {
  let jsonData = [];

  const reader = new FileReader();
  reader.readAsBinaryString(e.target.files[0]);
  reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Use header: 1 to get raw data

    // Function to convert Excel serial date to JS Date
    const excelDateToJSDate = (serial) => {
      if (typeof serial === 'number' && !isNaN(serial)) {
        const epoch = new Date(Date.UTC(1899, 11, 30)); // Excel dates start from 1899-12-30
        return new Date(epoch.getTime() + serial * 86400000); // 86400000 ms in a day
      }
      return serial;
    };

    // Function to format date as YYYY-MM-DD
    const formatDate = (date) => {
      if (date instanceof Date && !isNaN(date)) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      return date;
    };

    // Process the parsed data
    jsonData = parsedData.map(row =>
      row.map(cell => formatDate(excelDateToJSDate(cell)))
    );

    console.log(jsonData);
  };

  return jsonData;
};

export const convertExcelToJSON = (file) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    // Assuming the first sheet is the one you want
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON format
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // Process the data
    jsonData.forEach(row => {
      const name = row['Name'];
      const date = row['Date'];
      const type = row['Type'];

      console.log(`Name: ${name}, Date: ${date}, Type: ${type}`);
    });
  };

  reader.readAsArrayBuffer(file);
}
