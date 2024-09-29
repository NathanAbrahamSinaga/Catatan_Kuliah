import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DaftarMatakuliahPage from './pages/DaftarMatakuliahPage'
import BabMatakuliahPage from './pages/BabMatakuliahPage'
import KontenBabPage from './pages/KontenBabPage'
import AdminPage from './pages/AdminPage'
import Header from './components/Header'
import Footer from './components/Footer'
import { Box } from '@chakra-ui/react'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex="1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/matakuliah" element={<DaftarMatakuliahPage />} />
          <Route path="/matakuliah/:id" element={<BabMatakuliahPage />} />
          <Route path="/matakuliah/:id/:bab" element={<KontenBabPage />} />
          <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default App