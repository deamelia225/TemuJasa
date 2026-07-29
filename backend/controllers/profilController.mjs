<<<<<<< HEAD
import db from "../config/db.mjs";
export const getProfil=async(req,res)=>{
    try{
        const[rows]=await db.execute(
            "SELECT id_user,nama,username,email,role FROM users LIMIT 1"
        );
        res.json(rows[0]);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
export const updateProfil=async(req,res)=>{
    try{
        await db.execute(
            "UPDATE users SET nama=?,username=?,email=? WHERE id_user=?",
            [
                req.body.nama,
                req.body.username,
                req.body.email,
                1
            ]
        );
        res.json({message:"Profil diperbarui"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
=======
import db from "../config/db.mjs";
export const getProfil=async(req,res)=>{
    try{
        const[rows]=await db.execute(
            "SELECT id_user,nama,username,email,role FROM users LIMIT 1"
        );
        res.json(rows[0]);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
export const updateProfil=async(req,res)=>{
    try{
        await db.execute(
            "UPDATE users SET nama=?,username=?,email=? WHERE id_user=?",
            [
                req.body.nama,
                req.body.username,
                req.body.email,
                1
            ]
        );
        res.json({message:"Profil diperbarui"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
>>>>>>> bc0502961ea35b227441628e7da2cfa662999b71
};