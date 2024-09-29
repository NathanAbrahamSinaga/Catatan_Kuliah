import React, { useEffect, useState } from 'react'
import { Box, Heading, VStack, useMediaQuery } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BabCard from '../components/BabCard'
import { fetchCatatanByMatakuliah } from '../services/api'

function BabMatakuliahPage() {
  const { id } = useParams()
  const [catatan, setCatatan] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const matakuliah = useSelector((state) =>
    state.matakuliah.matakuliah.find((mk) => mk.id === id)
  )
  const [isMobile] = useMediaQuery("(max-width: 480px)")

  useEffect(() => {
    const loadCatatan = async () => {
      try {
        const data = await fetchCatatanByMatakuliah(id)
        setCatatan(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    loadCatatan()
  }, [id])

  if (loading) {
    return <Box p={4}>Loading...</Box>
  }

  if (error) {
    return <Box p={4}>Error: {error}</Box>
  }

  return (
    <Box maxWidth={isMobile ? "100%" : "container.lg"} margin="auto" py={10} px={4}>
      <VStack spacing={8} align="stretch">
        <Heading fontSize={isMobile ? "2xl" : "4xl"}>{matakuliah ? matakuliah.matakuliah : 'Matakuliah'}</Heading>
        <Heading size={isMobile ? "md" : "lg"}>Daftar Bab</Heading>
        {catatan.map((cat) => (
          <BabCard key={cat.id} idMatakuliah={id} bab={cat.bab} />
        ))}
      </VStack>
    </Box>
  )
}

export default BabMatakuliahPage