import express from "express";
import {
    getProfil,
    updateProfil
} from "../controllers/profilController.mjs";
const router=express.Router();
router.get("/",getProfil);
router.put("/",updateProfil);
export default router;