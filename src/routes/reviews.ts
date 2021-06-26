import express from "express";
import { Cursor } from "mongodb"
import ReviewsService from "../services/reviews";

const router = express.Router();
const reviewsService : ReviewsService = new ReviewsService();

router.get('/:_id', reviewsService.validateParameters,  async (req, res) => {
    const response : Cursor<any> = await reviewsService.get(req); 
    res.json(await response.toArray());
});

export default router;