import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dataService from '../services/dataService.js';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [projects, setProjects] = useState([]);
  const [news, setNews] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Enhanced news carousel state - now swaps one by one
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Load real data from data service
    const loadData = () => {
      const projectsData = dataService.getAllProjects();
      const newsData = dataService.getAllNews();
      
      console.log('Loaded projects in Home:', projectsData);
      console.log('Loaded news in Home:', newsData);
      setProjects(projectsData);
      setNews(newsData);
    };

    const loadTeamMembers = () => {
      // Load team members from localStorage
      const savedTeam = localStorage.getItem('impaTeamMembers');
      if (savedTeam) {
        setTeamMembers(JSON.parse(savedTeam));
      } else {
        // Default team members if none exist
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
            photo: ' /تيسير.png'
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
      }
      console.log('Loaded team members in Home:', teamMembers);
    };

    loadData();
    loadTeamMembers();
    
    // Listen for storage changes to refresh data
    window.addEventListener('storage', () => {
      loadData();
      loadTeamMembers();
    });
    
    // Also refresh when the page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadData();
        loadTeamMembers();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('storage', () => {
        loadData();
        loadTeamMembers();
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Enhanced auto-carousel effect - swaps one card at a time to the left
  useEffect(() => {
    if (news.length > 0 && !isHovered) {
      const interval = setInterval(() => {
        setCurrentNewsIndex((prevIndex) => {
          // Move one card to the left (increment by 1)
          const nextIndex = (prevIndex + 1) % news.length;
          return nextIndex;
        });
      }, 1500); // 1.5 seconds for smoother transition

      return () => clearInterval(interval);
    }
  }, [news.length, isHovered]);

  // Auto-refresh search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      // Perform search automatically when search query changes
      handleSearchQuery(searchQuery);
    }
  }, [searchQuery, projects]);

  const handleSearchQuery = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = projects.filter(project =>
      project.name.toLowerCase().includes(query.toLowerCase()) ||
      project.description?.toLowerCase().includes(query.toLowerCase()) ||
      project.id.toString().includes(query)
    );
    
    setSearchResults(results);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleSearchQuery(searchQuery);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  const handleNewsClick = (newsItem) => {
    setSelectedNews(newsItem);
    setShowNewsModal(true);
  };

  const closeProjectModal = () => {
    setShowProjectModal(false);
    setSelectedProject(null);
  };

  const closeNewsModal = () => {
    setShowNewsModal(false);
    setSelectedNews(null);
  };

  // Enhanced data refresh function
  const handleDataRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Refresh data service
      dataService.refreshFromStorage();
      
      // Reload data
      const projectsData = dataService.getAllProjects();
      const newsData = dataService.getAllNews();
      
      setProjects(projectsData);
      setNews(newsData);
      
      // Also refresh team members
      const savedTeam = localStorage.getItem('impaTeamMembers');
      if (savedTeam) {
        setTeamMembers(JSON.parse(savedTeam));
      }
      
      // Show success feedback
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    } catch (error) {
      console.error('Error refreshing data:', error);
      setIsRefreshing(false);
    }
  };

  const handleViewAllProjects = () => {
    navigate('/projects');
  };

  // Get current news items to display (now shows 3 items starting from current index)
  const getCurrentNewsItems = () => {
    if (news.length === 0) return [];
    if (news.length <= 3) return news;
    
    const items = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentNewsIndex + i) % news.length;
      items.push(news[index]);
    }
    return items;
  };

  // Enhanced navigation functions for news carousel
  const goToPreviousNews = () => {
    setCurrentNewsIndex((prevIndex) => {
      // Move one card to the right (decrement by 1)
      return prevIndex === 0 ? news.length - 1 : prevIndex - 1;
    });
  };

  const goToNextNews = () => {
    setCurrentNewsIndex((prevIndex) => {
      // Move one card to the left (increment by 1)
      return (prevIndex + 1) % news.length;
    });
  };

  return (
    <div className="content" style={{ direction: 'rtl', fontFamily: 'Tahoma, Arial, sans-serif' }}>
      {/* Hero Section - About IMPA */}
      <section style={{
        background: 'linear-gradient(135deg, #0054a6 0%, #003366 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center',
        borderRadius: '15px',
        margin: '20px',
        boxShadow: '0 8px 32px rgba(0, 84, 166, 0.3)',
        direction: 'rtl'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
          مرحباً بكم في IMPA EGYPT
        </h1>
        <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          IMPA EGYPT
        </p>
        <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '20px auto 0', lineHeight: '1.6', opacity: '0.9' }}>
          الهيئة الرائدة في تنفيذ المشروعات الصناعية والتعدينية في مصر
        </p>
        <p style={{ fontSize: '1rem', maxWidth: '800px', margin: '20px auto 0', lineHeight: '1.6', opacity: '0.8' }}>
          اكتشف مشاريعنا الجارية وأحدث الأخبار وإنجازاتنا في التطوير الصناعي والعمليات التعدينية في جميع أنحاء مصر
        </p>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', direction: 'rtl' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎯</div>
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>مهمتنا</h3>
            <p style={{ color: '#34495e', lineHeight: '1.6', textAlign: 'right' }}>
              تنفيذ وإدارة المشروعات الصناعية والتعدينية ذات القيمة المضافة العالية، وتشجيع الاستثمارات، ودعم المشروعات الصغيرة والمتوسطة لخلق فرص عمل، مع الالتزام بالجودة والابتكار والتنمية المستدامة
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔮</div>
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>رؤيتنا</h3>
            <p style={{ color: '#34495e', lineHeight: '1.6', textAlign: 'right' }}>
              أن نصبح بيت الخبرة الاستشاري الرائد في مصر والشرق الأوسط وشمال أفريقيا، بما يساهم بفعالية في التنمية والاستثمار القومي، ويدعم الدور الإقليمي لمصر
            </p>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', direction: 'rtl' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#2c3e50', fontSize: '2.5rem' }}>
          الخدمات الأساسية
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🏭</div>
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>التطوير الصناعي</h4>
            <p style={{ color: '#34495e', fontSize: '0.95rem', textAlign: 'right' }}>
              تخطيط وتنفيذ المناطق الصناعية والمنشآت التصنيعية
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🚢</div>
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>البنية التحتية للموانئ</h4>
            <p style={{ color: '#34495e', fontSize: '0.95rem', textAlign: 'right' }}>
              تطوير وتحديث مرافق الموانئ والبنية التحتية البحرية
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>⚙️</div>
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>العمليات التعدينية</h4>
            <p style={{ color: '#34495e', fontSize: '0.95rem', textAlign: 'right' }}>
              إدارة المشروعات التعدينية وتطوير الموارد المعدنية
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🌍</div>
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>التعاون الدولي</h4>
            <p style={{ color: '#34495e', fontSize: '0.95rem', textAlign: 'right' }}>
              بناء الشراكات مع المنظمات الدولية والمستثمرين
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>👥</div>
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>بناء القدرات</h4>
            <p style={{ color: '#34495e', fontSize: '0.95rem', textAlign: 'right' }}>
              برامج التدريب والتطوير للمهنيين في الصناعة
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🏆</div>
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>ضمان الجودة</h4>
            <p style={{ color: '#34495e', fontSize: '0.95rem', textAlign: 'right' }}>
              ضمان المعايير العالية في جميع مخرجات المشروع والعمليات
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', direction: 'rtl' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#2c3e50', fontSize: '2.5rem' }}>
          IMPA EGYPT في أرقام
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#3498db', marginBottom: '10px', fontWeight: 'bold' }}>150+</div>
            <p style={{ color: '#34495e', fontSize: '1.1rem' }}>مشروع نشط</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#27ae60', marginBottom: '10px', fontWeight: 'bold' }}>25+</div>
            <p style={{ color: '#34495e', fontSize: '1.1rem' }}>سنة خبرة</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#e74c3c', marginBottom: '10px', fontWeight: 'bold' }}>500+</div>
            <p style={{ color: '#34495e', fontSize: '1.1rem' }}>عضو فريق</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#f39c12', marginBottom: '10px', fontWeight: 'bold' }}>15+</div>
            <p style={{ color: '#34495e', fontSize: '1.1rem' }}>محافظة</p>
          </div>
        </div>
      </section>

      {/* Enhanced Search Section */}
      <section style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', direction: 'rtl' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="البحث في المشاريع بالاسم أو الوصف أو الرقم التعريفي..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: '1',
              minWidth: '300px',
              padding: '12px 20px',
              border: '2px solid #e0e0e0',
              borderRadius: '25px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.3s ease',
              textAlign: 'right',
              direction: 'rtl'
            }}
          />
          <button
            type="submit"
            style={{
              background: 'linear-gradient(45deg, #3498db, #2980b9)',
              color: 'white',
              padding: '12px 25px',
              border: 'none',
              borderRadius: '25px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
            }}
          >
             بحث
          </button>
        </form>
      </section>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', direction: 'rtl' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
            نتائج البحث ({searchResults.length})
          </h3>
          <div className="search-results-display">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px'
            }}>
              {searchResults.map(project => (
                <div key={project.id} style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '15px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '350px'
                }}>
                  {/* Project Photo with Fixed Dimensions */}
                  {project.photo && (
                    <div style={{ 
                      marginBottom: '15px',
                      width: '100%',
                      height: '200px',
                      overflow: 'hidden',
                      borderRadius: '8px',
                      backgroundColor: '#f8f9fa'
                    }}>
                      <img 
                        src={project.photo} 
                        alt={project.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                      />
                    </div>
                  )}
                  
                  <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ color: '#2c3e50', marginBottom: '10px', fontSize: '1.2rem', textAlign: 'right' }}>
                      {project.name}
                    </h4>
                    
                    <p style={{ color: '#34495e', marginBottom: '15px', flex: '1', fontSize: '0.95rem', lineHeight: '1.5', textAlign: 'right' }}>
                      {project.description?.substring(0, 100)}...
                    </p>
                    
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      <span style={{
                        background: '#e8f5e8',
                        color: '#27ae60',
                        padding: '5px 12px',
                        borderRadius: '15px',
                        fontSize: '0.8rem'
                      }}>
                        {project.status}
                      </span>
                      <span style={{
                        background: '#e8f4fd',
                        color: '#3498db',
                        padding: '5px 12px',
                        borderRadius: '15px',
                        fontSize: '0.8rem'
                      }}>
                        {project.type}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => handleProjectClick(project)}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 20px',
                        borderRadius: '25px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        marginTop: 'auto'
                      }}
                    >
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      <section style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', direction: 'rtl' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50', fontSize: '2rem' }}>
          المشاريع المميزة
        </h3>
        
        {/* Enhanced Refresh Button */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={handleDataRefresh}
            disabled={isRefreshing}
            style={{
              background: isRefreshing 
                ? 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '30px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: isRefreshing ? 'not-allowed' : 'pointer',
              transition: 'all 0.4s ease',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
              transform: 'translateY(0)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              if (!isRefreshing) {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isRefreshing) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
              }
            }}
          >
            {isRefreshing ? '⟳ جاري التحديث...' : '⟳ تحديث البيانات'}
          </button>
        </div>
        
        {projects.length > 0 ? (
          <div className="all-projects">
            <div className="projects-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '25px' 
            }}>
              {projects.map(project => (
                <div key={project.id} className="project-card" style={{
                  background: 'white',
                  borderRadius: '15px',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '450px'
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
                  {/* Project Photo with Fixed Dimensions */}
                  {project.photo && (
                    <div style={{ 
                      width: '100%',
                      height: '250px',
                      overflow: 'hidden',
                      backgroundColor: '#f8f9fa'
                    }}>
                      <img 
                        src={project.photo} 
                        alt={project.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                      />
                    </div>
                  )}
                  
                  <div style={{ 
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1'
                  }}>
                    <h4 style={{ 
                      color: '#2c3e50', 
                      marginBottom: '15px',
                      fontSize: '1.3rem',
                      textAlign: 'right',
                      flex: '0 0 auto'
                    }}>
                      {project.name}
                    </h4>
                    
                    <p style={{
                      color: '#34495e',
                      lineHeight: '1.5',
                      fontSize: '0.95rem',
                      flex: '1',
                      marginBottom: '20px',
                      textAlign: 'right'
                    }}>
                      {project.description?.substring(0, 120)}...
                    </p>
                    
                    <div className="project-actions" style={{ marginTop: 'auto' }}>
                      <button 
                        className="view-btn" 
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
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#7f8c8d',
            fontSize: '1.1rem'
          }}>
             لا توجد مشاريع متاحة في الوقت الحالي. تحقق مرة أخرى قريباً للحصول على التحديثات!
          </div>
        )}
      </section>

      {/* Enhanced Latest News Section with One-by-One Auto-Carousel */}
      <section style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', direction: 'rtl' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50', fontSize: '2rem' }}>
           آخر الأخبار والتحديثات
        </h3>
        
        {news.length > 0 ? (
          <div style={{ position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Enhanced Navigation Arrows */}
            {news.length > 1 && (
              <>
                <button
                  onClick={goToNextNews}
                  style={{
                    position: 'absolute',
                    right: '-15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    fontSize: '1.8rem',
                    cursor: 'pointer',
                    zIndex: 10,
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.4s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-50%) scale(1.1)';
                    e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(-50%) scale(1)';
                    e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                  }}
                >
                  ❮
                </button>

                <button
                  onClick={goToPreviousNews}
                  style={{
                    position: 'absolute',
                    left: '-15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    fontSize: '1.8rem',
                    cursor: 'pointer',
                    zIndex: 10,
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.4s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-50%) scale(1.1)';
                    e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(-50%) scale(1)';
                    e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                  }}
                >
                  ❯
                </button>
              </>
            )}

            {/* News Cards Container with Smooth Sliding Animation */}
            <div style={{
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '25px',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              padding: '0 30px'
            }}>
              {getCurrentNewsItems().map((newsItem, index) => (
                <article key={`${newsItem.id}-${currentNewsIndex}-${index}`} style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  animation: `slideInFromRight 0.8s ease-out ${index * 0.1}s both`,
                  transform: 'translateX(0)',
                  opacity: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '500px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
                }}
                >
                  {/* News Image with Fixed Dimensions */}
                  {newsItem.photo && (
                    <div style={{
                      width: '100%',
                      height: '320px',
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#f8f9fa'
                    }}>
                      <img 
                        src={newsItem.photo} 
                        alt={newsItem.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transition: 'transform 0.5s ease'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '1'}
                      onMouseLeave={(e) => e.target.style.opacity = '0'}
                      />
                    </div>
                  )}
                  
                  {/* News Content */}
                  <div style={{ 
                    padding: '30px', 
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1'
                  }}>
                    <h4 style={{
                      fontSize: '1.4rem',
                      color: '#2c3e50',
                      marginBottom: '25px',
                      lineHeight: '1.5',
                      fontWeight: '700',
                      letterSpacing: '0.3px',
                      flex: '1',
                      textAlign: 'right'
                    }}>
                      {newsItem.title}
                    </h4>
                    
                    <button 
                      onClick={() => handleNewsClick(newsItem)}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '16px 28px',
                        borderRadius: '30px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.4s ease',
                        width: '100%',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                        transform: 'translateY(0)',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        marginTop: 'auto'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.5)';
                        e.target.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                        e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                      }}
                    >
                      عرض التفاصيل
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Enhanced Pagination Indicators */}
            {news.length > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                marginTop: '35px'
              }}>
                {news.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentNewsIndex(index)}
                    style={{
                      width: currentNewsIndex === index ? '40px' : '16px',
                      height: '16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: currentNewsIndex === index 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        : '#e0e6ed',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: currentNewsIndex === index 
                        ? '0 4px 15px rgba(102, 126, 234, 0.4)' 
                        : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (currentNewsIndex !== index) {
                        e.target.style.background = '#bdc3c7';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentNewsIndex !== index) {
                        e.target.style.background = '#e0e6ed';
                      }
                    }}
                  />
                ))}
              </div>
            )}

            {/* Enhanced Auto-carousel status indicator */}
            <div style={{
              textAlign: 'center',
              marginTop: '20px',
              fontSize: '1rem',
              fontWeight: '600'
            }}>
              {news.length > 1 && (
                <span style={{
                  background: isHovered 
                    ? 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' 
                    : 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                  color: 'white',
                  padding: '8px 20px',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.4s ease',
                  boxShadow: isHovered 
                    ? '0 6px 20px rgba(231, 76, 60, 0.3)' 
                    : '0 6px 20px rgba(39, 174, 96, 0.3)',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  {isHovered ? '⏸ متوقف مؤقتاً' : '▶ تشغيل تلقائي'}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#7f8c8d',
            fontSize: '1.1rem'
          }}>
             لا توجد أخبار متاحة في الوقت الحالي. تحقق مرة أخرى قريباً للحصول على التحديثات!
          </div>
        )}
      </section>

      {/* Leadership Team */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', direction: 'rtl' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#2c3e50', fontSize: '2.5rem' }}>
          فريق القيادة
        </h2>
        
        {/* Enhanced Refresh Button for Team */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={() => {
              const savedTeam = localStorage.getItem('impaTeamMembers');
              if (savedTeam) {
                setTeamMembers(JSON.parse(savedTeam));
              }
            }}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
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
             ⟳ تحديث فريق العمل
          </button>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px', 
          padding: '30px', 
          direction: 'rtl', 
          fontFamily: 'Tahoma, Arial, sans-serif', 
          textAlign: 'center', 
          backgroundColor: '#f2f6fa',
          borderRadius: '16px'
        }}>
          
          {teamMembers.map(member => (
            <div key={member.id} style={{
              background: 'white', 
              borderRadius: '16px', 
              padding: '20px', 
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            }}
            >
              {/* Member Photo with Fixed Dimensions */}
              {member.photo ? (
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  margin: '0 auto 15px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid #3498db',
                  boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
                  backgroundColor: '#f8f9fa'
                }}>
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </div>
              ) : (
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  margin: '0 auto 15px',
                  borderRadius: '50%',
                  background: '#ecf0f1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  color: '#bdc3c7'
                }}>
                  👤
                </div>
              )}
              
              <h3 style={{ margin: '10px 0', color: '#222', fontSize: '1.1rem', textAlign: 'right' }}>{member.name}</h3>
              <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: '1.4', textAlign: 'right' }}>{member.title}</p>
              
              <div style={{
                background: '#3498db',
                color: 'white',
                padding: '5px 12px',
                borderRadius: '15px',
                fontSize: '0.8rem',
                marginTop: '10px',
                display: 'inline-block'
              }}>
                {member.role}
              </div>
            </div>
          ))}
          
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ 
        textAlign: 'center', 
        padding: '40px 20px', 
        background: 'linear-gradient(135deg, #0054a6 0%, #003366 100%)',
        color: 'white',
        borderRadius: '15px',
        margin: '40px 20px',
        direction: 'rtl'
      }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>
          اكتشف المزيد من مشاريع IMPA EGYPT
        </h3>
        <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: '0.9' }}>
          اكتشف محفظتنا الكاملة من المشاريع الصناعية والتعدينية في جميع أنحاء مصر
        </p>
        <button 
          onClick={handleViewAllProjects}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '18px 35px',
            borderRadius: '30px',
            fontSize: '1.2rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.4s ease',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
            transform: 'translateY(0)',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px) scale(1.05)';
            e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
          }}
        >
           عرض جميع المشاريع
        </button>
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
                zIndex: 1
              }}
            >
              ✕
            </button>

            {/* Project Image with Fixed Dimensions */}
            {selectedProject.photo && (
              <div style={{
                width: '100%',
                height: '300px',
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
            <div style={{ padding: '30px' }}>
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
              <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
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

      {/* News Details Modal */}
      {showNewsModal && selectedNews && (
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
              onClick={closeNewsModal}
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
                zIndex: 1
              }}
            >
              ✕
            </button>

            {/* News Image with Fixed Dimensions */}
            {selectedNews.photo && (
              <div style={{
                width: '100%',
                height: '300px',
                overflow: 'hidden',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                backgroundColor: '#f8f9fa'
              }}>
                <img 
                  src={selectedNews.photo} 
                  alt={selectedNews.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </div>
            )}

            {/* News Details */}
            <div style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <span style={{
                  fontSize: '1rem',
                  color: '#7f8c8d',
                  background: '#f8f9fa',
                  padding: '8px 16px',
                  borderRadius: '20px'
                }}>
                   {new Date(selectedNews.date).toLocaleDateString('ar-EG')}
                </span>
                <span style={{
                  background: '#3498db',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  {selectedNews.category || 'أخبار عامة'}
                </span>
              </div>

              <h2 style={{
                color: '#2c3e50',
                marginBottom: '20px',
                fontSize: '2rem',
                lineHeight: '1.3',
                textAlign: 'right'
              }}>
                {selectedNews.title}
              </h2>

              <div style={{
                fontSize: '1.1rem',
                color: '#34495e',
                lineHeight: '1.8',
                marginBottom: '20px',
                textAlign: 'right'
              }}>
                {selectedNews.content}
              </div>

              <div style={{
                fontSize: '0.9rem',
                color: '#7f8c8d',
                textAlign: 'center',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '10px'
              }}>
                 وقت القراءة: {selectedNews.readTime || '3 دقائق'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced CSS Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInFromRight {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInFromLeft {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .news-card-exit {
            animation: slideOutToLeft 0.5s ease-in-out forwards;
          }

          @keyframes slideOutToLeft {
            from {
              opacity: 1;
              transform: translateX(0);
            }
            to {
              opacity: 0;
              transform: translateX(50px);
            }
          }

          .project-card:hover .view-btn {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
          }

          /* RTL-specific styles */
          .content {
            font-family: 'Tahoma', 'Arial', sans-serif;
          }

          .content * {
            direction: inherit;
          }

          /* Ensure images are consistently sized across all cards */
          .consistent-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            object-position: center;
            background-color: #f8f9fa;
          }

          /* Responsive image handling */
          @media (max-width: 768px) {
            .consistent-image {
              height: 200px;
            }
          }

          /* Enhanced RTL support for flex layouts */
          .rtl-flex {
            display: flex;
            flex-direction: row-reverse;
          }

          /* Better Arabic text rendering */
          .arabic-text {
            font-family: 'Tahoma', 'Arial', 'Segoe UI', sans-serif;
            line-height: 1.8;
            letter-spacing: 0.02em;
          }
        `}
      </style>
    </div>
  );
};

export default Home;