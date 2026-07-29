import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../styles/WorkerLayout.css";

function LayoutPekerja() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div className="worker-layout">
            <aside className="worker-sidebar">
                <div className="worker-logo">
                    TemuJasa
                    <br />
                    Worker
                </div>

                <div className="worker-menu">
                    <NavLink to="/dashboard-pekerja">Dashboard</NavLink>
                    <NavLink to="/booking-masuk">Pesanan Masuk</NavLink>
                    <NavLink to="/jasa-saya">Jasa Saya</NavLink>
                    <NavLink to="/tambah-jasa">Tambah Jasa</NavLink>
                    <NavLink to="/pendapatan">Pendapatan</NavLink>
                    <NavLink to="/ulasan-pekerja">Ulasan Pelanggan</NavLink>
                    <NavLink to="/notifikasi-pekerja">Notifikasi</NavLink>
                    <NavLink to="/profil-pekerja">Profil</NavLink>
                </div>

                <button className="worker-logout" onClick={logout}>
                    Logout
                </button>
            </aside>

            <main className="worker-content">
                <Outlet />
            </main>
        </div>
    );
}

export default LayoutPekerja;
