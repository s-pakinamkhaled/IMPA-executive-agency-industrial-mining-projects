// Enhanced Data service for Claude.ai - uses in-memory storage with improved error handling
class DataService {
  constructor() {
    // Version for cache busting
    this.currentVersion = '1.3';
    
    // In-memory storage using Map for better performance
    this.storage = new Map();
    
    // Storage keys as constants
    this.STORAGE_KEYS = {
      NEWS: 'impaNews',
      PROJECTS: 'impaProjects', 
      VERSION: 'impaDataVersion'
    };
    
    // Event listeners for data changes
    this.eventListeners = new Map();
    
    // Initialize data with proper error handling
    this.initializeData();
  }

  // Initialize data with cache busting and comprehensive error handling
  initializeData() {
    try {
      console.log('Initializing DataService...');
      
      // Check data version for cache busting
      const storedVersion = this.storage.get(this.STORAGE_KEYS.VERSION);
      
      // If versions don't match, clear old data
      if (storedVersion !== this.currentVersion) {
        console.log(`Version mismatch (${storedVersion} → ${this.currentVersion}). Clearing storage.`);
        this.clearStorage();
        this.storage.set(this.STORAGE_KEYS.VERSION, this.currentVersion);
      }

      // Load data from storage or use defaults
      this.news = this.loadNewsData();
      this.projects = this.loadProjectsData();
      
      // Validate loaded data
      if (!this.validateData()) {
        console.warn('Data validation failed, reloading defaults');
        this.loadDefaultData();
      }
      
      // Save to ensure data is properly stored
      this.saveToStorage();
      
      console.log(`DataService initialized successfully. News: ${this.news.length}, Projects: ${this.projects.length}`);
      
    } catch (error) {
      console.error('Critical error initializing DataService:', error);
      this.loadDefaultData();
    }
  }

  // Validate data structure and content
  validateData() {
    try {
      // Validate news array
      if (!Array.isArray(this.news) || this.news.length === 0) {
        console.warn('Invalid news data structure');
        return false;
      }

      // Validate projects array  
      if (!Array.isArray(this.projects) || this.projects.length === 0) {
        console.warn('Invalid projects data structure');
        return false;
      }

      // Validate news items structure
      const newsValid = this.news.every(item => 
        item.id && item.title && item.content && item.date
      );

      // Validate project items structure
      const projectsValid = this.projects.every(item =>
        item.id && item.name && item.description && item.status
      );

      if (!newsValid) {
        console.warn('Invalid news items found');
        return false;
      }

      if (!projectsValid) {
        console.warn('Invalid project items found');  
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error validating data:', error);
      return false;
    }
  }

  // Load news data with improved error handling
  loadNewsData() {
    try {
      const storedNews = this.storage.get(this.STORAGE_KEYS.NEWS);
      if (storedNews) {
        const parsedNews = JSON.parse(storedNews);
        
        if (Array.isArray(parsedNews) && parsedNews.length > 0) {
          // Fix image paths and ensure data integrity
          return parsedNews
            .filter(news => news && typeof news === 'object') // Filter out invalid items
            .map(news => ({
              ...news,
              photo: this.fixImagePath(news.photo),
              // Ensure required fields have defaults
              id: news.id || Date.now() + Math.random(),
              title: news.title || 'بلا عنوان',
              date: news.date || new Date().toISOString().split('T')[0],
              status: news.status || 'published',
              category: news.category || 'أخبار عامة',
              readTime: news.readTime || '3 دقائق'
            }));
        }
      }
    } catch (error) {
      console.error('Error parsing stored news data:', error);
    }
    
    console.log('Loading default news data');
    return this.getDefaultNewsData();
  }

  // Load projects data with improved error handling  
  loadProjectsData() {
    try {
      const storedProjects = this.storage.get(this.STORAGE_KEYS.PROJECTS);
      if (storedProjects) {
        const parsedProjects = JSON.parse(storedProjects);
        
        if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
          // Fix image paths and ensure data integrity
          return parsedProjects
            .filter(project => project && typeof project === 'object') // Filter out invalid items
            .map(project => ({
              ...project,
              photo: this.fixImagePath(project.photo),
              // Ensure required fields have defaults
              id: project.id || `PRJ-${Date.now()}`,
              name: project.name || 'مشروع بلا اسم',
              status: project.status || 'مخطط',
              type: project.type || 'عام',
              progress: Number(project.progress) || 0,
              startDate: project.startDate || new Date().toISOString().split('T')[0]
            }));
        }
      }
    } catch (error) {
      console.error('Error parsing stored projects data:', error);
    }
    
    console.log('Loading default projects data');
    return this.getDefaultProjectsData();
  }

