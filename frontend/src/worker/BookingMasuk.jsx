import{useEffect,useState}from"react";
import"../styles/JasaSaya.css";

function BookingMasuk(){

    const[booking,setBooking]=useState([]);

    useEffect(()=>{
        loadBooking();
    },[]);

    const loadBooking=()=>{
        const dataBooking=JSON.parse(localStorage.getItem("booking"))||[];
        const currentUser=JSON.parse(localStorage.getItem("user"))||{};

        const bookingMasuk=dataBooking.filter(
            item=>item.pemilik_jasa===currentUser.nama
        );

        setBooking(bookingMasuk);
    };

    const terimaBooking=(id)=>{
        const dataBooking=JSON.parse(localStorage.getItem("booking"))||[];

        const updated=dataBooking.map(item=>
            item.id===id
                ?{...item,status:"Diterima"}
                :item
        );

        localStorage.setItem("booking",JSON.stringify(updated));
        loadBooking();
    };

    const tolakBooking=(id)=>{
        const dataBooking=JSON.parse(localStorage.getItem("booking"))||[];

        const updated=dataBooking.map(item=>
            item.id===id
                ?{...item,status:"Ditolak"}
                :item
        );

        localStorage.setItem("booking",JSON.stringify(updated));
        loadBooking();
    };

    const konfirmasiPembayaran=(id)=>{
        const dataBooking=JSON.parse(localStorage.getItem("booking"))||[];

        const updated=dataBooking.map(item=>
            item.id===id
                ?{...item,status_pembayaran:"Sudah Bayar"}
                :item
        );

        localStorage.setItem("booking",JSON.stringify(updated));
        loadBooking();
    };

    const selesaiBooking=(id)=>{
        const dataBooking=JSON.parse(localStorage.getItem("booking"))||[];

        const updated=dataBooking.map(item=>
            item.id===id
                ?{...item,status:"Selesai"}
                :item
        );

        localStorage.setItem("booking",JSON.stringify(updated));
        loadBooking();
    };

    return(
        <div className="page">
            <h1>Pesanan Masuk</h1>

            {booking.length===0?(
                <div className="empty-jasa">
                    Belum ada pesanan masuk.
                </div>
            ):(
                <div className="worker-jasa-grid">

                    {booking.map(item=>(
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

                                <p>
                                    <strong>Customer:</strong> {item.customer}
                                </p>

                                <p>
                                    <strong>Tanggal:</strong> {item.tanggal}
                                </p>

                                <p>
                                    <strong>Jam:</strong> {item.jam}
                                </p>

                                <p>
                                    <strong>Alamat:</strong> {item.alamat}
                                </p>

                                <p>
                                    <strong>Metode:</strong> {item.metode_pembayaran}
                                </p>

                                <p>
                                    <strong>Status:</strong> {item.status}
                                </p>

                                <p>
                                    <strong>Pembayaran:</strong> {item.status_pembayaran}
                                </p>

                                {item.status==="Menunggu"&&(
                                    <div className="card-actions">

                                        <button
                                            className="edit-btn"
                                            onClick={()=>terimaBooking(item.id)}
                                        >
                                            Terima
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={()=>tolakBooking(item.id)}
                                        >
                                            Tolak
                                        </button>

                                    </div>
                                )}

                                {item.status==="Diterima"&&item.status_pembayaran==="Menunggu Konfirmasi"&&(
                                    <button
                                        className="edit-btn"
                                        style={{width:"100%"}}
                                        onClick={()=>konfirmasiPembayaran(item.id)}
                                    >
                                        Konfirmasi Pembayaran
                                    </button>
                                )}

                                {item.status==="Diterima"&&item.status_pembayaran==="Sudah Bayar"&&(
                                    <button
                                        className="edit-btn"
                                        style={{width:"100%"}}
                                        onClick={()=>selesaiBooking(item.id)}
                                    >
                                        Selesaikan Pekerjaan
                                    </button>
                                )}

                                {item.status==="Selesai"&&(
                                    <button
                                        className="edit-btn"
                                        style={{width:"100%"}}
                                    >
                                        Pekerjaan Selesai
                                    </button>
                                )}

                                {item.status==="Ditolak"&&(
                                    <button
                                        className="delete-btn"
                                        style={{width:"100%"}}
                                    >
                                        Booking Ditolak
                                    </button>
                                )}

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}

export default BookingMasuk;