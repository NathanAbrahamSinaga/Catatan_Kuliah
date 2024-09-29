import React from 'react'
import { Box, Heading, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function BabCard({ idMatakuliah, bab }) {
  return (
    <Box borderWidth={1} borderRadius="lg" p={4} mb={4}>
      <Heading size="md" mb={4}>
        Bab {bab}
      </Heading>
      <Button
        as={RouterLink}
        to={`/matakuliah/${idMatakuliah}/${bab}`}
        colorScheme="blue"
      >
        Lihat Konten
      </Button>
    </Box>
  )
}

export default BabCard