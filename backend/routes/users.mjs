import express from "express";
import db from "../config/db.mjs";

const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const query = `SELECT
                id_user,
                role,
                nama,
                username,
                email,
                jenis_kelamin,
                no_hp,
                alamat,
                foto
            FROM users ORDER BY id_user DESC`;
        const [rows] = await db.execute(query);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            role,
            nama,
            username,
            email,
            password,
            jenis_kelamin,
            no_hp,
            alamat,
            foto
        } = req.body;
        const cek = `SELECT * FROM users WHERE username = ? OR email = ?`;
        const [rows] = await db.execute(cek, [username, email]
        );
        if (rows.length > 0) {
            return res.status(400).json({
                message: "Username atau Email sudah digunakan"
            });
        }
        const insertUser = `INSERT INTO users (
                role,
                nama,
                username,
                email,
                password,
                jenis_kelamin,
                no_hp,
                alamat,
                foto
            ) VALUES (?,?,?,?,?,?,?,?,?)`;
        const [result] = await db.execute(
            insertUser,
            [
                role,
                nama,
                username,
                email,
                password,
                jenis_kelamin,
                no_hp,
                alamat,
                foto
            ]
        );
        if (role === "Pekerja") {
            await db.execute(`INSERT INTO pekerja(
                    id_user,
                    keahlian,
                    pengalaman,
                    status
                ) VALUES (?, '', '', 'Aktif')`, [result.insertId]
            );
        }
        res.status(201).json({
            message: "User berhasil ditambahkan"
        });
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
                id_user,
                role,
                nama,
                username,
                email,
                jenis_kelamin,
                no_hp,
                alamat,
                foto
            FROM users WHERE id_user = ?`;
        const [rows] = await db.execute(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });
        }
        res.status(200).json(rows[0]);
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
            role,
            nama,
            username,
            email,
            password,
            jenis_kelamin,
            no_hp,
            alamat,
            foto
        } = req.body;
        const [cek] = await db.execute(`SELECT * FROM users WHERE id_user = ?`, [id]
        );
        if (cek.length === 0) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });

        }
        await db.execute(`UPDATE users SET
                role=?,
                nama=?,
                username=?,
                email=?,
                password=?,
                jenis_kelamin=?,
                no_hp=?,
                alamat=?,
                foto=?
            WHERE id_user=?`,
            [
                role,
                nama,
                username,
                email,
                password,
                jenis_kelamin,
                no_hp,
                alamat,
                foto,
                id
            ]
        );
        const [cekPekerja] = await db.execute(`SELECT * FROM pekerja WHERE id_user = ?`, [id]
        );

        if (role === "Pekerja") {
            if (cekPekerja.length === 0) {
                await db.execute(`INSERT INTO pekerja(
                        id_user,
                        keahlian,
                        pengalaman,
                        status
                    ) VALUES (?, '', '', 'Aktif')`, [id]
                );
            }
        } else {
            if (cekPekerja.length > 0) {
                await db.execute(`DELETE FROM pekerja WHERE id_user = ?`, [id]
                );
            }
        }
        res.status(200).json({
            message: "User berhasil diperbarui"
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
        const [result] = await db.execute(`DELETE FROM users WHERE id_user = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });
        }
        res.status(200).json({
            message: "User berhasil dihapus"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

export default router;