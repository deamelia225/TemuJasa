import db from "../config/db.mjs";
export const getRiwayat=async(req,res)=>{
    try{
        const[rows]=await db.execute(
            "SELECT * FROM booking WHERE status='Selesai'"
        );
        res.json(rows);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};