import express from 'express';
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

import {createBlog, getAllBlog ,getSingleBlog ,updateBlog,deleteBlog,searchBlog} from '../controllers/blogController.js';

router.post('/create',protect,createBlog);
router.get('/',getAllBlog);
router.get("/search", searchBlog);
router.get('/:id',getSingleBlog);
router.put('/:id',protect,updateBlog);
router.delete('/:id',protect,deleteBlog)

export default router;


