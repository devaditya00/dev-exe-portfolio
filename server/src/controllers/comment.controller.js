import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as commentService from '../services/comment.service.js';

export const getComments = asyncHandler(async (req, res) => {
  const comments = await commentService.getApprovedComments();
  res.json(ApiResponse.success(comments, 'Comments fetched'));
});

export const submitComment = asyncHandler(async (req, res) => {
  const comment = await commentService.createComment(req.body);
  res.status(201).json(ApiResponse.success(comment, 'Comment submitted'));
});

export const approveComment = asyncHandler(async (req, res) => {
  const comment = await commentService.approveComment(req.params.id);
  res.json(ApiResponse.success(comment, 'Comment approved'));
});

export const deleteComment = asyncHandler(async (req, res) => {
  await commentService.deleteComment(req.params.id);
  res.json(ApiResponse.success(null, 'Comment deleted'));
});