export async function getKategori() {
  const response = await fetch(
    "http://localhost:3002/kategori"
  );

  return response.json();
}

export async function createKategori(
  nama: string,
) {
  const response = await fetch(
    "http://localhost:3002/kategori",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        nama,
      }),
    },
  );

  return response.json();
}

export async function updateKategori(
  id: number,
  nama: string,
) {
  const response = await fetch(
    `http://localhost:3002/kategori/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        nama,
      }),
    },
  );

  return response.json();
}

export async function deleteKategori(
  id: number,
) {
  const response = await fetch(
    `http://localhost:3002/kategori/${id}`,
    {
      method: "DELETE",
    },
  );

  return response.json();
}

export async function getWisataById(
  id: number,
) {
  const response = await fetch(
    `http://localhost:3002/wisata/${id}`
  );

  return response.json();
}