import { Box, Button, HStack, Image, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react';
import { CustomText } from '../../myComponent/CustomText'
import { svg } from '../../assets/svg'
import { font } from '../../consts/font'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CustomBtn } from '../../myComponent/CustomBtn';
import CustomSignature from '../../myComponent/CustomSignature';
import { LetterContent } from './Component/LetterContent';
import axios from 'axios';
import { API_AXIOS } from '../../http/interceptor';
import { showError } from '../../utils/toastHelpers';
import { useLocation, useNavigate } from 'react-router-dom';
import { color } from '../../consts/color';
import { useGetOfferLetterDetailPublic } from './useOfferLetterQuery';
import { submitOfferLetterWithSign } from '../../useFunctions/offerLetter/offerLetter';

export default function AppointmentLetter() {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    // Extract the orgId and letterId
    const orgId = urlParams.get('orgId');
    const letterId = urlParams.get('letterId');
    const pdfRef = useRef();
    const [signature, setSignature] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [enableFinalBtn, setEnableFinalBtn] = useState(false);
    const { state: useInfo } = useLocation();

    const { data } = useGetOfferLetterDetailPublic({
        letterId: letterId,
        orgId: orgId
    })
    console.log('dataApointment Letter', data)
    const uploadPdf = () => {
        setIsLoading(true);
        html2canvas(pdfRef.current, { scale: 2 }).then(async (canvas) => {
            // Convert canvas to a JPEG image with reduced quality
            const imgData = canvas.toDataURL("image/jpeg", 0.7); // 0.7 reduces quality to 70%

            // Set the desired PDF width in pixels (800px)
            const pdfWidthPx = 800;
            const pdfWidthPt = (pdfWidthPx * 72) / 96; // Convert pixels to points (assuming 96dpi)

            // Calculate the height in points, maintaining the aspect ratio
            const aspectRatio = canvas.height / canvas.width;
            const pdfHeightPt = pdfWidthPt * aspectRatio;

            // Initialize jsPDF with the specified width and calculated height
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt', // Points
                format: [pdfWidthPt, pdfHeightPt],
            });

            // Scale the canvas to fit within the specified PDF dimensions
            const scaleFactor = pdfWidthPt / canvas.width;
            const scaledWidth = canvas.width * scaleFactor;
            const scaledHeight = canvas.height * scaleFactor;

            // Add the scaled image to the PDF
            pdf.addImage(imgData, 'JPEG', 0, 0, scaledWidth, scaledHeight);
            // pdf.save("document.pdf");
            // Save the PDF as a Blob object
            const pdfBlob = pdf.output('blob'); // Get the PDF as a Blob

            try {
                // Prepare FormData with the Blob
                const formData = new FormData();
                formData.append("files", pdfBlob, "document.pdf"); // Append the PDF Blob to FormData

                const { data } = await API_AXIOS.post('upload', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log('setPdfUrl', data?.data?.[0])
                setPdfUrl(data?.data?.[0])
                setEnableFinalBtn(true)
            } catch (error) {
                showError(error?.response?.data?.message || 'Upload failed');
                console.error('Upload error', error);
            } finally {
                setIsLoading(false);
            }
        });
    };

    const finalSubmit = async () => {
        try {
            setIsLoading2(true);
            await submitOfferLetterWithSign({
                letterId,
                orgId,
                pdfUrl
            })
        }
        catch (error) {
            // showError(error?.response?.data?.message || 'Error in submitting the offer letter')
            console.error('Error in submitting the offer letter', error)
        }
        finally {
            setIsLoading2(false);
        }

    }

    return (
        <Box padding={'20px'} bg={'#F9F9F9'} >
            <HStack mb={'20px'}
                width={'fit-content'}
                onClick={() => navigate(-1)}
                cursor={'pointer'}
            >
                <Image
                    width={25}
                    height={25}
                    src={svg.backIcon}
                    alt="Back Icon"
                />
                <CustomText
                    fontSize={25}
                    fontWeight='500'
                    fontFamily={font.Oswald}
                >
                    Back
                </CustomText>
            </HStack>
            <VStack
                width={'100%'}
            >
                <LetterContent
                    pdfRef={pdfRef}
                    signature={signature}
                    userInfo={useInfo}
                />

            </VStack>
            <HStack
                alignItems={'center'}
                justifyContent={'flex-start'}
                margin={10}
            >

                <CustomSignature
                    btnTitle={`${!signature ? 'Add' : 'Update'} Signature`}
                    onSave={(img) => {
                        console.log('Saved image:', img);
                        setSignature(img);
                    }}
                />
                <CustomBtn
                    title={`Save Signature`}
                    isLoading={isLoading}
                    bgColor={color.secondaryBtn}
                    isDisabled={!signature}
                    onClick={uploadPdf}
                />
                <CustomBtn
                    title={'Final Submit'}
                    isLoading={isLoading2}
                    bgColor={color.secondaryBtn}
                    isDisabled={!enableFinalBtn}
                    onClick={finalSubmit}
                />
            </HStack>
        </Box>
    )
}

////
// {signature && (
//     <Image
//         width={'200px'}
//         height={'50px'}
//         objectFit="fill"
//         alt="No Sign upload"
//         src={signature}
//         mt={'20px'}
//     />
// )}

{/* <CustomSignature
onSave={(img) => {
    console.log('Saved image:', img);
    setSignature(img);
}}
/> */}
