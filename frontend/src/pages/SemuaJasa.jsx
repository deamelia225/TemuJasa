import {useState} from "react";
import {Link} from "react-router-dom";
import cleaningService from "../assets/services/cleaning-service.png";
import serviceAc from "../assets/services/service-ac.png";
import serviceLaptop from "../assets/services/service-laptop.png";
import tukangBangunan from "../assets/services/tukang-bangunan.png";
import tukangListrik from "../assets/services/tukang-listrik.png";
import plumbing from "../assets/services/plumbing.png";
import pindahan from "../assets/services/pindahan.png";
import catRumah from "../assets/services/cat-rumah.png";
import "../styles/SemuaJasa.css";

export default function SemuaJasa(){
    const[kategori,setKategori]=useState("Semua");

    const jasaList=[
        {id:1,nama:"Cleaning Service Rumah",kategori:"Cleaning Service",harga:75000,lokasi:"Jakarta Selatan",rating:4.9,gambar:cleaningService},
        {id:2,nama:"Service AC",kategori:"Service AC",harga:120000,lokasi:"Jakarta Timur",rating:4.8,gambar:serviceAc},
        {id:3,nama:"Service Laptop",kategori:"Service Laptop",harga:150000,lokasi:"Jakarta Barat",rating:4.9,gambar:serviceLaptop},
        {id:4,nama:"Tukang Bangunan",kategori:"Tukang Bangunan",harga:200000,lokasi:"Depok",rating:4.7,gambar:tukangBangunan},
        {id:5,nama:"Tukang Listrik",kategori:"Tukang Listrik",harga:100000,lokasi:"Bekasi",rating:4.8,gambar:tukangListrik},
        {id:6,nama:"Plumbing",kategori:"Plumbing",harga:95000,lokasi:"Bogor",rating:4.8,gambar:plumbing},
        {id:7,nama:"Jasa Pindahan",kategori:"Pindahan",harga:300000,lokasi:"Jakarta Utara",rating:4.9,gambar:pindahan},
        {id:8,nama:"Cat Rumah",kategori:"Cat Rumah",harga:250000,lokasi:"Tangerang",rating:4.8,gambar:catRumah}
    ];

    const filtered=kategori==="Semua"?jasaList:jasaList.filter(item=>item.kategori===kategori);

    return(
        <div className="semuajasa-page">
            <div className="page-header">
                <h1>Semua Jasa</h1>
                <p>Pilih jasa sesuai kebutuhan Anda</p>
            </div>

            <div className="kategori-filter">
                <button onClick={()=>setKategori("Semua")} className={kategori==="Semua"?"active":""}>Semua</button>
                <button onClick={()=>setKategori("Cleaning Service")} className={kategori==="Cleaning Service"?"active":""}>Cleaning</button>
                <button onClick={()=>setKategori("Service AC")} className={kategori==="Service AC"?"active":""}>AC</button>
                <button onClick={()=>setKategori("Service Laptop")} className={kategori==="Service Laptop"?"active":""}>Laptop</button>
                <button onClick={()=>setKategori("Tukang Bangunan")} className={kategori==="Tukang Bangunan"?"active":""}>Bangunan</button>
                <button onClick={()=>setKategori("Tukang Listrik")} className={kategori==="Tukang Listrik"?"active":""}>Listrik</button>
                <button onClick={()=>setKategori("Plumbing")} className={kategori==="Plumbing"?"active":""}>Plumbing</button>
            </div>

            <div className="jasa-grid">
                {filtered.map(item=>(
                    <div className="jasa-card" key={item.id}>
                        <img src={item.gambar} alt={item.nama}/>
                        <div className="jasa-content">
                            <h3>{item.nama}</h3>
                            <p>{item.lokasi}</p>
                            <span className="rating">⭐ {item.rating}</span>
                            <h4>Rp{item.harga.toLocaleString("id-ID")}</h4>
                            <Link to={`/detail/${item.id}`} className="lihat-btn">Lihat Detail</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}