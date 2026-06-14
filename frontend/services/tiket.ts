export async function createTiket(data: any) {
  try {
    console.log("DATA DIKIRIM KE BACKEND:", data);

    const response = await fetch("http://localhost:3003/tiket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log("RESPONSE BACKEND:", result);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getTiket() {
  try {
    const response = await fetch("http://localhost:3000/tiket");
    return await response.json();
  } catch (error) {
    return [];
  }
}

export async function deleteTiket(id: number) {
  try {
    const response = await fetch(`http://localhost:3003/tiket/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error("Gagal menghapus tiket:", error);
    throw error;
  }
}

export async function updateStatusTiket(id: number, status: string) {
  const response = await fetch(`http://localhost:3000/tiket/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
    }),
  });

  return response.json();
}