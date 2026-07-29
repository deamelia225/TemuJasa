<<<<<<< HEAD
import express from"express";
import db from"../config/db.mjs";

const router=express.Router();

router.get("/",async(req,res)=>{
    try{
        const[rows]=await db.execute(`
            SELECT
                j.id_jasa,
                j.id_pekerja,
                j.nama_jasa,
                j.kategori,
                j.deskripsi,
                j.harga,
                j.estimasi,
                j.foto,
                j.keahlian,
                j.status,
                u.nama AS pekerja
            FROM jasa j
                     LEFT JOIN pekerja p ON j.id_pekerja=p.id_pekerja
                     LEFT JOIN users u ON p.id_user=u.id_user
            ORDER BY j.id_jasa DESC
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
                j.id_jasa,
                j.id_pekerja,
                j.nama_jasa,
                j.kategori,
                j.deskripsi,
                j.harga,
                j.estimasi,
                j.foto,
                j.nama_bank,
                j.no_rekening,
                j.atas_nama,
                j.qris,
                j.keahlian,
                j.status,
                u.nama AS pekerja
            FROM jasa j
                     LEFT JOIN pekerja p ON j.id_pekerja=p.id_pekerja
                     LEFT JOIN users u ON p.id_user=u.id_user
            WHERE j.id_jasa=?
        `,[req.params.id]);

        if(rows.length===0){
            return res.status(404).json({message:"Jasa tidak ditemukan"});
        }

        res.json(rows[0]);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

router.post("/",async(req,res)=>{
    try{
        const{
            id_pekerja,
            nama_jasa,
            kategori,
            deskripsi,
            harga,
            estimasi,
            foto,
            nama_bank,
            no_rekening,
            atas_nama,
            qris,
            keahlian
        }=req.body;

        await db.execute(`
            INSERT INTO jasa(
                id_pekerja,
                nama_jasa,
                kategori,
                deskripsi,
                harga,
                estimasi,
                foto,
                nama_bank,
                no_rekening,
                atas_nama,
                qris,
                keahlian
            )
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?)
        `,[
            id_pekerja,
            nama_jasa,
            kategori,
            deskripsi,
            harga,
            estimasi,
            foto,
            nama_bank,
            no_rekening,
            atas_nama,
            qris,
            keahlian
        ]);

        res.json({message:"Jasa berhasil ditambahkan"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

router.put("/:id",async(req,res)=>{
    try{
        const{
            nama_jasa,
            kategori,
            deskripsi,
            harga,
            estimasi,
            foto,
            nama_bank,
            no_rekening,
            atas_nama,
            qris,
            keahlian,
            status
        }=req.body;

        await db.execute(`
UPDATE jasa
SET
nama_jasa=?,
kategori=?,
deskripsi=?,
harga=?,
estimasi=?,
foto=?,
nama_bank=?,
no_rekening=?,
atas_nama=?,
qris=?,
keahlian=?,
status=?
WHERE id_jasa=?
`,[
            nama_jasa,
            kategori,
            deskripsi,
            harga,
            estimasi,
            foto,
            nama_bank,
            no_rekening,
            atas_nama,
            qris,
            keahlian,
            status,
            req.params.id
        ]);

        res.json({message:"Jasa berhasil diperbarui"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

router.delete("/:id",async(req,res)=>{
    try{
        await db.execute(
            "DELETE FROM jasa WHERE id_jasa=?",
            [req.params.id]
        );

        res.json({message:"Jasa berhasil dihapus"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

=======
import express from"express";
import db from"../config/db.mjs";

const router=express.Router();

router.get("/",async(req,res)=>{
    try{
        const[rows]=await db.execute(`
            SELECT
                j.id_jasa,
                j.id_pekerja,
                j.nama_jasa,
                j.kategori,
                j.deskripsi,
                j.harga,
                j.estimasi,
                j.foto,
                j.keahlian,
                j.status,
                u.nama AS pekerja
            FROM jasa j
                     LEFT JOIN pekerja p ON j.id_pekerja=p.id_pekerja
                     LEFT JOIN users u ON p.id_user=u.id_user
            ORDER BY j.id_jasa DESC
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
                j.id_jasa,
                j.id_pekerja,
                j.nama_jasa,
                j.kategori,
                j.deskripsi,
                j.harga,
                j.estimasi,
                j.foto,
                j.nama_bank,
                j.no_rekening,
                j.atas_nama,
                j.qris,
                j.keahlian,
                j.status,
                u.nama AS pekerja
            FROM jasa j
                     LEFT JOIN pekerja p ON j.id_pekerja=p.id_pekerja
                     LEFT JOIN users u ON p.id_user=u.id_user
            WHERE j.id_jasa=?
        `,[req.params.id]);

        if(rows.length===0){
            return res.status(404).json({message:"Jasa tidak ditemukan"});
        }

        res.json(rows[0]);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

router.post("/",async(req,res)=>{
    try{
        const{
            id_pekerja,
            nama_jasa,
            kategori,
            deskripsi,
            harga,
            estimasi,
            foto,
            nama_bank,
            no_rekening,
            atas_nama,
            qris,
            keahlian
        }=req.body;

        await db.execute(`
            INSERT INTO jasa(
                id_pekerja,
                nama_jasa,
                kategori,
                deskripsi,
                harga,
                estimasi,
                foto,
                nama_bank,
                no_rekening,
                atas_nama,
                qris,
                keahlian
            )
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?)
        `,[
            id_pekerja,
            nama_jasa,
            kategori,
            deskripsi,
            harga,
            estimasi,
            foto,
            nama_bank,
            no_rekening,
            atas_nama,
            qris,
            keahlian
        ]);

        res.json({message:"Jasa berhasil ditambahkan"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

router.put("/:id",async(req,res)=>{
    try{
        const{
            nama_jasa,
            kategori,
            deskripsi,
            harga,
            estimasi,
            foto,
            nama_bank,
            no_rekening,
            atas_nama,
            qris,
            keahlian,
            status
        }=req.body;

        await db.execute(`
UPDATE jasa
SET
nama_jasa=?,
kategori=?,
deskripsi=?,
harga=?,
estimasi=?,
foto=?,
nama_bank=?,
no_rekening=?,
atas_nama=?,
qris=?,
keahlian=?,
status=?
WHERE id_jasa=?
`,[
            nama_jasa,
            kategori,
            deskripsi,
            harga,
            estimasi,
            foto,
            nama_bank,
            no_rekening,
            atas_nama,
            qris,
            keahlian,
            status,
            req.params.id
        ]);

        res.json({message:"Jasa berhasil diperbarui"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

router.delete("/:id",async(req,res)=>{
    try{
        await db.execute(
            "DELETE FROM jasa WHERE id_jasa=?",
            [req.params.id]
        );

        res.json({message:"Jasa berhasil dihapus"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

>>>>>>> bc0502961ea35b227441628e7da2cfa662999b71
export default router;