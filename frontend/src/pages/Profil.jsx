import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function Profil() {

    const loginUser = JSON.parse(localStorage.getItem("user"));

    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [noHp, setNoHp] = useState("");
    const [alamat, setAlamat] = useState("");
    const [foto, setFoto] = useState("");

    const [keahlian, setKeahlian] = useState("");
    const [pengalaman, setPengalaman] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        tampilProfil();
    }, []);

    async function tampilProfil() {
        try {
            const response = await fetch(
                `http://localhost:22000/auth/profile/${loginUser.id_user}`
            );
            const data = await response.json();
            setNama(data.nama);
            setEmail(data.email);
            setNoHp(data.no_hp);
            setAlamat(data.alamat);
            setFoto(data.foto);
            if (loginUser.role === "Pekerja") {
                setKeahlian(data.keahlian);
                setPengalaman(data.pengalaman);
                setStatus(data.status_pekerja);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function simpan(e) {
        e.preventDefault();
        const body = {
            nama,
            email,
            no_hp: noHp,
            alamat,
            foto,
            keahlian,
            pengalaman,
            status
        };
        try {
            const response = await fetch(
                `http://localhost:22000/auth/profile/${loginUser.id_user}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );
            const result = await response.json();
            alert(result.message);
            tampilProfil();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <h2>Profil Saya</h2>
            <hr />
            <form onSubmit={simpan}>
                <p>Nama</p>
                <input
                    value={nama}
                    onChange={(e)=>setNama(e.target.value)}
                />
                <p>Email</p>
                <input
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <p>No HP</p>
                <input
                    value={noHp}
                    onChange={(e)=>setNoHp(e.target.value)}
                />
                <p>Alamat</p>
                <input
                    value={alamat}
                    onChange={(e)=>setAlamat(e.target.value)}
                />
                <p>Foto</p>
                <input
                    value={foto}
                    onChange={(e)=>setFoto(e.target.value)}
                />
                {loginUser.role === "Pekerja" && (
                    <>
                        <p>Keahlian</p>
                        <input
                            value={keahlian}
                            onChange={(e)=>setKeahlian(e.target.value)}
                        />
                        <p>Pengalaman</p>
                        <input
                            value={pengalaman}
                            onChange={(e)=>setPengalaman(e.target.value)}
                        />
                        <p>Status</p>
                        <select
                            value={status}
                            onChange={(e)=>setStatus(e.target.value)}
                        >
                            <option value="Aktif">Aktif</option>
                            <option value="Nonaktif">Nonaktif</option>
                        </select>
                    </>
                )}
                <br />
                <br />
                <button type="submit">
                    Simpan Perubahan
                </button>
            </form>
        </Layout>
    );
}

export default Profil;