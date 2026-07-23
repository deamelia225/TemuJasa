import express from "express";
import db from "../config/db.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
    try {

        const query = `SELECT
                p.id_pekerja,
                p.id_user,
                u.nama,
                u.username,
                u.email,
                u.jenis_kelamin,
                u.no_hp,
                u.alamat,
                u.foto,
                p.keahlian,
                p.pengalaman,
                p.status
            FROM pekerja p
            INNER JOIN users u
                ON p.id_user = u.id_user
            ORDER BY p.id_pekerja DESC`;
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
                p.id_pekerja,
                p.id_user,
                u.nama,
                u.username,
                u.email,
                u.jenis_kelamin,
                u.no_hp,
                u.alamat,
                u.foto,
                p.keahlian,
                p.pengalaman,
                p.status
            FROM pekerja p
            INNER JOIN users u
                ON p.id_user = u.id_user
            WHERE p.id_pekerja = ?`;
        const [rows] = await db.execute(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                message: "Pekerja tidak ditemukan"
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
    console.log(req.body);
    try {
        const {
            id_user,
            keahlian,
            pengalaman,
            status
        } = req.body;
        const [cekUser] = await db.execute("SELECT * FROM users WHERE id_user = ?", [id_user]);
        if (cekUser.length === 0) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });
        }
        const [cekPekerja] = await db.execute("SELECT * FROM pekerja WHERE id_user = ?", [id_user]);
        if (cekPekerja.length > 0) {
            return res.status(400).json({
                message: "User sudah menjadi pekerja"
            });
        }
        await db.execute(`INSERT INTO pekerja (
                id_user,
                keahlian,
                pengalaman,
                status
            ) VALUES (?,?,?,?)`, [
                id_user,
                keahlian,
                pengalaman,
                status
            ]
        );
        await db.execute(
            "UPDATE users SET role='Pekerja' WHERE id_user=?",
            [id_user]
        );
        res.status(201).json({
            message: "Pekerja berhasil ditambahkan"
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
            keahlian,
            pengalaman,
            status
        } = req.body;
        const [cek] = await db.execute(`SELECT * FROM pekerja WHERE id_pekerja = ?`, [id]
        );
        if (cek.length === 0) {
            return res.status(404).json({
                message: "Pekerja tidak ditemukan"
            });
        }
        await db.execute(`UPDATE pekerja SET
                keahlian = ?,
                pengalaman = ?,
                status = ?
            WHERE id_pekerja = ?`,
            [
                keahlian,
                pengalaman,
                status,
                id
            ]
        );
        res.status(200).json({
            message: "Data pekerja berhasil diperbarui"
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
        const [pekerja] = await db.execute(`SELECT * FROM pekerja WHERE id_pekerja = ?`, [id]);
        if (pekerja.length === 0) {
            return res.status(404).json({
                message: "Pekerja tidak ditemukan"
            });
        }
        const idUser = pekerja[0].id_user;
        await db.execute(`DELETE FROM pekerja WHERE id_pekerja = ?`, [id]);
        await db.execute(`UPDATE users SET role = 'Pelanggan' WHERE id_user = ?`, [idUser]);
        res.status(200).json({
            message: "Pekerja berhasil dihapus"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

export default router;