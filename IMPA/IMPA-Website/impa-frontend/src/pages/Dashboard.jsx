import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dataService from '../services/dataService.js';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('news');
  const [news, setNews] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      loadData();
    }
  }, [navigate]);

  const loadData = () => {
    setNews(dataService.getAdminNews());
    setProjects(dataService.getAdminProjects());
    
    // Load team members from localStorage or use default data
    const savedTeam = localStorage.getItem('impaTeamMembers');
    if (savedTeam) {
      setTeamMembers(JSON.parse(savedTeam));
    } else {
      // Default team members
      const defaultTeam = [
        {
          id: 1,
          name: 'الفريق مهندس/ كامل الوزير',
          title: 'وزير النقل والصناعة ورئيس مجلس الإدارة',
          role: 'الرئيس',
          photo: '/كامل الوزير.jpg'
        },
        {
          id: 2,
          name: 'المهندس/ تيسير ممدوح خاطر',
          title: 'رئيس الجهاز التنفيذي للمشروعات الصناعية والتعدينية مقرر مجلس الإدارة',
          role: 'المدير التنفيذي',
          photo: null
        },
        {
          id: 3,
          name: 'المستشار/ محمد ممدوح بدران',
          title: 'نائب رئيس مجلس الدولة',
          role: 'عضو مجلس الدولة',
          photo: null
        },
        {
          id: 4,
          name: 'اللواء أ.ح مهندس/ ناصر فوزي محمد',
          title: 'مدير المركز الوطني لتخطيط استخدامات أراضي الدولة',
          role: 'عضو وزارة التخطيط',
          photo: null
        },
        {
          id: 5,
          name: 'اللواء أ.ح مهندس/ إيهاب محمد أمين',
          title: 'مساعد وزير التجارة للشئون الفنية ممثل وزارة التجارة والصناعة',
          role: 'عضو وزارة التجارة',
          photo: null
        },
        {
          id: 6,
          name: 'د. أحلام فاروق عبد الحميد',
          title: 'رئيس الإدارة المركزية لتحسين البيئة الصناعية والطاقة ممثل وزارة البيئة',
          role: 'عضو وزارة البيئة',
          photo: null
        },
        {
          id: 7,
          name: 'د. ناهد يوسف عبده',
          title: 'رئيس الهيئة العامة للتنمية الصناعية',
          role: 'عضو الهيئة الصناعية',
          photo: null
        }
      ];
      setTeamMembers(defaultTeam);
      localStorage.setItem('impaTeamMembers', JSON.stringify(defaultTeam));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/');
  };

  const handleAdd = (type) => {
    setShowAddForm(true);
    if (type === 'news') {
      setEditingItem({ 
        type: 'news', 
        id: null, 
        title: '', 
        content: '', 
        date: new Date().toISOString().split('T')[0]
      });
    } else if (type === 'projects') {
      setEditingItem({ 
        type: 'projects', 
        id: null, 
        name: '',
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        status: '',
        projectType: '',
        progress: 0
      });
    } else if (type === 'team') {
      setEditingItem({ 
        type: 'team', 
        id: null, 
        name: '',
        title: '',
        role: '',
        photo: null
      });
    } else {
      // Default fallback to avoid undefined type
      setEditingItem({ 
        type: 'projects', 
        id: null, 
        name: '',
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        status: '',
        projectType: '',
        progress: 0
      });
    }
    setSelectedPhoto(null);
  };

  const handleEdit = (item, type) => {
    setEditingItem({ ...item, type });
    setShowAddForm(true);
    setSelectedPhoto(item.photo || null);
  };

  const handleDelete = (id, type) => {
    if (type === 'news') {
      dataService.deleteNews(id);
    } else if (type === 'projects') {
      dataService.deleteProject(id);
    } else if (type === 'team') {
      const updatedTeam = teamMembers.filter(member => member.id !== id);
      setTeamMembers(updatedTeam);
      localStorage.setItem('impaTeamMembers', JSON.stringify(updatedTeam));
    }
    loadData();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (item) => {
    if (item.type === 'news') {
      if (item.id) {
        dataService.updateNews(item.id, {
          title: item.title,
          content: item.content,
          date: item.date,
          summary: item.content.substring(0, 150) + '...'
        });
        if (selectedPhoto) {
          dataService.addNewsPhoto(item.id, selectedPhoto);
        }
      } else {
        const newNews = dataService.addNews({
          title: item.title,
          content: item.content,
          date: item.date
        });
        if (selectedPhoto) {
          dataService.addNewsPhoto(newNews.id, selectedPhoto);
        }
      }
    } else if (item.type === 'projects') {
      if (item.id) {
        dataService.updateProject(item.id, {
          name: item.name,
          description: item.description,
          status: item.status,
          type: item.projectType,
          progress: item.progress
        });
        if (selectedPhoto) {
          dataService.addProjectPhoto(item.id, selectedPhoto);
        }
      } else {
        const newProject = dataService.addProject({
          name: item.name,
          description: item.description,
          status: item.status,
          type: item.projectType,
          progress: item.progress
        });
        if (selectedPhoto) {
          dataService.addProjectPhoto(newProject.id, selectedPhoto);
        }
      }
    } else if (item.type === 'team') {
      if (item.id) {
        // Update existing team member
        const updatedTeam = teamMembers.map(member => 
          member.id === item.id 
            ? { ...item, photo: selectedPhoto || member.photo }
            : member
        );
        setTeamMembers(updatedTeam);
        localStorage.setItem('impaTeamMembers', JSON.stringify(updatedTeam));
      } else {
        // Add new team member
        const newMember = {
          ...item,
          id: Date.now(),
          photo: selectedPhoto
        };
        const updatedTeam = [...teamMembers, newMember];
        setTeamMembers(updatedTeam);
        localStorage.setItem('impaTeamMembers', JSON.stringify(updatedTeam));
      }
    }
    loadData();
    setShowAddForm(false);
    setEditingItem(null);
    setSelectedPhoto(null);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingItem(null);
    setSelectedPhoto(null);
  };

  return (
    <div className="content">
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0054a6 0%, #003366 100%)',
        color: 'white',
        padding: '30px 20px',
        borderRadius: '15px',
        margin: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
            🛠️ لوحة تحكم المدير
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>
            إدارة أخبار ومشاريع وفريق العمل
          </p>
        </div>
        
        <button
          onClick={handleLogout}
          style={{
            background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
            color: 'white',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '25px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
           تسجيل الخروج
        </button>
      </div>

      {/* Tabs */}
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          borderBottom: '2px solid #ecf0f1'
        }}>
          <button
            onClick={() => setActiveTab('news')}
            style={{
              background: activeTab === 'news' ? '#0054a6' : 'transparent',
              color: activeTab === 'news' ? 'white' : '#0054a6',
              border: '2px solid #0054a6',
              padding: '12px 25px',
              borderRadius: '25px 25px 0 0',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
             إدارة الأخبار
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            style={{
              background: activeTab === 'projects' ? '#0054a6' : 'transparent',
              color: activeTab === 'projects' ? 'white' : '#0054a6',
              border: '2px solid #0054a6',
              padding: '12px 25px',
              borderRadius: '25px 25px 0 0',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
             إدارة المشاريع
          </button>
          <button
            onClick={() => setActiveTab('team')}
            style={{
              background: activeTab === 'team' ? '#0054a6' : 'transparent',
              color: activeTab === 'team' ? 'white' : '#0054a6',
              border: '2px solid #0054a6',
              padding: '12px 25px',
              borderRadius: '25px 25px 0 0',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
             إدارة فريق العمل
          </button>
        </div>

        {/* Add Button */}
        <div style={{ marginBottom: '20px' }}>
          {activeTab !== 'team' && (
            <button
              onClick={() => handleAdd(activeTab)}
              style={{
                background: 'linear-gradient(45deg, #27ae60, #2ecc71)',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '25px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
               إضافة {activeTab === 'news' ? 'خبر جديد' : activeTab === 'projects' ? 'مشروع جديد' : 'عضو جديد'}
            </button>
          )}
          {activeTab === 'team' && (
            <button
              onClick={() => handleAdd('team')}
              style={{
                background: 'linear-gradient(45deg, #27ae60, #2ecc71)',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '25px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
               إضافة عضو جديد
            </button>
          )}
        </div>

        {/* Content */}
        {activeTab === 'news' ? (
          <div className="news-grid">
            {news.map(item => (
              <div key={item.id} className="news-card" style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px'
              }}>
                {item.photo && (
                  <div style={{ marginBottom: '15px' }}>
                    <img 
                      src={item.photo} 
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </div>
                )}
                <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ color: '#34495e', marginBottom: '15px' }}>{item.content}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                     {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button
                    onClick={() => handleEdit(item, 'news')}
                    style={{
                      background: '#3498db',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                     تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, 'news')}
                    style={{
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                     حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : activeTab === 'projects' ? (
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card" style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px'
              }}>
                <div className="project-id" style={{
                  background: '#3498db',
                  color: 'white',
                  padding: '5px 12px',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  marginBottom: '15px',
                  display: 'inline-block'
                }}>
                  {project.id}
                </div>
                {project.photo && (
                  <div style={{ marginBottom: '15px' }}>
                    <img 
                      src={project.photo} 
                      alt={project.name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                )}
                <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>{project.name}</h4>
                <p style={{ marginBottom: '15px', color: '#34495e' }}>{project.description}</p>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                  <span className="status-badge" style={{
                    background: '#e8f5e8',
                    color: '#27ae60',
                    padding: '5px 12px',
                    borderRadius: '15px',
                    fontSize: '0.9rem'
                  }}>
                    {project.status}
                  </span>
                  <span className="type-badge" style={{
                    background: '#e8f4fd',
                    color: '#3498db',
                    padding: '5px 12px',
                    borderRadius: '15px',
                    fontSize: '0.9rem'
                  }}>
                    {project.type}
                  </span>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>التقدم</span>
                    <span style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>{project.progress}%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: '#ecf0f1',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${project.progress}%`,
                      height: '100%',
                      background: 'linear-gradient(45deg, #27ae60, #2ecc71)',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleEdit(project, 'projects')}
                    style={{
                      background: '#3498db',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                     تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, 'projects')}
                    style={{
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                     حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : activeTab === 'team' ? (
          <div className="team-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px'
          }}>
            {teamMembers.map(member => (
              <div key={member.id} className="team-card" style={{
                background: 'white',
                padding: '25px',
                borderRadius: '15px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
              }}
              >
                {/* Member Photo */}
                {member.photo ? (
                  <div style={{ 
                    width: '100px', 
                    height: '100px', 
                    margin: '0 auto 20px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid #3498db',
                    boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
                  }}>
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                ) : (
                  <div style={{ 
                    width: '100px', 
                    height: '100px', 
                    margin: '0 auto 20px',
                    borderRadius: '50%',
                    background: '#ecf0f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    color: '#bdc3c7'
                  }}>
                    
                  </div>
                )}
                
                <h3 style={{ 
                  marginBottom: '10px', 
                  color: '#2c3e50', 
                  fontSize: '1.2rem',
                  fontWeight: '600'
                }}>
                  {member.name}
                </h3>
                
                <p style={{ 
                  marginBottom: '15px', 
                  color: '#34495e', 
                  fontSize: '1rem',
                  lineHeight: '1.4'
                }}>
                  {member.title}
                </p>
                
                <div style={{
                  background: '#3498db',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  marginBottom: '20px',
                  display: 'inline-block'
                }}>
                  {member.role}
                </div>
                
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button
                    onClick={() => handleEdit(member, 'team')}
                    style={{
                      background: '#3498db',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                     تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(member.id, 'team')}
                    style={{
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                     حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>
              {editingItem?.id ? '✏️ تعديل' : '➕ إضافة'} {editingItem?.type === 'news' ? 'خبر جديد' : editingItem?.type === 'projects' ? 'مشروع جديد' : 'عضو جديد في الفريق'}
            </h3>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSave(editingItem); }}>
              {editingItem?.type === 'news' ? (
                <>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50' }}>
                      📰 العنوان
                    </label>
                    <input
                      type="text"
                      value={editingItem.title || ''}
                      onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50' }}>
                      📝 المحتوى
                    </label>
                    <textarea
                      value={editingItem.content || ''}
                      onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                      required
                      rows="4"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '16px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50' }}>
                       التاريخ
                    </label>
                    <input
                      type="date"
                      value={editingItem.date || ''}
                      onChange={(e) => setEditingItem({...editingItem, date: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50' }}>
                       صورة الخبر
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    {selectedPhoto && (
                      <div style={{ marginTop: '10px' }}>
                        <img 
                          src={selectedPhoto} 
                          alt="Preview" 
                          style={{
                            width: '100%',
                            maxHeight: '200px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </>
              ) : editingItem?.type === 'projects' ? (
                <>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50' }}>
                       اسم المشروع
                    </label>
                    <input
                      type="text"
                      value={editingItem.name || ''}
                      onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50' }}>
                       الوصف
                    </label>
                    <textarea
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                      required
                      rows="3"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '16px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50' }}>
                       صورة المشروع
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    {selectedPhoto && (
                      <div style={{ marginTop: '10px' }}>
                        <img 
                          src={selectedPhoto} 
                          alt="Preview" 
                          style={{
                            width: '100%',
                            maxHeight: '200px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50' }}>
                         الحالة
                      </label>
                      <select
                        value={editingItem.status || ''}
                        onChange={(e) => setEditingItem({...editingItem, status: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '16px'
                        }}
                      >
                        <option value="">اختر الحالة</option>
                        <option value="نشط">نشط</option>
                        <option value="قيد التخطيط">قيد التخطيط</option>
                        <option value="مكتمل">مكتمل</option>
                        <option value="معلق">معلق</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50' }}>
                        🏷️ النوع
                      </label>
                      <select
                        value={editingItem.projectType || ''}
                        onChange={(e) => setEditingItem({...editingItem, projectType: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '16px'
                        }}
                      >
                        <option value="">اختر النوع</option>
                        <option value="البنية التحتية">البنية التحتية</option>
                        <option value="التطوير">التطوير</option>
                        <option value="التعدين">التعدين</option>
                        <option value="الأمن">الأمن</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50' }}>
                       التقدم (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editingItem.progress || 0}
                      onChange={(e) => setEditingItem({...editingItem, progress: parseInt(e.target.value) || 0})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </>
              ) : editingItem?.type === 'team' ? (
                <>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50' }}>
                       الاسم
                    </label>
                    <input
                      type="text"
                      value={editingItem.name || ''}
                      onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50' }}>
                       المسمى الوظيفي
                    </label>
                    <input
                      type="text"
                      value={editingItem.title || ''}
                      onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50' }}>
                       الدور/المنصب
                    </label>
                    <input
                      type="text"
                      value={editingItem.role || ''}
                      onChange={(e) => setEditingItem({...editingItem, role: e.target.value})}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50' }}>
                       صورة العضو
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    {selectedPhoto && (
                      <div style={{ marginTop: '10px' }}>
                        <img 
                          src={selectedPhoto} 
                          alt="Preview" 
                          style={{
                            width: '100%',
                            maxHeight: '200px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </>
              ) : null}
              
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    background: '#95a5a6',
                    color: 'white',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                   إلغاء
                </button>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(45deg, #27ae60, #2ecc71)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                   حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 