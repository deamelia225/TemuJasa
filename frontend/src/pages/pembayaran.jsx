import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function Pembayaran() {
    const loginUser = JSON.parse(localStorage.getItem("user")) || {};

    const [pembayaran, setPembayaran] = useState([]);

    useEffect(() => {
        tampilPembayaran();
    }, []);

    async function tampilPembayaran() {
        try {
            let response;

            if (loginUser.role === "Pelanggan") {
                response = await fetch(
                    `http://localhost:22000/pembayaran/pelanggan/${loginUser.id_pelanggan}`
                );
            } else {
                response = await fetch(
                    `http://localhost:22000/pembayaran/pekerja/${loginUser.id_pekerja}`
                );
            }
            if (!response.ok) {
                alert("Gagal mengambil data pembayaran");
                return;
            }
            const data = await response.json();
            setPembayaran(data);
        } catch (error) {
            console.log(error);
            alert("Server tidak dapat dihubungi");
        }
    }
    function formatRupiah(nominal) {
        return "Rp " + Number(nominal).toLocaleString("id-ID");
    }
    return (
        <Layout>
            <h2>Data Pembayaran</h2>
            <hr />
            <table border="1" cellPadding="8">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Pelanggan</th>
                    <th>Pekerja</th>
                    <th>Jasa</th>
                    <th>Total</th>
                    <th>Metode</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {pembayaran.length === 0 ? (
                    <tr>
                        <td
                            colSpan="7"
                            style={{ textAlign: "center" }}
                        >
                            Belum ada data pembayaran
                        </td>
                    </tr>
                ) : (
                    pembayaran.map((item) => (
                        <tr key={item.id_pembayaran}>
                            <td>{item.id_pembayaran}</td>
                            <td>{item.nama_pelanggan}</td>
                            <td>{item.nama_pekerja}</td>
                            <td>{item.nama_jasa}</td>
                            <td>{formatRupiah(item.total)}</td>
                            <td>{item.metode}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </Layout>
    );
}

export default Pembayaran;