import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function Booking() {
    const loginUser = JSON.parse(localStorage.getItem("user")) || {};
    const [booking, setBooking] = useState([]);
    const [jasa, setJasa] = useState([]);
    const [idJasa, setIdJasa] = useState("");
    const [tanggalBooking, setTanggalBooking] = useState("");
    const [alamat, setAlamat] = useState("");
    const [catatan, setCatatan] = useState("");

    useEffect(() => {
        tampilBooking();
        if (loginUser.role === "Pelanggan") {
            tampilJasa();
        }
    }, []);

    async function tampilBooking() {
        try {
            let url = "";
            if (loginUser.role === "Admin") {
                url = "http://localhost:22000/booking";
            } else if (loginUser.role === "Pelanggan") {
                url = `http://localhost:22000/booking/pelanggan/${loginUser.id_pelanggan}`;
            } else {
                url = `http://localhost:22000/booking/pekerja/${loginUser.id_pekerja}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setBooking(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function tampilJasa() {
        try {
            const response = await fetch(
                "http://localhost:22000/jasa"
            );
            const data = await response.json();
            setJasa(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function simpanBooking(e) {
        e.preventDefault();
        const data = {
            id_jasa: idJasa,
            id_pelanggan: loginUser.id_pelanggan,
            tanggal_booking: tanggalBooking,
            alamat,
            catatan,
            status: "Menunggu"
        };
        try {
            const response = await fetch(
                "http://localhost:22000/booking",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );
            const result = await response.json();
            alert(result.message);
            setIdJasa("");
            setTanggalBooking("");
            setAlamat("");
            setCatatan("");
            tampilBooking();
        } catch (error) {
            console.log(error);
        }
    }

    async function ubahStatus(id, status) {
        try {
            const response = await fetch(
                `http://localhost:22000/booking/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status
                    })
                }
            );
            const result = await response.json();
            alert(result.message);
            tampilBooking();
        } catch (error) {
            console.log(error);
        }
    }

    async function hapusBooking(id) {
        if (!window.confirm("Yakin ingin menghapus booking?")) {
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:22000/booking/${id}`,
                {
                    method: "DELETE"
                }
            );
            const result = await response.json();
            alert(result.message);
            tampilBooking();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <h2>Data Booking</h2>
            <hr />
            {loginUser.role === "Pelanggan" && (
                <form onSubmit={simpanBooking}>
                    <p>Jasa</p>
                    <select
                        value={idJasa}
                        onChange={(e) => setIdJasa(e.target.value)}
                        required
                    >
                        <option value="">-- Pilih Jasa --</option>
                        {jasa.map((item) => (
                            <option
                                key={item.id_jasa}
                                value={item.id_jasa}
                            >
                                {item.nama_jasa} - {item.nama}
                            </option>
                        ))}
                    </select>
                    <p>Tanggal Booking</p>
                    <input
                        type="date"
                        value={tanggalBooking}
                        onChange={(e) =>
                            setTanggalBooking(e.target.value)
                        }
                        required
                    />
                    <p>Alamat</p>
                    <textarea
                        value={alamat}
                        onChange={(e) =>
                            setAlamat(e.target.value)
                        }
                        required
                    />
                    <p>Catatan</p>
                    <textarea
                        value={catatan}
                        onChange={(e) =>
                            setCatatan(e.target.value)
                        }
                    />
                    <br />
                    <br />
                    <button type="submit">
                        Booking
                    </button>
                </form>
            )}
            <br />
            <table border="1" cellPadding="8">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Pelanggan</th>
                    <th>Pekerja</th>
                    <th>Jasa</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    {(loginUser.role === "Pekerja" ||
                        loginUser.role === "Admin") && (
                        <th>Aksi</th>
                    )}
                    {loginUser.role === "Pelanggan" && (
                        <th>Hapus</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {booking.length === 0 ? (
                    <tr>
                        <td colSpan="7">
                            Belum ada data booking
                        </td>
                    </tr>
                ) : (
                    booking.map((item) => (
                        <tr key={item.id_booking}>
                            <td>{item.id_booking}</td>
                            <td>{item.nama_pelanggan}</td>
                            <td>{item.nama_pekerja}</td>
                            <td>{item.nama_jasa}</td>
                            <td>{item.tanggal_booking}</td>
                            <td>{item.status}</td>
                            {(loginUser.role === "Pekerja" ||
                                loginUser.role === "Admin") && (
                                <td>
                                    <button
                                        onClick={() =>
                                            ubahStatus(
                                                item.id_booking,
                                                "Diterima"
                                            )
                                        }
                                    >
                                        Terima
                                    </button>
                                    {" "}
                                    <button
                                        onClick={() =>
                                            ubahStatus(
                                                item.id_booking,
                                                "Ditolak"
                                            )
                                        }
                                    >
                                        Tolak
                                    </button>
                                    {" "}
                                    <button
                                        onClick={() =>
                                            ubahStatus(
                                                item.id_booking,
                                                "Selesai"
                                            )
                                        }
                                    >
                                        Selesai
                                    </button>
                                </td>
                            )}
                            {loginUser.role === "Pelanggan" && (
                                <td>
                                    <button
                                        onClick={() =>
                                            hapusBooking(
                                                item.id_booking
                                            )
                                        }
                                    >
                                        Hapus
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </Layout>
    );
}

export default Booking;