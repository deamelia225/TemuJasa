import express from "express";
import cors from "cors";

import usersRouter from "./routes/users.mjs";
import authRouter from "./routes/auth.mjs";
import pekerjaRouter from "./routes/pekerja.mjs";
import jasaRouter from "./routes/jasa.mjs";
import bookingRouter from "./routes/booking.mjs";
import pembayaranRouter from "./routes/pembayaran.mjs";
import ulasanRoute from "./routes/ulasanRoute.mjs";
import NotifikasiRoute from "./routes/NotifikasiRoute.mjs";
import riwayatBookingRouter from "./routes/riwayatBooking.mjs";

const app = express();
const port = 22000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Selamat Datang di TemuJasa");
});

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/pekerja", pekerjaRouter);
app.use("/jasa", jasaRouter);
app.use("/booking", bookingRouter);
app.use("/pembayaran", pembayaranRouter);
app.use("/ulasan", ulasanRoute);
app.use("/notifikasi", NotifikasiRoute);
app.use("/riwayat-booking", riwayatBookingRouter);

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});