import React from 'react'
import { Box, Text, Link, Icon } from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <Box bg="gray.100" py={4} textAlign="center">
      <Text>&copy;2024 Catatan Kuliah. All rights reserved.</Text>
      <Text>Created by: Cakra Nusa Atmaja</Text>
      <Link
        href="https://github.com/NathanAbrahamSinaga/Catatan_Kuliah"
        isExternal
        aria-label="GitHub repository"
      >
        <Icon as={FaGithub} w={6} h={6} />
      </Link>
    </Box>
  )
}

export default Footer