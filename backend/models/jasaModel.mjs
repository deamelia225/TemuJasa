import db from"../config/db.mjs";
const Jasa={
    getAll:async()=>{
        const[rows]=await db.execute("SELECT * FROM jasa");
        return rows;
    },
    getById:async(id)=>{
        const[rows]=await db.execute("SELECT * FROM jasa WHERE id_jasa=?",[id]);
        return rows[0];
    },
    getRekomendasi:async()=>{
        const[rows]=await db.execute(`
            SELECT
                j.id_jasa,
                j.nama_jasa,
                j.deskripsi,
                j.harga,
                j.rating,
                COUNT(b.id_booking) AS jumlah_booking
            FROM jasa j
                     LEFT JOIN booking b ON j.id_jasa=b.id_jasa
            GROUP BY j.id_jasa
            ORDER BY j.rating DESC,jumlah_booking DESC
                LIMIT 3
        `);
        return rows;
    }
};
export default Jasa;