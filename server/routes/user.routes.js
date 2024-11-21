import { Router } from "express";
import {signUp} from '../controllers/auth.controller.js';
import {signIn} from '../controllers/auth.controller.js';
import { addCollection } from "../controllers/user.controller.js";
import { getContentById } from "../controllers/user.controller.js";
import { getAllCollections } from '../controllers/user.controller.js';
import verifyJWT from "../middlewares/verifyJWt.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

//public routes
router.get("/content/:id", getContentById);

//protected routes
router.post("/addcollection", verifyJWT, addCollection);
router.post("/getallcollections", verifyJWT, getAllCollections);


export default router;