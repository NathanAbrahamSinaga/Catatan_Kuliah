import React, { useEffect } from 'react'
import { Box, Heading, VStack, useMediaQuery } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMatakuliah } from '../redux/matakuliahSlice'
import MatakuliahCard from '../components/MatakuliahCard'

function DaftarMatakuliahPage() {
  const dispatch = useDispatch()
  const { matakuliah, status, error } = useSelector((state) => state.matakuliah)
  const [isMobile] = useMediaQuery("(max-width: 480px)")

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMatakuliah())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return <Box p={4}>Loading...</Box>
  }

  if (status === 'failed') {
    return <Box p={4}>Error: {error}</Box>
  }

  return (
    <Box maxWidth={isMobile ? "100%" : "container.lg"} margin="auto" py={10} px={4}>
      <VStack spacing={8} align="stretch">
        <Heading fontSize={isMobile ? "2xl" : "4xl"}>Daftar Matakuliah</Heading>
        {matakuliah.map((mk) => (
          <MatakuliahCard key={mk.id} {...mk} />
        ))}
      </VStack>
    </Box>
  )
}

export default DaftarMatakuliahPage