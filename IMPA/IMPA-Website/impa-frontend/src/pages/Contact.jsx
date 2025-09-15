import React from 'react';

const Contact = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      direction: 'rtl',
      fontFamily: 'Tahoma, Arial, sans-serif'
    }}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1a252f 0%, #2c3e50 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '20px',
          fontWeight: '600',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          سياسة التعامل مع الشكاوى والاقتراحات
        </h1>
        <p style={{
          fontSize: '1.2rem',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6',
          opacity: '0.9'
        }}>
         إلى تقديم خدمة مميزة لعملائه  IMPA EGYPT يسعى
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Introduction */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          borderRight: '5px solid #3498db'
        }}>
          <h2 style={{
            color: '#2c3e50',
            marginBottom: '20px',
            fontSize: '1.8rem',
            borderBottom: '2px solid #3498db',
            paddingBottom: '10px'
          }}>
            رؤيتنا في خدمة العملاء
          </h2>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#34495e',
            marginBottom: '15px'
          }}>
            يسعى IMPA EGYPT إلى تقديم خدمة مميزة لعملائه، لذلك إذا كانت لديك أي شكوى فسوف يسعدنا معرفتها في أسرع وقت ممكن.
          </p>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#34495e',
            marginBottom: '15px'
          }}>
            عند استلام الشكوى، سنقوم بتأكيد استلامها سريعًا.
          </p>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#34495e'
          }}>
            نحرص على التعامل معها بشكل كامل وسريع وبأقصى جهد ممكن.
          </p>
        </div>

        {/* Contact Information */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          borderRight: '5px solid #e74c3c'
        }}>
          <h2 style={{
            color: '#2c3e50',
            marginBottom: '25px',
            fontSize: '1.8rem',
            borderBottom: '2px solid #e74c3c',
            paddingBottom: '10px'
          }}>
            وسائل الاتصال
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '2px solid #ecf0f1'
            }}>
              <h3 style={{
                color: '#e74c3c',
                marginBottom: '15px',
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                 العنوان
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: '#34495e',
                margin: 0
              }}>
                14 شارع الألفي، عمارة الثورة، وسط البلد، القاهرة – ج.م.ع
              </p>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: '#34495e',
                margin: '10px 0 0 0'
              }}>
                ص.ب: 754 – القاهرة – مصر – ج.م.ع
              </p>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '2px solid #ecf0f1'
            }}>
              <h3 style={{
                color: '#e74c3c',
                marginBottom: '15px',
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                 الهاتف
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: '#34495e',
                margin: 0,
                fontWeight: '600'
              }}>
                25883395 – 25883396
              </p>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '2px solid #ecf0f1'
            }}>
              <h3 style={{
                color: '#e74c3c',
                marginBottom: '15px',
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                 الفاكس
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: '#34495e',
                margin: 0,
                fontWeight: '600'
              }}>
                25931265 – 25895246
              </p>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '2px solid #ecf0f1'
            }}>
              <h3 style={{
                color: '#e74c3c',
                marginBottom: '15px',
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                📧 البريد الإلكتروني
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: '#34495e',
                margin: 0,
                fontWeight: '600'
              }}>
                info@impa.gov.eg
              </p>
            </div>
          </div>
        </div>

        {/* Complaint Requirements */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          borderRight: '5px solid #f39c12'
        }}>
          <h2 style={{
            color: '#2c3e50',
            marginBottom: '25px',
            fontSize: '1.8rem',
            borderBottom: '2px solid #f39c12',
            paddingBottom: '10px'
          }}>
            عند إرسال شكوى يرجى ذكر
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#fff8e1',
              borderRadius: '10px',
              border: '2px solid #f39c12',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '15px'
              }}>
                
              </div>
              <h3 style={{
                color: '#e67e22',
                marginBottom: '10px',
                fontSize: '1.2rem'
              }}>
                الاسم بالكامل
              </h3>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: '#fff8e1',
              borderRadius: '10px',
              border: '2px solid #f39c12',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '15px'
              }}>
                
              </div>
              <h3 style={{
                color: '#e67e22',
                marginBottom: '10px',
                fontSize: '1.2rem'
              }}>
                عنوان الاتصال بك
              </h3>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: '#fff8e1',
              borderRadius: '10px',
              border: '2px solid #f39c12',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '15px'
              }}>
                
              </div>
              <h3 style={{
                color: '#e67e22',
                marginBottom: '10px',
                fontSize: '1.2rem'
              }}>
                وصف واضح للشكوى
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: '#e67e22',
                margin: 0
              }}>
                (دون تضمين معلومات شخصية في البريد الإلكتروني)
              </p>
            </div>
          </div>
        </div>

        {/* Response Mechanism */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          borderRight: '5px solid #27ae60'
        }}>
          <h2 style={{
            color: '#2c3e50',
            marginBottom: '25px',
            fontSize: '1.8rem',
            borderBottom: '2px solid #27ae60',
            paddingBottom: '10px'
          }}>
            آلية الرد
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              padding: '25px',
              backgroundColor: '#e8f5e8',
              borderRadius: '10px',
              border: '2px solid #27ae60',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '15px'
              }}>
                
              </div>
              <h3 style={{
                color: '#27ae60',
                marginBottom: '15px',
                fontSize: '1.3rem'
              }}>
                تأكيد الاستلام
              </h3>
              <p style={{
                fontSize: '1.1rem',
                color: '#2c3e50',
                margin: 0,
                fontWeight: '600'
              }}>
                خلال يوم عمل واحد
              </p>
            </div>

            <div style={{
              padding: '25px',
              backgroundColor: '#e8f5e8',
              borderRadius: '10px',
              border: '2px solid #27ae60',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '15px'
              }}>
                
              </div>
              <h3 style={{
                color: '#27ae60',
                marginBottom: '15px',
                fontSize: '1.3rem'
              }}>
                رد كامل
              </h3>
              <p style={{
                fontSize: '1.1rem',
                color: '#2c3e50',
                margin: 0,
                fontWeight: '600'
              }}>
                خلال 3 أيام عمل
              </p>
            </div>

            <div style={{
              padding: '25px',
              backgroundColor: '#e8f5e8',
              borderRadius: '10px',
              border: '2px solid #27ae60',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '15px'
              }}>
                
              </div>
              <h3 style={{
                color: '#27ae60',
                marginBottom: '15px',
                fontSize: '1.3rem'
              }}>
                متابعة مستمرة
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#2c3e50',
                margin: 0,
                lineHeight: '1.5'
              }}>
                في حال تعذر الرد خلال المدة المحددة، سنخطرك بالموعد المتوقع ونبقيك على اطلاع بتطورات الشكوى.
              </p>
            </div>
          </div>
        </div>

        {/* Suggestions Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          borderRight: '5px solid #9b59b6'
        }}>
          <h2 style={{
            color: '#2c3e50',
            marginBottom: '25px',
            fontSize: '1.8rem',
            borderBottom: '2px solid #9b59b6',
            paddingBottom: '10px'
          }}>
            الاقتراحات / التقدير
          </h2>
          
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#34495e',
            marginBottom: '20px'
          }}>
            نرحب دائمًا بآرائكم واقتراحاتكم حول الخدمات التي نقدمها، فهي تساعدنا على:
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f3e5f5',
              borderRadius: '10px',
              border: '2px solid #9b59b6',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '15px'
              }}>
                
              </div>
              <h3 style={{
                color: '#9b59b6',
                marginBottom: '10px',
                fontSize: '1.2rem'
              }}>
                معرفة ما نقوم به بشكل صحيح
              </h3>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: '#f3e5f5',
              borderRadius: '10px',
              border: '2px solid #9b59b6',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '15px'
              }}>
                
              </div>
              <h3 style={{
                color: '#9b59b6',
                marginBottom: '10px',
                fontSize: '1.2rem'
              }}>
                التعرف على المجالات التي يمكننا تحسينها وتطويرها
              </h3>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px'
        }}>
          <a href="/" style={{
            display: 'inline-block',
            padding: '15px 30px',
            backgroundColor: '#3498db',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '25px',
            fontSize: '1.1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#2980b9';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#3498db';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
          }}>
            العودة للصفحة الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
