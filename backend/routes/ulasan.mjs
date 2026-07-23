import express from "express";
import db from "../config/db.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const query = `SELECT
                u.id_ulasan,
                u.id_booking,
                us.nama,
                j.nama_jasa,
                u.rating,
                u.komentar,
                u.tanggal_ulasan
            FROM ulasan u
            INNER JOIN booking b
            ON u.id_booking = b.id_booking
            INNER JOIN users us
            ON b.id_user = us.id_user
            INNER JOIN jasa j
            ON b.id_jasa = j.id_jasa
            ORDER BY u.id_ulasan DESC`;
        const [rows] = await db.execute(query);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const query = `SELECT
                u.id_ulasan,
                u.id_booking,
                us.nama,
                j.nama_jasa,
                u.rating,
                u.komentar,
                u.tanggal_ulasan
            FROM ulasan u
            INNER JOIN booking b
            ON u.id_booking = b.id_booking
            INNER JOIN users us
            ON b.id_user = us.id_user
            INNER JOIN jasa j
            ON b.id_jasa = j.id_jasa
            WHERE u.id_ulasan = ?`;
        const [rows] = await db.execute(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                message: "Ulasan tidak ditemukan"
            });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            id_booking,
            rating,
            komentar,
            tanggal_ulasan
        } = req.body;

        const [booking] = await db.execute(`SELECT * FROM booking WHERE id_booking = ?`, [id_booking]);

        if (booking.length === 0) {
            return res.status(404).json({
                message: "Booking tidak ditemukan"
            });
        }

        await db.execute(
            `INSERT INTO ulasan
            (
                id_booking,
                rating,
                komentar,
                tanggal_ulasan
            )
            VALUES (?,?,?,?)`,
            [
                id_booking,
                rating,
                komentar,
                tanggal_ulasan
            ]
        );

        res.status(201).json({
            message: "Ulasan berhasil ditambahkan"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            id_booking,
            rating,
            komentar,
            tanggal_ulasan
        } = req.body;
        const [cek] = await db.execute(`SELECT * FROM ulasan WHERE id_ulasan = ?`, [id]);
        if (cek.length === 0) {
            return res.status(404).json({
                message: "Ulasan tidak ditemukan"
            });
        }
        await db.execute(`UPDATE ulasan SET
                id_booking = ?,
                rating = ?,
                komentar = ?,
                tanggal_ulasan = ?
            WHERE id_ulasan = ?`,
            [
                id_booking,
                rating,
                komentar,
                tanggal_ulasan,
                id
            ]
        );
        res.status(200).json({
            message: "Data ulasan berhasil diperbarui"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [cek] = await db.execute(`SELECT * FROM ulasan WHERE id_ulasan = ?`, [id]);
        if (cek.length === 0) {
            return res.status(404).json({
                message: "Ulasan tidak ditemukan"
            });
        }
        await db.execute(`DELETE FROM ulasan WHERE id_ulasan = ?`, [id]);
        res.status(200).json({
            message: "Ulasan berhasil dihapus"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

export default router;