const express = require('express');
const router = express.Router();
const { News, news } = require('../models/News');

// Get all news
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: news.map(item => item.toJSON())
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news'
    });
  }
});

// Get news by ID
router.get('/:id', (req, res) => {
  try {
    const newsItem = news.find(n => n.id === req.params.id);
    if (!newsItem) {
      return res.status(404).json({
        success: false,
        message: 'News item not found'
      });
    }
    res.json({
      success: true,
      data: newsItem.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news item'
    });
  }
});

// Create new news
router.post('/', (req, res) => {
  try {
    const newNews = News.create(req.body);
    news.push(newNews);
    res.status(201).json({
      success: true,
      data: newNews.toJSON(),
      message: 'News created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create news'
    });
  }
});

// Update news
router.put('/:id', (req, res) => {
  try {
    const newsIndex = news.findIndex(n => n.id === req.params.id);
    if (newsIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'News item not found'
      });
    }
    
    const updatedNews = news[newsIndex].update(req.body);
    res.json({
      success: true,
      data: updatedNews.toJSON(),
      message: 'News updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update news'
    });
  }
});

// Delete news
router.delete('/:id', (req, res) => {
  try {
    const newsIndex = news.findIndex(n => n.id === req.params.id);
    if (newsIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'News item not found'
      });
    }
    
    news.splice(newsIndex, 1);
    res.json({
      success: true,
      message: 'News deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete news'
    });
  }
});

// Search news
router.get('/search', (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json({
        success: true,
        data: news.map(item => item.toJSON())
      });
    }
    
    const filteredNews = news.filter(item => 
      item.title.toLowerCase().includes(q.toLowerCase()) ||
      item.content.toLowerCase().includes(q.toLowerCase())
    );
    
    res.json({
      success: true,
      data: filteredNews.map(item => item.toJSON())
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to search news'
    });
  }
});

module.exports = router; 