  // Enhanced image path fixing with better validation
  fixImagePath(photoPath) {
    if (!photoPath || typeof photoPath !== 'string') {
      return null;
    }
    
    // If it's already a proper relative path or URL, return as is
    if (photoPath.startsWith('/') || 
        photoPath.startsWith('http') || 
        photoPath.startsWith('data:') ||
        !photoPath.includes('Users')) {
      return photoPath;
    }
    
    // Extract filename from absolute path
    const pathParts = photoPath.split('/');
    const filename = pathParts[pathParts.length - 1];
    
    // Validate filename
    if (!filename || !filename.includes('.')) {
      console.warn('Invalid filename extracted from path:', photoPath);
      return null;
    }
    
    return `/${filename}`;
  }

  // Get default news data (unchanged but with better validation)
  getDefaultNewsData() {
    return [
      {
        id: 1,
        title: 'محافظ قنا يتابع تنفيذ مشروع المنطقة الحرفية بالترامسة ويدعو لجذب مطورين صناعيين',
        summary: 'محافظ قنا الدكتور خالد عبدالحليم تابع سير العمل في مشروع المنطقة الحرفية بالترامسة وأكد على دورها في دعم التنمية الاقتصادية وجذب الاستثمارات.',
        content: 'في إطار حرص محافظة قنا على متابعة المشروعات القومية، استقبل المحافظ الدكتور خالد عبدالحليم المهندس تيسير خاطر رئيس الجهاز التنفيذي للمشروعات الصناعية والتعدينية لمناقشة الموقف التنفيذي للمرحلة الأولى من مشروع المنطقة الحرفية بالترامسة. وأوضح المهندس أسامة شكري أن نسبة الإنجاز بلغت نحو 80%، مؤكداً أن المشروع سيساهم في تعزيز البنية التحتية ودعم التنمية الاقتصادية. حضر اللقاء عدد من القيادات التنفيذية ومسؤولي الشركات المنفذة.',
        date: '2024-09-10',
        category: 'أخبار المحافظات',
        readTime: '4 دقائق',
        status: 'published',
        photo: '/news_1.jpg'
      },
      {
        id: 2,
        title: 'بروتوكول تعاون لتطوير المنطقة الصناعية بمدينة أكتوبر الجديدة',
        summary: 'الهيئة العامة للتنمية الصناعية وقعت بروتوكول تعاون مع الجهاز التنفيذي للمشروعات الصناعية والتعدينية لترفيق 420 فداناً بالمنطقة الصناعية الثالثة بمدينة أكتوبر الجديدة.',
        content: 'في إطار تعزيز التنمية الصناعية والبنية التحتية، وقّعت الهيئة العامة للتنمية الصناعية بروتوكول تعاون مع الجهاز التنفيذي للمشروعات الصناعية والتعدينية لترفيق 420 فداناً بالمنطقة الصناعية الثالثة بمدينة أكتوبر الجديدة، بتكلفة تقديرية تبلغ 1.6 مليار جنيه. المشروع يستهدف جذب الاستثمارات الصناعية وتوفير فرص عمل جديدة للشباب.',
        date: '2024-09-08',
        category: 'تنمية صناعية',
        readTime: '3 دقائق',
        status: 'published',
        photo: '/news_2.jpg'
      },
      {
        id: 3,
        title: 'إنشاء مركز تدريب بحري حديث ببورسعيد',
        summary: 'افتتحت الهيئة مركز تدريب بحري متطور بمحافظة بورسعيد، مجهز بأحدث أجهزة المحاكاة وبرامج التدريب.',
        content: 'ضمن جهود الدولة لتطوير الكوادر البشرية بقطاع النقل البحري، تم إنشاء مركز تدريب بحري حديث ببورسعيد مزود بأجهزة محاكاة متطورة ومعامل عملية متخصصة. يهدف المركز إلى تدريب أكثر من 2000 متدرب سنوياً وتأهيلهم للعمل وفق أحدث المعايير الدولية.',
        date: '2024-09-05',
        category: 'تعليم وتدريب',
        readTime: '4 دقائق',
        status: 'published',
        photo: '/news3.jpg'
      },
      {
        id: 4,
        title: 'إطلاق منظومة الموانئ الذكية',
        summary: 'أعلنت الهيئة إطلاق منظومة تشغيل ذكية بالموانئ المصرية لرفع الكفاءة التشغيلية وتسريع الإجراءات.',
        content: 'في إطار خطة التحول الرقمي، أطلقت الهيئة منظومة الموانئ الذكية التي تشمل استخدام إنترنت الأشياء والذكاء الاصطناعي لمتابعة حركة السفن والبضائع بشكل لحظي. من المتوقع أن تسهم هذه المنظومة في تقليص زمن انتظار السفن بنسبة 30% وزيادة كفاءة التشغيل بشكل عام.',
        date: '2024-09-03',
        category: 'تكنولوجيا',
        readTime: '3 دقائق',
        status: 'published',
        photo: '/news4.jpg'
      },
      {
        id: 5,
        title: 'كامل الوزير يزور مترو الرياض ويبحث التعاون الصناعي المصري السعودي',
        summary: 'خلال زيارته للمملكة العربية السعودية.. كامل الوزير يزور مترو الرياض ويبحث مع الجانب السعودي آليات تعزيز التكامل الصناعي بين البلدين',
        content: `خلال زيارته للمملكة العربية السعودية، قام الفريق مهندس كامل الوزير نائب رئيس مجلس الوزراء للتنمية الصناعية وزير الصناعة والنقل، يرافقه المهندس صالح بن ناصر الجاسر وزير النقل والخدمات اللوجستية السعودي، بجولة ميدانية في مترو الرياض.

وخلال الجولة، استقل الوزير القطار واطّلع على آليات التشغيل والإدارة، مؤكداً على أهمية مشروعات المترو في تسهيل حركة تنقل المواطنين باعتبارها وسيلة نقل جماعي مستدامة وصديقة للبيئة. وأوضح أن هذا التوجه يتماشى مع توجيهات فخامة الرئيس عبدالفتاح السيسي رئيس الجمهورية، بالتوسع في وسائل النقل الأخضر الذكي لتقديم أفضل خدمة للمواطنين.

وعقب الزيارة، التقى الفريق مهندس كامل الوزير بالمهندس خليل بن إبراهيم بن سلمه نائب وزير الصناعة والثروة المعدنية لشئون الصناعة، بحضور السفير إيهاب أبوسريع سفير مصر بالرياض وعدد من قيادات وزارة النقل.`,
        date: '2024-09-03',
        category: 'تعاون دولي',
        readTime: '5 دقائق',
        status: 'published',
        photo: '/new_5.jpg'
      },
      {
        id: 6,
        title: 'كامل الوزير يعلن إطلاق مدينتين نسيجيتين بالمنيا والفيوم باستثمارات 27 مليار جنيه',
        summary: 'مدينتان نسيجيتان بالمنيا والفيوم لدعم الصناعة وزيادة الصادرات',
        content: `أعلن الفريق مهندس كامل الوزير، نائب رئيس مجلس الوزراء للتنمية الصناعية وزير الصناعة والنقل، خلال مؤتمر صحفي موسع، عن إطلاق مدينتين نسيجيتين متكاملتين في وادي السريرية بالمنيا والمنطقة الصناعية بشمال الفيوم على إجمالي مساحة 11 مليون م²، باستثمارات تتجاوز 27 مليار جنيه.

🎯 أهداف المشروع:
- أن تصبح المدينتان نموذجاً للمدن الصناعية المتخصصة في قطاع الغزل والنسيج
- تحقيق تكامل كامل لمراحل التصنيع من الغزل والنسيج والصباغة إلى الملابس الجاهزة
- استهداف جذب 3.5 مليار دولار استثمارات أجنبية ومحلية
- رفع الصادرات المصرية من قطاع النسيج من 2.8 مليار دولار حالياً إلى 11.5 مليار دولار بحلول 2030`,
        date: '2024-09-01',
        category: 'استثمار',
        readTime: '6 دقائق',
        status: 'published',
        photo: '/news_6.jpg'
      }
    ];
  }

