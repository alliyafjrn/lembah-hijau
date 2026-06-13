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
    const response = await fetch("http://localhost:3003/tiket");
    return await response.json();
  } catch (error) {
    return [];
  }
}