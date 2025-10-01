// Project Modal Manager
class ProjectModalManager {
    constructor() {
        this.modal = document.getElementById('project-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalTags = document.getElementById('modal-tags');
        this.modalDescription = document.getElementById('modal-description');
        this.modalFeaturesList = document.getElementById('modal-features-list');
        this.modalTechList = document.getElementById('modal-tech-list');
        this.modalGithub = document.getElementById('modal-github');
        this.modalDemo = document.getElementById('modal-demo');
        this.closeBtn = document.querySelector('.close-modal');
        
        this.projectData = {
            'speed-racer': {
                title: 'AI-Driven Crop Detection System',
                tags: ['Python', 'OpenCV', 'TensorFlow', 'AI/ML'],
                description: 'An innovative agricultural technology solution that leverages computer vision and machine learning to help farmers monitor crop health in real-time. The system can detect diseases, nutrient deficiencies, and pest infestations early, enabling proactive farming decisions.',
                features: [
                    'Real-time crop health analysis using computer vision',
                    'Disease detection with 94% accuracy rate',
                    'Automated pest identification and alert system',
                    'Weather integration for predictive analytics',
                    'Mobile app for field data collection',
                    'Detailed reporting and analytics dashboard',
                    'Multi-crop support (wheat, rice, corn, vegetables)',
                    'Cloud-based processing for scalability'
                ],
                technologies: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'PostgreSQL', 'AWS', 'React Native', 'Docker'],
                githubUrl: '#',
                demoUrl: '#'
            },
            'farmer-support': {
                title: 'Farmer Query Support & Advisory System',
                tags: ['Python', 'NLP', 'Flask', 'MySQL'],
                description: 'An intelligent advisory system that provides personalized farming guidance to farmers through natural language processing. The system answers farming queries, provides weather-based recommendations, and offers expert advice tailored to specific crops and regions.',
                features: [
                    'Natural language query processing',
                    'Personalized farming recommendations',
                    'Weather-based advisory alerts',
                    'Multilingual support (Hindi, English)',
                    'Expert consultation scheduling',
                    'Market price integration',
                    'Crop calendar and planning tools',
                    'SMS and WhatsApp integration'
                ],
                technologies: ['Python', 'NLTK', 'Spacy', 'Flask', 'MySQL', 'Redis', 'Twilio API', 'Bootstrap'],
                githubUrl: '#',
                demoUrl: '#'
            },
            'game-engine': {
                title: 'Custom 2D Game Engine',
                tags: ['C++', 'OpenGL', 'Physics', 'Engine'],
                description: 'A lightweight, high-performance 2D game engine built from scratch in C++. Features include advanced physics simulation, efficient rendering pipeline, audio system, and comprehensive developer tools for rapid game development.',
                features: [
                    'Custom physics engine with collision detection',
                    'OpenGL-based rendering system',
                    'Entity-Component-System architecture',
                    'Audio system with spatial sound',
                    'Built-in scripting support (Lua)',
                    'Level editor with visual tools',
                    'Cross-platform compatibility',
                    'Performance profiling tools'
                ],
                technologies: ['C++', 'OpenGL', 'GLFW', 'OpenAL', 'Lua', 'CMake', 'Box2D', 'ImGui'],
                githubUrl: '#',
                demoUrl: '#'
            }
        };
        
        this.init();
    }

    init() {
        if (!this.modal) return;
        
        this.bindEvents();
    }

    bindEvents() {
        // Project card click handlers
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const viewBtn = card.querySelector('.view-details-btn');
            if (viewBtn) {
                viewBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const projectId = card.getAttribute('data-project');
                    this.openModal(projectId);
                });
            }
        });

        // Close modal handlers
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    openModal(projectId) {
        const project = this.projectData[projectId];
        if (!project) return;

        this.populateModal(project);
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Animate modal entrance
        setTimeout(() => {
            this.modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
    }

    closeModal() {
        this.modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // Reset transform
        this.modal.querySelector('.modal-content').style.transform = 'scale(0.7)';
    }

    populateModal(project) {
        // Set title
        this.modalTitle.textContent = project.title;

        // Set tags
        this.modalTags.innerHTML = '';
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            this.modalTags.appendChild(tagElement);
        });

        // Set description
        this.modalDescription.innerHTML = `<p>${project.description}</p>`;

        // Set features
        this.modalFeaturesList.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            this.modalFeaturesList.appendChild(li);
        });

        // Set technologies
        this.modalTechList.innerHTML = '';
        project.technologies.forEach(tech => {
            const techElement = document.createElement('div');
            techElement.className = 'tech-item';
            techElement.textContent = tech;
            this.modalTechList.appendChild(techElement);
        });

        // Set links
        this.modalGithub.href = project.githubUrl;
        this.modalDemo.href = project.demoUrl;
    }

    // Add entrance animations
    animateModalContent() {
        const elements = this.modal.querySelectorAll('.modal-header, .modal-description, .modal-features, .modal-tech, .modal-links');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Enhanced Project Card Animations
class ProjectCardEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceProjectCards();
        this.addHoverEffects();
    }

    enhanceProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Add tilt effect
            this.addTiltEffect(card);
            
            // Add shine effect
            this.addShineEffect(card);
        });
    }

    addTiltEffect(card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    }

    addShineEffect(card) {
        const shine = document.createElement('div');
        shine.className = 'card-shine';
        shine.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.5s ease;
            pointer-events: none;
        `;
        
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(shine);

        card.addEventListener('mouseenter', () => {
            shine.style.left = '100%';
        });

        card.addEventListener('mouseleave', () => {
            setTimeout(() => {
                shine.style.left = '-100%';
            }, 200);
        });
    }

    addHoverEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const content = card.querySelector('.project-content');
            const overlay = card.querySelector('.project-overlay');
            
            card.addEventListener('mouseenter', () => {
                if (overlay) {
                    overlay.style.opacity = '1';
                    overlay.style.transform = 'translateY(0)';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (overlay) {
                    overlay.style.opacity = '0';
                    overlay.style.transform = 'translateY(20px)';
                }
            });
        });
    }
}

// Initialize when portfolio is loaded
document.addEventListener('portfolioLoaded', () => {
    new ProjectModalManager();
    new ProjectCardEnhancer();
});

// Fallback initialization
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new ProjectModalManager();
        new ProjectCardEnhancer();
    }, 1000);
});
