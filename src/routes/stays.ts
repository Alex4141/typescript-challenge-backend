import express from "express";
import { Cursor } from "mongodb"
import StaysService from "../services/stays";

const router = express.Router();
const stayService : StaysService = new StaysService();

router.post('/', stayService.validateParameters, async (req, res) => {
    const response : Cursor<any> = await stayService.post(req); 
    res.json(await response.toArray());
});

export default router;