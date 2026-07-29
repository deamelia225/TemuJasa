import"../styles/Service.css";

function ServiceCard({data,onClick}){
    return(
        <div className="service-card">
            <div className="service-image">TemuJasa</div>
            <h3>{data.nama_jasa}</h3>
            <p>{data.deskripsi}</p>
            <p className="price">Rp {data.harga}</p>
            <p>Pekerja: {data.nama_pekerja}</p>
            <button onClick={onClick}>Booking</button>
        </div>
    )
}
export default ServiceCard;