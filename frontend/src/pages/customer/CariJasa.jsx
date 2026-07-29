import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/CariJasa.css";

function CariJasa(){
    const [search,setSearch]=useState("");
    const [services,setServices]=useState([]);

    useEffect(()=>{
        const allJasa=JSON.parse(localStorage.getItem("jasa"))||[];
        setServices(allJasa);
    },[]);

    const filtered=services.filter(item=>
        item.nama_jasa?.toLowerCase().includes(search.toLowerCase())||
        item.kategori?.toLowerCase().includes(search.toLowerCase())
    );

    return(
        <div className="cari-jasa-page">
            <div className="page-header">
                <h1>Cari Jasa</h1>
                <p>Temukan tenaga jasa sesuai kebutuhan Anda</p>
            </div>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Cari jasa..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
            </div>

            <div className="service-grid">
                {filtered.length===0?(
                    <div className="empty-data">
                        Belum ada jasa tersedia
                    </div>
                ):(
                    filtered.map(item=>(
                        <div className="service-card" key={item.id}>
                            <img
                                src={item.gambar}
                                alt={item.nama_jasa}
                            />

                            <div className="service-content">
                                <h3>{item.nama_jasa}</h3>

                                <p className="service-category">
                                    {item.kategori}
                                </p>

                                <p>{item.alamat}</p>

                                <div className="service-meta">
                                    <span>
                                        ⭐ {item.rating||0}
                                    </span>

                                    <span>
                                        Rp {Number(item.harga).toLocaleString("id-ID")}
                                    </span>
                                </div>

                                <Link
                                    to={`/detail-jasa/${item.id}`}
                                    className="detail-btn"
                                >
                                    Lihat Detail
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CariJasa;