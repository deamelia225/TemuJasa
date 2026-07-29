import { useEffect, useState } from "react";
import "../styles/Dashboard.css";

function DashboardPekerja() {
    const [user, setUser] = useState({});
    const [jasa, setJasa] = useState(0);
    const [booking, setBooking] = useState(0);
    const [pendapatan, setPendapatan] = useState(0);
    const [jasaSaya, setJasaSaya] = useState([]);
    const [ratingRata, setRatingRata] = useState(0);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("user")) || {};
        const dataJasa = JSON.parse(localStorage.getItem("jasa")) || [];
        const dataBooking = JSON.parse(localStorage.getItem("booking")) || [];

        setUser(currentUser);

        const jasaMilikSaya = dataJasa.filter(
            item => item.pemilik === currentUser.nama
        );

        setJasaSaya(jasaMilikSaya);
        setJasa(jasaMilikSaya.length);

        const bookingMasuk = dataBooking.filter(
            item => item.pemilik_jasa === currentUser.nama
        );

        setBooking(bookingMasuk.length);

        const reviewMasuk = bookingMasuk.filter(
            item => item.rating > 0
        );

        const rata =
            reviewMasuk.length > 0
                ? reviewMasuk.reduce(
                (total, item) => total + item.rating,
                0
            ) / reviewMasuk.length
                : 0;

        setRatingRata(Number(rata.toFixed(1)));

        const selesai = bookingMasuk.filter(
            item => item.status === "Selesai"
        );

        setPendapatan(
            selesai.reduce(
                (total, item) =>
                    total + Number(item.harga || 0),
                0
            )
        );
    }, []);

    const jasaUnggulan =
        jasaSaya.length > 0
            ? [...jasaSaya].sort(
                (a, b) =>
                    (b.totalBooking || 0) -
                    (a.totalBooking || 0)
            )[0]
            : null;

    return (
        <div className="page">
            <div className="welcome-card">
                <h1>Selamat Datang, {user.nama}</h1>
                <p>
                    Kelola jasa, pesanan pelanggan,
                    dan pendapatan Anda dari satu tempat.
                </p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Jasa</h3>
                    <p>{jasa}</p>
                </div>

                <div className="stat-card">
                    <h3>Pesanan Masuk</h3>
                    <p>{booking}</p>
                </div>

                <div className="stat-card">
                    <h3>Pendapatan</h3>
                    <p>
                        Rp
                        {pendapatan.toLocaleString("id-ID")}
                    </p>
                </div>

                <div className="stat-card">
                    <h3>Rating</h3>
                    <p>⭐ {ratingRata}</p>
                </div>

                <div className="stat-card">
                    <h3>Status Akun</h3>
                    <p>Aktif</p>
                </div>
            </div>

            <div className="dashboard-bottom">
                <div className="dashboard-panel">
                    <h3>Tips Untuk Anda</h3>

                    <div className="worker-tips">
                        <p>✓ Lengkapi deskripsi jasa dengan detail.</p>
                        <p>✓ Tentukan harga yang kompetitif.</p>
                        <p>✓ Respon booking pelanggan lebih cepat.</p>
                        <p>✓ Minta pelanggan memberikan ulasan.</p>
                    </div>
                </div>

                <div className="dashboard-panel">
                    <h3>Jasa Unggulan</h3>

                    {jasaUnggulan ? (
                        <div className="best-service-card">
                            <img
                                src={jasaUnggulan.gambar}
                                alt={jasaUnggulan.nama_jasa}
                            />

                            <div className="best-service-content">
                                <h4>
                                    {jasaUnggulan.nama_jasa}
                                </h4>

                                <p>
                                    {jasaUnggulan.kategori}
                                </p>

                                <p>
                                    ⭐ {jasaUnggulan.rating || 0}
                                </p>

                                <p>
                                    {jasaUnggulan.totalBooking || 0} Booking
                                </p>

                                <h4>
                                    Rp
                                    {Number(
                                        jasaUnggulan.harga
                                    ).toLocaleString("id-ID")}
                                </h4>
                            </div>
                        </div>
                    ) : (
                        <div className="empty-state">
                            Belum ada jasa yang ditambahkan.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardPekerja;