// Car Cursor Logic
const cursor = document.getElementById('cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let lastMouseX = 0;
let lastMouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Calculate direction for car rotation
    const deltaX = mouseX - lastMouseX;
    const deltaY = mouseY - lastMouseY;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    
    cursor.style.transform = `rotate(${angle}deg)`;
    
    lastMouseX = mouseX;
    lastMouseY = mouseY;
});

// Smooth cursor movement
function updateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(updateCursor);
}

updateCursor();

// Navigation and Section Management
let currentSection = 0;
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('nav a');

function showSection(sectionId) {
    // Remove active class from all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Add active class to target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Update current section index
        currentSection = Array.from(sections).indexOf(targetSection);
        
        // Update navigation active state
        updateNavigation();
        
        // Add entrance animation
        setTimeout(() => {
            targetSection.style.animation = 'slideInFromRight 0.8s ease-out';
        }, 100);
    }
}

function updateNavigation() {
    navLinks.forEach((link, index) => {
        link.classList.remove('active');
        if (index === currentSection) {
            link.classList.add('active');
        }
    });
}

// Navigation click handlers
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        showSection(sectionId);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const nextSection = (currentSection + 1) % sections.length;
        const nextSectionId = sections[nextSection].id;
        showSection(nextSectionId);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prevSection = currentSection === 0 ? sections.length - 1 : currentSection - 1;
        const prevSectionId = sections[prevSection].id;
        showSection(prevSectionId);
    }
});

// Projects Slider Logic
let currentProject = 0;
const projectCards = document.querySelectorAll('.project-card');

function updateProjectSlider() {
    projectCards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentProject) {
            card.classList.add('active');
        }
    });
}

function changeProject(direction) {
    currentProject += direction;
    
    if (currentProject >= projectCards.length) {
        currentProject = 0;
    } else if (currentProject < 0) {
        currentProject = projectCards.length - 1;
    }
    
    updateProjectSlider();
}

// Auto-slide projects every 4 seconds
setInterval(() => {
    changeProject(1);
}, 4000);

// Achievements Slider Logic
let currentAchievement = 0;
const achievementCards = document.querySelectorAll('.achievement-card');

function updateAchievementSlider() {
    achievementCards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentAchievement) {
            card.classList.add('active');
        }
    });
}

function changeAchievement(direction) {
    currentAchievement += direction;
    
    if (currentAchievement >= achievementCards.length) {
        currentAchievement = 0;
    } else if (currentAchievement < 0) {
        currentAchievement = achievementCards.length - 1;
    }
    
    updateAchievementSlider();
}

// Auto-slide achievements every 5 seconds
setInterval(() => {
    changeAchievement(1);
}, 5000);

// Parallax Effect for Floating Elements
document.addEventListener('mousemove', (e) => {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const mouseXPercent = (e.clientX / window.innerWidth) * 100;
    const mouseYPercent = (e.clientY / window.innerHeight) * 100;
    
    floatingIcons.forEach((icon, index) => {
        const speed = (index + 1) * 0.5;
        const translateX = (mouseXPercent - 50) * speed * 0.1;
        const translateY = (mouseYPercent - 50) * speed * 0.1;
        
        icon.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${translateX}deg)`;
    });
});

// Skill Items Hover Effect with Sound Simulation
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.animation = 'pulse 0.5s ease-in-out';
        
        // Create a visual "sound wave" effect
        const soundWave = document.createElement('div');
        soundWave.style.position = 'absolute';
        soundWave.style.top = '50%';
        soundWave.style.left = '50%';
        soundWave.style.width = '10px';
        soundWave.style.height = '10px';
        soundWave.style.background = '#00ff41';
        soundWave.style.borderRadius = '50%';
        soundWave.style.transform = 'translate(-50%, -50%)';
        soundWave.style.animation = 'soundWaveExpand 0.6s ease-out forwards';
        soundWave.style.pointerEvents = 'none';
        soundWave.style.zIndex = '1000';
        
        item.style.position = 'relative';
        item.appendChild(soundWave);
        
        setTimeout(() => {
            if (soundWave.parentNode) {
                soundWave.parentNode.removeChild(soundWave);
            }
        }, 600);
    });
});

// Dynamic Background Grid Animation
function animateBackgroundGrid() {
    const gridOverlay = document.querySelector('.grid-overlay');
    let offset = 0;
    
    setInterval(() => {
        offset += 0.5;
        gridOverlay.style.backgroundPosition = `${offset}px ${offset}px`;
    }, 50);
}

animateBackgroundGrid();

// Intersection Observer for Section Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate child elements with stagger effect
            const childElements = entry.target.querySelectorAll('.skill-item, .project-card, .achievement-card, .stat');
            childElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s both`;
                }, index * 100);
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Custom Button Click Effects
const buttons = document.querySelectorAll('button, .social-link, nav a');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('div');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    });
});

