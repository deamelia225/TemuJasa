import{useEffect,useState}from"react";
import{useNavigate}from"react-router-dom";
import"../styles/BookingSaya.css";

function BookingSaya(){

    const[data,setData]=useState([]);
    const navigate=useNavigate();

    const loadBooking=()=>{
        const user=JSON.parse(localStorage.getItem("user"))||{};
        const booking=JSON.parse(localStorage.getItem("booking"))||[];

        setData(
            booking.filter(
                item=>item.customer===user.nama
            )
        );
    };

    useEffect(()=>{
        loadBooking();
    },[]);

    const bayar=(id)=>{
        const booking=JSON.parse(localStorage.getItem("booking"))||[];

        const updated=booking.map(item=>
            item.id===id
                ?{
                    ...item,
                    status_pembayaran:"Menunggu Konfirmasi"
                }
                :item
        );

        localStorage.setItem("booking",JSON.stringify(updated));

        loadBooking();
    };

    const ulasan=(id)=>{
        navigate(`/ulasan?id=${id}`);
    };

    return(
        <div className="booking-page">

            <h1>Booking Saya</h1>

            <div className="booking-list">

                {data.length===0&&(
                    <div className="empty-card">
                        Belum ada booking.
                    </div>
                )}

                {data.map(item=>(
                    <div className="booking-card" key={item.id}>

                        <div className="booking-header">
                            <h2>{item.nama_jasa}</h2>
                            <span>{item.status}</span>
                        </div>

                        <div className="booking-content">
                            <p>{item.tanggal}</p>
                            <p>{item.jam}</p>
                            <p>{item.alamat}</p>
                            <p>{item.metode_pembayaran}</p>

                            <h3>
                                Rp{Number(item.harga||0).toLocaleString("id-ID")}
                            </h3>
                        </div>

                        <div className="payment-status">
                            <p>Status Pembayaran</p>
                            <strong>
                                {item.status_pembayaran}
                            </strong>
                        </div>

                        <div className="booking-action">

                            {item.status==="Diterima"&&item.status_pembayaran==="Belum Bayar"&&(
                                <button
                                    className="btn-bayar"
                                    onClick={()=>bayar(item.id)}
                                >
                                    Bayar Sekarang
                                </button>
                            )}

                            {item.status_pembayaran==="Menunggu Konfirmasi"&&(
                                <button className="btn-wait">
                                    Menunggu Konfirmasi
                                </button>
                            )}

                            {item.status_pembayaran==="Sudah Bayar"&&item.status!=="Selesai"&&(
                                <button className="btn-wait">
                                    Pembayaran Dikonfirmasi
                                </button>
                            )}

                            {item.status==="Selesai"&&!item.rating&&(
                                <button
                                    className="btn-bayar"
                                    onClick={()=>ulasan(item.id)}
                                >
                                    Beri Ulasan
                                </button>
                            )}

                            {item.rating>0&&(
                                <div className="hasil-ulasan">
                                    ⭐ {item.rating}/5
                                    <br/>
                                    {item.ulasan}
                                </div>
                            )}

                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}

export default BookingSaya;
