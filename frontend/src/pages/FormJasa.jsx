import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FormJasa.css";

import elektronik from "../assets/services/elektronik.jpg";
import kebersihan from "../assets/services/kebersihan.jpg";
import builder from "../assets/services/builder.jpg";
import bangunan from "../assets/services/bangunan.jpg";
import teknologi from "../assets/services/teknologi.jpg";
import transportasi from "../assets/services/transportasi.jpg";
import desain from "../assets/services/desain.jpg";
import lainnya from "../assets/services/lainnya.jpg";

function FormJasa() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        nama_jasa: "",
        kategori: "",
        harga: "",
        deskripsi: ""
    });

    const change = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const submit = (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user")) || {};
        const jasa = JSON.parse(localStorage.getItem("jasa")) || [];

        let gambar = lainnya;

        switch (data.kategori) {
            case "Elektronik":
                gambar = elektronik;
                break;
            case "Kebersihan":
                gambar = kebersihan;
                break;
            case "Builder":
                gambar = builder;
                break;
            case "Bangunan":
                gambar = bangunan;
                break;
            case "Teknologi":
                gambar = teknologi;
                break;
            case "Transportasi":
                gambar = transportasi;
                break;
            case "Desain":
                gambar = desain;
                break;
            case "Lainnya":
                gambar = lainnya;
                break;
            default:
                gambar = lainnya;
        }

        jasa.push({
            id: Date.now(),
            nama_jasa: data.nama_jasa,
            kategori: data.kategori,
            harga: data.harga,
            deskripsi: data.deskripsi,
            pemilik: user.nama,
            gambar: gambar,
            rating: 0,
            totalBooking: 0
        });

        localStorage.setItem("jasa", JSON.stringify(jasa));

        navigate("/jasa-saya");
    };

    return (
        <div className="page">
            <form className="form-card" onSubmit={submit}>
                <h1>Tambah Jasa</h1>

                <input
                    type="text"
                    name="nama_jasa"
                    placeholder="Nama Jasa"
                    value={data.nama_jasa}
                    onChange={change}
                    required
                />

                <select
                    name="kategori"
                    value={data.kategori}
                    onChange={change}
                    required
                >
                    <option value="">Pilih Kategori</option>
                    <option value="Elektronik">Elektronik</option>
                    <option value="Kebersihan">Kebersihan</option>
                    <option value="Builder">Builder</option>
                    <option value="Bangunan">Bangunan</option>
                    <option value="Teknologi">Teknologi</option>
                    <option value="Transportasi">Transportasi</option>
                    <option value="Desain">Desain</option>
                    <option value="Lainnya">Lainnya</option>
                </select>

                <input
                    type="number"
                    name="harga"
                    placeholder="Harga"
                    value={data.harga}
                    onChange={change}
                    required
                />

                <textarea
                    name="deskripsi"
                    placeholder="Deskripsi Jasa"
                    value={data.deskripsi}
                    onChange={change}
                    rows="5"
                    required
                />

                <button type="submit">
                    Simpan Jasa
                </button>
            </form>
        </div>
    );
}

export default FormJasa;