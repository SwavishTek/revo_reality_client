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

export default function AppointmentLetter() {

    const pdfRef = useRef();
    const [signature, setSignature] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // const generatePDF = () => {
    //     html2canvas(pdfRef.current).then((canvas) => {
    //         const imgData = canvas.toDataURL("image/png");

    //         // Initialize jsPDF
    //         const pdf = new jsPDF();

    //         // Get the canvas width and height
    //         const imgWidth = canvas.width;
    //         const imgHeight = canvas.height;

    //         // Calculate the scaling factor to fit the content within the page
    //         const pageWidth = pdf.internal.pageSize.getWidth();
    //         const pageHeight = pdf.internal.pageSize.getHeight();
    //         const scaleFactor = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

    //         // Set the dimensions with scaling
    //         const scaledWidth = imgWidth * scaleFactor;
    //         const scaledHeight = imgHeight * scaleFactor;

    //         // Add the image to the PDF with scaling
    //         pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);
    //         pdf.save("document.pdf");
    //     });
    // };
    // const generatePDF = () => {
    //     setIsLoading(true);
    //     html2canvas(pdfRef.current).then(async (canvas) => {
    //         const imgData = canvas.toDataURL("image/png");

    //         // Set the desired PDF width in pixels (800px)
    //         const pdfWidthPx = 800;
    //         const pdfWidthPt = (pdfWidthPx * 72) / 96; // Convert pixels to points (assuming 96dpi)

    //         // Calculate the height in points, maintaining the aspect ratio
    //         const aspectRatio = canvas.height / canvas.width;
    //         const pdfHeightPt = pdfWidthPt * aspectRatio;

    //         // Initialize jsPDF with the specified width and calculated height
    //         const pdf = new jsPDF({
    //             orientation: 'portrait',
    //             unit: 'pt', // Points
    //             format: [pdfWidthPt, pdfHeightPt],
    //         });

    //         // Scale the canvas to fit within the specified PDF dimensions
    //         const scaleFactor = pdfWidthPt / canvas.width;
    //         const scaledWidth = canvas.width * scaleFactor;
    //         const scaledHeight = canvas.height * scaleFactor;

    //         // Add the scaled image to the PDF
    //         pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);
    //         pdf.save("document.pdf");
    //         console.log('pdf', pdf)
    //         // API_AXIOS.post
    //         try {
    //             const formData = new FormData();
    //             formData.append("files", pdf)

    //             const { data } = await API_AXIOS.post('upload', formData, {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                 },
    //             });
    //             console.log('data', data)
    //             return data;
    //         } catch (error) {
    //             showError(error?.response?.data?.message);
    //             console.log('first error', error)
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     });
    // };
    // const generatePDF = () => {
    //     setIsLoading(true);
    //     html2canvas(pdfRef.current).then(async (canvas) => {
    //         const imgData = canvas.toDataURL("image/png");

    //         // Set the desired PDF width in pixels (800px)
    //         const pdfWidthPx = 800;
    //         const pdfWidthPt = (pdfWidthPx * 72) / 96; // Convert pixels to points (assuming 96dpi)

    //         // Calculate the height in points, maintaining the aspect ratio
    //         const aspectRatio = canvas.height / canvas.width;
    //         const pdfHeightPt = pdfWidthPt * aspectRatio;

    //         // Initialize jsPDF with the specified width and calculated height
    //         const pdf = new jsPDF({
    //             orientation: 'portrait',
    //             unit: 'pt', // Points
    //             format: [pdfWidthPt, pdfHeightPt],
    //         });

    //         // Scale the canvas to fit within the specified PDF dimensions
    //         const scaleFactor = pdfWidthPt / canvas.width;
    //         const scaledWidth = canvas.width * scaleFactor;
    //         const scaledHeight = canvas.height * scaleFactor;

    //         // Add the scaled image to the PDF
    //         pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);

    //         // Save the PDF as a Blob object
    //         const pdfBlob = pdf.output('blob'); // Get the PDF as a Blob

    //         try {
    //             // Prepare FormData with the Blob
    //             const formData = new FormData();
    //             formData.append("file", pdfBlob, "document.pdf"); // Append the PDF Blob to FormData

    //             const { data } = await API_AXIOS.post('upload', formData, {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                 },
    //             });

    //             if (data && data.length > 0) {
    //                 console.log('Upload successful', data);
    //             } else {
    //                 console.log('Upload returned an empty response');
    //             }
    //         } catch (error) {
    //             showError(error?.response?.data?.message || 'Upload failed');
    //             console.error('Upload error', error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     });
    // };
    const generatePDF = () => {
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
            pdf.save("document.pdf");
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

                if (data && data.length > 0) {
                    console.log('Upload successful', data);
                } else {
                    console.log('Upload returned an empty response');
                }
            } catch (error) {
                showError(error?.response?.data?.message || 'Upload failed');
                console.error('Upload error', error);
            } finally {
                setIsLoading(false);
            }
        });
    };

    return (
        <Box padding={'20px'} bg={'#F9F9F9'} >
            <HStack>
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
                />

            </VStack>
            <Button
                onClick={generatePDF}
                mt={'20px'}
                colorScheme="blue"
                isLoading={isLoading}
            >
                Generate PDF
            </Button>
            <CustomSignature
                onSave={(img) => {
                    console.log('Saved image:', img);
                    setSignature(img);
                }}
            />
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