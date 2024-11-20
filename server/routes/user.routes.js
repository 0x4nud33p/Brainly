import { Router } from "express";
import {signUp} from '../controllers/auth.controller.js';
import {signIn} from '../controllers/auth.controller.js';
import { addCollection } from "../controllers/user.controller.js";
import { getContentDetails } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/verifyJWt.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

//public routes
router.get("/content/:id", getContentDetails);

//protected routes
router.post("/addcollection", verifyJWT, addCollection);

export default router;