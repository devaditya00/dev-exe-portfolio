import express from 'express';
import * as commentController from '../controllers/comment.controller.js';
import protect from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();


router.get('/all', protect, isAdmin, commentController.getAllComments);
router.get('/', commentController.getComments);
router.post('/', commentController.submitComment);
router.patch('/:id/approve', protect, isAdmin, commentController.approveComment);
router.delete('/:id', protect, isAdmin, commentController.deleteComment);

export default router;