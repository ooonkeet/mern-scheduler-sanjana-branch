import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1/university`;

export const universityService = {
  getAllUniversities: async () => {
    const response = await axios.get(`${BASE_URL}/getUni`);
    return response.data;
  },

  getUniversityById: async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  createUniversity: async (data) => {
    const response = await axios.post(`${BASE_URL}/createUni`, data);
    return response.data;
  },

  updateUniversity: async (id, data) => {
    const response = await axios.put(`${BASE_URL}/uni/${id}`, data);
    return response.data;
  },

  deleteUniversity: async (id) => {
    const response = await axios.delete(`${BASE_URL}/uni/${id}`);
    return response.data;
  },
};