import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function RiwayatBooking() {
    const [riwayat, setRiwayat] = useState([]);

    useEffect(() => {
        tampilRiwayat();
    }, []);

    async function tampilRiwayat() {
        try {
            const response = await fetch(
                "http://localhost:22000/riwayat-booking"
            );
            const data = await response.json();
            setRiwayat(data);
        } catch (error) {
            console.log(error);
            alert("Server tidak dapat dihubungi");
        }
    }
    return (
        <Layout>
            <h2>Riwayat Booking</h2>
            <hr />

            <table border="1" cellPadding="8">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Pelanggan</th>
                    <th>Pekerja</th>
                    <th>Jasa</th>
                    <th>Tanggal Selesai</th>
                    <th>Status</th>
                    <th>Catatan</th>
                </tr>
                </thead>

                <tbody>
                {riwayat.length === 0 ? (
                    <tr>
                        <td
                            colSpan="7"
                            style={{ textAlign: "center" }}
                        >
                            Belum ada riwayat booking
                        </td>
                    </tr>
                ) : (
                    riwayat.map((item) => (
                        <tr key={item.id_riwayat}>
                            <td>{item.id_riwayat}</td>
                            <td>{item.nama_pelanggan}</td>
                            <td>{item.nama_pekerja}</td>
                            <td>{item.nama_jasa}</td>
                            <td>
                                {new Date(item.tanggal_selesai)
                                    .toLocaleDateString("id-ID", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    })}
                            </td>
                            <td>{item.status_akhir}</td>
                            <td>{item.catatan}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </Layout>
    );
}

export default RiwayatBooking;