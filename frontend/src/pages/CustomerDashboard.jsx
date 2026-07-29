import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/customer-dashboard.css";

function DashboardCustomer() {
    const [user, setUser] = useState({});
    const [booking, setBooking] = useState([]);
    const [jasa, setJasa] = useState([]);

    useEffect(() => {
        const currentUser =
            JSON.parse(localStorage.getItem("user")) || {};

        const allBooking =
            JSON.parse(localStorage.getItem("booking")) || [];

        const allJasa =
            JSON.parse(localStorage.getItem("jasa")) || [];

        setUser(currentUser);

        setBooking(
            allBooking.filter(
                item => item.customer === currentUser.nama
            )
        );

        setJasa(allJasa.slice(0, 4));
    }, []);

    return (
        <div className="dashboard-page">

            <div className="welcome-card">
                <h1>
                    Selamat Datang, {user.nama}
                </h1>

                <p>
                    Temukan jasa terbaik untuk kebutuhan Anda.
                </p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Booking</h3>
                    <h2>{booking.length}</h2>
                </div>

                <div className="stat-card">
                    <h3>Status Akun</h3>
                    <h2>Pelanggan</h2>
                </div>
            </div>

            <h2 className="section-title">
                Rekomendasi Jasa
            </h2>

            <div className="dashboard-grid">

                {jasa.map((item) => (
                    <div
                        className="dashboard-card"
                        key={item.id}
                    >

                        <img
                            src={item.gambar}
                            alt={item.nama_jasa}
                        />

                        <div className="dashboard-content">

                            <h3>{item.nama_jasa}</h3>

                            <p className="service-category">
                                {item.kategori}
                            </p>

                            <p>{item.alamat}</p>

                            <p>{item.deskripsi}</p>

                            <div className="dashboard-meta">

                                <span>
                                    ⭐ {item.rating || 0}
                                </span>

                                <span>
                                    Rp{" "}
                                    {Number(
                                        item.harga
                                    ).toLocaleString("id-ID")}
                                </span>

                            </div>

                            <Link
                                to={`/detail-jasa/${item.id}`}
                                className="detail-btn"
                            >
                                Lihat Detail
                            </Link>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default DashboardCustomer;