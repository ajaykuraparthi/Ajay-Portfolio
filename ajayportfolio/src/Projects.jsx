// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useNavigate } from 'react-router-dom';

export default function Projects() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const skillChartRef = useRef(null);
  const cursorRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);

  const navigate = useNavigate();

  // Modal for Feesavy screenshots
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const screenshots = [
    'https://readdy.ai/api/search-image?query=modern%20mobile%20app%20interface%20showing%20fee%20management%20dashboard%20with%20payment%20statistics%20and%20charts%2C%20dark%20theme%20with%20blue%20accents%2C%20professional%20UI%20design&width=800&height=600&seq=app1&orientation=landscape',
    'https://readdy.ai/api/search-image?query=mobile%20app%20attendance%20tracking%20interface%20with%20QR%20scanner%20and%20location%20map%2C%20dark%20theme%20with%20blue%20elements%2C%20professional%20UI&width=800&height=600&seq=app3&orientation=landscape',
    'https://readdy.ai/api/search-image?query=mobile%20app%20analytics%20dashboard%20with%20financial%20reports%20and%20charts%2C%20dark%20theme%20with%20blue%20data%20visualization%2C%20modern%20interface&width=800&height=600&seq=app4&orientation=landscape'
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${mousePosition.x}px`;
      cursorRef.current.style.top = `${mousePosition.y}px`;
    }
  }, [mousePosition]);

  useEffect(() => {
    if (skillChartRef.current) {
      const chart = echarts.init(skillChartRef.current);
      const option = {
        radar: {
          indicator: [
            { name: 'JavaScript', max: 100 },
            { name: 'React', max: 100 },
            { name: 'Java', max: 100 },
            { name: 'Python', max: 100 },
            { name: 'MongoDB', max: 100 },
            { name: 'MySQL', max: 100 }
          ],
          radius: '65%',
          splitNumber: 4,
          axisName: {
            color: '#00A6FF',
            fontSize: 12
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(0, 166, 255, 0.05)', 'rgba(0, 166, 255, 0.1)']
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 166, 255, 0.3)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 166, 255, 0.3)'
            }
          }
        },
        series: [{
          name: 'Skills',
          type: 'radar',
          animation: false,
          data: [
            {
              value: [90, 85, 80, 75, 80, 75],
              name: 'Skill Level',
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(0, 166, 255, 0.7)' },
                  { offset: 1, color: 'rgba(0, 102, 255, 0.3)' }
                ])
              },
              lineStyle: {
                width: 2,
                color: '#00A6FF'
              },
              itemStyle: {
                color: '#00A6FF'
              }
            }
          ]
        }]
      };
      chart.setOption(option);
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener('resize', handleResize);
      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus(null), 3000);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    if (section === 'projects') {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: section } });
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden">
      {/* Cursor trail */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(0,166,255,0.8) 0%, rgba(0,102,255,0) 70%)',
          transform: 'translate(-50%, -50%)'
        }}
      ></div>
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-[#121212]/80 backdrop-blur-md border-b border-[#00A6FF]/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00A6FF] to-[#0066FF]">
            K.Ajay
          </a>
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'education', 'skills', 'projects', 'services', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`capitalize relative cursor-pointer whitespace-nowrap ${activeSection === item ? 'text-[#00A6FF]' : 'text-gray-300 hover:text-white'}`}
              >
                {item}
                {activeSection === item && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00A6FF] rounded-full"></span>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none cursor-pointer !rounded-button"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#121212]/95 backdrop-blur-md border-b border-[#00A6FF]/20">
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              {['home', 'about', 'education', 'skills', 'projects', 'services', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`capitalize cursor-pointer whitespace-nowrap ${activeSection === item ? 'text-[#00A6FF]' : 'text-gray-300'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ...other sections... */}

      {/* Projects Section */}
      <section id="projects" className="py-20 relative bg-[#0A0A0A]">
        <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=abstract%20digital%20grid%20pattern%20with%20blue%20neon%20lights%20on%20dark%20background%2C%20futuristic%20technology%20concept%2C%20minimalist%20tech%20design%20with%20depth%20and%20perspective%2C%20cyberpunk%20aesthetic&width=1440&height=800&seq=bg2&orientation=landscape')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A6FF] to-[#0066FF]">
              Featured Projects
            </span>
          </h2>
          <div className="space-y-20 max-w-5xl mx-auto">
            {/* Feesavy Project */}
            <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 md:p-8 shadow-[0_0_30px_rgba(0,102,255,0.1)] hover:shadow-[0_0_40px_rgba(0,102,255,0.2)] transition-all duration-500">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00A6FF]/20 to-[#0066FF]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src="https://readdy.ai/api/search-image?query=modern%20Android%20app%20interface%20for%20fee%20management%20system%20called%20Feesavy%2C%20showing%20dashboard%20with%20financial%20tracking%20features%2C%20clean%20UI%20with%20blue%20accent%20colors%2C%20mobile%20app%20mockup%20on%20dark%20background%2C%20professional%20software%20visualization&width=600&height=400&seq=project1&orientation=landscape"
                    alt="Feesavy Project"
                    className="w-full h-auto rounded-xl shadow-lg object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setIsPreviewModalOpen(true)}
                        className="w-12 h-12 rounded-full bg-[#121212]/80 flex items-center justify-center border border-[#00A6FF] shadow-[0_0_15px_rgba(0,166,255,0.5)] cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        <i className="fas fa-eye text-[#00A6FF]"></i>
                      </button>
                      {isPreviewModalOpen && (
                        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
                          <div className="bg-[#121212]/95 rounded-2xl border border-[#00A6FF]/20 p-6 md:p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
                            <button
                              onClick={() => setIsPreviewModalOpen(false)}
                              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-[#00A6FF]/30 hover:border-[#00A6FF] transition-all duration-300 !rounded-button whitespace-nowrap"
                            >
                              <i className="fas fa-times text-[#00A6FF]"></i>
                            </button>
                            <div className="mb-8">
                              <div className="relative">
                                <div className="flex items-center justify-between mb-4">
                                  <button
                                    onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1))}
                                    className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-[#00A6FF]/30 hover:border-[#00A6FF] transition-all duration-300 !rounded-button whitespace-nowrap"
                                  >
                                    <i className="fas fa-chevron-left text-[#00A6FF]"></i>
                                  </button>
                                  <button
                                    onClick={() => setCurrentImageIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0))}
                                    className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-[#00A6FF]/30 hover:border-[#00A6FF] transition-all duration-300 !rounded-button whitespace-nowrap"
                                  >
                                    <i className="fas fa-chevron-right text-[#00A6FF]"></i>
                                  </button>
                                </div>
                                <img
                                  src={screenshots[currentImageIndex]}
                                  alt={`Feesavy Screenshot ${currentImageIndex + 1}`}
                                  className="w-full h-[400px] object-cover rounded-xl mb-4"
                                />
                                <div className="flex justify-center gap-2 mb-6">
                                  {screenshots.map((_, index) => (
                                    <button
                                      key={index}
                                      onClick={() => setCurrentImageIndex(index)}
                                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        currentImageIndex === index ? 'bg-[#00A6FF]' : 'bg-[#1A1A1A] border border-[#00A6FF]/30'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <h3 className="text-2xl font-semibold text-white mb-4">Feesavy - Fee Management System</h3>
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-lg font-medium text-[#00A6FF] mb-2">Key Features</h4>
                                  <ul className="text-gray-300 space-y-2">
                                    <li className="flex items-start">
                                      <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                                      <span>Automated fee calculation with customizable payment schedules</span>
                                    </li>
                                    <li className="flex items-start">
                                      <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                                      <span>Real-time payment tracking and instant receipt generation</span>
                                    </li>
                                    <li className="flex items-start">
                                      <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                                      <span>Geolocation-based attendance system with QR code support</span>
                                    </li>
                                    <li className="flex items-start">
                                      <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                                      <span>Comprehensive financial analytics and reporting dashboard</span>
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-lg font-medium text-[#00A6FF] mb-2">Development Challenges</h4>
                                  <ul className="text-gray-300 space-y-2">
                                    <li className="flex items-start">
                                      <i className="fas fa-exclamation-circle text-[#00A6FF] mt-1 mr-2"></i>
                                      <span>Implementing secure payment gateway integration with multiple providers</span>
                                    </li>
                                    <li className="flex items-start">
                                      <i className="fas fa-exclamation-circle text-[#00A6FF] mt-1 mr-2"></i>
                                      <span>Optimizing database queries for large-scale data management</span>
                                    </li>
                                    <li className="flex items-start">
                                      <i className="fas fa-exclamation-circle text-[#00A6FF] mt-1 mr-2"></i>
                                      <span>Ensuring offline functionality with data synchronization</span>
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-lg font-medium text-[#00A6FF] mb-2">Technical Implementation</h4>
                                  <ul className="text-gray-300 space-y-2">
                                    <li className="flex items-start">
                                      <i className="fas fa-code text-[#00A6FF] mt-1 mr-2"></i>
                                      <span>Built with Java and Android SDK following MVVM architecture</span>
                                    </li>
                                    <li className="flex items-start">
                                      <i className="fas fa-code text-[#00A6FF] mt-1 mr-2"></i>
                                      <span>Firebase Realtime Database for seamless data synchronization</span>
                                    </li>
                                    <li className="flex items-start">
                                      <i className="fas fa-code text-[#00A6FF] mt-1 mr-2"></i>
                                      <span>Implemented Material Design components for modern UI/UX</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <a
                        href="https://github.com/ajay8179"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-[#121212]/80 flex items-center justify-center border border-[#00A6FF] shadow-[0_0_15px_rgba(0,166,255,0.5)] cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        <i className="fab fa-github text-[#00A6FF]"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-semibold text-white mb-3">Feesavy</h3>
                  <p className="text-[#00A6FF] mb-4">Android App for Fee Management</p>
                  <p className="text-gray-300 mb-6">
                    A comprehensive mobile application built with Java and Firebase that simplifies fee management for educational institutions. The app features automation, geolocation services, and intuitive financial tracking.
                  </p>
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-white mb-3">Key Features:</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>Automated fee calculation and reminders</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>Geolocation-based attendance tracking</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>Comprehensive financial reporting and analytics</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>User-friendly interface with modern design</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">Java</span>
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">Firebase</span>
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">Android</span>
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">UI/UX</span>
                  </div>
                </div>
              </div>
            </div>
            {/* MERN Chat Web App Project */}
            <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 md:p-8 shadow-[0_0_30px_rgba(0,102,255,0.1)] hover:shadow-[0_0_40px_rgba(0,102,255,0.2)] transition-all duration-500">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00A6FF]/20 to-[#0066FF]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    src="https://readdy.ai/api/search-image?query=modern%20chat%20application%20interface%20showing%20real-time%20messaging%20features%2C%20dark%20theme%20with%20blue%20accents%2C%20clean%20UI%20design%20with%20message%20bubbles%20and%20user%20avatars%2C%20professional%20web%20app%20visualization&width=600&height=400&seq=chat1&orientation=landscape" 
                    alt="MERN Chat App" 
                    className="w-full h-auto rounded-xl shadow-lg object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <a 
                        href="#" 
                        className="w-12 h-12 rounded-full bg-[#121212]/80 flex items-center justify-center border border-[#00A6FF] shadow-[0_0_15px_rgba(0,166,255,0.5)] cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        <i className="fas fa-eye text-[#00A6FF]"></i>
                      </a>
                      <a 
                        href="https://github.com/ajay8179" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-12 h-12 rounded-full bg-[#121212]/80 flex items-center justify-center border border-[#00A6FF] shadow-[0_0_15px_rgba(0,166,255,0.5)] cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        <i className="fab fa-github text-[#00A6FF]"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-semibold text-white mb-3">MERN Chat Web App</h3>
                  <p className="text-[#00A6FF] mb-4">Real-time Chat Application</p>
                  <p className="text-gray-300 mb-6">
                    A full-stack chat application built with the MERN stack featuring real-time messaging, user authentication, and group chat capabilities. The app includes modern UI/UX design with dark mode support.
                  </p>
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-white mb-3">Key Features:</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>Real-time messaging using Socket.io</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>User authentication with JWT</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>Group chat and private messaging</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>File sharing and emoji support</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">React</span>
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">Node.js</span>
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">MongoDB</span>
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">Socket.io</span>
                  </div>
                </div>
              </div>
            </div>
            {/* AI Chat Bot Project */}
            <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 md:p-8 shadow-[0_0_30px_rgba(0,102,255,0.1)] hover:shadow-[0_0_40px_rgba(0,102,255,0.2)] transition-all duration-500">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00A6FF]/20 to-[#0066FF]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    src="https://readdy.ai/api/search-image?query=futuristic%20AI%20chatbot%20interface%20with%20holographic%20elements%2C%20showing%20conversation%20flow%20with%20natural%20language%20processing%2C%20dark%20theme%20with%20blue%20accent%20colors%2C%20high-tech%20visualization&width=600&height=400&seq=chatbot1&orientation=landscape" 
                    alt="AI Chat Bot" 
                    className="w-full h-auto rounded-xl shadow-lg object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <a 
                        href="#" 
                        className="w-12 h-12 rounded-full bg-[#121212]/80 flex items-center justify-center border border-[#00A6FF] shadow-[0_0_15px_rgba(0,166,255,0.5)] cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        <i className="fas fa-eye text-[#00A6FF]"></i>
                      </a>
                      <a 
                        href="https://github.com/ajay8179" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-12 h-12 rounded-full bg-[#121212]/80 flex items-center justify-center border border-[#00A6FF] shadow-[0_0_15px_rgba(0,166,255,0.5)] cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        <i className="fab fa-github text-[#00A6FF]"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-semibold text-white mb-3">AI Chat Bot</h3>
                  <p className="text-[#00A6FF] mb-4">Intelligent Conversational AI</p>
                  <p className="text-gray-300 mb-6">
                    An advanced chatbot powered by OpenAI's GPT-3.5 API, capable of natural language understanding and generation. Features include context awareness and multi-turn conversations.
                  </p>
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-white mb-3">Key Features:</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>Natural language processing</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>Context-aware responses</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>Multi-language support</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>Customizable personality</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">Python</span>
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">OpenAI</span>
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">FastAPI</span>
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">React</span>
                  </div>
                </div>
              </div>
            </div>
            {/* AI Agents Project */}
            <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 md:p-8 shadow-[0_0_30px_rgba(0,102,255,0.1)] hover:shadow-[0_0_40px_rgba(0,102,255,0.2)] transition-all duration-500">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00A6FF]/20 to-[#0066FF]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    src="https://readdy.ai/api/search-image?query=advanced%20AI%20agent%20system%20interface%20showing%20multiple%20autonomous%20agents%20working%20together%2C%20neural%20network%20visualization%2C%20futuristic%20dashboard%20with%20data%20flows%2C%20dark%20theme%20with%20blue%20highlights&width=600&height=400&seq=agents1&orientation=landscape" 
                    alt="AI Agents" 
                    className="w-full h-auto rounded-xl shadow-lg object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <a 
                        href="#" 
                        className="w-12 h-12 rounded-full bg-[#121212]/80 flex items-center justify-center border border-[#00A6FF] shadow-[0_0_15px_rgba(0,166,255,0.5)] cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        <i className="fas fa-eye text-[#00A6FF]"></i>
                      </a>
                      <a 
                        href="https://github.com/ajay8179" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-12 h-12 rounded-full bg-[#121212]/80 flex items-center justify-center border border-[#00A6FF] shadow-[0_0_15px_rgba(0,166,255,0.5)] cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        <i className="fab fa-github text-[#00A6FF]"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-semibold text-white mb-3">AI Agents</h3>
                  <p className="text-[#00A6FF] mb-4">Autonomous AI System</p>
                  <p className="text-gray-300 mb-6">
                    A sophisticated multi-agent AI system that combines various AI models to perform complex tasks autonomously. The agents can collaborate, learn from each other, and adapt to new scenarios.
                  </p>
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-white mb-3">Key Features:</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>Multi-agent collaboration</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>Reinforcement learning</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>Task automation</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-[#00A6FF] mt-1 mr-2"></i>
                        <span>Adaptive decision making</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">Python</span>
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">TensorFlow</span>
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">PyTorch</span>
                    <span className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]">FastAPI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ...rest of your sections and footer... */}
    </div>
  );
}