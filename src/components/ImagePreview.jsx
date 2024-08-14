import { Image } from "@chakra-ui/react";
import React from "react";
import { svg } from "../assets/svg";

const ImagePreview = ({ img }) => {
  return (
    <Image
      boxSize="75px"
      objectFit="cover"
      src={img || svg.noImg}
      alt="No image"
      borderRadius={5}
    />
  );
};

export default ImagePreview;
