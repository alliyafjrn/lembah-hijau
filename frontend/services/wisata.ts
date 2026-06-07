export async function getWisata() {
  const response = await fetch(
    "http://localhost:3000/wisata"
  );

  return response.json();
}