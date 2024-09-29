import React from 'react'
import { Box, Heading, VStack, Button, useMediaQuery } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function HomePage() {
  const [isMobile] = useMediaQuery("(max-width: 480px)")

  return (
    <Box maxWidth={isMobile ? "100%" : "container.md"} margin="auto" py={5} px={4}>
      <Heading textAlign="center" mb={10} fontSize={isMobile ? "2xl" : "4xl"}>
        Selamat Datang di Catatan Kuliah
      </Heading>

      <Box height={isMobile ? "calc(100vh - 300px)" : "calc(100vh - 200px)"} display="flex" justifyContent="center" alignItems="center">
        <VStack spacing={6}>
          <Button as={RouterLink} to="/matakuliah" colorScheme="blue" size={isMobile ? "md" : "lg"} width={isMobile ? "full" : "auto"}>
            Buka Catatan
          </Button>
          <Button as={RouterLink} to="/login" colorScheme="green" size={isMobile ? "md" : "lg"} width={isMobile ? "full" : "auto"}>
            Login
          </Button>
        </VStack>
      </Box>
    </Box>
  )
}

export default HomePage