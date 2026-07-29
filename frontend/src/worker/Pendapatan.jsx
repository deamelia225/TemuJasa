import{useEffect,useState}from"react";
import"../styles/Table.css";
function Pendapatan(){
    const[data,setData]=useState([]);
    const[total,setTotal]=useState(0);
    useEffect(()=>{
        loadData();
    },[]);
    const loadData=()=>{
        const user=JSON.parse(localStorage.getItem("user"))||{};
        const booking=JSON.parse(localStorage.getItem("booking"))||[];
        const selesai=booking.filter(item=>
            item.pemilik_jasa===user.nama&&
            item.status==="Selesai"&&
            item.status_pembayaran==="Sudah Bayar"
        );
        setData(selesai);
        setTotal(
            selesai.reduce(
                (total,item)=>total+Number(item.harga||0),
                0
            )
        );
    };
    return(
        <div className="page">
            <h1>Pendapatan</h1>
            <div className="income-card">
                <h2>
                    Total Pendapatan
                </h2>
                <h1>
                    Rp{total.toLocaleString("id-ID")}
                </h1>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>Customer</th>
                    <th>Jasa</th>
                    <th>Metode Pembayaran</th>
                    <th>Harga</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {data.length===0?(
                    <tr>
                        <td colSpan="6">
                            Belum ada pendapatan.
                        </td>
                    </tr>
                ):(
                    data.map(item=>(
                        <tr key={item.id}>
                            <td>{item.customer}</td>
                            <td>{item.nama_jasa}</td>
                            <td>{item.metode_pembayaran||"-"}</td>
                            <td>
                                Rp{Number(item.harga||0).toLocaleString("id-ID")}
                            </td>
                            <td>{item.tanggal}</td>
                            <td>
                                {item.status_pembayaran}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}
export default Pendapatan;