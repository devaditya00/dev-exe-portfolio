import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as projectService from '../services/project.service.js';

export const getProjects = asyncHandler(async (req, res) => {
    const projects = await projectService.getAllProjects();
    res.json(ApiResponse.success(projects, 'Projects fetched'));
});

export const createProject = asyncHandler(async (req, res) => {
   const project = await projectService.createProject(req.body);
   res.status(201).json(ApiResponse.success(project, 'Projected Created'));
});
export const updateProject = asyncHandler(async(req, res) => {
    const project = await projectService.updateProject(req.params.id, req.body);
    res.json(ApiResponse.success(project, 'project updated'));
});

export const deleteProject = asyncHandler(async (req, res) => {
    await projectService.deleteProject(req.params.id);
    res.json(ApiResponse.success(null, 'Project deleted'));
});
