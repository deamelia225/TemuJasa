import{useEffect,useState}from"react";
import{useNavigate,useSearchParams}from"react-router-dom";
import"../../styles/Pembayaran.css";
function Pembayaran(){
    const[searchParams]=useSearchParams();
    const navigate=useNavigate();
    const[data,setData]=useState(null);
    const[metode,setMetode]=useState("");
    useEffect(()=>{
        const id=searchParams.get("id");
        const booking=JSON.parse(localStorage.getItem("booking"))||[];
        const pilih=booking.find(item=>String(item.id)===String(id));
        setData(pilih);
    },[searchParams]);
    const bayar=()=>{
        if(!metode){
            alert("Silahkan pilih metode pembayaran");
            return;
        }
        const booking=JSON.parse(localStorage.getItem("booking"))||[];
        const update=booking.map(item=>{
            if(item.id===data.id){
                return{
                    ...item,
                    metode_pembayaran:metode,
                    status_pembayaran:"Menunggu Konfirmasi"
                };
            }
            return item;
        });
        localStorage.setItem("booking",JSON.stringify(update));
        alert("Pembayaran berhasil dikirim");
        navigate("/booking");
    };
    if(!data){
        return(
            <div className="payment-page">
                <div className="payment-card">
                    <h2>Data pembayaran tidak ditemukan</h2>
                </div>
            </div>
        );
    }
    return(
        <div className="payment-page">
            <div className="payment-card">
                <h1>Pembayaran</h1>
                <div className="payment-info">
                    <img src={data.gambar} alt={data.nama_jasa}/>
                    <h2>{data.nama_jasa}</h2>
                    <p>Alamat pengerjaan:</p>
                    <strong>{data.alamat}</strong>
                    <p>Total pembayaran:</p>
                    <h3>Rp{Number(data.harga||0).toLocaleString("id-ID")}</h3>
                </div>
                <div className="payment-method">
                    <h3>Pilih Metode Pembayaran</h3>
                    <label>
                        <input type="radio" name="metode" value="Transfer Bank" onChange={(e)=>setMetode(e.target.value)}/>
                        Transfer Bank
                    </label>
                    <label>
                        <input type="radio" name="metode" value="QRIS" onChange={(e)=>setMetode(e.target.value)}/>
                        QRIS
                    </label>
                    <label>
                        <input type="radio" name="metode" value="Cash" onChange={(e)=>setMetode(e.target.value)}/>
                        Cash
                    </label>
                </div>
                <button className="btn-payment" onClick={bayar}>
                    Bayar Sekarang
                </button>
            </div>
        </div>
    );
}
export default Pembayaran;
