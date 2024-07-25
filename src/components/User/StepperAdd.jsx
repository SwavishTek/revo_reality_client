import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import "./uploadbutton.css";
import { CheckIcon } from "@chakra-ui/icons";

const StepperAdd = ({ currentStep, setCurrentStep }) => {
  const steps = [
    "Personal/Address Information",
    "Bank Information",
    "Upload Offer Letter",
  ];

  const [complete, setComplete] = useState(false);

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} my={6}>
        {steps?.map((step, i) => (
          <div
            key={i}
            style={{}}
            className={`step-item ${currentStep === i + 1 && "active"}  ${
              (i + 1 < currentStep || complete) && "complete"
            }`}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <CheckIcon /> : i + 1}
            </div>
            <div style={{ marginRight: 100 }} />
            {/* <p>{step}</p> */}
          </div>
        ))}
      </Box>
      {/* <Button
        onClick={() => {
          currentStep === steps.length
            ? setComplete(true)
            : setCurrentStep((prev) => prev + 1);
        }}
      >
        {currentStep === steps.length ? "Submit" : "Save"}
      </Button> */}
    </>
  );
};

export default StepperAdd;
