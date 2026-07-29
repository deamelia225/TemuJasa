<<<<<<< HEAD
import db from "../config/db.mjs";
export const getAllPekerja=async(req,res)=>{
    try{
        const[rows]=await db.execute(
            "SELECT users.id_user,users.nama,users.email,users.no_hp,pekerja.keahlian,pekerja.pengalaman,pekerja.status FROM users,pekerja WHERE users.id_user=pekerja.id_user"
        );
        res.json({
            success:true,
            data:rows
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
export const updateStatusPekerja=async(req,res)=>{
    try{
        const{status}=req.body;
        await db.execute(
            "UPDATE pekerja SET status=? WHERE id_user=?",
            [status,req.params.id]
        );
        res.json({
            success:true,
            message:"Status pekerja diperbarui"
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
=======
import db from "../config/db.mjs";
export const getAllPekerja=async(req,res)=>{
    try{
        const[rows]=await db.execute(
            "SELECT users.id_user,users.nama,users.email,users.no_hp,pekerja.keahlian,pekerja.pengalaman,pekerja.status FROM users,pekerja WHERE users.id_user=pekerja.id_user"
        );
        res.json({
            success:true,
            data:rows
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
export const updateStatusPekerja=async(req,res)=>{
    try{
        const{status}=req.body;
        await db.execute(
            "UPDATE pekerja SET status=? WHERE id_user=?",
            [status,req.params.id]
        );
        res.json({
            success:true,
            message:"Status pekerja diperbarui"
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
>>>>>>> bc0502961ea35b227441628e7da2cfa662999b71
};