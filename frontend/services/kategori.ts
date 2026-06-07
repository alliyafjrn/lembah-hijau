export async function getKategori() {
  const response = await fetch(
    "http://localhost:3000/kategori"
  );

  return response.json();
}

// 2. Tambah Kategori
export async function createKategori(nama: string) {
  const response = await fetch(
    "http://localhost:3000/kategori",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama,
      }),
    }
  );

  return response.json();
}

// 3. Hapus Kategori
export async function deleteKategori(id: number) {
  const response = await fetch(
    `http://localhost:3000/kategori/${id}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
}