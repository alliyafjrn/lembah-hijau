export async function createTiket(
  data: {
    namaPemesan: string;
    email: string;
    jumlahTiket: number;
    wisataId: number;
  }
) {
  const response =
    await fetch(
      "http://localhost:3000/tiket",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            data
          ),
      }
    );

  return response.json();
}