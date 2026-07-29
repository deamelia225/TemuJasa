import express from"express";
import db from"../config/db.mjs";

const router=express.Router();

router.get("/",async(req,res)=>{
    try{
        const[rows]=await db.execute(`
SELECT
p.id_pembayaran,
p.id_booking,
p.metode_pembayaran,
p.total_bayar,
p.tanggal_bayar,
p.status,
j.nama_jasa
FROM pembayaran p
LEFT JOIN booking b ON p.id_booking=b.id_booking
LEFT JOIN jasa j ON b.id_jasa=j.id_jasa
ORDER BY p.id_pembayaran DESC
`);
        res.json(rows);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

router.post("/",async(req,res)=>{
    try{
        const{
            id_booking,
            metode_pembayaran,
            total_bayar,
            tanggal_bayar
        }=req.body;

        await db.execute(`
INSERT INTO pembayaran(
id_booking,
metode_pembayaran,
total_bayar,
tanggal_bayar
)
VALUES(?,?,?,?)
`,[
            id_booking,
            metode_pembayaran,
            total_bayar,
            tanggal_bayar
        ]);

        res.json({message:"Pembayaran berhasil"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

export default router;