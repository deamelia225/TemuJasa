import{useParams,useNavigate}from"react-router-dom";
import{useState}from"react";
import"../styles/DetailJasa.css";

export default function DetailJasa(){
    const{id}=useParams();
    const navigate=useNavigate();
    const jasaList=JSON.parse(localStorage.getItem("jasa"))||[];
    const jasa=jasaList.find(item=>String(item.id)===String(id));
    const[tanggal,setTanggal]=useState("");
    const[jam,setJam]=useState("");
    const[alamat,setAlamat]=useState("");
    const[metode,setMetode]=useState("");

    if(!jasa){
        return<h2>Jasa tidak ditemukan</h2>;
    }

    const handleBooking=()=>{
        if(!tanggal||!jam||!alamat||!metode){
            alert("Lengkapi data booking");
            return;
        }

        const user=JSON.parse(localStorage.getItem("user"))||{};
        const booking=JSON.parse(localStorage.getItem("booking"))||[];

        booking.push({
            id:Date.now(),
            jasaId:jasa.id,
            nama_jasa:jasa.nama_jasa,
            gambar:jasa.gambar,
            kategori:jasa.kategori,
            harga:Number(jasa.harga),
            tanggal,
            jam,
            alamat,
            customer:user.nama,
            pemilik_jasa:jasa.pemilik,
            metode_pembayaran:metode,
            status:"Menunggu",
            status_pembayaran:"Belum Bayar",
            rating:0,
            ulasan:""
        });

        localStorage.setItem("booking",JSON.stringify(booking));

        alert("Booking berhasil dibuat");
        navigate("/booking");
    };

    return(
        <div className="detail-page">
            <div className="detail-card">
                <div className="detail-left">
                    <img
                        src={jasa.gambar}
                        alt={jasa.nama_jasa}
                        className="detail-image"
                    />
                </div>

                <div className="detail-right">
                    <h1>{jasa.nama_jasa}</h1>

                    <p className="rating">
                        ⭐ {jasa.rating||0}
                    </p>

                    <h2 className="harga">
                        Rp{Number(jasa.harga).toLocaleString("id-ID")}
                    </h2>

                    <p className="deskripsi">
                        {jasa.deskripsi}
                    </p>

                    <hr/>

                    <h3>Form Booking</h3>

                    <input
                        type="date"
                        value={tanggal}
                        onChange={e=>setTanggal(e.target.value)}
                    />

                    <input
                        type="time"
                        value={jam}
                        onChange={e=>setJam(e.target.value)}
                    />

                    <textarea
                        rows="4"
                        placeholder="Alamat lengkap"
                        value={alamat}
                        onChange={e=>setAlamat(e.target.value)}
                    />

                    <select
                        className="booking-select"
                        value={metode}
                        onChange={e=>setMetode(e.target.value)}
                    >
                        <option value="">
                            Pilih Metode Pembayaran
                        </option>
                        <option value="Transfer Bank">
                            Transfer Bank
                        </option>
                        <option value="QRIS">
                            QRIS
                        </option>
                        <option value="Cash">
                            Cash
                        </option>
                    </select>

                    <button
                        className="booking-btn"
                        onClick={handleBooking}
                    >
                        Booking Sekarang
                    </button>

                </div>
            </div>
        </div>
    );
}