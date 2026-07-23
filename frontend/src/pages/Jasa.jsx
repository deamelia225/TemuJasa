import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function Jasa() {
    const loginUser = JSON.parse(localStorage.getItem("user")) || {};
    const [jasa, setJasa] = useState([]);

    const [idJasa,setIdJasa]=useState("");
    const [namaJasa,setNamaJasa]=useState("");
    const [kategori,setKategori]=useState("");
    const [deskripsi,setDeskripsi]=useState("");
    const [harga,setHarga]=useState("");
    const [estimasi,setEstimasi]=useState("");
    const [foto,setFoto]=useState("");
    const [namaBank,setNamaBank]=useState("");
    const [noRekening,setNoRekening]=useState("");
    const [atasNama,setAtasNama]=useState("");
    const [qris,setQris]=useState("");
    const [keahlian,setKeahlian]=useState("");
    const [status,setStatus]=useState("Aktif");

    useEffect(() => {
        if (loginUser.role) {
            tampilJasa();
        }
    }, []);

    async function tampilJasa() {
        try {
            let response;
            if (loginUser.role === "Pekerja") {
                response = await fetch(
                    `http://localhost:22000/jasa/pekerja/${loginUser.id_pekerja}`
                );
            } else {
                response = await fetch(
                    "http://localhost:22000/jasa"
                );
            }
            if (!response.ok) {
                alert("Gagal mengambil data jasa");
                return;
            }
            const data = await response.json();
            setJasa(data);
        } catch (error) {
            console.log(error);
            alert("Server tidak dapat dihubungi");
        }
    }

    function resetForm() {
        setIdJasa("");
        setNamaJasa("");
        setKategori("");
        setDeskripsi("");
        setHarga("");
        setEstimasi("");
        setFoto("");
        setNamaBank("");
        setNoRekening("");
        setAtasNama("");
        setQris("");
        setKeahlian("");
        setStatus("Aktif");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    async function simpanJasa(e) {
        e.preventDefault();
        const data = {
            id_pekerja: loginUser.id_pekerja,
            nama_jasa: namaJasa,
            kategori,
            deskripsi,
            harga,
            estimasi,
            foto,
            nama_bank: namaBank,
            no_rekening: noRekening,
            atas_nama: atasNama,
            qris,
            keahlian,
            status
        };
        try {
            let response;
            if (idJasa === "") {
                response = await fetch("http://localhost:22000/jasa", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
            } else {
                response = await fetch(`http://localhost:22000/jasa/${idJasa}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
            }
            const result = await response.json();
            if (!response.ok) {
                alert(result.message || result.error);
                return;
            }
            alert(result.message);
            resetForm();
            tampilJasa();
        } catch (error) {
            console.log(error);
        }
    }
    function editJasa(item) {
        setIdJasa(item.id_jasa);
        setNamaJasa(item.nama_jasa);
        setKategori(item.kategori);
        setDeskripsi(item.deskripsi);
        setHarga(item.harga);
        setEstimasi(item.estimasi);
        setFoto(item.foto);
        setNamaBank(item.nama_bank);
        setNoRekening(item.no_rekening);
        setAtasNama(item.atas_nama);
        setQris(item.qris);
        setKeahlian(item.keahlian);
        setStatus(item.status);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    async function hapusJasa(id) {
        if (!window.confirm("Yakin ingin menghapus jasa ini?")) {
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:22000/jasa/${id}`,
                {
                    method: "DELETE"
                }
            );
            const result = await response.json();
            if (!response.ok) {
                alert(result.message || result.error);
                return;
            }
            alert(result.message);
            resetForm();
            tampilJasa();
        } catch (error) {
            console.log(error);
            alert("Server tidak dapat dihubungi");
        }
    }

    function formatRupiah(angka) {
        return "Rp" + Number(angka).toLocaleString("id-ID");
    }
    return (
        <Layout>
            <h2>Daftar Jasa</h2>
            <hr />
            {loginUser.role === "Pekerja" && (
                <form onSubmit={simpanJasa}>
                    <h3>
                        {idJasa === "" ? "Tambah Jasa" : "Edit Jasa"}
                    </h3>
                    <p>Nama Jasa</p>
                    <input
                        type="text"
                        value={namaJasa}
                        onChange={(e)=>setNamaJasa(e.target.value)}
                        required
                    />
                    <p>Kategori</p>
                    <input
                        type="text"
                        value={kategori}
                        onChange={(e)=>setKategori(e.target.value)}
                        required
                    />
                    <p>Deskripsi</p>
                    <textarea
                        value={deskripsi}
                        onChange={(e)=>setDeskripsi(e.target.value)}
                        required
                    />
                    <p>Harga</p>
                    <input
                        type="number"
                        value={harga}
                        onChange={(e)=>setHarga(e.target.value)}
                        required
                    />
                    <p>Estimasi</p>
                    <input
                        type="text"
                        placeholder="Contoh : 2 Jam"
                        value={estimasi}
                        onChange={(e)=>setEstimasi(e.target.value)}
                        required
                    />
                    <p>Foto</p>
                    <input
                        type="text"
                        value={foto}
                        onChange={(e)=>setFoto(e.target.value)}
                    />
                    <p>Nama Bank</p>
                    <input
                        type="text"
                        value={namaBank}
                        onChange={(e)=>setNamaBank(e.target.value)}
                    />
                    <p>No Rekening</p>
                    <input
                        type="text"
                        value={noRekening}
                        onChange={(e)=>setNoRekening(e.target.value)}
                    />
                    <p>Atas Nama</p>
                    <input
                        type="text"
                        value={atasNama}
                        onChange={(e)=>setAtasNama(e.target.value)}
                    />
                    <p>QRIS</p>
                    <input
                        type="text"
                        value={qris}
                        onChange={(e)=>setQris(e.target.value)}
                    />
                    <p>Keahlian</p>
                    <input
                        type="text"
                        value={keahlian}
                        onChange={(e)=>setKeahlian(e.target.value)}
                        required
                    />
                    <p>Status</p>
                    <select
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                    >
                        <option value="Aktif">Aktif</option>
                        <option value="Nonaktif">Nonaktif</option>
                    </select>
                    <br/><br/>
                    <button type="submit">
                        {idJasa==="" ? "Simpan" : "Update"}
                    </button>
                    {" "}
                    <button
                        type="button"
                        onClick={resetForm}
                    >
                        Reset
                    </button>
                </form>
            )}
            <table border="1" cellPadding="8">
                <thead>
                <tr>
                    <th>ID</th>
                    {loginUser.role === "Pelanggan" && (
                        <th>Nama Pekerja</th>
                    )}
                    <th>Nama Jasa</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th>Estimasi</th>
                    <th>Status</th>
                    <th>Keahlian</th>
                    <th>Bank</th>
                    <th>No Rekening</th>
                    <th>Atas Nama</th>
                    <th>QRIS</th>
                    <th>Foto</th>
                    {loginUser.role === "Pekerja" && (
                        <th>Aksi</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {jasa.length === 0 ? (
                    <tr>
                        <td
                            colSpan={loginUser.role === "Pekerja" ? 13 : 13}
                            style={{ textAlign: "center" }}
                        >
                            Belum ada data jasa
                        </td>
                    </tr>
                ) : (
                    jasa.map((item) => (
                        <tr key={item.id_jasa}>
                            <td>{item.id_jasa}</td>
                            {loginUser.role === "Pelanggan" && (
                                <td>{item.nama}</td>
                            )}
                            <td>{item.nama_jasa}</td>
                            <td>{item.kategori}</td>
                            <td>{formatRupiah(item.harga)}</td>
                            <td>{item.estimasi}</td>
                            <td>{item.status}</td>
                            <td>{item.keahlian}</td>
                            <td>{item.nama_bank}</td>
                            <td>{item.no_rekening}</td>
                            <td>{item.atas_nama}</td>
                            <td>{item.qris}</td>
                            <td>{item.foto}</td>
                            {loginUser.role === "Pekerja" && (
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => editJasa(item)}
                                    >
                                        Edit
                                    </button>
                                    {" "}
                                    <button
                                        type="button"
                                        onClick={() => hapusJasa(item.id_jasa)}
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

export default Jasa;