import db from "../config/db.mjs";

export const getAllNotifikasi=async(req,res)=>{
    try{
        const[rows]=await db.execute("SELECT * FROM notifikasi");
        res.json(rows);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};