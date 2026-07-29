<<<<<<< HEAD
import express from"express";
import db from"../config/db.mjs";

const router=express.Router();

router.get("/",async(req,res)=>{
    try{
        const[rows]=await db.execute(`
            SELECT
                id_user,
                nama,
                username,
                email,
                role,
                no_hp,
                alamat
            FROM users
            ORDER BY id_user DESC
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
                id_user,
                nama,
                username,
                email,
                role,
                no_hp,
                alamat
            FROM users
            WHERE id_user=?
        `,[req.params.id]);
        res.json(rows[0]);
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
                id_user,
                nama,
                username,
                email,
                role,
                no_hp,
                alamat
            FROM users
            ORDER BY id_user DESC
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
                id_user,
                nama,
                username,
                email,
                role,
                no_hp,
                alamat
            FROM users
            WHERE id_user=?
        `,[req.params.id]);
        res.json(rows[0]);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

>>>>>>> bc0502961ea35b227441628e7da2cfa662999b71
export default router;