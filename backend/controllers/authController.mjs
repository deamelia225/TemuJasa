<<<<<<< HEAD
import db from "../config/db.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register=async(req,res)=>{
    try{
        const{
            role,
            nama,
            username,
            email,
            password,
            no_hp,
            alamat
        }=req.body;
        const hash=await bcrypt.hash(password,10);
        const[cek]=await db.execute(
            "SELECT * FROM users WHERE email=? OR username=?",
            [email,username]
        );
        if(cek.length>0){
            return res.status(400).json({
                message:"Email atau username sudah digunakan"
            });
        }
        await db.execute(
            "INSERT INTO users(role,nama,username,email,password,no_hp,alamat) VALUES(?,?,?,?,?,?,?)",
            [
                role,
                nama,
                username,
                email,
                hash,
                no_hp,
                alamat
            ]
        );
        res.json({
            message:"Register berhasil"
        });
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

export const login=async(req,res)=>{
    try{
        const{
            email,
            password
        }=req.body;
        const[rows]=await db.execute(
            "SELECT * FROM users WHERE email=?",
            [email]
        );
        if(rows.length===0){
            return res.status(404).json({
                message:"Email tidak ditemukan"
            });
        }
        const user=rows[0];
        const cocok=await bcrypt.compare(password,user.password);
        if(!cocok){
            return res.status(400).json({
                message:"Password salah"
            });
        }
        const token=jwt.sign(
            {
                id_user:user.id_user,
                role:user.role
            },
            "temujasa_secret",
            {
                expiresIn:"1d"
            }
        );
        delete user.password;
        res.json({
            message:"Login berhasil",
            token,
            user
        });
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
=======
import db from "../config/db.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register=async(req,res)=>{
    try{
        const{
            role,
            nama,
            username,
            email,
            password,
            no_hp,
            alamat
        }=req.body;
        const hash=await bcrypt.hash(password,10);
        const[cek]=await db.execute(
            "SELECT * FROM users WHERE email=? OR username=?",
            [email,username]
        );
        if(cek.length>0){
            return res.status(400).json({
                message:"Email atau username sudah digunakan"
            });
        }
        await db.execute(
            "INSERT INTO users(role,nama,username,email,password,no_hp,alamat) VALUES(?,?,?,?,?,?,?)",
            [
                role,
                nama,
                username,
                email,
                hash,
                no_hp,
                alamat
            ]
        );
        res.json({
            message:"Register berhasil"
        });
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

export const login=async(req,res)=>{
    try{
        const{
            email,
            password
        }=req.body;
        const[rows]=await db.execute(
            "SELECT * FROM users WHERE email=?",
            [email]
        );
        if(rows.length===0){
            return res.status(404).json({
                message:"Email tidak ditemukan"
            });
        }
        const user=rows[0];
        const cocok=await bcrypt.compare(password,user.password);
        if(!cocok){
            return res.status(400).json({
                message:"Password salah"
            });
        }
        const token=jwt.sign(
            {
                id_user:user.id_user,
                role:user.role
            },
            "temujasa_secret",
            {
                expiresIn:"1d"
            }
        );
        delete user.password;
        res.json({
            message:"Login berhasil",
            token,
            user
        });
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
>>>>>>> bc0502961ea35b227441628e7da2cfa662999b71
};