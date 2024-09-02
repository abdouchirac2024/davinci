import express from 'express';
import { create, getposts, deletepost, updatepost } from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getposts', getposts);
router.delete('/:postId', verifyToken, deletepost);
router.put('/:postId', verifyToken, updatepost);

export default router;