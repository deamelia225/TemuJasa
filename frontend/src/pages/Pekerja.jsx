import "../styles/Table.css";

function Pekerja(){
    const jasaPekerja=[
        {
            id:1,
            nama_jasa:"Service AC Bandung",
            lokasi:"Bandung",
            kategori:"Service AC",
            harga:120000,
            rating:4.8
        },
        {
            id:2,
            nama_jasa:"Cleaning Service Bandung",
            lokasi:"Bandung",
            kategori:"Cleaning Service",
            harga:75000,
            rating:4.9
        },
        {
            id:3,
            nama_jasa:"Tukang Listrik Bandung",
            lokasi:"Bandung",
            kategori:"Listrik",
            harga:100000,
            rating:4.7
        },
        {
            id:4,
            nama_jasa:"Plumbing Bandung",
            lokasi:"Bandung",
            kategori:"Plumbing",
            harga:90000,
            rating:4.8
        }
    ];

    return(
        <div className="page">
            <h1>Data Pekerja</h1>

            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama Jasa</th>
                    <th>Lokasi</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th>Rating</th>
                </tr>
                </thead>

                <tbody>
                {jasaPekerja.map(item=>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nama_jasa}</td>
                        <td>{item.lokasi}</td>
                        <td>{item.kategori}</td>
                        <td>Rp{item.harga.toLocaleString("id-ID")}</td>
                        <td>{item.rating}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Pekerja;
