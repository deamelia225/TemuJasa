import express from "express";
import {
    getRiwayat
} from "../controllers/riwayatController.mjs";
const router=express.Router();
router.get("/",getRiwayat);
export default router;