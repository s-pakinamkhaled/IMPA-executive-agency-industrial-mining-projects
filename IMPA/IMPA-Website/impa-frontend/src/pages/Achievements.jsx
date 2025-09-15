import React, { useState } from 'react';

const Achievements = () => {
  const [servicesExpanded, setServicesExpanded] = useState(true);
  const [achievementsExpanded, setAchievementsExpanded] = useState(true);
  const [industrialZonesExpanded, setIndustrialZonesExpanded] = useState(false);
  const [portsExpanded, setPortsExpanded] = useState(false);
  const [heavyIndustriesExpanded, setHeavyIndustriesExpanded] = useState(false);
  const [residentialCitiesExpanded, setResidentialCitiesExpanded] = useState(false);

  return (
    <div className="content" style={{ 
      direction: 'rtl', 
      fontFamily: 'Tahoma, Arial, sans-serif',
      background: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0054a6 0%, #003366 100%)',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center',
        marginBottom: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
           إنجازات IMPA EGYPT
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: '0.9' }}>
          أكثر من 50 عام من الإنجازات والتميز في المشروعات الصناعية والتعدينية
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Services Section */}
        <div style={{ 
          marginBottom: '30px',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 25px',
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              borderBottom: '2px solid #dee2e6',
              cursor: 'pointer'
            }}
            onClick={() => setServicesExpanded(!servicesExpanded)}
          >
            <h2 style={{ 
              color: '#2c3e50', 
              margin: 0,
              fontSize: '1.6rem',
              fontWeight: '600'
            }}>
              خدماتنا
            </h2>
            <span style={{ 
              fontSize: '1.5rem', 
              color: '#0054a6',
              transform: servicesExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.3s ease'
            }}>
              ▼
            </span>
          </div>
          
          {servicesExpanded && (
            <div style={{ 
              padding: '0',
              animation: 'fadeIn 0.3s ease'
            }}>
              <div style={{
                padding: '20px 25px',
                borderBottom: '1px solid #e9ecef',
                transition: 'all 0.3s ease'
              }}>
                <h3 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px', 
                  fontSize: '1.2rem',
                  fontWeight: '500'
                }}>
                  الأعمال الاستشارية والدراسات الهندسية
                </h3>
                <p style={{ color: '#555', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>
                  تقديم استشارات متخصصة ودراسات هندسية شاملة للمشروعات الصناعية والتعدينية
                </p>
              </div>
              
              <div style={{
                padding: '20px 25px',
                background: '#fff3cd',
                borderBottom: '1px solid #e9ecef'
              }}>
                <h3 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px', 
                  fontSize: '1.2rem',
                  fontWeight: '500'
                }}>
                  متابعة برامج التمويل والتنفيذ
                </h3>
                <p style={{ color: '#555', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>
                  إدارة وتتبع برامج التمويل وضمان التنفيذ الأمثل للمشروعات
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Achievements Section */}
        <div style={{ 
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 25px',
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              borderBottom: '2px solid #dee2e6',
              cursor: 'pointer'
            }}
            onClick={() => setAchievementsExpanded(!achievementsExpanded)}
          >
            <h2 style={{ 
              color: '#2c3e50', 
              margin: 0,
              fontSize: '1.6rem',
              fontWeight: '600'
            }}>
              إنجازاتنا
            </h2>
            <span style={{ 
              fontSize: '1.5rem', 
              color: '#0054a6',
              transform: achievementsExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.3s ease'
            }}>
              ▼
            </span>
          </div>

          {achievementsExpanded && (
            <div style={{ 
              padding: '0',
              animation: 'fadeIn 0.3s ease'
            }}>
              
              {/* Main Achievement */}
              <div style={{
                padding: '20px 25px',
                borderBottom: '1px solid #e9ecef',
                background: '#fff3cd'
              }}>
                <h3 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px', 
                  fontSize: '1.2rem',
                  fontWeight: '500'
                }}>
                  انجازات الجهاز في أكثر من 50 عام
                </h3>
                <p style={{ color: '#555', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>
                  نصف قرن من التميز والإنجازات في مجال المشروعات الصناعية والتعدينية
                </p>
              </div>

              {/* Other Achievements */}
              <div 
                style={{
                  padding: '20px 25px',
                  borderBottom: '1px solid #e9ecef',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={() => setIndustrialZonesExpanded(!industrialZonesExpanded)}
              >
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '25px',
                  fontSize: '1.2rem',
                  color: '#0054a6',
                  transform: industrialZonesExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </div>
                <h3 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px', 
                  fontSize: '1.2rem',
                  fontWeight: '500',
                  paddingRight: '30px'
                }}>
                  المناطق الصناعية والتجارية والمتخصصة
                </h3>
                {industrialZonesExpanded && (
                  <p style={{ 
                    color: '#555', 
                    lineHeight: '1.6', 
                    margin: 0, 
                    fontSize: '0.95rem',
                    paddingTop: '10px',
                    animation: 'fadeIn 0.3s ease'
                  }}>
                    تطوير وإنشاء مناطق صناعية وتجارية متخصصة لدفع النمو الاقتصادي
                  </p>
                )}
              </div>

              <div style={{
                padding: '20px 25px',
                borderBottom: '1px solid #e9ecef'
              }}>
                <h3 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px', 
                  fontSize: '1.2rem',
                  fontWeight: '500'
                }}>
                  مجمعات الصناعات الصغيرة
                </h3>
                <p style={{ color: '#555', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>
                  دعم وتطوير الصناعات الصغيرة والمتوسطة لخلق فرص عمل جديدة
                </p>
              </div>

              <div 
                style={{
                  padding: '20px 25px',
                  borderBottom: '1px solid #e9ecef',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={() => setPortsExpanded(!portsExpanded)}
              >
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '25px',
                  fontSize: '1.2rem',
                  color: '#0054a6',
                  transform: portsExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </div>
                <h3 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px', 
                  fontSize: '1.2rem',
                  fontWeight: '500',
                  paddingRight: '30px'
                }}>
                  المواني والأنشطة البحرية
                </h3>
                {portsExpanded && (
                  <p style={{ 
                    color: '#555', 
                    lineHeight: '1.6', 
                    margin: 0, 
                    fontSize: '0.95rem',
                    paddingTop: '10px',
                    animation: 'fadeIn 0.3s ease'
                  }}>
                    تطوير البنية التحتية للمواني وتعزيز الأنشطة البحرية
                  </p>
                )}
              </div>

              <div 
                style={{
                  padding: '20px 25px',
                  borderBottom: '1px solid #e9ecef',
                  background: '#fff3cd',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={() => setHeavyIndustriesExpanded(!heavyIndustriesExpanded)}
              >
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '25px',
                  fontSize: '1.2rem',
                  color: '#0054a6',
                  transform: heavyIndustriesExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </div>
                <h3 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px', 
                  fontSize: '1.2rem',
                  fontWeight: '500',
                  paddingRight: '30px'
                }}>
                  مشروعات الصناعات الثقيلة
                </h3>
                {heavyIndustriesExpanded && (
                  <p style={{ 
                    color: '#555', 
                    lineHeight: '1.6', 
                    margin: 0, 
                    fontSize: '0.95rem',
                    paddingTop: '10px',
                    animation: 'fadeIn 0.3s ease'
                  }}>
                    تطوير وإنشاء مشروعات الصناعات الثقيلة لتعزيز القاعدة الصناعية
                  </p>
                )}
              </div>

              <div style={{
                padding: '20px 25px',
                borderBottom: '1px solid #e9ecef'
              }}>
                <h3 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px', 
                  fontSize: '1.2rem',
                  fontWeight: '500'
                }}>
                  محطات مياه الشرب والصرف
                </h3>
                <p style={{ color: '#555', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>
                  إنشاء وتطوير محطات معالجة المياه والصرف الصحي
                </p>
              </div>

              <div style={{
                padding: '20px 25px',
                borderBottom: '1px solid #e9ecef'
              }}>
                <h3 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px', 
                  fontSize: '1.2rem',
                  fontWeight: '500'
                }}>
                  شبكات البنية الأساسية
                </h3>
                <p style={{ color: '#555', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>
                  تطوير شبكات الطرق والكهرباء والاتصالات والمرافق الأساسية
                </p>
              </div>

              <div style={{
                padding: '20px 25px',
                borderBottom: '1px solid #e9ecef'
              }}>
                <h3 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px', 
                  fontSize: '1.2rem',
                  fontWeight: '500'
                }}>
                  المشروعات البيئية والتنموية
                </h3>
                <p style={{ color: '#555', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>
                  مشروعات صديقة للبيئة تدعم التنمية المستدامة
                </p>
              </div>

              <div style={{
                padding: '20px 25px',
                borderBottom: '1px solid #e9ecef'
              }}>
                <h3 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px', 
                  fontSize: '1.2rem',
                  fontWeight: '500'
                }}>
                  إنشاء وتأهيل المباني الإدارية والخدمية
                </h3>
                <p style={{ color: '#555', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>
                  تطوير البنية التحتية للمباني الإدارية والمرافق الخدمية
                </p>
              </div>

              <div style={{
                padding: '20px 25px',
                borderBottom: '1px solid #e9ecef'
              }}>
                <h3 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px', 
                  fontSize: '1.2rem',
                  fontWeight: '500'
                }}>
                  صيانة وتجهيز المنشآت
                </h3>
                <p style={{ color: '#555', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>
                  خدمات الصيانة والتجهيز للمنشآت الصناعية والتعدينية
                </p>
              </div>

              <div style={{
                padding: '20px 25px',
                borderBottom: '1px solid #e9ecef'
              }}>
                <h3 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px', 
                  fontSize: '1.2rem',
                  fontWeight: '500'
                }}>
                  إدارة وتشغيل المرافق والمناطق والمجمعات الصناعية
                </h3>
                <p style={{ color: '#555', lineHeight: '1.6', margin: 0, fontSize: '0.95rem' }}>
                  إدارة شاملة لتشغيل وصيانة المرافق والمناطق الصناعية
                </p>
              </div>

              <div 
                style={{
                  padding: '20px 25px',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={() => setResidentialCitiesExpanded(!residentialCitiesExpanded)}
              >
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '25px',
                  fontSize: '1.2rem',
                  color: '#0054a6',
                  transform: residentialCitiesExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </div>
                <h3 style={{ 
                  color: '#2c3e50', 
                  marginBottom: '10px', 
                  fontSize: '1.2rem',
                  fontWeight: '500',
                  paddingRight: '30px'
                }}>
                  المدن السكنية والإستراحات
                </h3>
                {residentialCitiesExpanded && (
                  <p style={{ 
                    color: '#555', 
                    lineHeight: '1.6', 
                    margin: 0, 
                    fontSize: '0.95rem',
                    paddingTop: '10px',
                    animation: 'fadeIn 0.3s ease'
                  }}>
                    تطوير مدن سكنية حديثة ومناطق استراحة للعاملين
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Back to Home Button */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={() => window.history.back()}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(45deg, #0054a6, #003366)',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '25px',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 84, 166, 0.3)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0, 84, 166, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 84, 166, 0.3)';
            }}
          >
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Achievements;