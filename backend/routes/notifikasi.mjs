import express from "express";
import db from "../config/db.mjs";

const router=express.Router();

router.get("/",async(req,res)=>{
    try{
        const[rows]=await db.execute(`
SELECT
id_notifikasi,
id_user,
judul,
pesan,
tanggal,
status
FROM notifikasi
ORDER BY tanggal DESC
`);
        res.json(rows);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

router.post("/",async(req,res)=>{
    try{
        const{
            id_user,
            judul,
            pesan
        }=req.body;

        await db.execute(`
INSERT INTO notifikasi(
id_user,
judul,
pesan,
tanggal
)
VALUES(?,?,?,NOW())
`,[
            id_user,
            judul,
            pesan
        ]);

        res.json({
            message:"Notifikasi berhasil ditambahkan"
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

export default router;