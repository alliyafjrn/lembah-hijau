export async function getKategori() {
  const response = await fetch(
    "http://localhost:3000/kategori"
  );

  return response.json();
}

export async function deleteKategori(id: number) {
  const response = await fetch(
    `http://localhost:3000/kategori/${id}`,
    {
      method: "DELETE",
    },
  );

  return response.json();
}