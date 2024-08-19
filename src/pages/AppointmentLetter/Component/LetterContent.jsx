import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { CustomText } from '../../../myComponent/CustomText'
import { svg } from '../../../assets/svg'
import './letterContent.css';
import text1 from '../svg/text1.svg'
import text2 from '../svg/text2.svg'
import text3 from '../svg/text3.svg'
import text4 from '../svg/text4.svg'

export const LetterContent = ({
    pdfRef,
    signature
}) => {
    return (
        <Box
            maxWidth={'800px'}
            minWidth={'600px'}
            bg={'white'}

        >
            <Box ref={pdfRef} padding={'50px'} >
                <HStack
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    mb={'20px'}
                >
                    <Image src={svg.RevoIconOfferLetter} />
                    <Box gap={'10px'}>
                        <CustomText
                            fontSize='18px'
                            fontWeight='400'
                        >+971 4 886 6265
                        </CustomText>
                        <CustomText
                            fontSize='18px'
                            fontWeight='400'
                        >connect@revorealty.ae
                        </CustomText>
                        <CustomText
                            fontSize='18px'
                            fontWeight='400'
                        >revorealty.ae
                        </CustomText>
                    </Box>
                </HStack>
                <CustomText
                    textAlign='center'
                    fontSize='18px'
                    fontWeight='700'
                    marginBottom={'20px'}
                >APPOINTMENT LETTER
                </CustomText>

                <HStack>
                    <Text className='boldText' mb={'10px'}>Date of Issue:</Text>
                    <Text className='text' mb={'10px'}>10-12-1996</Text>
                </HStack>
                <Text className='boldText' mb={'10px'}>soudChuttu@gmail.com</Text>
                <HStack
                    mb={'20px'}
                >
                    <Text className='text' mb={'10px'}>Dear</Text>
                    <Text className='boldText' mb={'10px'}>Soud Chutiye</Text>
                </HStack>

                <Text className='boldText' mb={'20px'}>
                    Congratulations! We are very excited to have you onboard!
                </Text>

                <VStack alignItems={'flex-start'} mb={'20px'}>
                    <Text className='text' mb={'40px'}>
                        We are pleased to inform you that, based on your application and subsequent interviews, we would like to offer you the position of Content Creator with our company. We believe that your skills, experience, and qualifications make you a strong candidate for the role and we are excited to welcome you to our team.
                    </Text>
                    <Text className='text' mb={'20px'}>
                        The remuneration for this position will be mentioned in Annexure A. Additionally, as a valued member of our team.
                    </Text>
                    <Image
                        src={text1}
                        width={'100%'}
                        mb={'60px'}
                    />
                    <Image
                        src={text2}
                        width={'100%'}
                        mb={'20px'}
                    />
                    <Image
                        src={text3}
                        width={'100%'}
                        mb={'20px'}
                    />
                    <Image
                        src={text4}
                        width={'100%'}
                        mb={'50px'}
                    />

                    <CustomText
                        fontSize='16px'
                        fontWeight='800'
                    >
                        I confirm having understood all terms & conditions.
                    </CustomText>
                    <HStack
                        height={'70px'}
                    >
                        {signature && (
                            <Image
                                width={'200px'}
                                height={'50px'}
                                objectFit="fill"
                                alt="No Sign upload"
                                src={signature}
                                mt={'20px'}
                            />
                        )}
                    </HStack>
                    <Text>
                        Candidate’s Signature
                    </Text>
                </VStack>

            </Box>
        </Box>
    )
}
