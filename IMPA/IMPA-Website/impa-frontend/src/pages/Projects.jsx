import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService.js';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  useEffect(() => {
    // Load projects from data service
    const loadProjects = () => {
      const projectsData = dataService.getAllProjects();
      console.log('Loaded projects:', projectsData); // Debug log
      setProjects(projectsData);
    };

    loadProjects();
    
    // Listen for storage changes to refresh data
    window.addEventListener('storage', loadProjects);
    
    // Also refresh when the page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadProjects();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('storage', loadProjects);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesType = typeFilter === 'all' || project.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  // Close project modal
  const closeProjectModal = () => {
    setShowProjectModal(false);
    setSelectedProject(null);
  };

  return (
    <div className="content" style={{ direction: 'rtl', fontFamily: 'Tahoma, Arial, sans-serif' }}>
      {/* Search and Filter Section */}
      <section style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', direction: 'rtl' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50', fontSize: '2.5rem' }}>
          📋 مشاريع IMPA EGYPT
        </h2>
        
        {/* Search Bar */}
        <div style={{ marginBottom: '30px' }}>
          <input
            type="text"
            placeholder="البحث في المشاريع بالاسم أو الوصف أو الرقم التعريفي..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '15px 20px',
              border: '2px solid #e0e0e0',
              borderRadius: '25px',
              fontSize: '1.1rem',
              outline: 'none',
              transition: 'border-color 0.3s ease',
              textAlign: 'right',
              direction: 'rtl'
            }}
          />
        </div>

        {/* Filters */}
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          marginBottom: '30px',
          direction: 'rtl'
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#2c3e50', 
              fontWeight: '500',
              textAlign: 'right'
            }}>
              فلتر الحالة
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '10px 15px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                textAlign: 'right',
                direction: 'rtl'
              }}
            >
              <option value="all">جميع الحالات</option>
              <option value="Active">نشط</option>
              <option value="Planning">قيد التخطيط</option>
              <option value="Completed">مكتمل</option>
              <option value="On Hold">معلق</option>
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#2c3e50', 
              fontWeight: '500',
              textAlign: 'right'
            }}>
              فلتر النوع
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{
                padding: '10px 15px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                textAlign: 'right',
                direction: 'rtl'
              }}
            >
              <option value="all">جميع الأنواع</option>
              <option value="Infrastructure">البنية التحتية</option>
              <option value="Development">التطوير</option>
              <option value="Mining">التعدين</option>
              <option value="Security">الأمن</option>
            </select>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', direction: 'rtl' }}>
        {filteredProjects.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '25px'
          }}>
            {filteredProjects.map(project => (
              <div key={project.id} style={{
                background: 'white',
                borderRadius: '15px',
                padding: '25px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '450px',
                direction: 'rtl'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
              }}
              >
                {/* Project ID Badge */}
                <div style={{
                  background: '#3498db',
                  color: 'white',
                  padding: '8px 15px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  marginBottom: '20px',
                  textAlign: 'center',
                  display: 'inline-block',
                  alignSelf: 'flex-end'
                }}>
                  {project.id}
                </div>
                
                {/* Project Photo */}
                {project.photo && (
                  <div style={{ marginBottom: '20px' }}>
                    <img 
                      src={project.photo} 
                      alt={project.name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </div>
                )}
                
                {/* Project Content */}
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', direction: 'rtl' }}>
                  <h4 style={{ 
                    marginBottom: '15px', 
                    color: '#2c3e50',
                    fontSize: '1.3rem',
                    textAlign: 'right',
                    fontWeight: '600'
                  }}>
                    {project.name}
                  </h4>
                  
                  <p style={{ 
                    marginBottom: '20px', 
                    color: '#34495e', 
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    flex: '1',
                    textAlign: 'right'
                  }}>
                    {project.description?.substring(0, 120)}...
                  </p>
                  
                  {/* Progress Bar */}
                  <div style={{ marginBottom: '20px', direction: 'rtl' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '1rem', color: '#2c3e50', fontWeight: '500' }}>{project.progress}%</span>
                      <span style={{ fontSize: '1rem', color: '#2c3e50', fontWeight: '500' }}>التقدم</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '10px',
                      background: '#ecf0f1',
                      borderRadius: '5px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${project.progress}%`,
                        height: '100%',
                        background: 'linear-gradient(45deg, #27ae60, #2ecc71)',
                        borderRadius: '5px',
                        transition: 'width 0.3s ease',
                        float: 'right'
                      }}></div>
                    </div>
                  </div>

                  {/* Status and Type Badges */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    marginBottom: '20px', 
                    flexWrap: 'wrap',
                    justifyContent: 'flex-end',
                    direction: 'rtl'
                  }}>
                    <span style={{
                      background: '#e8f5e8',
                      color: '#27ae60',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      {project.status}
                    </span>
                    <span style={{
                      background: '#e8f4fd',
                      color: '#3498db',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      {project.type}
                    </span>
                  </div>

                  {/* Start Date */}
                  <div style={{ 
                    fontSize: '1rem', 
                    color: '#7f8c8d', 
                    marginBottom: '25px',
                    textAlign: 'center',
                    padding: '10px',
                    background: '#f8f9fa',
                    borderRadius: '10px'
                  }}>
                    بدأ في: {new Date(project.startDate).toLocaleDateString('ar-EG')}
                  </div>

                  {/* View Details Button */}
                  <div style={{ marginTop: 'auto' }}>
                    <button 
                      onClick={() => handleProjectClick(project)}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '14px 24px',
                        borderRadius: '30px',
                        fontSize: '1.05rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.4s ease',
                        width: '100%',
                        boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)',
                        transform: 'translateY(0)',
                        letterSpacing: '0.5px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.3)';
                      }}
                    >
                      🔍 عرض التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#7f8c8d',
            fontSize: '1.1rem'
          }}>
            {projects.length === 0 ? (
              'لا توجد مشاريع متاحة في الوقت الحالي. تحقق مرة أخرى قريباً للحصول على التحديثات!'
            ) : (
              'لم يتم العثور على مشاريع تطابق معايير البحث الخاصة بك.'
            )}
          </div>
        )}
      </section>

      {/* Project Details Modal */}
      {showProjectModal && selectedProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px',
          direction: 'rtl'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={closeProjectModal}
              style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '1.2rem',
                cursor: 'pointer',
                zIndex: 1,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.background = '#c0392b';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.background = '#e74c3c';
              }}
            >
              ✕
            </button>

            {/* Project Image */}
            {selectedProject.photo && (
              <div style={{
                width: '100%',
                height: '250px',
                overflow: 'hidden',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                backgroundColor: '#f8f9fa'
              }}>
                <img 
                  src={selectedProject.photo} 
                  alt={selectedProject.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </div>
            )}

            {/* Project Details */}
            <div style={{ padding: '30px', direction: 'rtl' }}>
              <div style={{
                background: '#3498db',
                color: 'white',
                padding: '8px 15px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                marginBottom: '20px',
                textAlign: 'center',
                display: 'inline-block'
              }}>
                {selectedProject.id}
              </div>

              <h2 style={{
                color: '#2c3e50',
                marginBottom: '20px',
                fontSize: '2rem',
                textAlign: 'right'
              }}>
                {selectedProject.name}
              </h2>

              <p style={{
                color: '#34495e',
                lineHeight: '1.6',
                marginBottom: '25px',
                fontSize: '1.1rem',
                textAlign: 'right'
              }}>
                {selectedProject.description}
              </p>

              {/* Progress Bar */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '1rem', color: '#2c3e50', fontWeight: '500' }}>{selectedProject.progress}%</span>
                  <span style={{ fontSize: '1rem', color: '#2c3e50', fontWeight: '500' }}>التقدم</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '12px',
                  background: '#ecf0f1',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${selectedProject.progress}%`,
                    height: '100%',
                    background: 'linear-gradient(45deg, #27ae60, #2ecc71)',
                    borderRadius: '6px',
                    transition: 'width 0.3s ease',
                    float: 'right'
                  }}></div>
                </div>
              </div>

              {/* Status and Type */}
              <div style={{ 
                display: 'flex', 
                gap: '15px', 
                marginBottom: '25px', 
                flexWrap: 'wrap',
                justifyContent: 'flex-end'
              }}>
                <span style={{
                  background: '#e8f4fd',
                  color: '#3498db',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}>
                  النوع: {selectedProject.type}
                </span>
                <span style={{
                  background: '#e8f5e8',
                  color: '#27ae60',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}>
                  الحالة: {selectedProject.status}
                </span>
              </div>

              <div style={{
                fontSize: '1rem',
                color: '#7f8c8d',
                marginBottom: '25px',
                textAlign: 'center',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '10px'
              }}>
                بدأ في: {new Date(selectedProject.startDate).toLocaleDateString('ar-EG')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;