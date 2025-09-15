// In-memory project storage (can be replaced with database)
class Project {
  constructor(data) {
    this.id = data.id || Date.now().toString();
    this.projectId = data.projectId;
    this.name = data.name;
    this.description = data.description;
    this.status = data.status || 'active';
    this.type = data.type || 'infrastructure';
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.language = data.language || 'en';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = new Date();
  }

  // Static method to create a new project
  static create(data) {
    return new Project(data);
  }

  // Method to update project
  update(data) {
    Object.assign(this, data);
    this.updatedAt = new Date();
    return this;
  }

  // Method to validate project data
  validate() {
    const errors = [];
    
    if (!this.projectId) errors.push('Project ID is required');
    if (!this.name) errors.push('Project name is required');
    if (!this.description) errors.push('Project description is required');
    if (!this.startDate) errors.push('Start date is required');
    
    return errors;
  }

  // Method to get project without sensitive data
  toJSON() {
    return {
      id: this.id,
      projectId: this.projectId,
      name: this.name,
      description: this.description,
      status: this.status,
      type: this.type,
      startDate: this.startDate,
      endDate: this.endDate,
      language: this.language,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

// Initialize with sample projects
const projects = [
  Project.create({
    projectId: 'IMPA-001',
    name: 'Alexandria Port Expansion',
    description: 'Major expansion project for Alexandria port to increase capacity and modernize facilities.',
    status: 'active',
    type: 'maritime',
    startDate: '2024-01-15',
    endDate: '2026-06-30',
    language: 'en'
  }),
  Project.create({
    projectId: 'IMPA-002',
    name: 'Industrial Zone Development',
    description: 'Development of new industrial zone in Suez with modern infrastructure and facilities.',
    status: 'pending',
    type: 'industrial',
    startDate: '2024-03-01',
    endDate: '2027-12-31',
    language: 'en'
  }),
  Project.create({
    projectId: 'IMPA-003',
    name: 'Mining Facility Upgrade',
    description: 'Upgrading existing mining facilities with new technology and safety equipment.',
    status: 'active',
    type: 'industrial',
    startDate: '2024-02-10',
    endDate: '2025-08-15',
    language: 'en'
  })
];

// Export the class and storage
module.exports = { Project, projects }; 