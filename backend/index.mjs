import express from "express";
import cors from "cors";

import auth from "./routes/auth.mjs";
import jasa from "./routes/jasa.mjs";
import booking from "./routes/booking.mjs";
import dashboard from "./routes/dashboard.mjs";
import notifikasi from "./routes/notifikasi.mjs";
import pekerja from "./routes/pekerja.mjs";
import pembayaran from "./routes/pembayaran.mjs";
import profil from "./routes/profil.mjs";
import riwayat from "./routes/riwayat.mjs";
import ulasan from "./routes/ulasan.mjs";
import users from "./routes/users.mjs";
import authRoute from "./routes/auth.mjs";
import jasaRoute from "./routes/jasa.mjs";
import bookingRoute from "./routes/booking.mjs";

const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",auth);
app.use("/api/jasa",jasa);
app.use("/api/booking",booking);
app.use("/api/dashboard",dashboard);
app.use("/api/notifikasi",notifikasi);
app.use("/api/pekerja",pekerja);
app.use("/api/pembayaran",pembayaran);
app.use("/api/profil",profil);
app.use("/api/riwayat",riwayat);
app.use("/api/ulasan",ulasan);
app.use("/api/users",users);
app.use("/api/auth",authRoute);
app.use("/api/jasa",jasaRoute);
app.use("/api/booking",bookingRoute);
app.use((req,res)=>{
    res.status(404).json({
        message:"Endpoint tidak ditemukan"
    });
});

app.listen(22000,()=>{
    console.log("Server berjalan di port 22000");
});