// Typewriter Effect for Hero Section
function typewriterEffect() {
    const heroText = document.querySelector('.hero p');
    const text = 'Creating immersive gaming experiences with cutting-edge technology';
    let index = 0;
    
    heroText.innerHTML = '';
    
    function type() {
        if (index < text.length) {
            heroText.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }
    
    setTimeout(type, 1000);
}

// Initialize typewriter effect when page loads
window.addEventListener('load', typewriterEffect);

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Change cursor to a rocket
    cursor.innerHTML = '🚀';
    cursor.style.fontSize = '2rem';
    cursor.style.background = 'transparent';
    
    // Add screen shake
    document.body.style.animation = 'screenShake 2s ease-in-out';
    
    // Show special message
    const message = document.createElement('div');
    message.innerHTML = '🎮 KONAMI CODE ACTIVATED! DEVELOPER MODE ON! 🎮';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = '#ff4757';
    message.style.color = 'white';
    message.style.padding = '2rem';
    message.style.borderRadius = '10px';
    message.style.zIndex = '10001';
    message.style.fontSize = '1.5rem';
    message.style.textAlign = 'center';
    message.style.animation = 'pulse 1s ease-in-out infinite';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
        cursor.innerHTML = '';
        cursor.style.fontSize = '';
        cursor.style.background = '#ff4757';
        document.body.style.animation = '';
    }, 3000);
}

// Performance optimization: Throttle mouse events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Apply throttling to mouse move events for better performance
const throttledMouseMove = throttle((e) => {
    // Additional mouse move effects can be added here
}, 16); // ~60fps

document.addEventListener('mousemove', throttledMouseMove);

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    @keyframes soundWaveExpand {
        0% {
            width: 10px;
            height: 10px;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    @keyframes screenShake {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-10px); }
        20% { transform: translateX(10px); }
        30% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        50% { transform: translateX(-10px); }
        60% { transform: translateX(10px); }
        70% { transform: translateX(-10px); }
        80% { transform: translateX(10px); }
        90% { transform: translateX(-10px); }
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        pointer-events: none;
        animation: rippleAnimation 0.6s ease-out;
    }
    
    @keyframes rippleAnimation {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
    
    .animate-in {
        animation: fadeInScale 0.8s ease-out;
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

document.head.appendChild(style);

// Skill Bar Animation Manager
class SkillBarAnimator {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-fill');
        this.init();
    }

    init() {
        this.observeSkillBars();
    }

    observeSkillBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBar(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.skillBars.forEach(bar => observer.observe(bar));
    }

    animateSkillBar(skillBar) {
        const skillLevel = skillBar.getAttribute('data-skill');
        if (skillLevel) {
            setTimeout(() => {
                skillBar.style.width = `${skillLevel}%`;
            }, Math.random() * 500); // Random delay for stagger effect
        }
    }
}

// Mobile Navigation Manager
class MobileNavManager {
    constructor() {
        this.mobileToggle = document.getElementById('mobile-menu');
        this.navLinks = document.querySelector('.nav-links');
        this.init();
    }

    init() {
        if (!this.mobileToggle || !this.navLinks) return;
        
        this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu when clicking on nav links
        const navItems = this.navLinks.querySelectorAll('a');
        navItems.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.mobileToggle.classList.toggle('active');
        this.navLinks.classList.toggle('active');
        document.body.style.overflow = this.navLinks.classList.contains('active') ? 'hidden' : 'auto';
    }

    closeMobileMenu() {
        this.mobileToggle.classList.remove('active');
        this.navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Enhanced Navigation with Active States
function updateNavigationActiveStates() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const currentLink = document.querySelector(`[data-section="${sectionId}"]`);
                if (currentLink) {
                    currentLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.6,
        rootMargin: '-100px 0px'
    });
    
    sections.forEach(section => observer.observe(section));
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL without triggering page reload
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScrollEffect() {
    const nav = document.getElementById('main-nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Auto-hide/show nav on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', () => {
    // Initialize enhanced components
    new SkillBarAnimator();
    new MobileNavManager();
    
    // Initialize navigation enhancements
    updateNavigationActiveStates();
    initSmoothScrolling();
    initNavbarScrollEffect();
    
    // Show the home section by default
    showSection('home');
    
    // Initialize achievement slider (keeping existing functionality)
    updateAchievementSlider();
    
    // Remove old project slider since we're using grid now
    // updateProjectSlider(); - Commented out
});