  // Get default projects data (unchanged but with better validation)
  getDefaultProjectsData() {
    return [
      {
        id: 'PRJ-001',
        name: 'المنطقة الحرفية بالترامسة - المرحلة الأولى',
        description: 'مشروع إنشاء منطقة حرفية متكاملة بالترامسة بمحافظة قنا، يستهدف دعم الاقتصاد المحلي وتوفير فرص عمل جديدة، مع نسبة إنجاز وصلت إلى 80%.',
        status: 'قيد التنفيذ',
        type: 'تنمية صناعية',
        startDate: '2024-01-15',
        progress: 80,
        photo: '/project1.jpg'
      },
      {
        id: 'PRJ-002',
        name: 'تطوير المنطقة الصناعية بمدينة أكتوبر الجديدة',
        description: 'ترفيق 420 فداناً بالمنطقة الصناعية الثالثة بمدينة أكتوبر الجديدة ضمن بروتوكول تعاون بين الهيئة العامة للتنمية الصناعية والجهاز التنفيذي للمشروعات الصناعية والتعدينية.',
        status: 'مخطط',
        type: 'تنمية صناعية',
        startDate: '2024-03-01',
        progress: 20,
        photo: '/project2.jpg'
      },
      {
        id: 'PRJ-003',
        name: 'مركز تدريب بحري حديث ببورسعيد',
        description: 'إنشاء مركز متكامل للتدريب البحري بمحافظة بورسعيد، مجهز بأحدث أجهزة المحاكاة ومصمم لتأهيل أكثر من 2000 متدرب سنوياً.',
        status: 'منجز',
        type: 'تعليم وتدريب',
        startDate: '2023-06-01',
        progress: 100,
        photo: '/project3.jpg'
      },
      {
        id: 'PRJ-004',
        name: 'منظومة الموانئ الذكية',
        description: 'تنفيذ نظام تشغيل رقمي متطور بالموانئ المصرية يشمل استخدام الذكاء الاصطناعي وإنترنت الأشياء لمتابعة حركة السفن والبضائع.',
        status: 'قيد التنفيذ',
        type: 'تكنولوجيا',
        startDate: '2024-02-01',
        progress: 60,
        photo: '/project4.jpg'
      }
    ];
  }

