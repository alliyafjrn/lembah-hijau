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