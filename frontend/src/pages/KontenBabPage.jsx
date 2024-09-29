import React, { useEffect, useState } from 'react'
import { Box, Heading, VStack, Image, Link, Text, useMediaQuery } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { fetchCatatanByMatakuliah } from '../services/api'

function KontenBabPage() {
  const { id, bab } = useParams()
  const [catatan, setCatatan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMobile] = useMediaQuery("(max-width: 480px)")

  useEffect(() => {
    const loadCatatan = async () => {
      try {
        const data = await fetchCatatanByMatakuliah(id)
        const selectedCatatan = data.find((cat) => cat.bab === bab)
        setCatatan(selectedCatatan)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    loadCatatan()
  }, [id, bab])

  if (loading) {
    return <Box p={4}>Loading...</Box>
  }

  if (error) {
    return <Box p={4}>Error: {error}</Box>
  }

  if (!catatan) {
    return <Box p={4}>Catatan not found</Box>
  }

  const isImage = catatan.konten.match(/\.(jpeg|jpg|gif|png)$/) != null

  return (
    <Box maxWidth={isMobile ? "100%" : "container.lg"} margin="auto" py={10} px={4}>
      <VStack spacing={8} align="stretch">
        <Heading fontSize={isMobile ? "2xl" : "4xl"}>Bab {bab}</Heading>
        {isImage ? (
          <Image src={catatan.konten} alt={`Konten Bab ${bab}`} maxWidth="100%" />
        ) : (
          <Link href={catatan.konten} isExternal>
            <Text color="blue.500" fontSize={isMobile ? "md" : "lg"}>Download Dokumen</Text>
          </Link>
        )}
      </VStack>
    </Box>
  )
}

export default KontenBabPage