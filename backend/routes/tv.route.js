
import express from 'express';
const router = express.Router();
import { getTvDetails } from '../controller/tv.controller.js';
import { getTrendingTv } from '../controller/tv.controller.js';
import { getSimilarTvs } from '../controller/tv.controller.js';
import { getTvsByCategory } from '../controller/tv.controller.js';
import { getTvTrailers } from '../controller/tv.controller.js';
router.get("/trending",getTrendingTv)
router.get("/:id/trailers",getTvTrailers)
router.get("/:id/details",getTvDetails)
router.get("/:id/similar",getSimilarTvs)
router.get("/:category",getTvsByCategory)
export default router;