import express from 'express';
import * as reviewController from '../controllers/review.controller.js';
import protect from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/', reviewController.getReviews);
router.post('/', reviewController.submitReview);
router.patch('/:id/approve', protect, isAdmin, reviewController.approveReview);
router.delete('/:id', protect, isAdmin, reviewController.deleteReview);

export default router;