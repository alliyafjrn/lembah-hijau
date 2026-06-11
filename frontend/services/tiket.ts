export async function createTiket(data: any) {
  try {
    const response = await fetch("http://localhost:3002/tiket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error saat membuat tiket:", error);
    throw error;
  }
}

export async function getTiket() {
  try {
    const response = await fetch("http://localhost:3002/tiket");
    return await response.json();
  } catch (error) {
    console.error("Error saat mengambil data tiket:", error);
    return [];
  }
}