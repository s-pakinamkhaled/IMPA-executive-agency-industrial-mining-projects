const { Project, projects } = require('../models/Project');

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    res.json({
      success: true,
      data: projects.map(project => project.toJSON())
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
};

// Get project by ID
const getProjectById = async (req, res) => {
  try {
    const project = projects.find(p => p.id === req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    res.json({
      success: true,
      data: project.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    });
  }
};

// Create new project
const createProject = async (req, res) => {
  try {
    const newProject = Project.create(req.body);
    projects.push(newProject);
    res.status(201).json({
      success: true,
      data: newProject.toJSON(),
      message: 'Project created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create project'
    });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const projectIndex = projects.findIndex(p => p.id === req.params.id);
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    const updatedProject = projects[projectIndex].update(req.body);
    res.json({
      success: true,
      data: updatedProject.toJSON(),
      message: 'Project updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update project'
    });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const projectIndex = projects.findIndex(p => p.id === req.params.id);
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    projects.splice(projectIndex, 1);
    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
}; 