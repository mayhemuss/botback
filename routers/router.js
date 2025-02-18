import express, {Router} from 'express';
import { getFrontData } from "./getFrontData.js";
import { getRegistration } from "./getRegistration.js";
import {fileURLToPath} from "url";
import * as path from "node:path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const router = new Router();

router.post("/reg/type", getFrontData)

router.post("/reg/regis", getRegistration)

router.use('/static', express.static(path.join(__dirname, "..", "public")))

export default router;
