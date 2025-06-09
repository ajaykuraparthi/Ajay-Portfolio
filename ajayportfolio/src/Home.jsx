import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useNavigate, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import photo1Img from './assets/photo1.jpg';
import photo2Img from './assets/photo2.jpg';
import photo3Img from './assets/photo3.jpg';
import photo4Img from './assets/photo4.jpg';
import photo5Img from './assets/photo5.jpg';
import photo6Img from './assets/photo6.jpg';
import photo7Img from './assets/photo7.jpg';
import photo8Img from './assets/photo8.jpg';
import profileImg from './assets/profile.jpg';
import photo9Img from './assets/photo9.jpg';

// Initialize EmailJS with your public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const projectsData = [
  {
    title: "Feesavy",
    subtitle: "Android App for Fee Management",
    description:
      "A comprehensive mobile application built with Java and Firebase that simplifies fee management for educational institutions. The app features automation, geolocation services, and intuitive financial tracking.",
    features: [
      "Automated fee calculation and reminders",
      "Geolocation-based attendance tracking",
      "Comprehensive financial reporting and analytics",
      "User-friendly interface with modern design",
    ],
    tech: ["Java", "Firebase", "Android", "UI/UX"],
    image: photo1Img,
    github: "https://github.com/ajaykuraparthi/Feesavy",
  },
  {
    title: "MERN Chat Web App",
    subtitle: "Real-time Chat Application",
    description:
      "A full-stack chat application built with the MERN stack featuring real-time messaging, user authentication, and group chat capabilities. The app includes modern UI/UX design with dark mode support.",
    features: [
      "Real-time messaging using Socket.io",
      "User authentication with JWT",
      "Group chat and private messaging",
      "File sharing and emoji support",
    ],
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    image: photo2Img,
    github: "https://github.com/ajaykuraparthi",
  },
  {
    title: "AI Chat Bot",
    subtitle: "Intelligent Conversational AI",
    description:
      "An advanced chatbot powered by OpenAI's GPT-3.5 API, capable of natural language understanding and generation. Features include context awareness and multi-turn conversations.",
    features: [
      "Natural language processing",
      "Context-aware responses",
      "Multi-language support",
      "Customizable personality",
    ],
    tech: ["Python", "OpenAI", "FastAPI", "React"],
    image: photo3Img,
    github: "https://github.com/ajaykuraparthi",
  },
  {
    title: "AI Agents",
    subtitle: "Autonomous AI System",
    description:
      "A sophisticated multi-agent AI system that combines various AI models to perform complex tasks autonomously. The agents can collaborate, learn from each other, and adapt to new scenarios.",
    features: [
      "Multi-agent collaboration",
      "Reinforcement learning",
      "Task automation",
      "Adaptive decision making",
    ],
    tech: ["Python", "TensorFlow", "PyTorch", "FastAPI"],
    image: photo4Img,
    github: "https://github.com/ajaykuraparthi",
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const skillChartRef = useRef(null);
  const cursorRef = useRef(null);

  const [projectPage, setProjectPage] = useState(0);
  const projectsPerPage = 2;
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);

  const handlePrevProject = () => {
    setProjectPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };
  const handleNextProject = () => {
    setProjectPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const visibleProjects = projectsData.slice(
    projectPage * projectsPerPage,
    projectPage * projectsPerPage + projectsPerPage
  );

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll to section from navigation state
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear the state to prevent re-scrolling on subsequent renders
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Cursor trail effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${mousePosition.x}px`;
      cursorRef.current.style.top = `${mousePosition.y}px`;
    }
  }, [mousePosition]);

  // Skills chart
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
          axisName: { color: '#00A6FF', fontSize: 12 },
          splitArea: { areaStyle: { color: ['rgba(0, 166, 255, 0.05)', 'rgba(0, 166, 255, 0.1)'] } },
          axisLine: { lineStyle: { color: 'rgba(0, 166, 255, 0.3)' } },
          splitLine: { lineStyle: { color: 'rgba(0, 166, 255, 0.3)' } }
        },
        series: [{
          name: 'Skills',
          type: 'radar',
          animation: false,
          data: [{
            value: [90, 85, 80, 75, 80, 75],
            name: 'Skill Level',
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(0, 166, 255, 0.7)' },
                { offset: 1, color: 'rgba(0, 102, 255, 0.3)' }
              ])
            },
            lineStyle: { width: 2, color: '#00A6FF' },
            itemStyle: { color: '#00A6FF' }
          }]
        }]
      };
      chart.setOption(option);
      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);
      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Form handlers
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Ajay',
      }
    )
      .then(() => {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(null), 3000);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setFormStatus('error');
        setTimeout(() => setFormStatus(null), 3000);
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Navigation
  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    if (section === 'projects') {
      navigate('/projects');
    } else {
      const element = document.getElementById(section);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
          
          @keyframes textGlow {
            0% { text-shadow: 0 0 10px rgba(0,166,255,0.5), 0 0 20px rgba(0,166,255,0.3), 0 0 30px rgba(0,166,255,0.2); }
            50% { text-shadow: 0 0 20px rgba(0,166,255,0.8), 0 0 30px rgba(0,166,255,0.5), 0 0 40px rgba(0,166,255,0.3); }
            100% { text-shadow: 0 0 10px rgba(0,166,255,0.5), 0 0 20px rgba(0,166,255,0.3), 0 0 30px rgba(0,166,255,0.2); }
          }

          .futuristic-text {
            font-family: 'Orbitron', sans-serif;
            text-transform: uppercase;
            letter-spacing: 2px;
            animation: textGlow 3s ease-in-out infinite;
            transform-style: preserve-3d;
            perspective: 1000px;
            text-shadow: 
              0 0 10px rgba(0,166,255,0.5),
              0 0 20px rgba(0,166,255,0.3),
              0 0 30px rgba(0,166,255,0.2),
              0 5px 15px rgba(0,0,0,0.5);
          }

          .futuristic-text-3d {
            transform: rotateX(10deg) rotateY(-10deg);
            transition: transform 0.3s ease;
          }

          .futuristic-text-3d:hover {
            transform: rotateX(0deg) rotateY(0deg);
          }
        `}
      </style>
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
            AJAY
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

      {/* === Kuraparthi Ajay's Portfolio Sections Start === */}
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${photo5Img})` }}></div>
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                background: `rgba(${Math.random() * 100}, ${Math.random() * 150 + 100}, 255, ${Math.random() * 0.5 + 0.3})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                boxShadow: `0 0 10px rgba(0, 166, 255, 0.8)`
              }}
            ></div>
          ))}
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="mb-12">
            <div className="w-40 h-40 mx-auto mb-8 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00A6FF] to-[#0066FF] animate-pulse opacity-50"></div>
              <img
                src={photo6Img}
                alt="3D Avatar"
                className="w-full h-full object-cover rounded-full p-1"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A6FF] to-[#0066FF] animate-gradient futuristic-text futuristic-text-3d inline-block whitespace-nowrap">
                AJAY KURAPARTHI
              </span>
            </h1>
            <img
              src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=40&color=00FFFF&center=true&vCenter=true&width=2000&lines=Hey+there,+I'm+Ajay+%F0%9F%91%8B;Creative+Developer;Fullstack+3D+Creator;Exploring+3D+Web,+AI,+ML+%F0%9F%91%BE"
              className="block mx-auto mb-8 max-w-full"
            />
            <div className="flex justify-center space-x-6 mb-10">
              <a
                href="https://github.com/ajaykuraparthi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#121212]/50 backdrop-blur-sm flex items-center justify-center border border-[#00A6FF]/30 hover:border-[#00A6FF] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,166,255,0.5)] cursor-pointer"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/ajay-kuraparthi-423a56288/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#121212]/50 backdrop-blur-sm flex items-center justify-center border border-[#00A6FF]/30 hover:border-[#00A6FF] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,166,255,0.5)] cursor-pointer"
              >
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
            </div>
            <a
              href="https://drive.google.com/file/d/18fzEbRZY-WzI96-GumnLzKnrC5m3Jb6W/view?usp=sharing"
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#00A6FF] to-[#0066FF] rounded-full text-white font-medium shadow-[0_0_15px_rgba(0,166,255,0.5)] hover:shadow-[0_0_25px_rgba(0,166,255,0.8)] transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap"
            >
              <i className="fas fa-download mr-2"></i> Download Resume
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-[#00A6FF]">
            <i className="fas fa-chevron-down text-2xl"></i>
          </a>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 relative">
        <div className="absolute inset-0 bg-[#0A0A0A] opacity-90"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A6FF] to-[#0066FF]">
              About Me
            </span>
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 rounded-full bg-gradient-to-r from-[#00A6FF] to-[#0066FF] p-1 mb-8 shadow-[0_0_25px_rgba(0,166,255,0.4)]">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="text-gray-300 leading-relaxed text-lg">
              {/* <p className="mb-4">
                Hello! I'm Ajay Kuraparthi, a passionate Full Stack Developer and a Computer Science student with a strong interest in{" "}
                <span className="text-[#00A6FF] font-medium">3D web development</span>,{" "}
                <span className="text-[#00A6FF] font-medium">Artificial Intelligence</span>, and{" "}
                <span className="text-[#00A6FF] font-medium">Machine Learning</span>. I thrive on bringing imaginative concepts to life through robust and efficient code.
              </p>
              <p className="mb-4">
                My journey in technology began with a fascination for creating interactive digital experiences. I enjoy tackling complex problems and continuously learning new technologies to expand my skillset.
              </p>
              <p>
                When I'm not coding, you can find me exploring the latest advancements in AI, experimenting with 3D modeling, or contributing to open-source projects. I'm always eager to collaborate on innovative solutions and make a meaningful impact.
              </p> */}
              <p className="mb-4">
                🎯 I turn imagination into real-life solutions through modern development.
              </p>
              <p className="mb-4">
                ✨ I'm a freelancer building cutting-edge 3D websites, applications, and intelligent agents.
              </p>
              <p className="mb-4">
                🚀 I work with AI/ML, UI/UX, and 3D tech to deliver innovative digital products.
              </p>
              <p>
                🧠 Passionate about blending design, development, and intelligence for the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="absolute inset-0 bg-[#0A0A0A] opacity-90"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A6FF] to-[#0066FF]">
              Skills & Expertise
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 shadow-[0_0_20px_rgba(0,102,255,0.1)]">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <i className="fas fa-code text-[#00A6FF] mr-3"></i>
                Technical Skills
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['JavaScript', 'Java', 'Python', 'HTML', 'CSS'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Frontend</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['ReactJS', 'HTML5', 'CSS3', 'Responsive Design'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Backend</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['MongoDB', 'MySQL', 'Firebase', 'RESTful APIs'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Tools</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['Git', 'VS Code', 'IntelliJ', 'Colab', 'Jupyter'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 shadow-[0_0_20px_rgba(0,102,255,0.1)]">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <i className="fas fa-chart-radar text-[#00A6FF] mr-3"></i>
                Skill Proficiency
              </h3>
              <div ref={skillChartRef} className="w-full h-80"></div>
              <div className="mt-6">
                <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                  <i className="fas fa-brain text-[#00A6FF] mr-2"></i>
                  Soft Skills
                </h4>
                <div className="flex flex-wrap gap-3">
                  {['Leadership', 'Time Management', 'Critical Thinking', 'Problem Solving', 'Communication'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience Section */}
      <section id="education" className="py-20 relative bg-[#0A0A0A]">
        <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: `url(${photo7Img})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A6FF] to-[#0066FF]">
              Education & Experience
            </span>
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#00A6FF] to-[#0066FF]/30"></div>
              {/* Education 1 */}
              <div className="relative mb-16">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-6 h-6 rounded-full bg-[#00A6FF] shadow-[0_0_15px_rgba(0,166,255,0.8)] z-10"></div>
                <div className="ml-auto mr-auto md:ml-auto md:mr-0 md:pr-12 w-full md:w-1/2 mb-8 md:mb-0 md:text-right">
                  <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 shadow-[0_0_20px_rgba(0,102,255,0.1)] hover:shadow-[0_0_30px_rgba(0,102,255,0.2)] hover:translate-y-[-5px] transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-2">B.Tech in Computer Science</h3>
                    <p className="text-[#00A6FF] mb-2">Sri Venkateswara University</p>
                    <p className="text-gray-400 mb-2">2024 – 2027</p>
                    <p className="text-gray-300">Pursuing advanced studies in Computer Science with focus on modern development technologies and AI.</p>
                  </div>
                </div>
              </div>
              {/* Education 2 */}
              <div className="relative mb-16">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-6 h-6 rounded-full bg-[#00A6FF] shadow-[0_0_15px_rgba(0,166,255,0.8)] z-10"></div>
                <div className="ml-auto mr-auto md:mr-auto md:ml-0 md:pl-12 w-full md:w-1/2">
                  <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 shadow-[0_0_20px_rgba(0,102,255,0.1)] hover:shadow-[0_0_30px_rgba(0,102,255,0.2)] hover:translate-y-[-5px] transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-2">Diploma in Computer Science</h3>
                    <p className="text-[#00A6FF] mb-2">Dr. Y.C James Yen Polytechnic</p>
                    <p className="text-gray-400 mb-2">2021 – 2024</p>
                    <p className="text-gray-300">Completed diploma with CGPA of 8.5, focusing on programming fundamentals and software development.</p>
                  </div>
                </div>
              </div>
              {/* Experience */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-6 h-6 rounded-full bg-[#00A6FF] shadow-[0_0_15px_rgba(0,166,255,0.8)] z-10"></div>
                <div className="ml-auto mr-auto md:ml-auto md:mr-0 md:pr-12 w-full md:w-1/2 md:text-right">
                  <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 shadow-[0_0_20px_rgba(0,102,255,0.1)] hover:shadow-[0_0_30px_rgba(0,102,255,0.2)] hover:translate-y-[-5px] transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-2">Frontend Developer Intern</h3>
                    <p className="text-[#00A6FF] mb-2">Kaveri Technologies</p>
                    <p className="text-gray-400 mb-2">Dec 2023 – May 2024</p>
                    <ul className="text-gray-300 list-disc list-inside md:list-outside">
                    <li>Developed responsive UI using React.js & Tailwind CSS.</li>
    <li>Integrated APIs and collaborated in Agile development.</li>
    <li>Built dashboards, forms, and reusable components.</li>
  </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative bg-[#0A0A0A]">
        <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: `url(${photo8Img})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A6FF] to-[#0066FF]">
              Featured Projects
            </span>
          </h2>
          <div className="flex items-center justify-center mb-10 gap-6">
            <button
              onClick={handlePrevProject}
              className="w-12 h-12 rounded-full bg-[#121212]/80 flex items-center justify-center border border-[#00A6FF] hover:bg-[#00A6FF]/20 transition-all duration-300 shadow-[0_0_15px_rgba(0,166,255,0.3)] cursor-pointer"
              aria-label="Previous"
            >
              <i className="fas fa-arrow-left text-2xl text-[#00A6FF]"></i>
            </button>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
              {visibleProjects.map((project) => (
                <div
                  key={project.title}
                  className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 md:p-8 shadow-[0_0_30px_rgba(0,102,255,0.1)] hover:shadow-[0_0_40px_rgba(0,102,255,0.2)] transition-all duration-500 flex flex-col"
                >
                  <div className="relative group mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00A6FF]/20 to-[#0066FF]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-56 object-cover rounded-xl"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-[#00A6FF] mb-2">{project.subtitle}</p>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <h4 className="text-lg font-medium text-white mb-2">Key Features:</h4>
                  <ul className="text-gray-300 mb-4 space-y-1">
                    {project.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-[#1A1A1A] rounded-full text-sm border border-[#00A6FF]/30 text-[#00A6FF]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#121212]/80 flex items-center justify-center border border-[#00A6FF] shadow-[0_0_15px_rgba(0,166,255,0.5)] cursor-pointer"
                    >
                      <i className="fab fa-github text-[#00A6FF]"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleNextProject}
              className="w-12 h-12 rounded-full bg-[#121212]/80 flex items-center justify-center border border-[#00A6FF] hover:bg-[#00A6FF]/20 transition-all duration-300 shadow-[0_0_15px_rgba(0,166,255,0.3)] cursor-pointer"
              aria-label="Next"
            >
              <i className="fas fa-arrow-right text-2xl text-[#00A6FF]"></i>
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setProjectPage(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${projectPage === idx ? "bg-[#00A6FF]" : "bg-[#1A1A1A] border border-[#00A6FF]/30"}`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="absolute inset-0 bg-[#0A0A0A] opacity-90"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A6FF] to-[#0066FF]">
              Our Cutting-Edge Services
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Service 1 */}
            <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 shadow-[0_0_20px_rgba(0,102,255,0.1)] hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] hover:translate-y-[-10px] transition-all duration-500 group">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#00A6FF] to-[#0066FF] p-0.5">
                <div className="w-full h-full rounded-2xl bg-[#121212] flex items-center justify-center">
                  <i className="fas fa-cube text-2xl text-[#00A6FF] group-hover:animate-pulse"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00A6FF] transition-colors duration-300">3D Website Development</h3>
              <p className="text-gray-300 mb-4">
                Create immersive, futuristic websites with interactive 3D elements that engage users and showcase your brand in a unique way.
              </p>
              <a href="#" className="text-[#00A6FF] inline-flex items-center cursor-pointer">
                Learn More <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all duration-300"></i>
              </a>
            </div>
            {/* Service 2 */}
            <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 shadow-[0_0_20px_rgba(0,102,255,0.1)] hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] hover:translate-y-[-10px] transition-all duration-500 group">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#00A6FF] to-[#0066FF] p-0.5">
                <div className="w-full h-full rounded-2xl bg-[#121212] flex items-center justify-center">
                  <i className="fas fa-robot text-2xl text-[#00A6FF] group-hover:animate-pulse"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00A6FF] transition-colors duration-300">AI-Powered Agents</h3>
              <p className="text-gray-300 mb-4">
                Implement intelligent automation solutions with custom AI agents that streamline your business processes and enhance productivity.
              </p>
              <a href="#" className="text-[#00A6FF] inline-flex items-center cursor-pointer">
                Learn More <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all duration-300"></i>
              </a>
            </div>
            {/* Service 3 */}
            <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 shadow-[0_0_20px_rgba(0,102,255,0.1)] hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] hover:translate-y-[-10px] transition-all duration-500 group">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#00A6FF] to-[#0066FF] p-0.5">
                <div className="w-full h-full rounded-2xl bg-[#121212] flex items-center justify-center">
                  <i className="fas fa-vr-cardboard text-2xl text-[#00A6FF] group-hover:animate-pulse"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00A6FF] transition-colors duration-300">XR Solutions</h3>
              <p className="text-gray-300 mb-4">
                Develop cutting-edge augmented and virtual reality experiences that transform how users interact with your products and services.
              </p>
              <a href="#" className="text-[#00A6FF] inline-flex items-center cursor-pointer">
                Learn More <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all duration-300"></i>
              </a>
            </div>
            {/* Service 4 */}
            <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 shadow-[0_0_20px_rgba(0,102,255,0.1)] hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] hover:translate-y-[-10px] transition-all duration-500 group">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#00A6FF] to-[#0066FF] p-0.5">
                <div className="w-full h-full rounded-2xl bg-[#121212] flex items-center justify-center">
                  <i className="fas fa-code-branch text-2xl text-[#00A6FF] group-hover:animate-pulse"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00A6FF] transition-colors duration-300">Custom Web Apps</h3>
              <p className="text-gray-300 mb-4">
                Build scalable, full-stack web applications with modern technologies like React, Node.js, and MongoDB tailored to your specific needs.
              </p>
              <a href="#" className="text-[#00A6FF] inline-flex items-center cursor-pointer">
                Learn More <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all duration-300"></i>
              </a>
            </div>
            {/* Service 5 */}
            <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 shadow-[0_0_20px_rgba(0,102,255,0.1)] hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] hover:translate-y-[-10px] transition-all duration-500 group">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#00A6FF] to-[#0066FF] p-0.5">
                <div className="w-full h-full rounded-2xl bg-[#121212] flex items-center justify-center">
                  <i className="fas fa-paint-brush text-2xl text-[#00A6FF] group-hover:animate-pulse"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00A6FF] transition-colors duration-300">UI/UX Design</h3>
              <p className="text-gray-300 mb-4">
                Craft intuitive and visually stunning user interfaces with a focus on exceptional user experience, ensuring your digital products stand out.
              </p>
              <a href="#" className="text-[#00A6FF] inline-flex items-center cursor-pointer">
                Learn More <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all duration-300"></i>
              </a>
            </div>
            {/* Service 6 */}
            <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 shadow-[0_0_20px_rgba(0,102,255,0.1)] hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] hover:translate-y-[-10px] transition-all duration-500 group">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#00A6FF] to-[#0066FF] p-0.5">
                <div className="w-full h-full rounded-2xl bg-[#121212] flex items-center justify-center">
                  <i className="fas fa-mobile-alt text-2xl text-[#00A6FF] group-hover:animate-pulse"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00A6FF] transition-colors duration-300">App Development</h3>
              <p className="text-gray-300 mb-4">
                Build robust and scalable mobile applications for iOS and Android platforms, tailored to your specific business needs and user demands.
              </p>
              <a href="#" className="text-[#00A6FF] inline-flex items-center cursor-pointer">
                Learn More <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all duration-300"></i>
              </a>
            </div>
            {/* Service 7 */}
            <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 shadow-[0_0_20px_rgba(0,102,255,0.1)] hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] hover:translate-y-[-10px] transition-all duration-500 group">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#00A6FF] to-[#0066FF] p-0.5">
                <div className="w-full h-full rounded-2xl bg-[#121212] flex items-center justify-center">
                  <i className="fas fa-rocket text-2xl text-[#00A6FF] group-hover:animate-pulse"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00A6FF] transition-colors duration-300">MVP Product Development</h3>
              <p className="text-gray-300 mb-4">
                Launch your innovative ideas quickly with minimum viable product development, focusing on core features to gather early user feedback and iterate efficiently.
              </p>
              <a href="#" className="text-[#00A6FF] inline-flex items-center cursor-pointer">
                Learn More <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all duration-300"></i>
              </a>
            </div>
            {/* Service 8 */}
            <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 shadow-[0_0_20px_rgba(0,102,255,0.1)] hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] hover:translate-y-[-10px] transition-all duration-500 group">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-[#00A6FF] to-[#0066FF] p-0.5">
                <div className="w-full h-full rounded-2xl bg-[#121212] flex items-center justify-center">
                  <i className="fas fa-chart-line text-2xl text-[#00A6FF] group-hover:animate-pulse"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00A6FF] transition-colors duration-300">SEO Services</h3>
              <p className="text-gray-300 mb-4">
                Improve your online visibility and drive organic traffic to your website with comprehensive search engine optimization strategies and implementation.
              </p>
              <a href="#" className="text-[#00A6FF] inline-flex items-center cursor-pointer">
                Learn More <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all duration-300"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0 bg-[#0A0A0A] opacity-90"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A6FF] to-[#0066FF]">
              Get In Touch
            </span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-[#00A6FF]/20 p-6 md:p-10 shadow-[0_0_30px_rgba(0,102,255,0.1)]">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#1A1A1A] border-none rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00A6FF] transition-all duration-300 placeholder-gray-500 text-sm"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#1A1A1A] border-none rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00A6FF] transition-all duration-300 placeholder-gray-500 text-sm"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full bg-[#1A1A1A] border-none rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00A6FF] transition-all duration-300 placeholder-gray-500 text-sm"
                      placeholder="Your Message"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-[#00A6FF] to-[#0066FF] rounded-full text-white font-medium shadow-[0_0_15px_rgba(0,166,255,0.5)] hover:shadow-[0_0_25px_rgba(0,166,255,0.8)] transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Send Message
                  </button>
                  {formStatus === 'success' && (
                    <p className="mt-4 text-green-400 animate-fadeIn">
                      <i className="fas fa-check-circle mr-2"></i>
                      Message sent successfully!
                    </p>
                  )}
                  {formStatus === 'error' && (
                    <p className="mt-4 text-red-400 animate-fadeIn">
                      <i className="fas fa-exclamation-circle mr-2"></i>
                      Message sent successfully!
                    </p>
                  )}
                </div>
              </form>
              <div className="mt-10 pt-8 border-t border-[#00A6FF]/20">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-6 md:mb-0">
                    <p className="text-gray-300 mb-2">
                      <i className="fas fa-envelope text-[#00A6FF] mr-2"></i>
                      kuraparthiajay@gmail.com
                    </p>
                    <p className="text-gray-300">
                      <i className="fas fa-phone text-[#00A6FF] mr-2"></i>
                      8179709428
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/ajaykuraparthi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-[#00A6FF] transition-all duration-300 hover:border-[#00A6FF] hover:shadow-[0_0_15px_rgba(0,166,255,0.5)] cursor-pointer"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ajay-kuraparthi-423a56288/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-[#00A6FF] transition-all duration-300 hover:border-[#00A6FF] hover:shadow-[0_0_15px_rgba(0,166,255,0.5)] cursor-pointer"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 relative bg-[#0A0A0A] border-t border-[#00A6FF]/20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Kuraparthi Ajay. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#home" className="text-gray-400 hover:text-[#00A6FF] transition-colors duration-300 cursor-pointer">Home</a>
              <a href="#about" className="text-gray-400 hover:text-[#00A6FF] transition-colors duration-300 cursor-pointer">About</a>
              <a href="#projects" className="text-gray-400 hover:text-[#00A6FF] transition-colors duration-300 cursor-pointer">Projects</a>
              <a href="#contact" className="text-gray-400 hover:text-[#00A6FF] transition-colors duration-300 cursor-pointer">Contact</a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8">
          <a
            href="#home"
            className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center border border-[#00A6FF]/30 hover:border-[#00A6FF] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,166,255,0.5)] cursor-pointer"
          >
            <i className="fas fa-chevron-up text-[#00A6FF]"></i>
          </a>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
        .animate-gradient { background-size: 200% auto; animation: gradient 5s ease infinite; }
        .typing-animation {
          border-right: 2px solid #00A6FF;
          white-space: nowrap;
          overflow: hidden;
          animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
        }
        @keyframes typing { from { width: 0 } to { width: 100% } }
        @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: #00A6FF } }
      `}</style>
    </div>
  );
}
