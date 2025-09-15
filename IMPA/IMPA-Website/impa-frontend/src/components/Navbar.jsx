import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      <style>
        {`
          @keyframes glow {
            from {
              text-shadow: 0 0 10px rgba(52, 152, 219, 0.8), 0 0 20px rgba(52, 152, 219, 0.6), 0 0 30px rgba(52, 152, 219, 0.4);
            }
            to {
              text-shadow: 0 0 20px rgba(52, 152, 219, 1), 0 0 30px rgba(52, 152, 219, 0.8), 0 0 40px rgba(52, 152, 219, 0.6);
            }
          }
        `}
      </style>
    <header className="header">
      {/* Left Logo */}
      <div className="logo-container">
        <img 
          src="/logo.png" 
          alt="IMPA Logo" 
          className="logo-image"
        />
      </div>

      {/* Center Content */}
      <div className="header-content">
                                     <h1 className="main-title" style={{
             fontSize: '1.8rem',
             textShadow: '0 0 10px rgba(52, 152, 219, 0.8), 0 0 20px rgba(52, 152, 219, 0.6), 0 0 30px rgba(52, 152, 219, 0.4)',
             animation: 'glow 2s ease-in-out infinite alternate'
           }}>
          االهيئة العامة لتنفيذ المشروعات الصناعيه والتعدينه
          </h1>
        
        {/* Navigation Links */}
        <nav style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Link
            to="/"
            style={{
              color: location.pathname === '/' ? '#ffd700' : 'white',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}
          >
            الرئيسية
          </Link>
          <Link
            to="/projects"
            style={{
              color: location.pathname === '/projects' ? '#ffd700' : 'white',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}
          >
            المشاريع
          </Link>
          <Link
            to="/news"
            style={{
              color: location.pathname === '/news' ? '#ffd700' : 'white',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}
          >
            الأخبار
          </Link>
                        <Link
                to="/contact"
                style={{
                  color: location.pathname === '/contact' ? '#ffd700' : 'white',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'color 0.3s ease'
                }}
              >
                للتواصل
              </Link>
              <Link
                to="/achievements"
                style={{
                  color: location.pathname === '/achievements' ? '#ffd700' : 'white',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'color 0.3s ease'
                }}
              >
                إنجازاتنا
              </Link>
        </nav>
      </div>

      {/* Right Side - Admin Login and Right Logo */}
      <div className="header-actions">
        {/* Admin Login Button */}
        <Link
          to="/login"
          style={{
            background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
            color: 'white',
            padding: '0.5rem 1.5rem',
            borderRadius: '25px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          تسجيل الدخول
        </Link>

        {/* Right Logo */}
        <div className="right-logo-container">
          <img 
            src="/logo2.png" 
            alt="IMPA Logo 2" 
            className="right-logo-image"
          />
        </div>
      </div>
    </header>
    </>
  );
};

export default Navbar; 