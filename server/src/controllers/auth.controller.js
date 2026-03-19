import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as authService from '../services/auth.service.js';

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  res.status(201).json(
    ApiResponse.success(result, 'Registered successfully', 201)
  );
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  res.status(200).json(
    ApiResponse.success(result, 'Logged in successfully')
  );
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const result = await authService.refreshAccessToken(refreshToken);
  res.status(200).json(
    ApiResponse.success(result, 'Token refreshed')
  );
});

export const logout = asyncHandler(async (req, res) => {
  res.status(200).json(
    ApiResponse.success(null, 'Logged out successfully')
  );
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(
    ApiResponse.success(req.user, 'User fetched')
  );
});
