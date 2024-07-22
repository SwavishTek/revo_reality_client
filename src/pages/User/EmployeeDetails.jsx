import { Box, Button, Card, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import BackButton from '../../components/BackButton'
import CopyedUserIcon from '../../assets/Component 2.svg'
import EditUserIcon from '../../assets/Component 2 (1).svg'
import BlockUserIcon from '../../assets/Vector.svg'
import DeleteUserIcon from '../../assets/Component 2 (2).svg'
import Title from "../../components/Title";
import CustomGridItem from '../../components/CustomGridItem';
import CopyLink from '../../components/CopyLink';

const EmployeeDetails = () => {
    return (
        <Box>
            <BackButton title={"Employee Detail"}>
                <Box display={"flex"} alignItems={"center"} gap={2}>
                    <Button bg="gray.500" color={"white"} borderRadius={100} height={'50px'} width={'50px'}>
                        <img src={CopyedUserIcon} alt='' />
                    </Button>
                    <Button bg="brand.success" color={"white"} borderRadius={100} height={'50px'} width={'50px'}>
                    <img src={EditUserIcon} alt='' />
                    </Button>
                    <Button bg="red.800" color={"white"} borderRadius={100} height={'50px'} width={'50px'}>
                    <img src={BlockUserIcon} alt='' />
                    </Button>
                    <Button bg="red.600" color={"white"} borderRadius={100} height={'50px'} width={'50px'}>
                        <img src={DeleteUserIcon} alt='' />
                    </Button>
                </Box>
            </BackButton>
            <Card p={"2rem"} mt={6}>
                <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
                    <GridItem colSpan={5} my={4}>
                        <Title title="EMPLOYEE INFORMATION" />
                    </GridItem>
                    <CustomGridItem
                        title={"Employee Name"}
                        value={"Employee_01"}
                    />
                    <CustomGridItem title={"Employee ID "} value={"Employee_01"} />
                    <CustomGridItem title={"Email Address"} value={"merchant@gmail.com"} />
                    <CustomGridItem title={"Mobile Number "} value={"+44 7300912119"} />
                    <CustomGridItem title={"Role"} value={"Role_01"} />
                    <CustomGridItem title={"Department"} value={"Department_01"} />
                    <CustomGridItem title={"Package"} value={"Department_01"} />
                    <GridItem colSpan={5} my={4}>
                        <Title title="ADDRESS INFORMATION" />
                    </GridItem>
                    <CustomGridItem title={"House/Flat Address"} value={"1 Charter Way"} />
                    <CustomGridItem title={"City"} value={"Liskeard"} />
                    <CustomGridItem title={"County"} value={"Devon"} />
                    <CustomGridItem
                        title={"Country"}
                        value={"United Kingdom"}
                    />
                    <CustomGridItem title={"Post Code"} value={"Pl24 4HX"} />
                    <GridItem colSpan={5} my={4}>
                        <Title title="BANK INFORMATION" />
                    </GridItem>
                    <CustomGridItem title={"Name of Bank"} value={"Lloyds"} />
                    <CustomGridItem title={"Name on Bank Ac."} value={"Merchant01"} />
                    <CustomGridItem title={"Account No."} value={"12345678"} />
                    <CustomGridItem title={"Sort Code"} value={"01-02-03"} />
                    <GridItem colSpan={5} my={4}>
                        <Title title="SOCIAL MEDIA LINKS" />
                    </GridItem>
                    <CustomGridItem title={"Facebook"} value={<CopyLink link={"https://www.facebook.com/sharer/sharer.php?u=REVO%20Reality"} />} />
                    <CustomGridItem title={"Instagram"} value={<CopyLink link={"https://www.instagram.com/sharer/sharer.php?u=REVO%20Reality"} />} />
                    <CustomGridItem title={"YouTube"} value={<CopyLink link={"https://www.youtube.com/sharer/sharer.php?u=REVO%20Reality"} />} />
                    <CustomGridItem title={"TikTok"} value={<CopyLink link={"https://www.tiktok.com/sharer/sharer.php?u=REVO%20Reality"} />} />
                    <GridItem colSpan={5} my={4}>
                        <Title title="MESSAGING CHANNELS" />
                    </GridItem>
                    <CustomGridItem title={"WhatsApp"} value={<CopyLink link={"https://www.facebook.com/sharer/sharer.php?u=REVO%20Reality"} />} />
                    <CustomGridItem title={"Telegram"} value={<CopyLink link={"https://www.instagram.com/sharer/sharer.php?u=REVO%20Reality"} />} />
                    <GridItem colSpan={5} my={4}>
                        <Title title="ATTACHMENTS" />
                    </GridItem>
                    <CustomGridItem title={"Offer Letter"} value={""} />
                    <CustomGridItem title={"Address Proof"} value={""} />
                    <CustomGridItem title={"Bank Statements"} value={""} />
                </Grid>
            </Card>
        </Box>
    )
}

export default EmployeeDetails