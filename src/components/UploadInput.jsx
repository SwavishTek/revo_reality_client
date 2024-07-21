import React, { useState } from "react";
import { uploadImg } from "../useFunctions/commonFunctions";
import { Box, Spinner } from "@chakra-ui/react";

const UploadInput = ({ onChange }) => {
  const [loading, setLoading] = useState(false);
  const handleUpload = async (e) => {
    setLoading(true);
    const files = e.target.files;
    const filesArr = Array.from(files);
    try {
      const result = await uploadImg(filesArr);
      console.log(result);

      if (onChange) onChange(result.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <div style={{ position: "relative" }}>
      <input
        onChange={handleUpload}
        multiple
        accept="image/png, image/gif, image/jpeg"
        type="file"
        style={{
          width: "100%",
          padding: "6px",
          borderRadius: "6px",
          border: "1px solid lightgray",
        }}
      />
      {loading && (
        <Box my={4} textAlign={"center"}>
          <Spinner />
        </Box>
      )}
    </div>
  );
};

export default UploadInput;
