import React from 'react'
import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function MatakuliahCard({ id, matakuliah }) {
  return (
    <Box borderWidth={1} borderRadius="lg" p={4} mb={4}>
      <Heading size="md" mb={2}>
        {matakuliah}
      </Heading>
      <Button as={RouterLink} to={`/matakuliah/${id}`} colorScheme="blue">
        Lihat Bab
      </Button>
    </Box>
  )
}

export default MatakuliahCard