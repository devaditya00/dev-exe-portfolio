import express from 'express';
import * as projectController from '../controllers/project.controller.js';
import protect from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/', projectController.getProjects);
router.post('/', protect, isAdmin, projectController.createProject);
router.put('/:id', protect, isAdmin, projectController.updateProject);
router.delete('/:id', protect, isAdmin, projectController.deleteProject);

export default router;