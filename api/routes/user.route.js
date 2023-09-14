import express from "express";
import { test, updateUser, deleteUsre } from "../controllers/user.contrlloer.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/', test); //test is a function imported in the secon line
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUsre);

export default router;