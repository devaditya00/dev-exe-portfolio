import Project from '../models/Project.model.js';

export const getAllProjects = () => 
    Project.find().sort('order').lean();

export const getFeaturedProjects = () => 
    Project.find({ featured: true}).sort('order').lean();

export const createProject = (data) => 
    Project.create(data);
export const updateProject = (id, data) => 
    Project.findByIdAndUpdate(id, data, { new: true});
export const deleteProject = (id) => 
    Project.findByIdAndDelete(id);

