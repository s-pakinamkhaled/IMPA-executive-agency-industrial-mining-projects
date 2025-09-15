import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaKey, FaArrowLeft, FaTimes } from 'react-icons/fa'; // Added FaTimes

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  
  // Change password states
  const [changePasswordData, setChangePasswordData] = useState({
    oldPassword1: '',
    oldPassword2: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [showChangePasswordFields, setShowChangePasswordFields] = useState({
    oldPassword1: false,
    oldPassword2: false,
    newPassword: false,
    confirmNewPassword: false
  });
  const [changePasswordError, setChangePasswordError] = useState('');
  const [changePasswordSuccess, setChangePasswordSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedUsername = credentials.username.trim();
    const trimmedPassword = credentials.password.trim();

    // ✅ Only admin user check
    if (trimmedUsername === 'user2025' && trimmedPassword === '1234') {
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('userType', 'admin');
      localStorage.setItem('currentUser', 'user2025');
      navigate('/dashboard');
    } else {
      setError('بيانات الاعتماد غير صحيحة. يرجى المحاولة مرة أخرى.');
    }
  };

  const validatePassword = (password) => {
    const requirements = [];
    
    if (password.length < 8) {
      requirements.push('يجب أن تكون كلمة المرور 8 أحرف على الأقل');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      requirements.push('يجب أن تحتوي على حرف صغير واحد على الأقل');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      requirements.push('يجب أن تحتوي على حرف كبير واحد على الأقل');
    }
    if (!/(?=.*\d)/.test(password)) {
      requirements.push('يجب أن تحتوي على رقم واحد على الأقل');
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      requirements.push('يجب أن تحتوي على رمز خاص واحد على الأقل (@$!%*?&)');
    }
    
    return requirements;
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setChangePasswordError('');
    setChangePasswordSuccess('');

    const { oldPassword1, oldPassword2, newPassword, confirmNewPassword } = changePasswordData;
    
    // Trim all inputs
    const trimmedOld1 = oldPassword1.trim();
    const trimmedOld2 = oldPassword2.trim();
    const trimmedNew = newPassword.trim();
    const trimmedConfirmNew = confirmNewPassword.trim();

    // Check if old passwords match each other
    if (trimmedOld1 !== trimmedOld2) {
      setChangePasswordError('كلمتا المرور القديمتان غير متطابقتان.');
      return;
    }

    // Check if old password is correct (current password is '1234')
    const currentPassword = localStorage.getItem('userPassword') || '1234';
    if (trimmedOld1 !== currentPassword) {
      setChangePasswordError('كلمة المرور القديمة غير صحيحة.');
      return;
    }

    // Validate new password requirements
    const passwordValidation = validatePassword(trimmedNew);
    if (passwordValidation.length > 0) {
      setChangePasswordError('كلمة المرور الجديدة لا تلبي المتطلبات:\n' + passwordValidation.join('\n'));
      return;
    }

    // Check if new password matches confirmation
    if (trimmedNew !== trimmedConfirmNew) {
      setChangePasswordError('كلمة المرور الجديدة وتأكيدها غير متطابقتان.');
      return;
    }

    // Check if new password is different from old password
    if (trimmedNew === trimmedOld1) {
      setChangePasswordError('كلمة المرور الجديدة يجب أن تكون مختلفة عن كلمة المرور القديمة.');
      return;
    }

    // Save new password
    localStorage.setItem('userPassword', trimmedNew);
    setChangePasswordSuccess('تم تغيير كلمة المرور بنجاح!');
    
    // Reset form
    setChangePasswordData({
      oldPassword1: '',
      oldPassword2: '',
      newPassword: '',
      confirmNewPassword: ''
    });

    // Auto close after 2 seconds
    setTimeout(() => {
      setShowChangePassword(false);
      setChangePasswordSuccess('');
    }, 2000);
  };

  const toggleShowPassword = (field) => {
    if (field === 'login') {
      setShowPassword(!showPassword);
    } else {
      setShowChangePasswordFields(prev => ({
        ...prev,
        [field]: !prev[field]
      }));
    }
  };

  if (showChangePassword) {
    return (
      <div className="admin-login-modal">
        <div className="admin-login-content" style={{ position: 'relative' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#666',
              padding: '5px'
            }}
            title="إغلاق"
          >
            <FaTimes />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
            <button
              onClick={() => setShowChangePassword(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                color: '#3498db',
                marginRight: '10px',
                padding: '5px'
              }}
            >
              <FaArrowLeft />
            </button>
            <h2 style={{ textAlign: 'center', flex: 1, margin: 0, color: '#2c3e50' }}>
              تغيير كلمة المرور
            </h2>
          </div>

          {changePasswordError && (
            <div style={{
              background: '#f8d7da',
              color: '#721c24',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center',
              whiteSpace: 'pre-line'
            }}>
              {changePasswordError}
            </div>
          )}

          {changePasswordSuccess && (
            <div style={{
              background: '#d4edda',
              color: '#155724',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {changePasswordSuccess}
            </div>
          )}

          <form onSubmit={handleChangePassword}>
            {/* Old Password 1 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50', fontWeight: '500' }}>
                كلمة المرور القديمة
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showChangePasswordFields.oldPassword1 ? 'text' : 'password'}
                  value={changePasswordData.oldPassword1}
                  onChange={(e) => setChangePasswordData({ ...changePasswordData, oldPassword1: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 50px 12px 12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease'
                  }}
                />
                <button
                  type="button"
                  onClick={() => toggleShowPassword('oldPassword1')}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: '#666',
                    padding: '5px'
                  }}
                >
                  {showChangePasswordFields.oldPassword1 ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Old Password 2 */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50', fontWeight: '500' }}>
                تأكيد كلمة المرور القديمة
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showChangePasswordFields.oldPassword2 ? 'text' : 'password'}
                  value={changePasswordData.oldPassword2}
                  onChange={(e) => setChangePasswordData({ ...changePasswordData, oldPassword2: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 50px 12px 12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease'
                  }}
                />
                <button
                  type="button"
                  onClick={() => toggleShowPassword('oldPassword2')}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: '#666',
                    padding: '5px'
                  }}
                >
                  {showChangePasswordFields.oldPassword2 ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50', fontWeight: '500' }}>
                كلمة المرور الجديدة
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showChangePasswordFields.newPassword ? 'text' : 'password'}
                  value={changePasswordData.newPassword}
                  onChange={(e) => setChangePasswordData({ ...changePasswordData, newPassword: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 50px 12px 12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease'
                  }}
                />
                <button
                  type="button"
                  onClick={() => toggleShowPassword('newPassword')}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: '#666',
                    padding: '5px'
                  }}
                >
                  {showChangePasswordFields.newPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>
                متطلبات كلمة المرور: 8 أحرف على الأقل، حرف كبير، حرف صغير، رقم، رمز خاص
              </div>
            </div>

            {/* Confirm New Password */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50', fontWeight: '500' }}>
                تأكيد كلمة المرور الجديدة
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showChangePasswordFields.confirmNewPassword ? 'text' : 'password'}
                  value={changePasswordData.confirmNewPassword}
                  onChange={(e) => setChangePasswordData({ ...changePasswordData, confirmNewPassword: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 50px 12px 12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease'
                  }}
                />
                <button
                  type="button"
                  onClick={() => toggleShowPassword('confirmNewPassword')}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: '#666',
                    padding: '5px'
                  }}
                >
                  {showChangePasswordFields.confirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(45deg, #27ae60, #2ecc71)',
                color: 'white',
                padding: '15px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)'
              }}
            >
              تغيير كلمة المرور
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-modal">
      <div className="admin-login-content" style={{ position: 'relative' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            color: '#666',
            padding: '5px'
          }}
          title="إغلاق"
        >
          <FaTimes />
        </button>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>
          تسجيل الدخول
        </h2>

        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50', fontWeight: '500' }}>
              اسم المستخدم
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50', fontWeight: '500' }}>
              كلمة المرور
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '12px 50px 12px 12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease'
                }}
              />
              <button
                type="button"
                onClick={() => toggleShowPassword('login')}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#666',
                  padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(45deg, #3498db, #2980b9)',
              color: 'white',
              padding: '15px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
              marginBottom: '15px'
            }}
          >
            تسجيل الدخول
          </button>

          {/* Change Password Button */}
          <button
            type="button"
            onClick={() => setShowChangePassword(true)}
            style={{
              width: '100%',
              background: 'linear-gradient(45deg, #f39c12, #e67e22)',
              color: 'white',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(243, 156, 18, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <FaKey />
            تغيير كلمة المرور
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;