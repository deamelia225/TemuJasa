import { useEffect, useState } from "react";
import "../styles/Notifikasi.css";

function Notifikasi() {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadNotifikasi();
    }, []);

    const loadNotifikasi = () => {
        const user = JSON.parse(localStorage.getItem("user")) || {};
        const booking = JSON.parse(localStorage.getItem("booking")) || [];
        let hasil = [];

        if (user.role === "customer") {
            booking
                .filter((item) => item.customer === user.nama)
                .forEach((item) => {
                    if (item.status === "Diterima") {
                        hasil.push({
                            id: item.id,
                            pesan: `Booking ${item.nama_jasa} telah diterima oleh pekerja.`,
                            tipe: "success"
                        });
                    }

                    if (item.status_pembayaran === "Menunggu Konfirmasi") {
                        hasil.push({
                            id: `${item.id}bayar`,
                            pesan: `Pembayaran ${item.nama_jasa} sedang menunggu konfirmasi pekerja.`,
                            tipe: "warning"
                        });
                    }

                    if (item.status_pembayaran === "Sudah Bayar") {
                        hasil.push({
                            id: `${item.id}lunas`,
                            pesan: `Pembayaran ${item.nama_jasa} sudah dikonfirmasi.`,
                            tipe: "success"
                        });
                    }

                    if (item.status === "Selesai") {
                        hasil.push({
                            id: `${item.id}selesai`,
                            pesan: `Pekerjaan ${item.nama_jasa} sudah selesai. Silakan berikan ulasan.`,
                            tipe: "info"
                        });
                    }
                });
        } else {
            booking
                .filter((item) => item.pemilik_jasa === user.nama)
                .forEach((item) => {
                    if (item.status === "Menunggu Konfirmasi") {
                        hasil.push({
                            id: item.id,
                            pesan: `Ada booking baru untuk jasa ${item.nama_jasa}.`,
                            tipe: "info"
                        });
                    }

                    if (item.status_pembayaran === "Menunggu Konfirmasi") {
                        hasil.push({
                            id: `${item.id}bayar`,
                            pesan: `Customer sudah melakukan pembayaran untuk ${item.nama_jasa}.`,
                            tipe: "warning"
                        });
                    }

                    if (item.status_pembayaran === "Sudah Bayar") {
                        hasil.push({
                            id: `${item.id}lunas`,
                            pesan: `Pembayaran ${item.nama_jasa} sudah dikonfirmasi.`,
                            tipe: "success"
                        });
                    }

                    if (item.status === "Selesai") {
                        hasil.push({
                            id: `${item.id}selesai`,
                            pesan: `Booking ${item.nama_jasa} telah selesai.`,
                            tipe: "success"
                        });
                    }
                });
        }

        setData(hasil);
    };

    return (
        <div className="page">
            <h1>Notifikasi</h1>

            <div className="notification-list">
                {data.length === 0 && (
                    <div className="empty-notification">
                        Belum ada notifikasi.
                    </div>
                )}

                {data.map((item) => (
                    <div
                        className={`notification-card ${item.tipe}`}
                        key={item.id}
                    >
                        <div className="notification-icon">
                            🔔
                        </div>

                        <div>
                            <p>{item.pesan}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notifikasi;
