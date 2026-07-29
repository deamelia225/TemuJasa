<<<<<<< HEAD
import express from "express";
import{register,login}from"../controllers/authController.mjs";

const router=express.Router();

router.post("/register",register);
router.post("/login",login);

=======
import express from "express";
import{register,login}from"../controllers/authController.mjs";

const router=express.Router();

router.post("/register",register);
router.post("/login",login);

>>>>>>> bc0502961ea35b227441628e7da2cfa662999b71
export default router;