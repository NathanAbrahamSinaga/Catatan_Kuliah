import axios from 'axios';

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const fetchMatakuliahList = async () => {
  try {
    const response = await api.get('/matakuliah');
    return response.data;
  } catch (error) {
    console.error('Error fetching matakuliah list:', error);
    throw error;
  }
};

export const fetchCatatanByMatakuliah = async (matakuliahId) => {
  try {
    const response = await api.get(`/catatan/${matakuliahId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching catatan:', error);
    throw error;
  }
};

export const createMatakuliah = async (matakuliah) => {
  try {
    const response = await api.post('/matakuliah', { matakuliah });
    return response.data;
  } catch (error) {
    console.error('Error creating matakuliah:', error);
    throw error;
  }
};

export const deleteMatakuliah = async (id) => {
  try {
    const response = await api.delete(`/matakuliah/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting matakuliah:', error);
    throw error;
  }
};

export const createCatatan = async (formData) => {
  try {
    const response = await api.post('/catatan', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating catatan:', error);
    throw error;
  }
};


export const deleteCatatan = async (matakuliahId, catatanId) => {
  try {
    const response = await api.delete(`/catatan/${matakuliahId}/${catatanId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting catatan:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error;
  }
};

export default api;