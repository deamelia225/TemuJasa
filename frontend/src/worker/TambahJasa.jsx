import{useState}from"react";
import{useNavigate}from"react-router-dom";
import"../styles/FormJasa.css";
import elektronik from"../assets/services/elektronik.jpg";
import kebersihan from"../assets/services/kebersihan.jpg";
import builder from"../assets/services/builder.jpg";
import bangunan from"../assets/services/bangunan.jpg";
import teknologi from"../assets/services/teknologi.jpg";
import transportasi from"../assets/services/transportasi.jpg";
import desain from"../assets/services/desain.jpg";
import lainnya from"../assets/services/lainnya.jpg";

function TambahJasa(){
    const navigate=useNavigate();

    const[data,setData]=useState({
        nama_jasa:"",
        kategori:"",
        harga:"",
        alamat:"",
        deskripsi:""
    });

    const change=e=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        });
    };

    const submit=e=>{
        e.preventDefault();

        const user=
            JSON.parse(localStorage.getItem("user"))||{};

        const jasa=
            JSON.parse(localStorage.getItem("jasa"))||[];

        const gambarKategori={
            Elektronik:elektronik,
            Kebersihan:kebersihan,
            Builder:builder,
            Bangunan:bangunan,
            Teknologi:teknologi,
            Transportasi:transportasi,
            Desain:desain,
            Lainnya:lainnya
        };

        jasa.push({
            id:Date.now(),
            nama_jasa:data.nama_jasa,
            kategori:data.kategori,
            harga:Number(data.harga),
            alamat:data.alamat,
            deskripsi:data.deskripsi,
            pemilik:user.nama,
            gambar:gambarKategori[data.kategori]||"https://via.placeholder.com/400x250",
            rating:0,
            totalBooking:0
        });

        localStorage.setItem(
            "jasa",
            JSON.stringify(jasa)
        );

        alert("Jasa berhasil ditambahkan");
        navigate("/jasa-saya");
    };

    return(
        <div className="page">
            <form className="form-card" onSubmit={submit}>
                <h1>Tambah Jasa Baru</h1>
                <input type="text" name="nama_jasa" placeholder="Nama Jasa" value={data.nama_jasa} onChange={change} required/>
                <select name="kategori" value={data.kategori} onChange={change} required>
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
                <input type="number" name="harga" placeholder="Harga Jasa (contoh: 150000)" value={data.harga} onChange={change} required/>
                <input type="text" name="alamat" placeholder="Alamat Lokasi Jasa" value={data.alamat} onChange={change} required/>
                <textarea name="deskripsi" rows="5" placeholder="Deskripsi Jasa" value={data.deskripsi} onChange={change} required/>
                <button type="submit">Simpan Jasa</button>
            </form>
        </div>
    );
}

export default TambahJasa;