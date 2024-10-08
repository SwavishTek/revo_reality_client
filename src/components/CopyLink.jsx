import { Box, Image, Text, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import { svg } from '../assets/svg.js'

const CopyLink = ({link}) => {
    const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };
    return (
        <Box style={{display:'flex'}}>
        <Text>{link}</Text>
        <Tooltip label={copied ? 'Copied!' : 'Copy link'}>

        <Image alt='' src={svg.CopyUser} cursor={"pointer"} onClick={copyToClipboard} ml={2}/>
        </Tooltip> 
        </Box>
    )
}

export default CopyLink