<<<<<<< HEAD
import express from "express";

const router=express.Router();

router.get("/",(req,res)=>{
    res.json({
        message:"Dashboard API"
    });
});

=======
import express from "express";

const router=express.Router();

router.get("/",(req,res)=>{
    res.json({
        message:"Dashboard API"
    });
});

>>>>>>> bc0502961ea35b227441628e7da2cfa662999b71
export default router;