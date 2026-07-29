import{useState,useEffect}from"react";
import{Link}from"react-router-dom";
import"../styles/Jasa.css";

export default function Jasa(){
    const[search,setSearch]=useState("");
    const[kategori,setKategori]=useState("Semua");
    const[data,setData]=useState([]);

    useEffect(()=>{
        const jasa=
            JSON.parse(localStorage.getItem("jasa"))||[];

        setData(jasa);
    },[]);

    const filtered=data.filter(item=>{
        const cocokKategori=
            kategori==="Semua"||
            item.kategori===kategori;

        const cocokSearch=
            item.nama_jasa
                .toLowerCase()
                .includes(search.toLowerCase());

        return cocokKategori&&cocokSearch;
    });

    return(
        <div className="jasa-page">
            <div className="page-header">
                <h1>Jasa</h1>
                <p>Temukan jasa terbaik</p>
            </div>

            <input
                type="text"
                placeholder="Cari jasa..."
                className="search-input"
                value={search}
                onChange={e=>setSearch(e.target.value)}
            />

            <div className="kategori-filter">
                {[
                    "Semua",
                    "Elektronik",
                    "Kebersihan",
                    "Builder",
                    "Bangunan",
                    "Teknologi",
                    "Transportasi",
                    "Desain",
                    "Lainnya"
                ].map(item=>(
                    <button
                        key={item}
                        className={
                            kategori===item
                                ?"active"
                                :""
                        }
                        onClick={()=>setKategori(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div className="jasa-grid">
                {filtered.map(item=>(
                    <div
                        key={item.id}
                        className="jasa-card"
                    >
                        <img
                            src={item.gambar}
                            alt={item.nama_jasa}
                        />

                        <h3>
                            {item.nama_jasa}
                        </h3>

                        <p>
                            {item.kategori}
                        </p>

                        <p>
                            ⭐ {item.rating||0}
                        </p>

                        <h4>
                            Rp{Number(item.harga)
                            .toLocaleString("id-ID")}
                        </h4>

                        <Link
                            className="detail-btn"
                            to={`/detail/${item.id}`}
                        >
                            Lihat Detail
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
