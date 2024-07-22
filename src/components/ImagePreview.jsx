import { Image } from "@chakra-ui/react";
import React from "react";

const ImagePreview = ({ img }) => {
  return (
    <Image
      boxSize="100px"
      objectFit="cover"
      src={img}
      alt="Dan Abramov"
      borderRadius={5}
    />
  );
};

export default ImagePreview;
