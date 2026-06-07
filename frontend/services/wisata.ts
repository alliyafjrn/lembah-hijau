export async function getWisata() {
  const response = await fetch(
    "http://localhost:3000/wisata"
  );
  return response.json();
}

export async function createWisata(
  nama: string,
  deskripsi: string,
  kategoriId: number,
) {
  const response = await fetch(
    "http://localhost:3000/wisata",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama,
        deskripsi,
        kategoriId,
      }),
    },
  );

  return response.json();
}

export async function deleteWisata(id: number) {
  const response = await fetch(
    `http://localhost:3000/wisata/${id}`,
    {
      method: "DELETE",
    },
  );

  return response.json();
}

export async function updateWisata(
  id: number,
  nama: string,
  deskripsi: string,
  kategoriId: number,
) {
  const response = await fetch(
    `http://localhost:3000/wisata/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama,
        deskripsi,
        kategoriId,
      }),
    },
  );

  return response.json();
}