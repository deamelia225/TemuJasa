import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const role =
        localStorage.getItem("role") || "customer";

    const customerMenu = [
        {
            path: "/dashboard-customer",
            label: "Dashboard"
        },
        {
            path: "/jasa",
            label: "Jasa"
        },
        {
            path: "/booking",
            label: "Booking Saya"
        },
        {
            path: "/Ulasan",
            label: "Ulasan"
        },
        {
            path: "/profile",
            label: "Profil"
        }
    ];

    const workerMenu = [
        {
            path: "/dashboard-pekerja",
            label: "Dashboard"
        },
        {
            path: "/booking-masuk",
            label: "Pesanan Masuk"
        },
        {
            path: "/jasa-saya",
            label: "Jasa Saya"
        },
        {
            path: "/tambah-jasa",
            label: "Tambah Jasa"
        },
        {
            path: "/pendapatan",
            label: "Pendapatan"
        },
        {
            path: "/UlasanPekerja",
            label: "Ulasan"
        },
        {
            path: "/profile",
            label: "Profil"
        }
    ];

    const menu=
        role==="worker"||role==="pekerja"
            ?workerMenu
            :customerMenu;

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div className="sidebar">

            <div className="logo">
                TemuJasa
            </div>

            <div className="sidebar-menu">

                {menu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}

            </div>

            <button
                className="logout-btn"
                onClick={logout}
            >
                Logout
            </button>

        </div>
    );
}

export default Sidebar;