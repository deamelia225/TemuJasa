import{useState}from"react";
import{useNavigate,useParams}from"react-router-dom";
import"../styles/BookingForm.css"

function BookingForm(){
    const{id}=useParams();
    const navigate=useNavigate();
    const[jasa,setJasa]=useState(null);
    const[tanggal,setTanggal]=useState("");
    const[jam,setJam]=useState("");
    const[alamat,setAlamat]=useState("");
    const[metode,setMetode]=useState("");
    useState(()=>{
        const data=JSON.parse(localStorage.getItem("jasa"))||[];
        const pilih=data.find(item=>String(item.id)===String(id));
        setJasa(pilih);
    },[id]);
    constsubmit=(e)=>{
        e.preventDefault();
        const user=JSON.parse(localStorage.getItem("user"));
        const booking=JSON.parse(localStorage.getItem("booking"))||[];
        const dataBaru={
            id:Date.now(),
            nama_jasa:jasa?.nama,
            customer:user?.nama,
            pemilik_jasa:jasa?.pemilik_jasa,
            tanggal,
            jam,
            alamat,
            harga:jasa?.harga,
            metode_pembayaran:metode,
            status:"Menunggu Konfirmasi",
            status_pembayaran:"Belum Bayar",
            rating:0,
            ulasan:""
        };
        localStorage.setItem("booking",JSON.stringify([...booking,dataBaru]));
        navigate("/booking");
    };
    return(
        <div className="booking-form-page">
            <div className="booking-form-card">
                <h1>Booking Jasa</h1>
                {jasa&&(
                    <>
                        <div className="booking-info">
                            <h2>{jasa.nama}</h2>
                            <p>Harga : Rp{Number(jasa.harga).toLocaleString("id-ID")}</p>
                        </div>
                        <form onSubmit={submit}>
                            <label>Tanggal</label>
                            <input type="date" value={tanggal} onChange={e=>setTanggal(e.target.value)} required/>
                            <label>Jam</label>
                            <input type="time" value={jam} onChange={e=>setJam(e.target.value)} required/>
                            <label>Alamat Pengerjaan</label>
                            <textarea value={alamat} onChange={e=>setAlamat(e.target.value)} placeholder="Masukkan alamat lengkap" required/>
                            <label>Metode Pembayaran</label>
                            <select value={metode} onChange={e=>setMetode(e.target.value)} required>
                                <option value="">Pilih Pembayaran</option>
                                <option value="Transfer Bank">Transfer Bank</option>
                                <option value="QRIS">QRIS</option>
                                <option value="Cash">Cash</option>
                            </select>
                            <button className="btn-booking">Buat Booking</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
export default BookingForm;