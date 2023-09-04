import express from "express";
import { test } from "../controllers/user.contrlloer.js";

const router = express.Router();

router.get('/', test); //test is a function imported in the secon line

export default router;