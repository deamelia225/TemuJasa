<<<<<<< HEAD
import express from "express";
import {
    getProfil,
    updateProfil
} from "../controllers/profilController.mjs";
const router=express.Router();
router.get("/",getProfil);
router.put("/",updateProfil);
=======
import express from "express";
import {
    getProfil,
    updateProfil
} from "../controllers/profilController.mjs";
const router=express.Router();
router.get("/",getProfil);
router.put("/",updateProfil);
>>>>>>> bc0502961ea35b227441628e7da2cfa662999b71
export default router;