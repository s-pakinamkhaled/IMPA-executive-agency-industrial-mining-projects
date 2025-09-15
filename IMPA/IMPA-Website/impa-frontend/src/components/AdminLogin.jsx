import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLogin = ({ language, onClose, onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate credentials
    if (credentials.username === 'impa2025' && credentials.password === '1234') {
      // Correct credentials - open admin dashboard
      try {
        onLoginSuccess(); // This will open the admin dashboard
        onClose(); // Close the login modal
      } catch (err) {
        setError('Failed to open admin dashboard. Please try again.');
      }
    } else {
      // Wrong credentials
      setError(language === 'ar' ? 'اسم المستخدم أو كلمة المرور غير صحيحة' : 'Invalid username or password');
    }
    
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const getTranslation = (key) => {
    const translations = {
      ar: {
        title: 'تسجيل دخول المدير',
        username: 'اسم المستخدم',
        password: 'كلمة المرور',
        login: 'تسجيل الدخول',
        cancel: 'إلغاء',
        usernamePlaceholder: 'أدخل اسم المستخدم',
        passwordPlaceholder: 'أدخل كلمة المرور',
        loading: 'جاري التحميل...',
        error: 'فشل في تسجيل الدخول. حاول مرة أخرى.',
        invalidCredentials: 'اسم المستخدم أو كلمة المرور غير صحيحة',
        success: 'تم تسجيل الدخول بنجاح! جاري فتح لوحة التحكم...'
      },
      en: {
        title: 'Admin Login',
        username: 'Username',
        password: 'Password',
        login: 'Login',
        cancel: 'Cancel',
        usernamePlaceholder: 'Enter username',
        passwordPlaceholder: 'Enter password',
        loading: 'Loading...',
        error: 'Login failed. Please try again.',
        invalidCredentials: 'Invalid username or password',
        success: 'Login successful! Opening dashboard...'
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
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '30px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>

        {/* Title */}
        <h2 style={{
          textAlign: 'center',
          color: '#0054a6',
          marginBottom: '25px',
          fontSize: '1.8rem',
          fontWeight: 'bold'
        }}>
          {getTranslation('title')}
        </h2>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#ffebee',
            color: '#c62828',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center',
            border: '1px solid #ffcdd2'
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '600'
            }}>
              <FaUser style={{ marginRight: '8px', color: '#0054a6' }} />
              {getTranslation('username')}
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder={getTranslation('usernamePlaceholder')}
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s'
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '600'
            }}>
              <FaLock style={{ marginRight: '8px', color: '#0054a6' }} />
              {getTranslation('password')}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder={getTranslation('passwordPlaceholder')}
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  paddingRight: '45px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '15px'
          }}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '12px',
                background: '#0054a6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
            >
              {isLoading ? getTranslation('loading') : getTranslation('login')}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
            >
              {getTranslation('cancel')}
            </button>
          </div>
        </form>

        {/* Login Info */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#666',
          textAlign: 'center',
          border: '1px solid #e9ecef'
        }}>
          <strong>{language === 'ar' ? 'بيانات تسجيل الدخول:' : 'Login Credentials:'}</strong><br />
          {language === 'ar' ? 'اسم المستخدم: impa2025' : 'Username: impa2025'}<br />
          {language === 'ar' ? 'كلمة المرور: 1234' : 'Password: 1234'}
        </div>

        {/* Success Message (hidden by default) */}
        <div style={{
          marginTop: '15px',
          padding: '10px',
          background: '#e8f5e8',
          color: '#2e7d32',
          borderRadius: '5px',
          fontSize: '14px',
          textAlign: 'center',
          border: '1px solid #c8e6c9',
          display: 'none' // This will be shown when login is successful
        }}>
          {getTranslation('success')}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 