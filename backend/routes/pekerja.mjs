import express from"express";
import db from"../config/db.mjs";

const router=express.Router();

router.get("/",async(req,res)=>{
    try{
        const[rows]=await db.execute(`
SELECT
p.id_pekerja,
u.nama,
p.keahlian,
p.pengalaman,
p.nama_bank,
p.no_rekening,
p.atas_nama,
p.qris,
p.status
FROM pekerja p
JOIN users u ON p.id_user=u.id_user
ORDER BY p.id_pekerja DESC
`);
        res.json(rows);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

export default router;