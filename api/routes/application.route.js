import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createApplication, getApplications, getApplicationDetails, reviewApplication } from '../controllers/application.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createApplication);
router.get('/', verifyToken, getApplications);
router.get('/:id', verifyToken, getApplicationDetails);
router.put('/review/:applicationId', verifyToken, reviewApplication);

export default router;