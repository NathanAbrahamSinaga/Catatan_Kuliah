import React from 'react'
import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import { logoutUser } from '../services/auth'

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    logoutUser()
  }

  return (
    <Box bg="brand.500" px={4} py={3}>
      <Flex alignItems="center">
        <Heading size="md" color="white" as={RouterLink} to="/">
          Catatan Kuliah
        </Heading>
        <Spacer />
        {isAuthenticated && (
          <>
            <Button as={RouterLink} to="/admin" colorScheme="whiteAlpha" mr={2}>
              Admin Dashboard
            </Button>
            <Button colorScheme="whiteAlpha" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Flex>
    </Box>
  )
}

export default Header
