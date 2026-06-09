import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

export async function getWisata() {
  const response = await axios.get(`${API_URL}/wisata`);
  return response.data;
}

export async function getWisataById(id: number) {
  const response = await axios.get(`${API_URL}/wisata/${id}`);
  return response.data;
}

export async function createWisata(data: any) {
  const response = await axios.post(`${API_URL}/wisata`, data);
  return response.data;
}

export async function updateWisata(id: number, data: any) {
  const response = await axios.put(`${API_URL}/wisata/${id}`, data);
  return response.data;
}

export async function deleteWisata(id: number) {
  const response = await axios.delete(`${API_URL}/wisata/${id}`);
  return response.data;
}