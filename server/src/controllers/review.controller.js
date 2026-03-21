import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as reviewService from '../services/review.service.js';
import Review from '../models/Review.model.js';

export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.getApprovedReviews();
  res.json(ApiResponse.success(reviews, 'Reviews fetched'));
});

export const submitReview = asyncHandler(async (req, res) => {
  const review = await reviewService.createReview(req.body);
  res.status(201).json(ApiResponse.success(review, 'Review submitted'));
});

export const approveReview = asyncHandler(async (req, res) => {
  const review = await reviewService.approveReview(req.params.id);
  res.json(ApiResponse.success(review, 'Review approved'));
});

export const deleteReview = asyncHandler(async (req, res) => {
  await reviewService.deleteReview(req.params.id);
  res.json(ApiResponse.success(null, 'Review deleted'));
});
export const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().sort('-createdAt').lean();
  res.json(ApiResponse.success(reviews, 'All reviews fetched'));
});