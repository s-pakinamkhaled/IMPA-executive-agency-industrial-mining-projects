import dataService from './dataService.js';

export const projectsService = {
  // Get all projects
  getAllProjects: async (params = {}) => {
    try {
      // Refresh data from localStorage to get latest updates
      dataService.refreshFromStorage();
      
      let projects = dataService.getAllProjects();
      
      // Apply filters if provided
      if (params.status) {
        projects = projects.filter(item => item.status === params.status);
      }
      
      if (params.type) {
        projects = projects.filter(item => item.type === params.type);
      }
      
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        projects = projects.filter(item => 
          item.name.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.id.toLowerCase().includes(searchTerm)
        );
      }
      
      // Sort by start date (newest first)
      projects.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      
      return {
        success: true,
        data: projects,
        total: projects.length
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw new Error('Failed to fetch projects');
    }
  },

  // Get project by ID
  getProjectById: async (id) => {
    try {
      dataService.refreshFromStorage();
      const project = dataService.getProjectById(id);
      
      if (!project) {
        throw new Error('Project not found');
      }
      
      return {
        success: true,
        data: project
      };
    } catch (error) {
      console.error('Error fetching project by ID:', error);
      throw new Error('Failed to fetch project');
    }
  },

  // Create new project (Admin only)
  createProject: async (projectData) => {
    try {
      // Validate required fields
      if (!projectData.name || !projectData.description) {
        throw new Error('Project name and description are required');
      }
      
      const newProject = dataService.addProject({
        name: projectData.name,
        description: projectData.description,
        status: projectData.status || 'Planning',
        type: projectData.type || 'General',
        startDate: projectData.startDate || new Date().toISOString().split('T')[0],
        progress: parseInt(projectData.progress) || 0,
        photo: projectData.photo || null,
        endDate: projectData.endDate || null,
        budget: projectData.budget || null,
        location: projectData.location || null
      });
      
      return {
        success: true,
        data: newProject,
        message: 'Project created successfully'
      };
    } catch (error) {
      console.error('Error creating project:', error);
      throw new Error(error.message || 'Failed to create project');
    }
  },

  // Update project (Admin only)
  updateProject: async (id, projectData) => {
    try {
      const updatedProject = dataService.updateProject(id, projectData);
      
      if (!updatedProject) {
        throw new Error('Project not found');
      }
      
      return {
        success: true,
        data: updatedProject,
        message: 'Project updated successfully'
      };
    } catch (error) {
      console.error('Error updating project:', error);
      throw new Error(error.message || 'Failed to update project');
    }
  },

  // Delete project (Admin only)
  deleteProject: async (id) => {
    try {
      const existingProject = dataService.getProjectById(id);
      if (!existingProject) {
        throw new Error('Project not found');
      }
      
      dataService.deleteProject(id);
      
      return {
        success: true,
        message: 'Project deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting project:', error);
      throw new Error(error.message || 'Failed to delete project');
    }
  },

  // Search projects
  searchProjects: async (query, params = {}) => {
    try {
      return await this.getAllProjects({
        ...params,
        search: query
      });
    } catch (error) {
      console.error('Error searching projects:', error);
      throw new Error('Failed to search projects');
    }
  },

  // Filter projects by status
  filterProjectsByStatus: async (status, params = {}) => {
    try {
      return await this.getAllProjects({
        ...params,
        status: status
      });
    } catch (error) {
      console.error('Error filtering projects by status:', error);
      throw new Error('Failed to filter projects by status');
    }
  },

  // Filter projects by type
  filterProjectsByType: async (type, params = {}) => {
    try {
      return await this.getAllProjects({
        ...params,
        type: type
      });
    } catch (error) {
      console.error('Error filtering projects by type:', error);
      throw new Error('Failed to filter projects by type');
    }
  },

  // Get admin projects (same as getAllProjects but explicit for admin dashboard)
  getAdminProjects: async () => {
    try {
      dataService.refreshFromStorage();
      const projects = dataService.getAdminProjects();
      
      // Sort by start date (newest first)
      projects.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      
      return {
        success: true,
        data: projects,
        total: projects.length
      };
    } catch (error) {
      console.error('Error fetching admin projects:', error);
      throw new Error('Failed to fetch admin projects');
    }
  },

  // Add photo to project
  addProjectPhoto: async (projectId, photoData) => {
    try {
      const success = dataService.addProjectPhoto(projectId, photoData);
      
      if (!success) {
        throw new Error('Project not found');
      }
      
      return {
        success: true,
        message: 'Photo added successfully'
      };
    } catch (error) {
      console.error('Error adding photo to project:', error);
      throw new Error('Failed to add photo');
    }
  },

  // Get project statistics
  getProjectStats: async () => {
    try {
      dataService.refreshFromStorage();
      const projects = dataService.getAllProjects();
      
      const stats = {
        total: projects.length,
        active: projects.filter(p => p.status === 'Active').length,
        completed: projects.filter(p => p.status === 'Completed').length,
        planning: projects.filter(p => p.status === 'Planning').length,
        onHold: projects.filter(p => p.status === 'On Hold').length,
        types: {}
      };
      
      // Count projects by type
      projects.forEach(project => {
        stats.types[project.type] = (stats.types[project.type] || 0) + 1;
      });
      
      return {
        success: true,
        data: stats
      };
    } catch (error) {
      console.error('Error fetching project statistics:', error);
      throw new Error('Failed to fetch project statistics');
    }
  },

  // Get project types
  getProjectTypes: async () => {
    try {
      dataService.refreshFromStorage();
      const projects = dataService.getAllProjects();
      const types = [...new Set(projects.map(item => item.type))];
      
      return {
        success: true,
        data: types
      };
    } catch (error) {
      console.error('Error fetching project types:', error);
      throw new Error('Failed to fetch project types');
    }
  },

  // Get project statuses
  getProjectStatuses: async () => {
    try {
      const statuses = ['Planning', 'Active', 'On Hold', 'Completed', 'Cancelled'];
      
      return {
        success: true,
        data: statuses
      };
    } catch (error) {
      console.error('Error fetching project statuses:', error);
      throw new Error('Failed to fetch project statuses');
    }
  }
};