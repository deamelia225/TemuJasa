import db from "../config/db.mjs";

export const getAllUlasan=async(req,res)=>{
    try{
        const[rows]=await db.execute("SELECT * FROM ulasan");
        res.json(rows);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

export const createUlasan=async(req,res)=>{
    try{
        const{
            id_booking,
            rating,
            komentar
        }=req.body;
        await db.execute(
            "INSERT INTO ulasan(id_booking,rating,komentar) VALUES(?,?,?)",
            [id_booking,rating,komentar]
        );
        res.json({message:"Ulasan berhasil"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};