  // Load default data (enhanced fallback method)
  loadDefaultData() {
    console.warn('Loading default data due to storage error or data validation failure');
    this.news = this.getDefaultNewsData();
    this.projects = this.getDefaultProjectsData();
    
    // Save the default data
    this.saveToStorage();
  }

  // Clear all storage with comprehensive cleanup
  clearStorage() {
    try {
      this.storage.delete(this.STORAGE_KEYS.NEWS);
      this.storage.delete(this.STORAGE_KEYS.PROJECTS);
      this.storage.delete(this.STORAGE_KEYS.VERSION);
      
      console.log('Storage cleared successfully');
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  // Enhanced save method with atomic operations and validation
  saveToStorage() {
    try {
      // Validate data before saving
      if (!this.validateData()) {
        console.error('Cannot save invalid data to storage');
        return false;
      }

      // Prepare data for storage
      const newsData = JSON.stringify(this.news);
      const projectsData = JSON.stringify(this.projects);
      
      // Validate JSON serialization worked
      if (!newsData || !projectsData) {
        console.error('Failed to serialize data to JSON');
        return false;
      }

      // Atomic save operation
      this.storage.set(this.STORAGE_KEYS.NEWS, newsData);
      this.storage.set(this.STORAGE_KEYS.PROJECTS, projectsData);
      this.storage.set(this.STORAGE_KEYS.VERSION, this.currentVersion);
      
      console.log('Data saved to storage successfully');
      console.log(`News items: ${this.news.length}, Projects: ${this.projects.length}`);
      
      // Emit save event
      this.emitEvent('dataSaved', { 
        newsCount: this.news.length, 
        projectsCount: this.projects.length 
      });
      
      return true;
    } catch (error) {
      console.error('Error saving to storage:', error);
      return false;
    }
  }

  // Enhanced refresh method with event emission
  refreshFromStorage() {
    console.log('Refreshing data from storage...');
    
    try {
      const previousNewsCount = this.news?.length || 0;
      const previousProjectsCount = this.projects?.length || 0;
      
      // Re-initialize data
      this.news = this.loadNewsData();
      this.projects = this.loadProjectsData();
      
      // Validate refreshed data
      if (!this.validateData()) {
        console.error('Data validation failed after refresh, rolling back');
        return false;
      }
      
      console.log('Data refreshed successfully');
      console.log(`News: ${previousNewsCount} → ${this.news.length}`);
      console.log(`Projects: ${previousProjectsCount} → ${this.projects.length}`);
      
      // Emit refresh event
      this.emitEvent('dataRefreshed', { 
        news: this.news, 
        projects: this.projects,
        previousCounts: { news: previousNewsCount, projects: previousProjectsCount }
      });
      
      return true;
    } catch (error) {
      console.error('Error refreshing data:', error);
      return false;
    }
  }

  // Enhanced force reload with backup mechanism
  forceReload() {
    console.log('Force reloading data...');
    
    try {
      // Create backup of current data
      const backup = {
        news: [...this.news],
        projects: [...this.projects]
      };

      // Clear and reinitialize
      this.clearStorage();
      this.initializeData();
      
      // Validate reloaded data
      if (!this.validateData()) {
        console.error('Force reload validation failed, restoring backup');
        this.news = backup.news;
        this.projects = backup.projects;
        return false;
      }
      
      // Emit force reload event
      this.emitEvent('dataForceReloaded', { 
        news: this.news, 
        projects: this.projects 
      });
      
      return true;
    } catch (error) {
      console.error('Error during force reload:', error);
      return false;
    }
  }

  // Event system for data changes
  addEventListener(eventType, callback) {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, []);
    }
    this.eventListeners.get(eventType).push(callback);
  }

