import express from 'express';
import { searchMovie } from '../controller/search.controller.js';
import { searchPerson } from '../controller/search.controller.js';
import { searchTv } from '../controller/search.controller.js';
import { getSearchHistory } from '../controller/search.controller.js';
import { removeItemFromSearchHistory } from '../controller/search.controller.js';
const router = express.Router();

router.get("/person/:query",searchPerson);
router.get("/movie/:query",searchMovie);
router.get("/tv/:query",searchTv);

router.get("/history",getSearchHistory)

router.delete("/history/:id",removeItemFromSearchHistory)
export default router;