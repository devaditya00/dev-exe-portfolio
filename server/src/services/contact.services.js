import Message from '../models/Message.model.js';

export const createMessage = (data) =>
  Message.create(data);

export const getAllMessages = () =>
  Message.find().sort('-createdAt').lean();

export const markAsRead = (id) =>
  Message.findByIdAndUpdate(id, { read: true }, { new: true });