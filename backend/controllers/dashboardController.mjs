import db from "../config/db.mjs";

export const dashboardUser=async(req,res)=>{
    try{
        const{id,role}=req.params;

        if(role==="Pelanggan"){
            const[booking]=await db.execute(
                "SELECT COUNT(*) AS jumlah FROM booking WHERE id_user=?",
                [id]
            );
            const[aktif]=await db.execute(
                "SELECT COUNT(*) AS jumlah FROM booking WHERE id_user=? AND status IN('Menunggu','Diproses')",
                [id]
            );
            const[selesai]=await db.execute(
                "SELECT COUNT(*) AS jumlah FROM booking WHERE id_user=? AND status='Selesai'",
                [id]
            );
            res.json({
                role:"Pelanggan",
                total_booking:booking[0].jumlah,
                booking_aktif:aktif[0].jumlah,
                booking_selesai:selesai[0].jumlah
            });
        }
        if(role==="Pekerja"){
            const[jasa]=await db.execute(
                "SELECT COUNT(*) AS jumlah FROM jasa WHERE id_pekerja=?",
                [id]
            );
            const[booking]=await db.execute(
                `
                    SELECT COUNT(*) AS jumlah
                    FROM booking,jasa
                    WHERE booking.id_jasa=jasa.id_jasa
                      AND jasa.id_pekerja=?
                `,
                [id]
            );
            const[selesai]=await db.execute(
                `
                    SELECT COUNT(*) AS jumlah
                    FROM booking,jasa
                    WHERE booking.id_jasa=jasa.id_jasa
                      AND jasa.id_pekerja=?
                      AND booking.status='Selesai'
                `,
                [id]
            );
            res.json({
                role:"Pekerja",
                total_jasa:jasa[0].jumlah,
                total_booking:booking[0].jumlah,
                booking_selesai:selesai[0].jumlah
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:error.message
        });
    }
};