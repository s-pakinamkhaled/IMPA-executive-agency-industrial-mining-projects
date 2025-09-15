import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService.js';

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showNewsModal, setShowNewsModal] = useState(false);

  useEffect(() => {
    // Load news from data service
    const loadNews = () => {
      const newsData = dataService.getAllNews();
      console.log('Loaded news:', newsData); // Debug log
      setNewsItems(newsData);
    };

    loadNews();
    
    // Listen for storage changes to refresh data
    window.addEventListener('storage', loadNews);
    
    // Also refresh when the page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadNews();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('storage', loadNews);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    
    // Clear previous errors when user starts typing
    if (emailError) {
      setEmailError('');
    }
    if (subscriptionStatus) {
      setSubscriptionStatus('');
    }
  };

  // Send welcome email function (simulation)
  const sendWelcomeEmail = async (userEmail) => {
    // This is a simulation of sending an email
    // In a real application, this would call your backend API
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make an API call to your backend
      // Example:
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: userEmail })
      // });
      
      console.log(`Welcome email sent to: ${userEmail}`);
      console.log('Email content: Welcome to IMPA EGYPT! Congratulations, you have joined our newsletter and will receive all the latest news and updates.');
      
      return { success: true };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error: error.message };
    }
  };

  // Handle subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Reset states
    setEmailError('');
    setSubscriptionStatus('');
    
    // Validate email
    if (!email.trim()) {
      setEmailError('يرجى إدخال عنوان البريد الإلكتروني');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('يرجى إدخال عنوان بريد إلكتروني صحيح');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Send welcome email
      const result = await sendWelcomeEmail(email);
      
      if (result.success) {
        setSubscriptionStatus('تم الاشتراك بنجاح! تم إرسال رسالة ترحيب إلى بريدك الإلكتروني.');
        setEmail(''); // Clear email input
      } else {
        setEmailError('حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      setEmailError('حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Development': '#27ae60',
      'Infrastructure': '#3498db',
      'Partnerships': '#9b59b6',
      'Security': '#e74c3c',
      'Events': '#f39c12',
      'Sustainability': '#1abc9c'
    };
    return colors[category] || '#95a5a6';
  };

  const getCategoryLabel = (news) => {
    // If news has category, use it, otherwise show a default label
    return news.category || 'أخبار عامة';
  };

  // Handle news click
  const handleNewsClick = (newsItem) => {
    setSelectedNews(newsItem);
    setShowNewsModal(true);
  };

  // Close news modal
  const closeNewsModal = () => {
    setShowNewsModal(false);
    setSelectedNews(null);
  };

  return (
    <div className="content" style={{ direction: 'rtl' }}>
      {/* Header Section */}
      <section style={{ padding: '40px 20px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', color: '#2c3e50', marginBottom: '20px', fontWeight: '700' }}>
           أخبار وتحديثات IMPA EGYPT
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#34495e', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          ابق على اطلاع بأحدث الأخبار والتطورات والإعلانات من IMPA EGYPT.
        </p>
      </section>

      {/* News Grid */}
      <section style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {newsItems.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '25px' 
          }}>
            {newsItems.map(news => (
              <article key={news.id} style={{
                background: 'white',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '550px', // Increased from 450px to accommodate taller images
                height: '100%' // Makes all cards equal height in grid
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
                {/* News Image with increased height */}
                <div style={{
                  width: '100%',
                  height: '380px', // Increased from 200px to 280px for taller images
                  overflow: 'hidden',
                  backgroundColor: '#f8f9fa', // Fallback background
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {news.photo ? (
                    <img 
                      src={news.photo} 
                      alt={news.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // This ensures images fill the container while maintaining aspect ratio
                        objectPosition: 'center', // Centers the image
                        transition: 'transform 0.3s ease'
                      }}
                      onError={(e) => {
                        // Fallback for broken images
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div style="
                            width: 100%; 
                            height: 100%; 
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-size: 1.2rem;
                            font-weight: 600;
                          ">
                            📰 أخبار IMPA EGYPT
                          </div>
                        `;
                      }}
                    />
                  ) : (
                    // Default placeholder when no image is provided
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: '600'
                    }}>
                      📰 أخبار IMPA EGYPT
                    </div>
                  )}
                </div>
                
                {/* News Content Container */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1',
                  padding: '25px',
                  textAlign: 'right' // RTL text alignment
                }}>
                  {/* News Header */}
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      marginBottom: '15px',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}>
                      <span style={{
                        background: getCategoryColor(news.category),
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '15px',
                        fontSize: '0.85rem',
                        fontWeight: '500'
                      }}>
                        {getCategoryLabel(news)}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                         {new Date(news.date).toLocaleDateString('ar-EG')}
                      </span>
                    </div>
                    
                    <h3 style={{
                      fontSize: '1.3rem',
                      color: '#2c3e50',
                      marginBottom: '12px',
                      lineHeight: '1.4',
                      fontWeight: '600',
                      textAlign: 'right' // RTL alignment
                    }}>
                      {news.title}
                    </h3>
                  </div>
                  
                  {/* News Content */}
                  <div style={{ flex: '1', marginBottom: '20px' }}>
                    <p style={{
                      color: '#34495e',
                      lineHeight: '1.6',
                      fontSize: '0.95rem',
                      textAlign: 'right' // RTL alignment
                    }}>
                      {news.content ? (news.content.length > 120 ? news.content.substring(0, 120) + '...' : news.content) : 'لا يوجد محتوى'}
                    </p>
                  </div>

                  {/* Read Time */}
                  <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                    <span style={{ 
                      fontSize: '0.9rem', 
                      color: '#7f8c8d',
                      background: '#f8f9fa',
                      padding: '5px 12px',
                      borderRadius: '15px',
                      display: 'inline-block'
                    }}>
                       {news.readTime || 'قراءة 3 دقائق'}
                    </span>
                  </div>

                  {/* Button at the bottom */}
                  <div style={{ marginTop: 'auto' }}>
                    <button 
                      onClick={() => handleNewsClick(news)}
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
                      اقرأ المزيد
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px', 
            color: '#7f8c8d',
            fontSize: '1.2rem'
          }}>
             لا توجد أخبار متاحة في الوقت الحالي. تحقق مرة أخرى قريباً للحصول على التحديثات!
          </div>
        )}
      </section>

      {/* Newsletter Signup */}
      <section style={{
        background: 'linear-gradient(135deg, #0054a6 0%, #003366 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center',
        margin: '40px 20px',
        borderRadius: '15px'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
           ابق على اطلاع
        </h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: '0.9' }}>
           اشترك في نشرتنا الإخبارية للحصول على أحدث أخبار وتحديثات IMPA EGYPT
        </p>
        
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="أدخل عنوان بريدك الإلكتروني"
              style={{
                flex: '1',
                minWidth: '250px',
                padding: '15px 20px',
                border: emailError ? '2px solid #e74c3c' : 'none',
                borderRadius: '25px',
                fontSize: '1rem',
                outline: 'none',
                backgroundColor: emailError ? '#fdf2f2' : 'white',
                textAlign: 'right', // RTL for email input
                direction: 'ltr' // But keep email format LTR
              }}
              disabled={isLoading}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubscribe(e);
                }
              }}
            />
            <button 
              onClick={handleSubscribe}
              disabled={isLoading}
              style={{
                background: isLoading ? '#95a5a6' : 'linear-gradient(45deg, #27ae60, #2ecc71)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'جاري الاشتراك...' : 'اشتراك'}
            </button>
          </div>
          
          {/* Error Message */}
          {emailError && (
            <div style={{
              marginTop: '15px',
              padding: '10px 20px',
              background: 'rgba(231, 76, 60, 0.1)',
              border: '1px solid rgba(231, 76, 60, 0.3)',
              borderRadius: '10px',
              color: '#e74c3c',
              fontSize: '0.9rem',
              textAlign: 'right'
            }}>
              {emailError}
            </div>
          )}
          
          {/* Success Message */}
          {subscriptionStatus && (
            <div style={{
              marginTop: '15px',
              padding: '15px 20px',
              background: 'rgba(39, 174, 96, 0.1)',
              border: '1px solid rgba(39, 174, 96, 0.3)',
              borderRadius: '10px',
              color: '#27ae60',
              fontSize: '0.95rem',
              lineHeight: '1.5',
              textAlign: 'right'
            }}>
              <strong>✅ {subscriptionStatus}</strong>
              <br />
              <span style={{ fontSize: '0.85rem', opacity: '0.9' }}>
                مرحباً بك في IMPA EGYPT! تهانينا، لقد انضممت إلى نشرتنا الإخبارية وستتلقى جميع الأخبار الجديدة.
              </span>
            </div>
          )}
        </div>
        
        {/* Additional Info */}
        <p style={{ 
          fontSize: '0.85rem', 
          marginTop: '20px', 
          opacity: '0.8',
          fontStyle: 'italic'
        }}>
          سنحترم خصوصيتك ولن نشارك بريدك الإلكتروني مع أطراف ثالثة
        </p>
      </section>

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
          direction: 'rtl' // RTL for modal
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
                left: '15px', // Changed from right to left for RTL
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

            {/* News Image in Modal with increased height */}
            <div style={{
              width: '100%',
              height: '320px', // Increased from 250px to 320px for taller modal images
              overflow: 'hidden',
              borderTopLeftRadius: '15px',
              borderTopRightRadius: '15px',
              backgroundColor: '#f8f9fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {selectedNews.photo ? (
                <img 
                  src={selectedNews.photo} 
                  alt={selectedNews.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div style="
                        width: 100%; 
                        height: 100%; 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 1.2rem;
                        font-weight: 600;
                      ">
                        📰 أخبار IMPA EGYPT
                      </div>
                    `;
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: '600'
                }}>
                  📰 أخبار IMPA EGYPT
                </div>
              )}
            </div>

            {/* News Details */}
            <div style={{ padding: '30px', textAlign: 'right' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <span style={{
                  background: getCategoryColor(selectedNews.category),
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  {getCategoryLabel(selectedNews)}
                </span>
                <span style={{
                  fontSize: '1rem',
                  color: '#7f8c8d',
                  background: '#f8f9fa',
                  padding: '8px 16px',
                  borderRadius: '20px'
                }}>
                   {new Date(selectedNews.date).toLocaleDateString('ar-EG')}
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
                 وقت القراءة: {selectedNews.readTime || 'قراءة 3 دقائق'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;