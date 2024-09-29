import React, { useState } from 'react'
import { Box, Heading, VStack, Input, Button, useToast, useMediaQuery } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../redux/authSlice'
import { loginUser } from '../services/auth'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const [isMobile] = useMediaQuery("(max-width: 480px)")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = await loginUser(username, password)
      dispatch(login(token))
      navigate('/admin')
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box maxWidth={isMobile ? "100%" : "container.sm"} margin="auto" py={10} px={4}>
      <VStack spacing={8}>
        <Heading fontSize={isMobile ? "2xl" : "4xl"}>Admin Login</Heading>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size={isMobile ? "md" : "lg"}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size={isMobile ? "md" : "lg"}
            />
            <Button type="submit" colorScheme="blue" width="100%" size={isMobile ? "md" : "lg"}>
              Login
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  )
}

export default LoginPage