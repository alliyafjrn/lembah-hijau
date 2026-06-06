export async function getKategori() {
  const response = await fetch(
    "http://localhost:3000/kategori"
  );

  return response.json();
}