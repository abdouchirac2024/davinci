// davinci/api/routes/application.route.js
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createApplication, getApplications } from '../controllers/application.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createApplication);
router.get('/', verifyToken, getApplications);

export default router;