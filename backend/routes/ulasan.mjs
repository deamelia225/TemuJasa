<<<<<<< HEAD
import express from "express";
import {
    getAllUlasan,
    createUlasan
} from "../controllers/ulasanController.mjs";

const router=express.Router();

router.get("/",getAllUlasan);
router.post("/",createUlasan);

=======
import express from "express";
import {
    getAllUlasan,
    createUlasan
} from "../controllers/ulasanController.mjs";

const router=express.Router();

router.get("/",getAllUlasan);
router.post("/",createUlasan);

>>>>>>> bc0502961ea35b227441628e7da2cfa662999b71
export default router;