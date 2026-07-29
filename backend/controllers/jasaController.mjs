<<<<<<< HEAD
import Jasa from"../models/jasaModel.mjs";
export const getAll=async(req,res)=>{
    try{
        const data=await Jasa.getAll();
        res.json(data);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
export const getById=async(req,res)=>{
    try{
        const data=await Jasa.getById(req.params.id);
        res.json(data);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
export const getRekomendasi=async(req,res)=>{
    try{
        const data=await Jasa.getRekomendasi();
        res.json(data);
    }catch(error){
        res.status(500).json({message:error.message});
    }
=======
import Jasa from"../models/jasaModel.mjs";
export const getAll=async(req,res)=>{
    try{
        const data=await Jasa.getAll();
        res.json(data);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
export const getById=async(req,res)=>{
    try{
        const data=await Jasa.getById(req.params.id);
        res.json(data);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
export const getRekomendasi=async(req,res)=>{
    try{
        const data=await Jasa.getRekomendasi();
        res.json(data);
    }catch(error){
        res.status(500).json({message:error.message});
    }
>>>>>>> bc0502961ea35b227441628e7da2cfa662999b71
};