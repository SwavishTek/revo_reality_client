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
import MyContainer from "../../myComponent/MyContainer";
import { CustomBtn } from "../../myComponent/CustomBtn";
import { color } from "../../consts/color";

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
     
     <MyContainer
     isBack
     header={'Add Employees'}
     btnComponent={<>
      <CustomBtn title={'Create Offer'}
      bgColor={color.secondaryBtn}  />
     </>} >

      {/* <MyStepper currentStep={activeStep} setCurrentStep={setActiveStep} /> */}
      <NewStepper activeStep={activeStep} />
      {activeStep === 0 ? (
        <PersonalForm setCurrentStep={setActiveStep} />
      ) : activeStep === 1 ? (
        <BankInformation setCurrentStep={setActiveStep} />
      ) : activeStep === 2 ? (
        <UploadOfferLetter setCurrentStep={setActiveStep} />
      ) : null}
      </MyContainer>
    </div>
  );
};

export default AddEmployee;
