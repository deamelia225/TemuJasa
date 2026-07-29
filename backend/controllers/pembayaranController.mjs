<<<<<<< HEAD
import db from "../config/db.mjs";

export const getAllPembayaran=async(req,res)=>{
    try{
        const[rows]=await db.execute("SELECT * FROM pembayaran");
        res.json(rows);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

export const createPembayaran=async(req,res)=>{
    try{
        const{
            id_booking,
            metode,
            jumlah,
            status
        }=req.body;
        await db.execute(
            "INSERT INTO pembayaran(id_booking,metode,jumlah,status) VALUES(?,?,?,?)",
            [id_booking,metode,jumlah,status]
        );
        res.json({message:"Pembayaran berhasil"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
=======
import db from "../config/db.mjs";

export const getAllPembayaran=async(req,res)=>{
    try{
        const[rows]=await db.execute("SELECT * FROM pembayaran");
        res.json(rows);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

export const createPembayaran=async(req,res)=>{
    try{
        const{
            id_booking,
            metode,
            jumlah,
            status
        }=req.body;
        await db.execute(
            "INSERT INTO pembayaran(id_booking,metode,jumlah,status) VALUES(?,?,?,?)",
            [id_booking,metode,jumlah,status]
        );
        res.json({message:"Pembayaran berhasil"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
>>>>>>> bc0502961ea35b227441628e7da2cfa662999b71
};