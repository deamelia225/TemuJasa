import{useEffect,useState}from"react";
import"../styles/Table.css";
function RiwayatBookingPekerja(){
    const[data,setData]=useState([]);
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("user"));
        const booking=JSON.parse(localStorage.getItem("booking"))||[];
        setData(
            booking.filter(item=>
                item.pemilik_jasa===user?.nama&&item.status==="Selesai"
            )
        );
    },[]);
    return(
        <div className="page">
            <h1>Riwayat Pekerjaan</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Customer</th>
                    <th>Jasa</th>
                    <th>Tanggal</th>
                    <th>Harga</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item=>(
                    <tr key={item.id}>
                        <td>{item.customer}</td>
                        <td>{item.nama_jasa}</td>
                        <td>{item.tanggal}</td>
                        <td>Rp{Number(item.harga).toLocaleString("id-ID")}</td>
                        <td>{item.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default RiwayatBookingPekerja;