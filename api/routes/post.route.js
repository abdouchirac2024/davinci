// routes/post.routes.js

import express from 'express';
import { create, getposts, deletepost, updatepost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', create);
router.get('/getposts', getposts); // Cette route permet à tous de voir les posts
router.delete('/:postId', deletepost);
router.put('/:postId', updatepost);

export default router;
