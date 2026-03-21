import Review from '../models/Review.model.js';

export const getApprovedReviews = () =>
  Review.find({ approved: true }).sort('-createdAt').lean();

export const createReview = (data) =>
  Review.create(data);

export const approveReview = (id) =>
  Review.findByIdAndUpdate(id, { approved: true }, { new: true });

export const deleteReview = (id) =>
  Review.findByIdAndDelete(id);