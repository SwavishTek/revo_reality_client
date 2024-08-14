import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
} from "@chakra-ui/react";

const steps = [
  { title: "Personal", description: "Information" },
  { title: "Bank", description: "Information" },
  { title: "Upload", description: "Offer Letter" },
];

function NewStepper({ activeStep, setActiveStep }) {
  return (
    <Stepper index={activeStep} colorScheme="brand"  marginBottom={'2rem'} mx={100}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}

export default NewStepper;

// render(<Example />);
