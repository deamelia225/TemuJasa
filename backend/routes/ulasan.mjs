import express from "express";
import {
    getAllUlasan,
    createUlasan
} from "../controllers/ulasanController.mjs";

const router=express.Router();

router.get("/",getAllUlasan);
router.post("/",createUlasan);

export default router;