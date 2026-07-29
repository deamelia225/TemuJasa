import express from"express";
import db from"../config/db.mjs";

const router=express.Router();

router.get("/",async(req,res)=>{
    try{
        const[rows]=await db.execute(`
            SELECT
                b.id_booking,
                b.id_user,
                b.id_jasa,
                b.tanggal_booking,
                b.jam_booking,
                b.alamat,
                b.keluhan,
                b.status,
                j.nama_jasa,
                j.harga,
                u.nama
            FROM booking b
                     JOIN jasa j ON b.id_jasa=j.id_jasa
                     JOIN users u ON b.id_user=u.id_user
            ORDER BY b.id_booking DESC
        `);
        res.json(rows);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

router.get("/:id",async(req,res)=>{
    try{
        const[rows]=await db.execute(`
            SELECT
                b.*,
                j.nama_jasa,
                j.harga,
                u.nama
            FROM booking b
                     JOIN jasa j ON b.id_jasa=j.id_jasa
                     JOIN users u ON b.id_user=u.id_user
            WHERE b.id_booking=?
        `,[req.params.id]);
        res.json(rows[0]);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

router.post("/",async(req,res)=>{
    try{
        const{
            id_user,
            id_jasa,
            tanggal_booking,
            jam_booking,
            alamat,
            keluhan
        }=req.body;

        const[result]=await db.execute(`
            INSERT INTO booking(
                id_user,
                id_jasa,
                tanggal_booking,
                jam_booking,
                alamat,
                keluhan
            )
            VALUES(?,?,?,?,?,?)
        `,[
            id_user,
            id_jasa,
            tanggal_booking,
            jam_booking,
            alamat,
            keluhan
        ]);

        await db.execute(`
            INSERT INTO riwayat_booking(
                id_booking,
                status
            )
            VALUES(?,?)
        `,[
            result.insertId,
            "Menunggu"
        ]);

        res.json({
            message:"Booking berhasil"
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

router.put("/:id",async(req,res)=>{
    try{
        const{status}=req.body;

        await db.execute(`
            UPDATE booking
            SET status=?
            WHERE id_booking=?
        `,[
            status,
            req.params.id
        ]);

        await db.execute(`
            INSERT INTO riwayat_booking(
                id_booking,
                status
            )
            VALUES(?,?)
        `,[
            req.params.id,
            status
        ]);

        res.json({
            message:"Status booking berhasil diperbarui"
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

export default router;