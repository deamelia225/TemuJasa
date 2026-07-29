import{useEffect,useState}from"react";
import{Link}from"react-router-dom";
import"../styles/JasaSaya.css";

function JasaSaya(){
    const[data,setData]=useState([]);

    const loadData=()=>{
        const user=JSON.parse(localStorage.getItem("user"))||{};
        const jasa=JSON.parse(localStorage.getItem("jasa"))||[];
        setData(jasa.filter(item=>item.pemilik===user.nama));
    };

    useEffect(()=>{
        loadData();
    },[]);

    const hapus=id=>{
        const jasa=JSON.parse(localStorage.getItem("jasa"))||[];
        const hasil=jasa.filter(item=>item.id!==id);
        localStorage.setItem("jasa",JSON.stringify(hasil));
        loadData();
    };

    return(
        <div className="page">
            <h1>Jasa Saya</h1>

            {data.length===0?(
                <div className="empty-jasa">
                    Anda belum memiliki jasa.
                </div>
            ):(
                <div className="worker-jasa-grid">
                    {data.map(item=>(
                        <div
                            className="worker-jasa-card"
                            key={item.id}
                        >
                            <img
                                src={item.gambar}
                                alt={item.nama_jasa}
                            />

                            <div className="worker-jasa-content">
                                <h3>{item.nama_jasa}</h3>

                                <p className="jasa-kategori">
                                    {item.kategori}
                                </p>

                                <p className="jasa-deskripsi">
                                    {item.deskripsi}
                                </p>

                                <p>
                                    ⭐ {item.rating||0}
                                </p>

                                <p>
                                    {item.totalBooking||0} Booking
                                </p>

                                <h4>
                                    Rp{Number(item.harga).toLocaleString("id-ID")}
                                </h4>

                                <div className="card-actions">
                                    <Link
                                        className="edit-btn"
                                        to={`/kelola-jasa/${item.id}`}
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="delete-btn"
                                        onClick={()=>hapus(item.id)}
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default JasaSaya;