  removeEventListener(eventType, callback) {
    if (this.eventListeners.has(eventType)) {
      const callbacks = this.eventListeners.get(eventType);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emitEvent(eventType, data) {
    // Emit custom event for components to listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(`dataService${eventType.charAt(0).toUpperCase() + eventType.slice(1)}`, {
        detail: data
      }));
    }

    // Emit to internal listeners
    if (this.eventListeners.has(eventType)) {
      this.eventListeners.get(eventType).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${eventType}:`, error);
        }
      });
    }
  }

  // Enhanced news methods with better error handling and validation
  getAllNews() {
    try {
      return this.news.filter(item => 
        item && 
        typeof item === 'object' && 
        item.status === 'published'
      );
    } catch (error) {
      console.error('Error getting all news:', error);
      return [];
    }
  }

  getNewsById(id) {
    try {
      if (!id) return null;
      return this.news.find(item => 
        item && (item.id === parseInt(id) || item.id === id)
      );
    } catch (error) {
      console.error('Error getting news by ID:', error);
      return null;
    }
  }

  addNews(newsItem) {
    try {
      // Validate input
      if (!newsItem || typeof newsItem !== 'object') {
        throw new Error('Invalid news item provided');
      }

      if (!newsItem.title || !newsItem.content) {
        throw new Error('News title and content are required');
      }

      const newNews = {
        id: Date.now() + Math.floor(Math.random() * 1000), // Ensure uniqueness
        title: String(newsItem.title).trim(),
        summary: newsItem.summary ? String(newsItem.summary).trim() : '',
        content: String(newsItem.content).trim(),
        date: newsItem.date || new Date().toISOString().split('T')[0],
        status: newsItem.status || 'published',
        category: newsItem.category || 'أخبار عامة',
        readTime: newsItem.readTime || '3 دقائق',
        photo: this.fixImagePath(newsItem.photo)
      };
      
      // Add to beginning of array
      this.news.unshift(newNews);
      
      if (this.saveToStorage()) {
        console.log('News added successfully:', newNews.id);
        this.emitEvent('newsAdded', newNews);
        return newNews;
      } else {
        // Rollback if save failed
        this.news.shift();
        throw new Error('Failed to save news item to storage');
      }
    } catch (error) {
      console.error('Error adding news:', error);
      return null;
    }
  }

  updateNews(id, updates) {
    try {
      if (!id || !updates || typeof updates !== 'object') {
        throw new Error('Invalid parameters for news update');
      }

      const index = this.news.findIndex(item => 
        item && (item.id === parseInt(id) || item.id === id)
      );
      
      if (index === -1) {
        throw new Error('News item not found');
      }

      // Backup original data
      const originalData = { ...this.news[index] };
      
      // Apply updates with validation
      const updatedNews = { 
        ...this.news[index], 
        ...updates,
        id: originalData.id, // Prevent ID changes
        photo: updates.photo ? this.fixImagePath(updates.photo) : this.news[index].photo
      };

      // Validate required fields
      if (!updatedNews.title || !updatedNews.content) {
        throw new Error('Title and content cannot be empty');
      }

      this.news[index] = updatedNews;
      
      if (this.saveToStorage()) {
        console.log('News updated successfully:', id);
        this.emitEvent('newsUpdated', { id, originalData, updatedData: updatedNews });
        return this.news[index];
      } else {
        // Rollback if save failed
        this.news[index] = originalData;
        throw new Error('Failed to save updated news item');
      }
    } catch (error) {
      console.error('Error updating news:', error);
      return null;
    }
  }

  deleteNews(id) {
    try {
      if (!id) {
        throw new Error('News ID is required for deletion');
      }

      const originalNews = [...this.news];
      const itemToDelete = this.news.find(item => 
        item && (item.id === parseInt(id) || item.id === id)
      );

      if (!itemToDelete) {
        throw new Error('News item not found');
      }

      this.news = this.news.filter(item => 
        item && item.id !== parseInt(id) && item.id !== id
      );
      
      if (this.saveToStorage()) {
        console.log('News deleted successfully:', id);
        this.emitEvent('newsDeleted', { id, deletedItem: itemToDelete });
        return true;
      } else {
        // Rollback if save failed
        this.news = originalNews;
        throw new Error('Failed to delete news item from storage');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      return false;
    }
  }

  // Enhanced project methods with better error handling and validation
  getAllProjects() {
    try {
      return this.projects.filter(item => 
        item && typeof item === 'object'
      );
    } catch (error) {
      console.error('Error getting all projects:', error);
      return [];
    }
  }

  getProjectById(id) {
    try {
      if (!id) return null;
      return this.projects.find(item => 
        item && item.id === id
      );
    } catch (error) {
      console.error('Error getting project by ID:', error);
      return null;
    }
  }

  addProject(projectItem) {
    try {
      // Validate input
      if (!projectItem || typeof projectItem !== 'object') {
        throw new Error('Invalid project item provided');
      }

      if (!projectItem.name || !projectItem.description) {
        throw new Error('Project name and description are required');
      }

      // Generate unique ID
      const projectCount = this.projects.length;
      const newId = `PRJ-${String(projectCount + 1).padStart(3, '0')}`;

      const newProject = {
        id: newId,
        name: String(projectItem.name).trim(),
        description: String(projectItem.description).trim(),
        status: projectItem.status || 'مخطط',
        type: projectItem.type || 'عام',
        startDate: projectItem.startDate || new Date().toISOString().split('T')[0],
        progress: Math.max(0, Math.min(100, Number(projectItem.progress) || 0)), // Clamp between 0-100
        photo: this.fixImagePath(projectItem.photo)
      };
      
      // Add to beginning of array
      this.projects.unshift(newProject);
      
      if (this.saveToStorage()) {
        console.log('Project added successfully:', newProject.id);
        this.emitEvent('projectAdded', newProject);
        return newProject;
      } else {
        // Rollback if save failed
        this.projects.shift();
        throw new Error('Failed to save project item to storage');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      return null;
    }
  }

  updateProject(id, updates) {
    try {
      if (!id || !updates || typeof updates !== 'object') {
        throw new Error('Invalid parameters for project update');
      }

      const index = this.projects.findIndex(item => 
        item && item.id === id
      );
      
      if (index === -1) {
        throw new Error('Project item not found');
      }

      // Backup original data
      const originalData = { ...this.projects[index] };
      
      // Apply updates with validation
      const updatedProject = { 
        ...this.projects[index], 
        ...updates,
        id: originalData.id, // Prevent ID changes
        progress: updates.progress !== undefined ? 
          Math.max(0, Math.min(100, Number(updates.progress))) : 
          this.projects[index].progress,
        photo: updates.photo ? this.fixImagePath(updates.photo) : this.projects[index].photo
      };

      // Validate required fields
      if (!updatedProject.name || !updatedProject.description) {
        throw new Error('Name and description cannot be empty');
      }

      this.projects[index] = updatedProject;
      
      if (this.saveToStorage()) {
        console.log('Project updated successfully:', id);
        this.emitEvent('projectUpdated', { id, originalData, updatedData: updatedProject });
        return this.projects[index];
      } else {
        // Rollback if save failed
        this.projects[index] = originalData;
        throw new Error('Failed to save updated project item');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      return null;
    }
  }

  deleteProject(id) {
    try {
      if (!id) {
        throw new Error('Project ID is required for deletion');
      }

      const originalProjects = [...this.projects];
      const itemToDelete = this.projects.find(item => 
        item && item.id === id
      );

      if (!itemToDelete) {
        throw new Error('Project item not found');
      }

      this.projects = this.projects.filter(item => 
        item && item.id !== id
      );
      
      if (this.saveToStorage()) {
        console.log('Project deleted successfully:', id);
        this.emitEvent('projectDeleted', { id, deletedItem: itemToDelete });
        return true;
      } else {
        // Rollback if save failed
        this.projects = originalProjects;
        throw new Error('Failed to delete project item from storage');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  }

  // Enhanced photo handling methods
  addProjectPhoto(projectId, photoData) {
    try {
      if (!projectId || !photoData) {
        throw new Error('Project ID and photo data are required');
      }

      const project = this.getProjectById(projectId);
      if (!project) {
        throw new Error('Project not found');
      }

      const originalPhoto = project.photo;
      const fixedPhotoPath = this.fixImagePath(photoData);
      
      if (!fixedPhotoPath) {
        throw new Error('Invalid photo data provided');
      }

      project.photo = fixedPhotoPath;
      
      if (this.saveToStorage()) {
        console.log('Project photo updated successfully:', projectId);
        this.emitEvent('projectPhotoUpdated', { projectId, oldPhoto: originalPhoto, newPhoto: fixedPhotoPath });
        return true;
      } else {
        // Rollback if save failed
        project.photo = originalPhoto;
        throw new Error('Failed to save project photo');
      }
    } catch (error) {
      console.error('Error adding project photo:', error);
      return false;
    }
  }

  addNewsPhoto(newsId, photoData) {
    try {
      if (!newsId || !photoData) {
        throw new Error('News ID and photo data are required');
      }

      const news = this.getNewsById(newsId);
      if (!news) {
        throw new Error('News item not found');
      }

      const originalPhoto = news.photo;
      const fixedPhotoPath = this.fixImagePath(photoData);
      
      if (!fixedPhotoPath) {
        throw new Error('Invalid photo data provided');
      }

      news.photo = fixedPhotoPath;
      
      if (this.saveToStorage()) {
        console.log('News photo updated successfully:', newsId);
        this.emitEvent('newsPhotoUpdated', { newsId, oldPhoto: originalPhoto, newPhoto: fixedPhotoPath });
        return true;
      } else {
        // Rollback if save failed
        news.photo = originalPhoto;
        throw new Error('Failed to save news photo');
      }
    } catch (error) {
      console.error('Error adding news photo:', error);
      return false;
    }
  }

  // Admin methods (including drafts and unpublished content)
  getAdminNews() {
    try {
      return [...this.news]; // Return copy to prevent external mutations
    } catch (error) {
      console.error('Error getting admin news:', error);
      return [];
    }
  }

  getAdminProjects() {
    try {
      return [...this.projects]; // Return copy to prevent external mutations
    } catch (error) {
      console.error('Error getting admin projects:', error);
      return [];
    }
  }

  // Enhanced utility methods
  isStorageAvailable() {
    return this.storage instanceof Map && typeof this.storage.set === 'function';
  }

  // Get comprehensive storage information
  getStorageInfo() {
    if (!this.isStorageAvailable()) {
      return { 
        available: false, 
        error: 'Storage not available' 
      };
    }

    try {
      const newsData = JSON.stringify(this.news);
      const projectsData = JSON.stringify(this.projects);
      
      const newsSize = newsData.length;
      const projectsSize = projectsData.length;
      const totalSize = newsSize + projectsSize;

      // Calculate additional metrics
      const avgNewsSize = this.news.length > 0 ? Math.round(newsSize / this.news.length) : 0;
      const avgProjectSize = this.projects.length > 0 ? Math.round(projectsSize / this.projects.length) : 0;

      return {
        available: true,
        version: this.currentVersion,
        newsSize: this.formatBytes(newsSize),
        projectsSize: this.formatBytes(projectsSize),
        totalSize: this.formatBytes(totalSize),
        newsCount: this.news.length,
        projectsCount: this.projects.length,
        avgNewsSize: this.formatBytes(avgNewsSize),
        avgProjectSize: this.formatBytes(avgProjectSize),
        storageType: 'Memory (Map)',
        storageKeys: Object.values(this.STORAGE_KEYS),
        lastSaved: new Date().toISOString()
      };
    } catch (error) {
      return { 
        available: true, 
        error: error.message,
        newsCount: this.news?.length || 0,
        projectsCount: this.projects?.length || 0
      };
    }
  }

  // Utility method to format bytes
  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  // Search functionality
  searchNews(query, filters = {}) {
    try {
      if (!query || typeof query !== 'string') {
        return this.getAllNews();
      }

      const searchTerm = query.toLowerCase().trim();
      let results = this.getAllNews();

      // Text search
      results = results.filter(news => 
        news.title.toLowerCase().includes(searchTerm) ||
        news.summary.toLowerCase().includes(searchTerm) ||
        news.content.toLowerCase().includes(searchTerm) ||
        news.category.toLowerCase().includes(searchTerm)
      );

      // Apply filters
      if (filters.category) {
        results = results.filter(news => news.category === filters.category);
      }

      if (filters.dateFrom) {
        results = results.filter(news => news.date >= filters.dateFrom);
      }

      if (filters.dateTo) {
        results = results.filter(news => news.date <= filters.dateTo);
      }

      // Sort by relevance (date desc by default)
      results.sort((a, b) => new Date(b.date) - new Date(a.date));

      return results;
    } catch (error) {
      console.error('Error searching news:', error);
      return [];
    }
  }

  searchProjects(query, filters = {}) {
    try {
      if (!query || typeof query !== 'string') {
        return this.getAllProjects();
      }

      const searchTerm = query.toLowerCase().trim();
      let results = this.getAllProjects();

      // Text search
      results = results.filter(project => 
        project.name.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.type.toLowerCase().includes(searchTerm) ||
        project.status.toLowerCase().includes(searchTerm)
      );

      // Apply filters
      if (filters.status) {
        results = results.filter(project => project.status === filters.status);
      }

      if (filters.type) {
        results = results.filter(project => project.type === filters.type);
      }

      if (filters.minProgress !== undefined) {
        results = results.filter(project => project.progress >= filters.minProgress);
      }

      if (filters.maxProgress !== undefined) {
        results = results.filter(project => project.progress <= filters.maxProgress);
      }

      return results;
    } catch (error) {
      console.error('Error searching projects:', error);
      return [];
    }
  }

  // Data export/import functionality
  exportData() {
    try {
      const exportData = {
        version: this.currentVersion,
        timestamp: new Date().toISOString(),
        news: this.news,
        projects: this.projects
      };

      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      return null;
    }
  }

  importData(jsonData) {
    try {
      if (!jsonData || typeof jsonData !== 'string') {
        throw new Error('Invalid JSON data provided');
      }

      const importedData = JSON.parse(jsonData);
      
      // Validate structure
      if (!importedData.news || !importedData.projects) {
        throw new Error('Invalid data structure - missing news or projects');
      }

      if (!Array.isArray(importedData.news) || !Array.isArray(importedData.projects)) {
        throw new Error('Invalid data structure - news and projects must be arrays');
      }

      // Backup current data
      const backup = {
        news: [...this.news],
        projects: [...this.projects]
      };

      // Import data
      this.news = importedData.news.map(news => ({
        ...news,
        photo: this.fixImagePath(news.photo)
      }));

      this.projects = importedData.projects.map(project => ({
        ...project,
        photo: this.fixImagePath(project.photo)
      }));

      // Validate imported data
      if (!this.validateData()) {
        // Restore backup if validation fails
        this.news = backup.news;
        this.projects = backup.projects;
        throw new Error('Imported data failed validation');
      }

      // Save imported data
      if (!this.saveToStorage()) {
        // Restore backup if save fails
        this.news = backup.news;
        this.projects = backup.projects;
        throw new Error('Failed to save imported data');
      }

      console.log('Data imported successfully');
      this.emitEvent('dataImported', { 
        newsCount: this.news.length,
        projectsCount: this.projects.length 
      });

      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Health check method
  healthCheck() {
    const health = {
      status: 'healthy',
      checks: {},
      timestamp: new Date().toISOString()
    };

    try {
      // Storage availability
      health.checks.storage = {
        available: this.isStorageAvailable(),
        type: 'Memory (Map)'
      };

      // Data integrity
      health.checks.dataIntegrity = {
        valid: this.validateData(),
        newsCount: this.news?.length || 0,
        projectsCount: this.projects?.length || 0
      };

      // Memory usage
      const storageInfo = this.getStorageInfo();
      health.checks.memoryUsage = {
        totalSize: storageInfo.totalSize,
        newsSize: storageInfo.newsSize,
        projectsSize: storageInfo.projectsSize
      };

      // Check if any critical issues
      const criticalIssues = [];
      if (!health.checks.storage.available) {
        criticalIssues.push('Storage not available');
      }
      if (!health.checks.dataIntegrity.valid) {
        criticalIssues.push('Data integrity check failed');
      }

      if (criticalIssues.length > 0) {
        health.status = 'unhealthy';
        health.issues = criticalIssues;
      }

    } catch (error) {
      health.status = 'error';
      health.error = error.message;
    }

    return health;
  }
}

// Create and export a singleton instance
const dataService = new DataService();

// Add global access for debugging (safe check for window)
if (typeof window !== 'undefined') {
  window.dataService = dataService;
  
  // Add helpful debugging methods
  window.debugDataService = {
    health: () => dataService.healthCheck(),
    info: () => dataService.getStorageInfo(),
    export: () => dataService.exportData(),
    reload: () => dataService.forceReload(),
    clear: () => dataService.clearStorage()
  };
}

export default dataService;