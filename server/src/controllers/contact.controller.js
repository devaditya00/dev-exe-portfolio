import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as contactService from '../services/contact.service.js';

export const sendMessage = asyncHandler(async (req, res) => {
  const message = await contactService.createMessage(req.body);
  res.status(201).json(ApiResponse.success(message, 'Message sent'));
});

export const getMessages = asyncHandler(async (req, res) => {
  const messages = await contactService.getAllMessages();
  res.json(ApiResponse.success(messages, 'Messages fetched'));
});

export const markRead = asyncHandler(async (req, res) => {
  const message = await contactService.markAsRead(req.params.id);
  res.json(ApiResponse.success(message, 'Marked as read'));
});