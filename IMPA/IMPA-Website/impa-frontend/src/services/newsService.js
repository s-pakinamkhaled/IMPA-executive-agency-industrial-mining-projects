import dataService from './dataService.js';

export const newsService = {
  // Get all published news
  getAllNews: async (params = {}) => {
    try {
      // Refresh data from localStorage to get latest updates
      dataService.refreshFromStorage();
      
      let news = dataService.getAllNews();
      
      // Apply filters if provided
      if (params.category) {
        news = news.filter(item => item.category === params.category);
      }
      
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        news = news.filter(item => 
          item.title.toLowerCase().includes(searchTerm) ||
          item.content.toLowerCase().includes(searchTerm) ||
          item.summary.toLowerCase().includes(searchTerm)
        );
      }
      
      // Sort by date (newest first)
      news.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      return {
        success: true,
        data: news,
        total: news.length
      };
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error('Failed to fetch news');
    }
  },

  // Get news by ID
  getNewsById: async (id) => {
    try {
      dataService.refreshFromStorage();
      const news = dataService.getNewsById(parseInt(id));
      
      if (!news) {
        throw new Error('News item not found');
      }
      
      return {
        success: true,
        data: news
      };
    } catch (error) {
      console.error('Error fetching news by ID:', error);
      throw new Error('Failed to fetch news item');
    }
  },

  // Create new news (Admin only)
  createNews: async (newsData) => {
    try {
      // Validate required fields
      if (!newsData.title || !newsData.content) {
        throw new Error('Title and content are required');
      }
      
      const newNews = dataService.addNews({
        title: newsData.title,
        summary: newsData.summary || newsData.content.substring(0, 200) + '...',
        content: newsData.content,
        category: newsData.category || 'أخبار عامة',
        readTime: newsData.readTime || '3 min read',
        photo: newsData.photo || null
      });
      
      return {
        success: true,
        data: newNews,
        message: 'News created successfully'
      };
    } catch (error) {
      console.error('Error creating news:', error);
      throw new Error(error.message || 'Failed to create news');
    }
  },

  // Update news (Admin only)
  updateNews: async (id, newsData) => {
    try {
      const updatedNews = dataService.updateNews(parseInt(id), newsData);
      
      if (!updatedNews) {
        throw new Error('News item not found');
      }
      
      return {
        success: true,
        data: updatedNews,
        message: 'News updated successfully'
      };
    } catch (error) {
      console.error('Error updating news:', error);
      throw new Error(error.message || 'Failed to update news');
    }
  },

  // Delete news (Admin only)
  deleteNews: async (id) => {
    try {
      const existingNews = dataService.getNewsById(parseInt(id));
      if (!existingNews) {
        throw new Error('News item not found');
      }
      
      dataService.deleteNews(parseInt(id));
      
      return {
        success: true,
        message: 'News deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting news:', error);
      throw new Error(error.message || 'Failed to delete news');
    }
  },

  // Search news
  searchNews: async (query, params = {}) => {
    try {
      return await this.getAllNews({
        ...params,
        search: query
      });
    } catch (error) {
      console.error('Error searching news:', error);
      throw new Error('Failed to search news');
    }
  },

  // Get admin news (includes all statuses for admin dashboard)
  getAdminNews: async () => {
    try {
      dataService.refreshFromStorage();
      const news = dataService.getAdminNews();
      
      // Sort by date (newest first)
      news.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      return {
        success: true,
        data: news,
        total: news.length
      };
    } catch (error) {
      console.error('Error fetching admin news:', error);
      throw new Error('Failed to fetch admin news');
    }
  },

  // Add photo to news
  addNewsPhoto: async (newsId, photoData) => {
    try {
      const success = dataService.addNewsPhoto(parseInt(newsId), photoData);
      
      if (!success) {
        throw new Error('News item not found');
      }
      
      return {
        success: true,
        message: 'Photo added successfully'
      };
    } catch (error) {
      console.error('Error adding photo to news:', error);
      throw new Error('Failed to add photo');
    }
  },

  // Get news categories
  getCategories: async () => {
    try {
      dataService.refreshFromStorage();
      const news = dataService.getAllNews();
      const categories = [...new Set(news.map(item => item.category))];
      
      return {
        success: true,
        data: categories
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }
};