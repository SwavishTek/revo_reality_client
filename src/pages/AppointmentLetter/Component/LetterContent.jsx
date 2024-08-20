import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Divider,
  ListItem,
  List,
} from "@chakra-ui/react";
import React from "react";
import { CustomText } from "../../../myComponent/CustomText";
import "./letterContent.css";
import footer from "../svg/footer.png";
import header from "../svg/header.png";
import { svg } from "../../../assets/svg";

export const LetterContent = ({ pdfRef, signature, userInfo }) => {
  console.log('useInfoLetterContent', userInfo)
  return (
    <Box maxWidth={"800px"} minWidth={"600px"} bg={"white"}>
      <Box ref={pdfRef}>
        <Image src={header} width={"100%"} mb={"20px"} />
        <HStack
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"40px"}
          px={"50px"}
        >
          <Image src={svg.logos} />
          <Box>
            <HStack alignItems="center" spacing={3} mb={1}>
              <Image src={svg.Call} />
            </HStack>
            <HStack alignItems="center" spacing={3} mb={1}>
              <Image src={svg.Email} />
            </HStack>
            <HStack alignItems="center" spacing={3}>
              <Image src={svg.Web} />
            </HStack>
          </Box>
        </HStack>
        <CustomText
          textAlign="center"
          fontSize="18px"
          fontWeight="700"
          marginBottom={"20px"}
        >
          APPOINTMENT LETTER
        </CustomText>
        <Box padding={"50px"}>
          <VStack alignItems={"flex-start"}>
            <HStack>
              <Text className="boldText" mb={"10px"}>
                Date of Issue:
              </Text>
            </HStack>
            <Text className="text" mb={"10px"}>
              ______________________________@gmail.com
            </Text>
            <HStack mb={"20px"}>
              <Text className="text" mb={"10px"}>
                Dear ____________________,
              </Text>
            </HStack>
            <Text className="boldText" mb={"20px"}>
              Congratulations! We are very excited to have you onboard!
            </Text>
            <Text className="text" mb={"20px"}>
              We are pleased to inform you that, based on your application and
              subsequent interviews, we would like to offer you the position of
              Content Creator with our company. We believe that your skills,
              experience, and qualifications make you a strong candidate for the
              role and we are excited to welcome you to our team.
            </Text>
            <Text className="text" mb={"10px"}>
              The remuneration for this position will be mentioned in Annexure
              A. Additionally, as a valued member of our team.
            </Text>
            <Text className="boldText" mx={4}>
              A. Remuneration
            </Text>
            <Divider borderWidth="1px" borderColor="black" mb={"20px"} />
            <HStack
              justifyContent="space-between"
              alignItems="center"
              w="full"
              pr="40px"
              mb={"5px"}
            >
              <Text className="text">Basic Salary</Text>
              <Text className="boldText">AED</Text>
            </HStack>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              w="full"
              pr="40px"
              mb={"5px"}
            >
              <Text className="text">Cost of Living, Other Allowances</Text>
              <Text className="boldText">AED</Text>
            </HStack>
            <HStack
              mb={"20px"}
              justifyContent="space-between"
              alignItems="center"
              w="full"
              pr="40px"
            >
              <Text className="boldText">Total (in Words)</Text>
              <Text className="text">
                AED Only Three Thousand Emirati Dirham
              </Text>
            </HStack>
            {/* Company Benefits section */}
            <Text className="boldText" mx={4}>
              B. Company Benefits
            </Text>
            <Divider borderWidth="1px" borderColor="black" mb={"10px"} />
            <Text className="text" mb={"10px"}>
              In addition to Salary, you will be entitled for the following
              benefits:
            </Text>
            <Text className="text">
              1. Medical Insurance: Company will provide medical insurance for
              self as per medical insurance policy.
            </Text>
            <Text className="text">
              2. Vacation: On completion of one year, you will be entitled for
              30 calendar days as annual leave.
            </Text>
            <Text className="text">
              3. Gratuity: You will be entitled to gratuity as per the UAE Labor
              Laws
            </Text>
            <Text className="text" mb={"20px"}>
              4. Visa: The Company shall make the arrangements for your
              Employment Visa.
            </Text>
            <HStack className="text">
              <Text mb={"10px"}>
                <Text as="span" className="boldText">
                  Date of Joining:
                </Text>{" "}
                Your date of joining will be __________; we expect you to be on
                board and commence your services on the same date.
              </Text>
            </HStack>
            <HStack className="text">
              <Text mb={"10px"}>
                <Text as="span" className="boldText">
                  Work Location
                </Text>{" "}
                Dubai, UAE
              </Text>
            </HStack>
            <HStack className="text">
              <Text mb={"10px"}>
                <Text as="span" className="boldText">
                  Timing & Dress Code:
                </Text>{" "}
                Dubai, UAE
              </Text>
            </HStack>
            <HStack className="text">
              <Text mb={"10px"}>
                <Text as="span" className="boldText">
                  Work Location
                </Text>{" "}
                As an employee of the organization, you should adhere to the
                working hours, 10.00am to 7.00 pm, from Monday to Saturday,
                Sunday will be a holiday.
              </Text>
            </HStack>
            <HStack className="text">
              <Text mb={"10px"}>
                <Text as="span" className="boldText">
                  Probation Period:
                </Text>{" "}
                3 months from date of joining. During this time the company will
                check your performance. If you are found medically unfit or not
                up to the company standard of acceptance the return air ticket
                expenses will be borne by you
              </Text>
            </HStack>
            <HStack className="text">
              <Text mb={"10px"}>
                <Text as="span" className="boldText">
                  Resignation:
                </Text>{" "}
                One months’ notice period is required if you resign before
                completing the contract period. Training expenses of 7500 AED
                will be borne by you if you don’t give notice period.
              </Text>
            </HStack>
            <HStack className="text">
              <Text mb={"20px"}>
                <Text as="span" className="boldText">
                  Termination:
                </Text>{" "}
                If you are found dishonest your employment will be terminated
                for fraud. Any fines imposed on you for such breach of conduct
                will be deducted from your salary or final settlement. The
                company will terminate your service without giving any notice
                irrespective of whether the contract period is completed or not.
                In this case, all training expenses and return air ticket will
                be borne by you.
              </Text>
            </HStack>
            <Text className="text" mb={"10px"}>
              This offer and your employment are conditional upon the company
              receiving satisfactory background check results. Please note if
              the company is not satisfied with the background verification
              report, the company reserves the right to withdraw or delay this
              offer of employment. So kindly provide 2 references for background
              verification.
            </Text>
            <Text className="boldText" mb={"10px"}>
              Mandatory Documents to be emailed before or produced on the day of
              joining: (1 set of Photocopies as well as Originals)
            </Text>
            <List styleType="disc" pl={6}>
              <ListItem className="text">
                Highest Education Certificate and Marksheets (Attested)
              </ListItem>
              <ListItem className="text">Updated CV</ListItem>
              <ListItem className="text">Emirates ID</ListItem>
              <ListItem className="text">Passport Copy</ListItem>
              <ListItem className="text">Visa Copy</ListItem>
              <ListItem className="text">
                2 Passport Size Photographs (with White Background)
              </ListItem>
              <ListItem className="text">
                Alternate/Emergency Contact Number
              </ListItem>
              <ListItem className="text">
                6 Months’ Salary Slips/Bank Statements
              </ListItem>
              <ListItem className="text">
                Relieving Letter/Resignation Acceptance
              </ListItem>
            </List>
            <Text className="text" mb={"20px"}>
              At the time of joining, you are requested to submit the hard
              copies of the above documents as well, and recent passport size
              photographs.
            </Text>
            <Text className="text" mb={"10px"}>
              In the event for any reason whatsoever you do not obtain a work
              permit from the relevant government departments within two months
              this offer letter shall expire and the employment be considered
              terminated unless agreed otherwise in writing.
            </Text>
            <Text className="text" mb={"10px"}>
              We look forward to a mutually rewarding partnership.
            </Text>
            <Text className="text" mb={"50px"}>
              You will be eligible for the above-said scheme only if you have
              performed according to the unified incentive and reimbursement
              structure as apprised by the Company from time to time. The
              incentives and reimbursement are discretionary and may vary from
              time to time and are only to facilitate and motivate the employee.
              The Company reserves the right to alter/vary the terms and
              condition of this scheme or may completely revoke the scheme, at
              any time without any notice.
            </Text>

            <CustomText fontSize="16px" fontWeight="800">
              I confirm having understood all terms & conditions.
            </CustomText>
            <HStack height={"70px"}>
              {signature && (
                <Image
                  width={"200px"}
                  height={"50px"}
                  objectFit="fill"
                  alt="No Sign upload"
                  src={signature}
                  mt={"20px"}
                />
              )}
            </HStack>
            <HStack
              mb={"20px"}
              justifyContent="space-between"
              alignItems="center"
              w="full"
            >
              <Text>Candidate’s Signature</Text>
              <VStack>
                <Text className="text">Managing Partner</Text>
                <Text className="boldText">Mr. Farhan Safi</Text>
              </VStack>
            </HStack>
          </VStack>
          {/* <Image src={footer} w="full"/> */}
        </Box>
        <CustomText fontSize="14px" fontWeight="600" px={"50px"}>
          REVO REALITY REAL ESTATE BROKERS LLS
        </CustomText>
        <Text className="text" px={"50px"} mb={1}>
          1102, Sidra Tower, AI Sufouh, Sheikh Zaid Road, Dubai
        </Text>
        <Image src={footer} width={"100%"} />
      </Box>
    </Box>
  );
};
