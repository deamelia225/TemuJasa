import { useEffect, useState } from "react";
import "../styles/JasaSaya.css";

function UlasanPekerja() {
    const [ulasan, setUlasan] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")) || {};
        const booking = JSON.parse(localStorage.getItem("booking")) || [];
        const data = booking.filter(
            (item) =>
                item.pemilik_jasa === user.nama &&
                item.rating &&
                item.rating > 0
        );
        setUlasan(data);
    }, []);

    return (
        <div className="page">
            <h1>Ulasan Pelanggan</h1>
            <div className="jasa-grid">
                {ulasan.length === 0 && (
                    <div className="empty-state">
                        Belum ada ulasan.
                    </div>
                )}
                {ulasan.map((item) => (
                    <div className="jasa-card" key={item.id}>
                        <img
                            src={item.gambar}
                            alt={item.nama_jasa}
                        />
                        <div className="jasa-content">
                            <h3>{item.nama_jasa}</h3>
                            <p>{item.customer}</p>
                            <p>
                                {"★".repeat(item.rating)}
                                {"☆".repeat(5 - item.rating)}
                            </p>
                            <p>"{item.ulasan}"</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UlasanPekerja;
