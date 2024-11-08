import Router from "express";
import {getFrontData} from "./getFrontData.js";
import {getRegistration} from "./getRegistration.js";

const router = new Router();


router.post("/type", getFrontData)

router.post("/regis", getRegistration)


export default router;
