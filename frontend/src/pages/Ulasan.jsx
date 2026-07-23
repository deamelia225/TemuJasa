import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function Ulasan() {
    const loginUser = JSON.parse(localStorage.getItem("user")) || {};

    const [ulasan, setUlasan] = useState([]);
    const [idBooking, setIdBooking] = useState("");
    const [rating, setRating] = useState("");
    const [komentar, setKomentar] = useState("");

    useEffect(() => {
        tampilUlasan();
    }, []);

    async function tampilUlasan() {
        try {
            let response;

            if (loginUser.role === "Pelanggan") {
                response = await fetch(
                    `http://localhost:22000/ulasan/pelanggan/${loginUser.id_pelanggan}`
                );
            } else if (loginUser.role === "Pekerja") {
                response = await fetch(
                    `http://localhost:22000/ulasan/pekerja/${loginUser.id_pekerja}`
                );
            } else {
                response = await fetch(
                    "http://localhost:22000/ulasan"
                );
            }
            const data = await response.json();
            setUlasan(Array.isArray(data) ? data : []);

        } catch (error) {
            console.log(error);
        }
    }

    async function simpanUlasan() {
        if (idBooking === "" || rating === "") {
            alert("ID Booking dan Rating harus diisi");
            return;
        }
        try {
            const response = await fetch(
                "http://localhost:22000/ulasan",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id_booking: idBooking,
                        rating,
                        komentar
                    })
                }
            );
            const result = await response.json();
            if (!response.ok) {
                alert(result.message);
                return;
            }
            alert(result.message);
            setIdBooking("");
            setRating("");
            setKomentar("");
            tampilUlasan();
        } catch (error) {
            console.log(error);
            alert("Server tidak dapat dihubungi");
        }
    }

    return (
        <Layout>
            <h2>Ulasan</h2>
            <hr />
            {loginUser.role === "Pelanggan" && (
                <>
                    <p>ID Booking</p>
                    <input
                        type="number"
                        value={idBooking}
                        onChange={(e) => setIdBooking(e.target.value)}
                    />
                    <p>Rating</p>
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <option value="">Pilih</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <p>Komentar</p>
                    <textarea
                        value={komentar}
                        onChange={(e) => setKomentar(e.target.value)}
                    />
                    <br /><br />
                    <button
                        type="button"
                        onClick={simpanUlasan}
                    >
                        Simpan
                    </button>
                    <hr />
                </>
            )}
            <table border="1" cellPadding="8">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Jasa</th>
                    <th>Pelanggan</th>
                    <th>Rating</th>
                    <th>Komentar</th>
                </tr>
                </thead>

                <tbody>
                {ulasan.length === 0 ? (
                    <tr>
                        <td
                            colSpan="5"
                            style={{ textAlign: "center" }}
                        >
                            Belum ada ulasan
                        </td>
                    </tr>
                ) : (
                    ulasan.map((item) => (
                        <tr key={item.id_ulasan}>
                            <td>{item.id_ulasan}</td>
                            <td>{item.nama_jasa}</td>
                            <td>{item.nama_pelanggan}</td>
                            <td>{item.rating}</td>
                            <td>{item.komentar}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </Layout>
    );
}

export default Ulasan;