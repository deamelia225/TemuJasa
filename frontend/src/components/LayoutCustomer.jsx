import {Outlet,NavLink,useNavigate} from "react-router-dom";
import "../styles/Layout.css";

function LayoutCustomer(){
    const navigate=useNavigate();

    const logout=()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return(
        <div className="layout">
            <div className="sidebar">
                <div className="logo">TemuJasa</div>

                <div className="sidebar-menu">
                    <NavLink to="/dashboard-customer">Dashboard</NavLink>
                    <NavLink to="/cari-jasa">Cari Jasa</NavLink>
                    <NavLink to="/booking-saya">Booking Saya</NavLink>
                    <NavLink to="/notifikasi">Notifikasi</NavLink>
                    <NavLink to="/profil">Profil</NavLink>
                </div>

                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </div>

            <div className="content-area">
                <Outlet/>
            </div>
        </div>
    );
}

export default LayoutCustomer;
