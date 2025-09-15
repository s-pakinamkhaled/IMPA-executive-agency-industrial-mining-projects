// In-memory news storage (can be replaced with database)
class News {
  constructor(data) {
    this.id = data.id || Date.now().toString();
    this.title = data.title;
    this.content = data.content;
    this.status = data.status || 'published';
    this.language = data.language || 'en';
    this.imageUrl = data.imageUrl || null;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = new Date();
  }

  // Static method to create a new news item
  static create(data) {
    return new News(data);
  }

  // Method to update news
  update(data) {
    Object.assign(this, data);
    this.updatedAt = new Date();
    return this;
  }

  // Method to validate news data
  validate() {
    const errors = [];
    
    if (!this.title) errors.push('News title is required');
    if (!this.content) errors.push('News content is required');
    
    return errors;
  }

  // Method to get news without sensitive data
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      status: this.status,
      language: this.language,
      imageUrl: this.imageUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

// Initialize with sample news
const news = [
  News.create({
    title: 'IMPA Launches New Maritime Project',
    content: 'The Industrial Maritime Port Authority has announced the launch of a major new maritime infrastructure project in Alexandria. This project aims to modernize port facilities and increase cargo handling capacity by 40%.',
    status: 'published',
    language: 'en'
  }),
  News.create({
    title: 'Industrial Zone Development Progress',
    content: 'Significant progress has been made in the development of the new industrial zone in Suez. Infrastructure work is 60% complete with modern facilities and sustainable energy solutions.',
    status: 'published',
    language: 'en'
  }),
  News.create({
    title: 'Mining Technology Upgrade Complete',
    content: 'The mining facility upgrade project has been successfully completed. New safety equipment and advanced technology have been installed, improving efficiency and worker safety.',
    status: 'published',
    language: 'en'
  })
];

// Export the class and storage
module.exports = { News, news }; 