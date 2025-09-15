import React from 'react';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1a252f 0%, #2c3e50 50%, #34495e 100%)',
      color: 'white',
      padding: '60px 0 30px',
      marginTop: 'auto',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 30px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '40px'
      }}>
        {/* Company Info */}
        <div style={{ padding: '20px 0' }}>
          <h3 style={{ 
            marginBottom: '25px', 
            fontSize: '1.8rem', 
            color: '#3498db',
            fontWeight: '600',
            letterSpacing: '0.5px',
            lineHeight: '1.3'
          }}>
            IMPA EGYPT
          </h3>
          <p style={{ 
            lineHeight: '1.7', 
            color: '#ecf0f1', 
            fontSize: '1rem',
            marginBottom: '20px',
            fontWeight: '300',
            textAlign: 'justify'
          }}>
            The leading authority in implementing industrial and mining projects in Egypt, driving economic growth through strategic infrastructure development
          </p>
        </div>

        {/* Quick Links */}
        <div style={{ padding: '20px 0' }}>
          <h4 style={{ 
            marginBottom: '25px', 
            fontSize: '1.4rem', 
            color: '#3498db',
            fontWeight: '600',
            letterSpacing: '0.3px',
            borderBottom: '2px solid #3498db',
            paddingBottom: '10px',
            display: 'inline-block'
          }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '15px' }}>
              <a href="/" style={{ 
                color: '#ecf0f1', 
                textDecoration: 'none', 
                transition: 'all 0.3s ease',
                fontSize: '1.1rem',
                fontWeight: '400',
                display: 'block',
                padding: '8px 0',
                borderLeft: '3px solid transparent',
                paddingLeft: '15px',
                ':hover': {
                  borderLeftColor: '#3498db',
                  color: '#3498db',
                  transform: 'translateX(5px)'
                }
              }}>
                 Home
              </a>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <a href="/projects" style={{ 
                color: '#ecf0f1', 
                textDecoration: 'none', 
                transition: 'all 0.3s ease',
                fontSize: '1.1rem',
                fontWeight: '400',
                display: 'block',
                padding: '8px 0',
                borderLeft: '3px solid transparent',
                paddingLeft: '15px'
              }}>
                 Projects
              </a>
            </li>
                         <li style={{ marginBottom: '15px' }}>
               <a href="/news" style={{ 
                 color: '#ecf0f1', 
                 textDecoration: 'none', 
                 transition: 'all 0.3s ease',
                 fontSize: '1.1rem',
                 fontWeight: '400',
                 display: 'block',
                 padding: '8px 0',
                 borderLeft: '3px solid transparent',
                 paddingLeft: '15px'
               }}>
                  News
               </a>
             </li>
                           <li style={{ marginBottom: '15px' }}>
                <a href="/contact" style={{ 
                  color: '#ecf0f1', 
                  textDecoration: 'none', 
                  transition: 'all 0.3s ease',
                  fontSize: '1.1rem',
                  fontWeight: '400',
                  display: 'block',
                  padding: '8px 0',
                  borderLeft: '3px solid transparent',
                  paddingLeft: '15px'
                }}>
                   للتواصل
                </a>
              </li>
              <li style={{ marginBottom: '15px' }}>
                <a href="/achievements" style={{ 
                  color: '#ecf0f1', 
                  textDecoration: 'none', 
                  transition: 'all 0.3s ease',
                  fontSize: '1.1rem',
                  fontWeight: '400',
                  display: 'block',
                  padding: '8px 0',
                  borderLeft: '3px solid transparent',
                  paddingLeft: '15px'
                }}>
                   إنجازاتنا
                </a>
              </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={{ padding: '20px 0' }}>
          <h4 style={{ 
            marginBottom: '25px', 
            fontSize: '1.4rem', 
            color: '#3498db',
            fontWeight: '600',
            letterSpacing: '0.3px',
            borderBottom: '2px solid #3498db',
            paddingBottom: '10px',
            display: 'inline-block'
          }}>
            Contact Information
          </h4>
          <div style={{ color: '#ecf0f1', lineHeight: '1.8' }}>
                         <div style={{ 
               display: 'flex', 
               alignItems: 'center', 
               marginBottom: '15px',
               padding: '10px 0',
               borderLeft: '3px solid #3498db',
               paddingLeft: '15px'
             }}>
               <span style={{ marginRight: '12px', fontSize: '1.2rem' }}>📍</span>
               <a 
                 href="https://maps.google.com/?q=14+Alfy+Street,+Al+Thawrat+Building,+Downtown,+Cairo,+A.R.E"
                 target="_blank"
                 rel="noopener noreferrer"
                 style={{
                   margin: 0,
                   fontSize: '1rem',
                   fontWeight: '400',
                   color: '#ecf0f1',
                   textDecoration: 'none',
                   transition: 'all 0.3s ease',
                   cursor: 'pointer',
                   borderBottom: '1px solid transparent',
                   paddingBottom: '2px'
                 }}
                 onMouseEnter={(e) => {
                   e.target.style.color = '#3498db';
                   e.target.style.borderBottomColor = '#3498db';
                 }}
                 onMouseLeave={(e) => {
                   e.target.style.color = '#ecf0f1';
                   e.target.style.borderBottomColor = 'transparent';
                 }}
               >
                 14 Alfy Street, Al Thawrat Building, Downtown, Cairo, A.R.E
               </a>
             </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '15px',
              padding: '10px 0',
              borderLeft: '3px solid #3498db',
              paddingLeft: '15px'
            }}>
              <span style={{ marginRight: '12px', fontSize: '1.2rem' }}>📧</span>
              <p style={{ margin: 0, fontSize: '1rem', fontWeight: '400' }}>
                info@impa.gov.eg
              </p>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '15px',
              padding: '10px 0',
              borderLeft: '3px solid #3498db',
              paddingLeft: '15px'
            }}>
              <span style={{ marginRight: '12px', fontSize: '1.2rem' }}>📞</span>
              <p style={{ margin: 0, fontSize: '1rem', fontWeight: '400' }}>
                +20 2 1234 5678
              </p>
            </div>

          </div>
        </div>

        {/* Social Media */}
        <div style={{ padding: '20px 0' }}>
          <h4 style={{ 
            marginBottom: '25px', 
            fontSize: '1.4rem', 
            color: '#3498db',
            fontWeight: '600',
            letterSpacing: '0.3px',
            borderBottom: '2px solid #3498db',
            paddingBottom: '10px',
            display: 'inline-block'
          }}>
            Follow Us
          </h4>
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'flex-start',
            flexWrap: 'wrap'
          }}>
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/impaegy" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '55px',
                height: '55px',
                background: 'linear-gradient(135deg, #1877f2 0%, #0d6efd 100%)',
                color: 'white',
                borderRadius: '50%',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '26px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(24, 119, 242, 0.3)',
                border: '2px solid rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.15) translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(24, 119, 242, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(24, 119, 242, 0.3)';
              }}
            >
              f
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/impa_egypt/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '55px',
                height: '55px',
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                color: 'white',
                borderRadius: '50%',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '24px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(225, 48, 108, 0.3)',
                border: '2px solid rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.15) translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(225, 48, 108, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(225, 48, 108, 0.3)';
              }}
            >
              <FaInstagram />
            </a>

            {/* YouTube */}
            <a 
              href="https://m.youtube.com/channel/UCC_lf4wO3Yge6ZGMVE8leFA" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '55px',
                height: '55px',
                background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                color: 'white',
                borderRadius: '50%',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontSize: '22px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(255, 0, 0, 0.3)',
                border: '2px solid rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.15) translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(255, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(255, 0, 0, 0.3)';
              }}
            >
              ▶
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        paddingTop: '30px',
        borderTop: '2px solid #34495e',
        color: '#95a5a6',
        background: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '0 0 15px 15px'
      }}>
        <p style={{ 
          marginBottom: '12px',
          fontSize: '1.1rem',
          fontWeight: '500',
          letterSpacing: '0.5px'
        }}>
          &copy; 2025 Industrial and Mining Projects. All rights reserved.
        </p>
        <p style={{ 
          fontSize: '1rem', 
          color: '#7f8c8d',
          marginTop: '8px',
          fontWeight: '400',
          lineHeight: '1.5'
        }}>
           Developed by <span style={{ color: '#3498db', fontWeight: '600' }}>Pakinam Khaled</span> and <span style={{ color: '#3498db', fontWeight: '600' }}>Nouran Mostafa</span> - Software Engineers
        </p>
      </div>
    </footer>
  );
};

export default Footer; 