import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useMediaQuery,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMatakuliah } from '../redux/matakuliahSlice';
import {
  createMatakuliah,
  deleteMatakuliah,
  createCatatan,
  deleteCatatan,
  fetchCatatanByMatakuliah,
} from '../services/api';

function AdminPage() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { matakuliah } = useSelector((state) => state.matakuliah);
  const [newMatakuliah, setNewMatakuliah] = useState('');
  const [selectedMatakuliah, setSelectedMatakuliah] = useState('');
  const [newBab, setNewBab] = useState({ bab: '', konten: null });
  const [catatanList, setCatatanList] = useState([]);
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  useEffect(() => {
    dispatch(fetchMatakuliah());
  }, [dispatch]);

  useEffect(() => {
    if (selectedMatakuliah) {
      fetchCatatanByMatakuliah(selectedMatakuliah)
        .then(data => setCatatanList(data))
        .catch(error => console.error('Error fetching catatan:', error));
    }
  }, [selectedMatakuliah]);

  const handleCreateMatakuliah = async () => {
    try {
      await createMatakuliah(newMatakuliah);
      dispatch(fetchMatakuliah());
      setNewMatakuliah('');
      toast({
        title: 'Matakuliah created',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error creating matakuliah',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteMatakuliah = async (id) => {
    try {
      await deleteMatakuliah(id);
      dispatch(fetchMatakuliah());
      if (selectedMatakuliah === id) {
        setSelectedMatakuliah('');
        setCatatanList([]);
      }
      toast({
        title: 'Matakuliah deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting matakuliah',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCreateBab = async () => {
    try {
      const formData = new FormData();
      formData.append('matakuliahId', selectedMatakuliah);
      formData.append('bab', newBab.bab);
      formData.append('konten', newBab.konten);

      await createCatatan(formData);
      setNewBab({ bab: '', konten: null });
      const updatedCatatan = await fetchCatatanByMatakuliah(selectedMatakuliah);
      setCatatanList(updatedCatatan);
      toast({
        title: 'Bab created',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error creating bab',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteBab = async (catatanId) => {
    try {
      await deleteCatatan(selectedMatakuliah, catatanId);
      const updatedCatatan = await fetchCatatanByMatakuliah(selectedMatakuliah);
      setCatatanList(updatedCatatan);
      toast({
        title: 'Bab deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting bab',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth={isMobile ? "100%" : "container.xl"} margin="auto" py={10} px={4}>
      <VStack spacing={8} align="stretch">
        <Heading fontSize={isMobile ? "2xl" : "4xl"}>Admin Dashboard</Heading>

        <Box>
          <Heading size={isMobile ? "md" : "lg"} mb={4}>Add New Matakuliah</Heading>
          <HStack>
            <Input
              placeholder="Matakuliah Name"
              value={newMatakuliah}
              onChange={(e) => setNewMatakuliah(e.target.value)}
              size={isMobile ? "sm" : "md"}
            />
            <Button onClick={handleCreateMatakuliah} size={isMobile ? "sm" : "md"}>Add</Button>
          </HStack>
        </Box>

        <Box>
          <Heading size={isMobile ? "md" : "lg"} mb={4}>Matakuliah List</Heading>
          <Table variant="simple" size={isMobile ? "sm" : "md"}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {matakuliah.map((mk) => (
                <Tr key={mk.id}>
                  <Td>{mk.matakuliah}</Td>
                  <Td>
                    <Button onClick={() => handleDeleteMatakuliah(mk.id)} colorScheme="red" size={isMobile ? "xs" : "sm"}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Box>
          <Heading size={isMobile ? "md" : "lg"} mb={4}>Manage Bab</Heading>
          <FormControl mb={4}>
            <FormLabel>Select Matakuliah</FormLabel>
            <Select
              value={selectedMatakuliah}
              onChange={(e) => setSelectedMatakuliah(e.target.value)}
              size={isMobile ? "sm" : "md"}
            >
              <option value="">Select a matakuliah</option>
              {matakuliah.map((mk) => (
                <option key={mk.id} value={mk.id}>
                  {mk.matakuliah}
                </option>
              ))}
            </Select>
          </FormControl>

          {selectedMatakuliah && (
            <>
              <Heading size={isMobile ? "sm" : "md"} mb={2}>Add New Bab</Heading>
              <VStack spacing={4} mb={4}>
                <FormControl>
                  <FormLabel>Bab Number</FormLabel>
                  <Input
                    value={newBab.bab}
                    onChange={(e) => setNewBab({ ...newBab, bab: e.target.value })}
                    size={isMobile ? "sm" : "md"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Content (PDF or Image)</FormLabel>
                  <Input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) => setNewBab({ ...newBab, konten: e.target.files[0] })}
                    size={isMobile ? "sm" : "md"}
                  />
                </FormControl>
                <Button onClick={handleCreateBab} isDisabled={!newBab.bab || !newBab.konten} size={isMobile ? "sm" : "md"}>
                  Add Bab
                </Button>
              </VStack>

              <Heading size={isMobile ? "sm" : "md"} mb={2}>Existing Bab</Heading>
              <Table variant="simple" size={isMobile ? "sm" : "md"}>
                <Thead>
                  <Tr>
                    <Th>Bab</Th>
                    <Th>Content</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {catatanList.map((catatan) => (
                    <Tr key={catatan.id}>
                      <Td>Bab {catatan.bab}</Td>
                      <Td>
                        <a href={catatan.konten} target="_blank" rel="noopener noreferrer">
                          View Content
                        </a>
                      </Td>
                      <Td>
                        <Button onClick={() => handleDeleteBab(catatan.id)} colorScheme="red" size={isMobile ? "xs" : "sm"}>
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </>
          )}
        </Box>
      </VStack>
    </Box>
  );
}

export default AdminPage;