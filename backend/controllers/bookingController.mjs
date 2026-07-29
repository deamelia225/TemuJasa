import db from "../config/db.mjs";

export const getAllBooking=async(req,res)=>{
    try{
        const[rows]=await db.execute(
            "SELECT * FROM booking"
        );
        res.json(rows);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
export const createBooking=async(req,res)=>{
    try{
        const{
            id_jasa,
            tanggal_booking,
            jam_booking,
            alamat,
            keluhan
        }=req.body;
        await db.execute(
            "INSERT INTO booking(id_user,id_jasa,tanggal_booking,jam_booking,alamat,keluhan) VALUES(?,?,?,?,?,?)",
            [
                1,
                id_jasa,
                tanggal_booking,
                jam_booking,
                alamat,
                keluhan
            ]
        );
        res.json({message:"Booking berhasil"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
export const bookingMasuk=async(req,res)=>{
    try{
        const[rows]=await db.execute(
            "SELECT * FROM booking"
        );
        res.json(rows);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
export const updateBooking=async(req,res)=>{
    try{
        await db.execute(
            "UPDATE booking SET status=? WHERE id_booking=?",
            [
                req.body.status,
                req.params.id
            ]
        );
        res.json({message:"Status berhasil diubah"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
export const deleteBooking=async(req,res)=>{
    try{
        await db.execute(
            "DELETE FROM booking WHERE id_booking=?",
            [req.params.id]
        );
        res.json({message:"Booking dihapus"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};