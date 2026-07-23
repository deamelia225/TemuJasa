import express from 'express';
import db from '../config/db.mjs';

const router = express.Router();

router.post("/register", async (req, res) => {
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

        const cekQuery = ` SELECT * FROM users WHERE username = ? OR email = ?`;
        const [cek] = await db.execute(
            cekQuery,
            [username, email]
        );
        if (cek.length > 0) {
            return res.status(400).json({
                message: "Username atau Email sudah digunakan"
            });
        }

        const insertUser = `
            INSERT INTO users
            (
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
        const idUser = result.insertId;

        if (role === "Pekerja") {
            const insertPekerja = `
                INSERT INTO pekerja
                (
                    id_user,
                    keahlian,
                    pengalaman,
                    status
                ) VALUES (?,'','','Aktif')`;
            await db.execute(
                insertPekerja,
                [idUser]
            );
        }
        res.status(201).json({
            message: "Registrasi berhasil"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
        const [rows] = await db.execute(query, [
            username,
            password
        ]);
        if (rows.length === 0) {
            return res.status(401).json({
                message: "Username atau Password salah"
            });
        }

        const user = rows[0];
        let id_pekerja = null;
        if (user.role === "Pekerja") {
            const [pekerja] = await db.execute(`SELECT id_pekerja FROM pekerja WHERE id_user = ?`, [user.id_user]
            );
            if (pekerja.length > 0) {
                id_pekerja = pekerja[0].id_pekerja;
            }
        }
        res.status(200).json({
            id_user: user.id_user,
            id_pekerja,
            role: user.role,
            nama: user.nama,
            username: user.username,
            email: user.email,
            jenis_kelamin: user.jenis_kelamin,
            no_hp: user.no_hp,
            alamat: user.alamat,
            foto: user.foto,
            message: "Login berhasil"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.get("/profile/:id", async (req, res) => {
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
                foto FROM users WHERE id_user = ?`;
        const [rows] = await db.execute(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });
        }
        const user = rows[0];
        if (user.role === "Pekerja") {
            const [pekerja] = await db.execute(`SELECT id_pekerja, keahlian, pengalaman, status FROM pekerja WHERE id_user = ?`, [id]
            );
            if (pekerja.length > 0) {
                user.id_pekerja = pekerja[0].id_pekerja;
                user.keahlian = pekerja[0].keahlian;
                user.pengalaman = pekerja[0].pengalaman;
                user.status_pekerja = pekerja[0].status;
            }
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

router.put("/profile/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nama,
            email,
            no_hp,
            alamat,
            foto,
            keahlian,
            pengalaman,
            status
        } = req.body;
        const [rows] = await db.execute(`SELECT * FROM users WHERE id_user = ?`, [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });
        }

        const user = rows[0];
        await db.execute(`UPDATE users SET
                nama = ?,
                email = ?,
                no_hp = ?,
                alamat = ?,
                foto = ?
            WHERE id_user = ?`, [nama, email, no_hp, alamat, foto, id]
        );

        if (user.role === "Pekerja") {
            await db.execute(`UPDATE pekerja SET
                    keahlian = ?,
                    pengalaman = ?,
                    status = ? WHERE id_user = ?`, [keahlian, pengalaman, status, id]
            );
        }
        res.status(200).json({
            message: "Profil berhasil diperbarui"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

export default router;