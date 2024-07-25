import React, { useState } from "react";
import PersonalForm from "../../components/User/PersonalForm";
import AddIcon from "../../assets/Vector.png";
import { Box, Button, useSteps } from "@chakra-ui/react";
import BankInformation from "../../components/User/BankInformation";
import UploadOfferLetter from "../../components/User/UploadOfferLetter";
import StepperAdd from "../../components/User/StepperAdd";
import MyStepper from "../../components/User/StepperAdd";
import BackButton from "../../components/BackButton";
import NewStepper from "../../components/User/NewStpper";

const AddEmployee = () => {
  // const [currentStep, setCurrentStep] = useState(1);
  const { activeStep, setActiveStep } = useSteps({
    // index: 1,
    // count: steps.length,
    initialStep: 0,
  });

  console.log(activeStep);
  return (
    <div>
      {/* <Box
        display={"flex"}
        justifyContent={"space-between"}
        mb={"2rem"}
        mt={"1rem"}
      >
        <div style={{ display: "flex" }}>
          <img
            src={AddIcon}
            style={{ width: "40px", height: "40px" }}
            alt="addicon"
          />
          <h3
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              paddingLeft: "1.2rem",
            }}
          >
            Add Employees
          </h3>
        </div>
        <Button size="md" fontSize="18px" colorScheme="brand">
          Create Offer
        </Button>
      </Box> */}
      <BackButton title="Add Employees">
        <Button size="md" fontSize="18px" colorScheme="brand">
          Create Offer
        </Button>
      </BackButton>

      {/* <MyStepper currentStep={activeStep} setCurrentStep={setActiveStep} /> */}
      <NewStepper activeStep={activeStep} />
      {activeStep === 0 ? (
        <PersonalForm setCurrentStep={setActiveStep} />
      ) : activeStep === 1 ? (
        <BankInformation setCurrentStep={setActiveStep} />
      ) : activeStep === 2 ? (
        <UploadOfferLetter setCurrentStep={setActiveStep} />
      ) : null}
      {/* 2 */}
      {/*<BankInformation />*/}
      {/* 3 */}
      {/* <UploadOfferLetter /> */}
    </div>
  );
};

export default AddEmployee;
