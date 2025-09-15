import React from 'react';

const About = () => {
  return (
    <div className="content">
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0054a6 0%, #003366 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center',
        borderRadius: '15px',
        margin: '20px',
        boxShadow: '0 8px 32px rgba(0, 84, 166, 0.3)'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
          About IMPA Egypt
        </h1>
        <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          IMPA EGYPT
        </p>
        <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '20px auto 0', lineHeight: '1.6', opacity: '0.9' }}>
          Leading industrial and mining projects execution authority in Egypt
        </p>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎯</div>
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Our Mission</h3>
            <p style={{ color: '#34495e', lineHeight: '1.6' }}>
              To execute and manage industrial and mining projects that drive Egypt's economic growth and industrial development.
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
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Our Vision</h3>
            <p style={{ color: '#34495e', lineHeight: '1.6' }}>
              To become the leading authority in industrial and mining project execution across the Middle East and North Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#2c3e50', fontSize: '2.5rem' }}>
          Core Services
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
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Industrial Development</h4>
            <p style={{ color: '#34495e', fontSize: '0.95rem' }}>
              Planning and execution of industrial zones and manufacturing facilities
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
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Port Infrastructure</h4>
            <p style={{ color: '#34495e', fontSize: '0.95rem' }}>
              Development and modernization of port facilities and maritime infrastructure
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
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Mining Operations</h4>
            <p style={{ color: '#34495e', fontSize: '0.95rem' }}>
              Management of mining projects and mineral resource development
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
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>International Cooperation</h4>
            <p style={{ color: '#34495e', fontSize: '0.95rem' }}>
              Building partnerships with international organizations and investors
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
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Capacity Building</h4>
            <p style={{ color: '#34495e', fontSize: '0.95rem' }}>
              Training and development programs for industry professionals
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
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Quality Assurance</h4>
            <p style={{ color: '#34495e', fontSize: '0.95rem' }}>
              Ensuring high standards in all project deliverables and operations
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#2c3e50', fontSize: '2.5rem' }}>
          IMPA in Numbers
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#3498db', marginBottom: '10px', fontWeight: 'bold' }}>150+</div>
            <p style={{ color: '#34495e', fontSize: '1.1rem' }}>Active Projects</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#27ae60', marginBottom: '10px', fontWeight: 'bold' }}>25+</div>
            <p style={{ color: '#34495e', fontSize: '1.1rem' }}>Years Experience</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#e74c3c', marginBottom: '10px', fontWeight: 'bold' }}>500+</div>
            <p style={{ color: '#34495e', fontSize: '1.1rem' }}>Team Members</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#f39c12', marginBottom: '10px', fontWeight: 'bold' }}>15+</div>
            <p style={{ color: '#34495e', fontSize: '1.1rem' }}>Governorates</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#2c3e50', fontSize: '2.5rem' }}>
          Our Leadership Team
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>👨‍💼</div>
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Chairman</h4>
            <p style={{ color: '#34495e', fontSize: '0.95rem' }}>
              Leading strategic direction and international partnerships
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>👩‍💼</div>
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>CEO</h4>
            <p style={{ color: '#34495e', fontSize: '0.95rem' }}>
              Overseeing daily operations and project execution
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>👨‍🔬</div>
            <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Technical Director</h4>
            <p style={{ color: '#34495e', fontSize: '0.95rem' }}>
              Ensuring technical excellence and innovation
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 