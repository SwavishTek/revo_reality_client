import React from 'react'
import { Thead, Tr, Th } from '@chakra-ui/react';
const LetterHeader = ({ columns })  => {
  return (
    <Thead>
      <Tr>
        {columns.map((column, index) => (
          <Th key={index} fontSize="md" color="#202020">
            {column}
          </Th>
        ))}
      </Tr>
    </Thead>
  )
}

export default LetterHeader