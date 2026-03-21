import express from 'express';
import * as contactController from '../controllers/contact.controller.js';
import protect from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

router.post('/', contactController.sendMessage);
router.get('/', protect, isAdmin, contactController.getMessages);
router.patch('/:id/read', protect, isAdmin, contactController.markRead);

export default router;