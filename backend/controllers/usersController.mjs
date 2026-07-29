<<<<<<< HEAD
import db from "../config/db.mjs";

export const getUsers=async(req,res)=>{
    try{
        const[rows]=await db.execute("SELECT id_user,role,nama,username,email,jenis_kelamin,no_hp,alamat,foto,created_at FROM users ORDER BY id_user DESC");
        res.json({success:true,data:rows});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"Server Error."});
    }
};

export const getUserById=async(req,res)=>{
    try{
        const{id}=req.params;
        const[rows]=await db.execute("SELECT id_user,role,nama,username,email,jenis_kelamin,no_hp,alamat,foto,created_at FROM users WHERE id_user=?",[id]);
        if(rows.length===0){
            return res.status(404).json({success:false,message:"User tidak ditemukan."});
        }
        res.json({success:true,data:rows[0]});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"Server Error."});
    }
};

export const createUser=async(req,res)=>{
    try{
        const{
            role,
            nama,
            username,
            email,
            password,
            jenis_kelamin,
            no_hp,
            alamat,
            foto
        }=req.body;

        if(!role||!nama||!username||!email||!password||!jenis_kelamin||!no_hp||!alamat||!foto){
            return res.status(400).json({
                success:false,
                message:"Semua data wajib diisi."
            });
        }

        const[cek]=await db.execute(
            "SELECT id_user FROM users WHERE username=? OR email=?",
            [username,email]
        );

        if(cek.length>0){
            return res.status(400).json({
                success:false,
                message:"Username atau email sudah digunakan."
            });
        }

        await db.execute(
            "INSERT INTO users(role,nama,username,email,password,jenis_kelamin,no_hp,alamat,foto) VALUES(?,?,?,?,?,?,?,?,?)",
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

        res.status(201).json({
            success:true,
            message:"User berhasil ditambahkan."
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server Error."
        });
    }
};

export const updateUser=async(req,res)=>{
    try{
        const{id}=req.params;
        const{nama,username,email,jenis_kelamin,no_hp,alamat,foto}=req.body;
        const[result]=await db.execute("UPDATE users SET nama=?,username=?,email=?,jenis_kelamin=?,no_hp=?,alamat=?,foto=? WHERE id_user=?",[nama,username,email,jenis_kelamin,no_hp,alamat,foto,id]);
        if(result.affectedRows===0){
            return res.status(404).json({success:false,message:"User tidak ditemukan."});
        }
        res.json({success:true,message:"Data user berhasil diupdate."});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"Server Error."});
    }
};

export const deleteUser=async(req,res)=>{
    try{
        const{id}=req.params;
        const[result]=await db.execute("DELETE FROM users WHERE id_user=?",[id]);
        if(result.affectedRows===0){
            return res.status(404).json({success:false,message:"User tidak ditemukan."});
        }
        res.json({success:true,message:"User berhasil dihapus."});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"Server Error."});
    }
=======
import db from "../config/db.mjs";

export const getUsers=async(req,res)=>{
    try{
        const[rows]=await db.execute("SELECT id_user,role,nama,username,email,jenis_kelamin,no_hp,alamat,foto,created_at FROM users ORDER BY id_user DESC");
        res.json({success:true,data:rows});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"Server Error."});
    }
};

export const getUserById=async(req,res)=>{
    try{
        const{id}=req.params;
        const[rows]=await db.execute("SELECT id_user,role,nama,username,email,jenis_kelamin,no_hp,alamat,foto,created_at FROM users WHERE id_user=?",[id]);
        if(rows.length===0){
            return res.status(404).json({success:false,message:"User tidak ditemukan."});
        }
        res.json({success:true,data:rows[0]});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"Server Error."});
    }
};

export const createUser=async(req,res)=>{
    try{
        const{
            role,
            nama,
            username,
            email,
            password,
            jenis_kelamin,
            no_hp,
            alamat,
            foto
        }=req.body;

        if(!role||!nama||!username||!email||!password||!jenis_kelamin||!no_hp||!alamat||!foto){
            return res.status(400).json({
                success:false,
                message:"Semua data wajib diisi."
            });
        }

        const[cek]=await db.execute(
            "SELECT id_user FROM users WHERE username=? OR email=?",
            [username,email]
        );

        if(cek.length>0){
            return res.status(400).json({
                success:false,
                message:"Username atau email sudah digunakan."
            });
        }

        await db.execute(
            "INSERT INTO users(role,nama,username,email,password,jenis_kelamin,no_hp,alamat,foto) VALUES(?,?,?,?,?,?,?,?,?)",
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

        res.status(201).json({
            success:true,
            message:"User berhasil ditambahkan."
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server Error."
        });
    }
};

export const updateUser=async(req,res)=>{
    try{
        const{id}=req.params;
        const{nama,username,email,jenis_kelamin,no_hp,alamat,foto}=req.body;
        const[result]=await db.execute("UPDATE users SET nama=?,username=?,email=?,jenis_kelamin=?,no_hp=?,alamat=?,foto=? WHERE id_user=?",[nama,username,email,jenis_kelamin,no_hp,alamat,foto,id]);
        if(result.affectedRows===0){
            return res.status(404).json({success:false,message:"User tidak ditemukan."});
        }
        res.json({success:true,message:"Data user berhasil diupdate."});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"Server Error."});
    }
};

export const deleteUser=async(req,res)=>{
    try{
        const{id}=req.params;
        const[result]=await db.execute("DELETE FROM users WHERE id_user=?",[id]);
        if(result.affectedRows===0){
            return res.status(404).json({success:false,message:"User tidak ditemukan."});
        }
        res.json({success:true,message:"User berhasil dihapus."});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"Server Error."});
    }
>>>>>>> bc0502961ea35b227441628e7da2cfa662999b71
};