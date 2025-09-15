import React, { useState, useEffect } from 'react';
import { 
  FaNewspaper, 
  FaProjectDiagram, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaTimes,
  FaSave,
  FaImage,
  FaCalendarAlt,
  FaTag,
  FaExclamationTriangle
} from 'react-icons/fa';
import { newsService } from '../services/newsService.js';
import { projectsService } from '../services/projectsService.js';

const AdminDashboard = ({ language, onClose }) => {
  const [activeTab, setActiveTab] = useState('news');
  const [news, setNews] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    category: 'أخبار عامة',
    status: 'published',
    type: 'Infrastructure',
    startDate: '',
    endDate: '',
    progress: 0,
    readTime: '3 min read'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Load data from services
  const fetchNews = async () => {
    try {
      const response = await newsService.getAdminNews();
      if (response.success) {
        setNews(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      showMessage('خطأ في تحميل الأخبار', 'error');
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await projectsService.getAdminProjects();
      if (response.success) {
        setProjects(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      showMessage('خطأ في تحميل المشاريع', 'error');
    }
  };

  useEffect(() => {
    fetchNews();
    fetchProjects();
  }, []);

  // Show message helper
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      content: '',
      summary: '',
      category: 'أخبار عامة',
      status: activeTab === 'news' ? 'published' : 'Planning',
      type: 'Infrastructure',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      progress: 0,
      readTime: '3 min read'
    });
    setShowAddForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || item.name,
      content: item.content || item.description,
      summary: item.summary || '',
      category: item.category || 'أخبار عامة',
      status: item.status,
      type: item.type || 'Infrastructure',
      startDate: item.startDate || new Date().toISOString().split('T')[0],
      endDate: item.endDate || '',
      progress: item.progress || 0,
      readTime: item.readTime || '3 min read'
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id, type) => {
    const confirmMessage = language === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?';
    if (window.confirm(confirmMessage)) {
      try {
        setLoading(true);
        
        if (type === 'news') {
          const response = await newsService.deleteNews(id);
          if (response.success) {
            await fetchNews(); // Refresh news list
            showMessage(language === 'ar' ? 'تم حذف الخبر بنجاح' : 'News deleted successfully', 'success');
          }
        } else {
          const response = await projectsService.deleteProject(id);
          if (response.success) {
            await fetchProjects(); // Refresh projects list
            showMessage(language === 'ar' ? 'تم حذف المشروع بنجاح' : 'Project deleted successfully', 'success');
          }
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        showMessage(language === 'ar' ? 'خطأ في الحذف' : 'Error deleting item', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (activeTab === 'news') {
        if (editingItem) {
          // Update news
          const response = await newsService.updateNews(editingItem.id, {
            title: formData.title,
            content: formData.content,
            summary: formData.summary,
            category: formData.category,
            status: formData.status,
            readTime: formData.readTime
          });
          
          if (response.success) {
            await fetchNews();
            showMessage(language === 'ar' ? 'تم تحديث الخبر بنجاح' : 'News updated successfully', 'success');
            setShowAddForm(false);
            setEditingItem(null);
          }
        } else {
          // Create news
          const response = await newsService.createNews({
            title: formData.title,
            content: formData.content,
            summary: formData.summary,
            category: formData.category,
            status: formData.status,
            readTime: formData.readTime
          });
          
          if (response.success) {
            await fetchNews();
            showMessage(language === 'ar' ? 'تم إضافة الخبر بنجاح' : 'News added successfully', 'success');
            setShowAddForm(false);
          }
        }
      } else { // activeTab === 'projects'
        if (editingItem) {
          // Update project
          const response = await projectsService.updateProject(editingItem.id, {
            name: formData.title,
            description: formData.content,
            status: formData.status,
            type: formData.type,
            startDate: formData.startDate,
            endDate: formData.endDate,
            progress: parseInt(formData.progress) || 0
          });
          
          if (response.success) {
            await fetchProjects();
            showMessage(language === 'ar' ? 'تم تحديث المشروع بنجاح' : 'Project updated successfully', 'success');
            setShowAddForm(false);
            setEditingItem(null);
          }
        } else {
          // Create project
          const response = await projectsService.createProject({
            name: formData.title,
            description: formData.content,
            status: formData.status,
            type: formData.type,
            startDate: formData.startDate,
            endDate: formData.endDate,
            progress: parseInt(formData.progress) || 0
          });
          
          if (response.success) {
            await fetchProjects();
            showMessage(language === 'ar' ? 'تم إضافة المشروع بنجاح' : 'Project added successfully', 'success');
            setShowAddForm(false);
          }
        }
      }
    } catch (error) {
      console.error('Error saving item:', error);
      showMessage(language === 'ar' ? 'خطأ في الحفظ' : 'Error saving item', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getTranslation = (key) => {
    const translations = {
      ar: {
        dashboardTitle: 'لوحة تحكم المدير',
        news: 'الأخبار',
        projects: 'المشاريع',
        addNews: 'إضافة خبر جديد',
        addProject: 'إضافة مشروع جديد',
        edit: 'تعديل',
        delete: 'حذف',
        view: 'عرض',
        title: 'العنوان',
        content: 'المحتوى',
        summary: 'الملخص',
        category: 'الفئة',
        status: 'الحالة',
        type: 'النوع',
        startDate: 'تاريخ البداية',
        endDate: 'تاريخ الانتهاء',
        progress: 'التقدم',
        readTime: 'وقت القراءة',
        published: 'منشور',
        draft: 'مسودة',
        Planning: 'قيد التخطيط',
        Active: 'نشط',
        'On Hold': 'متوقف',
        Completed: 'مكتمل',
        Infrastructure: 'بنية تحتية',
        Development: 'تطوير',
        Industrial: 'صناعي',
        Maritime: 'بحري',
        Security: 'أمني',
        save: 'حفظ',
        cancel: 'إلغاء',
        close: 'إغلاق',
        noItems: 'لا توجد عناصر',
        confirmDelete: 'هل أنت متأكد من الحذف؟',
        actions: 'الإجراءات'
      },
      en: {
        dashboardTitle: 'Admin Dashboard',
        news: 'News',
        projects: 'Projects',
        addNews: 'Add News',
        addProject: 'Add Project',
        edit: 'Edit',
        delete: 'Delete',
        view: 'View',
        title: 'Title',
        content: 'Content',
        summary: 'Summary',
        category: 'Category',
        status: 'Status',
        type: 'Type',
        startDate: 'Start Date',
        endDate: 'End Date',
        progress: 'Progress',
        readTime: 'Read Time',
        published: 'Published',
        draft: 'Draft',
        Planning: 'Planning',
        Active: 'Active',
        'On Hold': 'On Hold',
        Completed: 'Completed',
        Infrastructure: 'Infrastructure',
        Development: 'Development',
        Industrial: 'Industrial',
        Maritime: 'Maritime',
        Security: 'Security',
        save: 'Save',
        cancel: 'Cancel',
        close: 'Close',
        noItems: 'No items found',
        confirmDelete: 'Are you sure you want to delete?',
        actions: 'Actions'
      }
    };
    return translations[language]?.[key] || key;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        width: '95%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0054a6, #003366)',
          color: 'white',
          padding: '20px',
          borderRadius: '15px 15px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>
            {getTranslation('dashboardTitle')}
          </h1>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Message Display */}
        {message && (
          <div style={{
            padding: '15px 20px',
            background: messageType === 'success' ? '#d4edda' : '#f8d7da',
            color: messageType === 'success' ? '#155724' : '#721c24',
            border: messageType === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
            fontSize: '14px',
            fontWeight: '500',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        {/* Tabs */}
        <div style={{
          display: 'flex',
          background: '#f8f9fa',
          borderBottom: '1px solid #dee2e6'
        }}>
          <button
            onClick={() => setActiveTab('news')}
            style={{
              padding: '15px 25px',
              background: activeTab === 'news' ? '#0054a6' : 'transparent',
              color: activeTab === 'news' ? 'white' : '#495057',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            <FaNewspaper style={{ marginRight: '8px' }} />
            {getTranslation('news')}
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            style={{
              padding: '15px 25px',
              background: activeTab === 'projects' ? '#0054a6' : 'transparent',
              color: activeTab === 'projects' ? 'white' : '#495057',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            <FaProjectDiagram style={{ marginRight: '8px' }} />
            {getTranslation('projects')}
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
          {/* Add Button */}
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={handleAdd}
              disabled={loading}
              style={{
                padding: '12px 20px',
                background: loading ? '#95a5a6' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: loading ? 0.7 : 1
              }}
            >
              <FaPlus />
              {activeTab === 'news' ? getTranslation('addNews') : getTranslation('addProject')}
            </button>
          </div>

          {/* Items List */}
          <div style={{
            background: '#f8f9fa',
            borderRadius: '10px',
            padding: '20px'
          }}>
            {activeTab === 'news' ? (
              <div>
                <h3 style={{ marginBottom: '20px', color: '#0054a6' }}>
                  {getTranslation('news')} ({news.length})
                </h3>
                {news.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#6c757d' }}>
                    {getTranslation('noItems')}
                  </p>
                ) : (
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {news.map(item => (
                      <div key={item.id} style={{
                        background: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid #dee2e6',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{item.title}</h4>
                          <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>
                            {(item.content || '').substring(0, 100)}...
                          </p>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <span style={{
                              background: item.status === 'published' ? '#28a745' : '#ffc107',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px'
                            }}>
                              {getTranslation(item.status)}
                            </span>
                            <span style={{
                              background: '#6f42c1',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px'
                            }}>
                              {item.category || 'أخبار عامة'}
                            </span>
                            <span style={{ color: '#666', fontSize: '12px' }}>{item.date}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleEdit(item)}
                            disabled={loading}
                            style={{
                              padding: '6px 12px',
                              background: loading ? '#95a5a6' : '#007bff',
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              cursor: loading ? 'not-allowed' : 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, 'news')}
                            disabled={loading}
                            style={{
                              padding: '6px 12px',
                              background: loading ? '#95a5a6' : '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              cursor: loading ? 'not-allowed' : 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h3 style={{ marginBottom: '20px', color: '#0054a6' }}>
                  {getTranslation('projects')} ({projects.length})
                </h3>
                {projects.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#6c757d' }}>
                    {getTranslation('noItems')}
                  </p>
                ) : (
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {projects.map(item => (
                      <div key={item.id} style={{
                        background: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid #dee2e6',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{item.name}</h4>
                          <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>
                            {(item.description || '').substring(0, 100)}...
                          </p>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{
                              background: '#007bff',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px'
                            }}>
                              {item.id}
                            </span>
                            <span style={{
                              background: item.status === 'Active' ? '#28a745' : 
                                        item.status === 'Planning' ? '#ffc107' : 
                                        item.status === 'Completed' ? '#17a2b8' : '#dc3545',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px'
                            }}>
                              {getTranslation(item.status)}
                            </span>
                            <span style={{
                              background: '#6f42c1',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px'
                            }}>
                              {getTranslation(item.type)}
                            </span>
                            <span style={{
                              background: '#28a745',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px'
                            }}>
                              {item.progress}%
                            </span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleEdit(item)}
                            disabled={loading}
                            style={{
                              padding: '6px 12px',
                              background: loading ? '#95a5a6' : '#007bff',
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              cursor: loading ? 'not-allowed' : 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, 'projects')}
                            disabled={loading}
                            style={{
                              padding: '6px 12px',
                              background: loading ? '#95a5a6' : '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              cursor: loading ? 'not-allowed' : 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100
          }}>
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '30px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <h2 style={{
                marginBottom: '25px',
                color: '#0054a6',
                textAlign: 'center'
              }}>
                {editingItem ? 
                  (language === 'ar' ? 'تعديل' : 'Edit') : 
                  (activeTab === 'news' ? getTranslation('addNews') : getTranslation('addProject'))
                }
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Title/Name Field */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    {getTranslation('title')}
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Summary Field (News only) */}
                {activeTab === 'news' && (
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '600',
                      color: '#333'
                    }}>
                      {getTranslation('summary')}
                    </label>
                    <input
                      type="text"
                      value={formData.summary}
                      onChange={(e) => setFormData({...formData, summary: e.target.value})}
                      placeholder="ملخص قصير للخبر"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                )}

                {/* Content/Description Field */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    {getTranslation('content')}
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* News-specific fields */}
                {activeTab === 'news' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontWeight: '600',
                          color: '#333'
                        }}>
                          {getTranslation('category')}
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                          }}
                        >
                          <option value="أخبار عامة">أخبار عامة</option>
                          <option value="Development">تطوير</option>
                          <option value="Infrastructure">بنية تحتية</option>
                          <option value="Partnerships">شراكات</option>
                          <option value="Security">أمن</option>
                          <option value="Events">أحداث</option>
                          <option value="Sustainability">استدامة</option>
                        </select>
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontWeight: '600',
                          color: '#333'
                        }}>
                          {getTranslation('readTime')}
                        </label>
                        <input
                          type="text"
                          value={formData.readTime}
                          onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                          placeholder="3 min read"
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Project-specific fields */}
                {activeTab === 'projects' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontWeight: '600',
                          color: '#333'
                        }}>
                          {getTranslation('startDate')}
                        </label>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                          required
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontWeight: '600',
                          color: '#333'
                        }}>
                          {getTranslation('endDate')}
                        </label>
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontWeight: '600',
                          color: '#333'
                        }}>
                          {getTranslation('type')}
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({...formData, type: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                          }}
                        >
                          <option value="Infrastructure">{getTranslation('Infrastructure')}</option>
                          <option value="Development">{getTranslation('Development')}</option>
                          <option value="Industrial">{getTranslation('Industrial')}</option>
                          <option value="Maritime">{getTranslation('Maritime')}</option>
                          <option value="Security">{getTranslation('Security')}</option>
                        </select>
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontWeight: '600',
                          color: '#333'
                        }}>
                          {getTranslation('progress')} (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={formData.progress}
                          onChange={(e) => setFormData({...formData, progress: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Status Field */}
                <div style={{ marginBottom: '25px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    {getTranslation('status')}
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  >
                    {activeTab === 'news' ? (
                      <>
                        <option value="published">{getTranslation('published')}</option>
                        <option value="draft">{getTranslation('draft')}</option>
                      </>
                    ) : (
                      <>
                        <option value="Planning">{getTranslation('Planning')}</option>
                        <option value="Active">{getTranslation('Active')}</option>
                        <option value="On Hold">{getTranslation('On Hold')}</option>
                        <option value="Completed">{getTranslation('Completed')}</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingItem(null);
                    }}
                    style={{
                      padding: '12px 25px',
                      background: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    {getTranslation('cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: '12px 25px',
                      background: loading ? '#6c757d' : '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      opacity: loading ? 0.7 : 1
                    }}
                  >
                    <FaSave style={{ marginRight: '8px' }} />
                    {loading ? (language === 'ar' ? 'جاري الحفظ...' : 'Saving...') : getTranslation('save')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;