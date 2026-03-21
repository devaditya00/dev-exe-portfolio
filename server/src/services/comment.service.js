import Comment from '../models/Comment.model.js';

export const getApprovedComments = () =>
  Comment.find({ approved: true }).sort('-createdAt').lean();

export const createComment = (data) =>
  Comment.create(data);

export const approveComment = (id) =>
  Comment.findByIdAndUpdate(id, { approved: true }, { new: true });

export const deleteComment = (id) =>
  Comment.findByIdAndDelete(id);