import express from "express";
import db from "../config/db.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const query = `SELECT
                n.id_notifikasi,
                n.id_user,
                u.nama,
                n.judul,
                n.pesan,
                n.tanggal,
                n.status
            FROM notifikasi n
            INNER JOIN users u
            ON n.id_user = u.id_user
            ORDER BY n.id_notifikasi DESC`;
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
                n.id_notifikasi,
                n.id_user,
                u.nama,
                n.judul,
                n.pesan,
                n.tanggal,
                n.status
            FROM notifikasi n
            INNER JOIN users u
            ON n.id_user = u.id_user
            WHERE n.id_notifikasi = ?`;
        const [rows] = await db.execute(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                message: "Notifikasi tidak ditemukan"
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
            id_user,
            judul,
            pesan,
            tanggal,
            status
        } = req.body;
        const [user] = await db.execute(`SELECT * FROM users WHERE id_user = ?`, [id_user]);
        if (user.length === 0) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });
        }
        await db.execute(`INSERT INTO notifikasi
            (
                id_user,
                judul,
                pesan,
                tanggal,
                status
            )
            VALUES (?,?,?,?,?)`,
            [
                id_user,
                judul,
                pesan,
                tanggal,
                status
            ]
        );

        res.status(201).json({
            message: "Notifikasi berhasil ditambahkan"
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
            id_user,
            judul,
            pesan,
            tanggal,
            status
        } = req.body;
        const [cek] = await db.execute(`SELECT * FROM notifikasi WHERE id_notifikasi = ?`, [id]);
        if (cek.length === 0) {
            return res.status(404).json({
                message: "Notifikasi tidak ditemukan"
            });
        }
        await db.execute(`UPDATE notifikasi SET
                id_user = ?,
                judul = ?,
                pesan = ?,
                tanggal = ?,
                status = ?
            WHERE id_notifikasi = ?`,
            [
                id_user,
                judul,
                pesan,
                tanggal,
                status,
                id
            ]
        );
        res.status(200).json({
            message: "Data notifikasi berhasil diperbarui"
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
        const [cek] = await db.execute(`SELECT * FROM notifikasi WHERE id_notifikasi = ?`, [id]);
        if (cek.length === 0) {
            return res.status(404).json({
                message: "Notifikasi tidak ditemukan"
            });
        }
        await db.execute(`DELETE FROM notifikasi WHERE id_notifikasi = ?`, [id]);
        res.status(200).json({
            message: "Notifikasi berhasil dihapus"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

export default router;