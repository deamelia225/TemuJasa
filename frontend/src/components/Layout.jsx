import{Outlet,NavLink,useNavigate}from"react-router-dom";
import"../styles/Layout.css";

function LayoutPekerja(){
    const navigate=useNavigate();

    const logout=()=>{
        localStorage.removeItem("user");
        navigate("/login");
    };

    return(
        <div className="layout">
            <div className="sidebar">
                <div className="logo">TemuJasa</div>

                <div className="sidebar-menu">
                    <NavLink to="/dashboard-pekerja">Dashboard</NavLink>
                    <NavLink to="/booking-masuk">Pesanan Masuk</NavLink>
                    <NavLink to="/jasa-saya">Jasa Saya</NavLink>
                    <NavLink to="/tambah-jasa">Tambah Jasa</NavLink>
                    <NavLink to="/pendapatan">Pendapatan</NavLink>
                    <NavLink to="/ulasan">Ulasan</NavLink>
                    <NavLink to="/profil-pekerja">Profil</NavLink>
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

export default LayoutPekerja;