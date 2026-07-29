<<<<<<< HEAD
import express from "express";
import {
    getRiwayat
} from "../controllers/riwayatController.mjs";
const router=express.Router();
router.get("/",getRiwayat);
=======
import express from "express";
import {
    getRiwayat
} from "../controllers/riwayatController.mjs";
const router=express.Router();
router.get("/",getRiwayat);
>>>>>>> bc0502961ea35b227441628e7da2cfa662999b71
export default router;