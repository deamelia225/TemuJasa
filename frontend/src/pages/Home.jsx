import { useState } from 'react';
import Jasa from './Jasa';
import Booking from './Booking';
import RiwayatBooking from './RiwayatBooking';
import Profil from './Profile';
import Pembayaran from './Pembayaran';
import Ulasan from './Ulasan';
import KelolaJasa from "../components/KelolaJasa";

function Home({ setLogin }) {

    const user = JSON.parse(localStorage.getItem("user"));
    const [menu, setMenu] = useState("beranda");

    function logout() {
        const yakin = window.confirm("Apakah Anda yakin ingin logout?");
        if (yakin) {
            localStorage.removeItem("user");
            setLogin(false);
        }
    }

    return (
        <div className="container">
            <h1>TemuJasa</h1>
            <div
                style={{
                    textAlign: "center",
                    marginBottom: "15px"
                }}
            >
                <b>Nama :</b> {user.nama}
                <br />
                <b>Role :</b> {user.role}
            </div>
            <div className="menu">
                <button onClick={() => setMenu("beranda")}>
                    Beranda
                </button>

                {user.role === "Pelanggan" && (
                    <>
                        <button onClick={() => setMenu("jasa")}>Jasa</button>
                        <button onClick={() => setMenu("booking")}>Booking</button>
                        <button onClick={() => setMenu("pembayaran")}>Pembayaran</button>
                        <button onClick={() => setMenu("ulasan")}>Ulasan</button>
                        <button onClick={() => setMenu("riwayat")}>Riwayat</button>
                        <button onClick={() => setMenu("profil")}>Profil</button>
                    </>
                )}

                {user.role === "Pekerja" && (
                    <>
                        <button onClick={() => setMenu("booking-masuk")}>Booking Masuk</button>
                        <button onClick={() => setMenu("riwayat-pekerjaan")}>Riwayat Pekerjaan</button>
                        <button onClick={() => setMenu("profil")}>Profil</button>
                        <button onClick={() => setMenu("kelola-jasa")}>Kelola Jasa</button>
                    </>
                )}
                <button onClick={logout}>Logout</button>
            </div>
            <hr />
            {menu === "beranda" && user.role === "Pelanggan" && (
                <div align="center">
                    <h2>Selamat Datang di TemuJasa</h2>
                    <p>
                        TemuJasa merupakan platform yang membantu pelanggan menemukan penyedia jasa terpercaya dengan mudah, cepat, dan aman.
                    </p>
                    <table
                        border="1"
                        cellPadding="15"
                        style={{
                            width: "80%",
                            borderCollapse: "collapse",
                            marginTop: "20px"
                        }}
                    >

                        <tbody>
                        <tr>
                            <td><b>Tentang TemuJasa</b></td>
                            <td>Website yang menghubungkan pelanggan dengan penyedia jasa.</td>
                        </tr>
                        <tr>
                            <td><b>Servis AC</b></td>
                            <td>Pemasangan, pencucian dan perbaikan AC.</td>
                        </tr>
                        <tr>
                            <td><b>Servis Elektronik</b></td>
                            <td>Perbaikan TV, kulkas, mesin cuci dan lainnya.</td>
                        </tr>
                        <tr>
                            <td><b>Jasa Kebersihan</b></td>
                            <td>Layanan kebersihan rumah dan kantor.</td>
                        </tr>
                        <tr>
                            <td><b>Jasa Tukang</b></td>
                            <td>Renovasi dan perbaikan rumah.</td>
                        </tr>
                        <tr>
                            <td><b>Booking Online</b></td>
                            <td>Pesan jasa secara online.</td>
                        </tr>
                        <tr>
                            <td><b>Pembayaran</b></td>
                            <td>Pembayaran dapat dilakukan secara online maupun offline (tunai) setelah booking.</td>
                        </tr>
                        <tr>
                            <td><b>Ulasan</b></td>
                            <td>Pelanggan dapat memberikan penilaian terhadap pekerja.</td>
                        </tr>
                        <tr>
                            <td><b>Riwayat Booking</b></td>
                            <td>Melihat seluruh riwayat pemesanan.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {menu === "beranda" && user.role === "Pekerja" && (
                <div align="center">
                    <h2>Dashboard Pekerja</h2>
                    <p>Selamat datang di TemuJasa.</p>
                    <table
                        border="1"
                        cellPadding="15"
                        style={{
                            width: "70%",
                            borderCollapse: "collapse"
                        }}
                    >
                        <tbody>
                        <tr>
                            <td><b>Status</b></td>
                            <td>Pekerja Aktif</td>
                        </tr>
                        <tr>
                            <td><b>Tugas</b></td>
                            <td>Melihat booking yang masuk dari pelanggan.</td>
                        </tr>
                        <tr>
                            <td><b>Pekerjaan</b></td>
                            <td>Menerima atau menolak pesanan.</td>
                        </tr>
                        <tr>
                            <td><b>Riwayat</b></td>
                            <td>Melihat pekerjaan yang telah selesai.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {menu === "jasa" && <Jasa />}
            {menu === "booking" && <Booking />}
            {menu === "riwayat" && <RiwayatBooking />}
            {menu === "profile" && <Profil />}
            {menu === "pembayaran" && <Pembayaran />}
            {menu === "ulasan" && <Ulasan />}
            {menu === "kelola-jasa" && <KelolaJasa />}
        </div>
    );
}

export default Home;