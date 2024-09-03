import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createApplication, getApplications } from '../controllers/application.controller.js';

const router = express.Router();

// Route pour créer une nouvelle candidature
router.post('/create', verifyToken, createApplication);

// Route pour obtenir toutes les candidatures pour une offre spécifique
router.get('/:postId', verifyToken, getApplications);

export default router;