export async function getKategori() {
    const response = await fetch(
        "http://localhost:3000/kategori"
    );

    return response.json();
}
export async function createKategori(
    nama: string,
) {
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
        },
    );

    return response.json();

    export async function updateKategori(
        id: number,
        nama: string,
    ) {
        const response = await fetch(
            `http://localhost:3000/kategori/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nama }),
            },
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
}