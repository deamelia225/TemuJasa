import {Navigate,Route,Routes} from "react-router-dom";
import LayoutCustomer from "./components/LayoutCustomer";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import BookingSaya from "./pages/BookingSaya";
import DetailJasa from "./pages/DetailJasa";
import Notifikasi from "./pages/Notifikasi";
import Profile from "./pages/Profile";
import BookingForm from "./pages/BookingForm";
import KelolaJasa from "./pages/KelolaJasa";
import Pembayaran from "./pages/customer/Pembayaran";
import CariJasa from "./pages/customer/CariJasa";
import DashboardPekerja from "./worker/DashboardPekerja";
import BookingMasuk from "./worker/BookingMasuk";
import JasaSaya from "./worker/JasaSaya";
import LayoutPekerja from "./worker/LayoutPekerja";
import Pendapatan from "./worker/Pendapatan";
import TambahJasa from "./worker/TambahJasa";
import UlasanPekerja from "./worker/UlasanPekerja";

function App(){
    const role=localStorage.getItem("role");

    return(
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={role?<Navigate to={role==="pekerja"?"/dashboard-pekerja":"/dashboard-customer"} replace/>:<Navigate to="/login" replace/>}/>

            <Route element={<LayoutCustomer/>}>
                <Route path="/dashboard-customer" element={<CustomerDashboard/>}/>
                <Route path="/cari-jasa" element={<CariJasa/>}/>
                <Route path="/booking-saya" element={<BookingSaya/>}/>
                <Route path="/notifikasi" element={<Notifikasi/>}/>
                <Route path="/profil" element={<Profile/>}/>
                <Route path="/detail-jasa/:id" element={<DetailJasa/>}/>
                <Route path="/booking/:id" element={<BookingForm/>}/>
                <Route path="/pembayaran/:id" element={<Pembayaran/>}/>
            </Route>

            <Route element={<LayoutPekerja/>}>
                <Route path="/dashboard-pekerja" element={<ProtectedRoute><DashboardPekerja/></ProtectedRoute>}/>
                <Route path="/booking-masuk" element={<ProtectedRoute><BookingMasuk/></ProtectedRoute>}/>
                <Route path="/jasa-saya" element={<ProtectedRoute><JasaSaya/></ProtectedRoute>}/>
                <Route path="/tambah-jasa" element={<ProtectedRoute><TambahJasa/></ProtectedRoute>}/>
                <Route path="/kelola-jasa/:id" element={<ProtectedRoute><KelolaJasa/></ProtectedRoute>}/>
                <Route path="/pendapatan" element={<ProtectedRoute><Pendapatan/></ProtectedRoute>}/>
                <Route path="/ulasan-pekerja" element={<ProtectedRoute><UlasanPekerja/></ProtectedRoute>}/>
                <Route path="/notifikasi-pekerja" element={<ProtectedRoute><Notifikasi/></ProtectedRoute>}/>
                <Route path="/profil-pekerja" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
            </Route>
        </Routes>
    );
}

export default App;