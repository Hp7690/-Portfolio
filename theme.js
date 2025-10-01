// Theme Manager
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle?.querySelector('.theme-icon');
        this.currentTheme = 'dark';
        this.themes = {
            dark: {
                primary: '#00ff41',
                secondary: '#ff4757',
                accent: '#5352ed',
                background: 'linear-gradient(45deg, #0f0f23, #1a1a2e, #16213e)',
                surface: 'rgba(26, 26, 46, 0.9)',
                text: '#ffffff',
                textSecondary: '#cccccc',
                border: '#00ff41',
                icon: '🌙'
            },
            light: {
                primary: '#2d5a87',
                secondary: '#e74c3c',
                accent: '#9b59b6',
                background: 'linear-gradient(45deg, #f8f9fa, #e9ecef, #dee2e6)',
                surface: 'rgba(255, 255, 255, 0.95)',
                text: '#2c3e50',
                textSecondary: '#6c757d',
                border: '#2d5a87',
                icon: '☀️'
            }
        };
        
        this.init();
    }

    init() {
        if (!this.themeToggle) return;
        
        this.loadSavedTheme();
        this.bindEvents();
        this.createThemeStyles();
    }

    bindEvents() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('portfolio-theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme && this.themes[savedTheme]) {
            this.setTheme(savedTheme);
        } else {
            // Use system preference
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme, true);
    }

    setTheme(themeName, animate = false) {
        if (!this.themes[themeName]) return;
        
        this.currentTheme = themeName;
        const theme = this.themes[themeName];
        
        if (animate) {
            this.animateThemeTransition(theme);
        } else {
            this.applyTheme(theme);
        }
        
        // Update icon
        if (this.themeIcon) {
            this.themeIcon.textContent = theme.icon;
        }
        
        // Save preference
        localStorage.setItem('portfolio-theme', themeName);
        
        // Update meta theme-color
        this.updateMetaThemeColor(theme);
        
        // Dispatch theme change event
        document.dispatchEvent(new CustomEvent('themeChange', {
            detail: { theme: themeName, colors: theme }
        }));
    }

    animateThemeTransition(theme) {
        // Create overlay for smooth transition
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${theme.background};
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // Animate overlay in
        requestAnimationFrame(() => {
            overlay.style.opacity = '0.5';
        });
        
        setTimeout(() => {
            this.applyTheme(theme);
            
            // Animate overlay out
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }, 150);
    }

    applyTheme(theme) {
        const root = document.documentElement;
        
        // Apply CSS custom properties
        root.style.setProperty('--color-primary', theme.primary);
        root.style.setProperty('--color-secondary', theme.secondary);
        root.style.setProperty('--color-accent', theme.accent);
        root.style.setProperty('--color-background', theme.background);
        root.style.setProperty('--color-surface', theme.surface);
        root.style.setProperty('--color-text', theme.text);
        root.style.setProperty('--color-text-secondary', theme.textSecondary);
        root.style.setProperty('--color-border', theme.border);
        
        // Update body class
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${this.currentTheme}`);
        
        // Update specific elements
        this.updateElementStyles(theme);
    }

    updateElementStyles(theme) {
        // Update background
        document.body.style.background = theme.background;
        
        // Update navigation
        const nav = document.querySelector('nav');
        if (nav) {
            nav.style.background = `rgba(${this.hexToRgb(theme.surface.replace(/rgba?\(|\)|[\d\s,%.]/g, ''))}, 0.9)`;
        }
        
        // Update sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.color = theme.text;
        });
        
        // Update cards and components
        this.updateComponentStyles(theme);
    }

    updateComponentStyles(theme) {
        // Update timeline
        const timelineContent = document.querySelectorAll('.timeline-content');
        timelineContent.forEach(content => {
            content.style.background = `linear-gradient(145deg, ${theme.surface}, ${theme.surface})`;
            content.style.borderColor = theme.border;
        });
        
        // Update project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.style.background = theme.surface;
            card.style.borderColor = theme.border;
            card.style.color = theme.text;
        });
        
        // Update skill bars
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            bar.style.borderColor = theme.border;
        });
        
        // Update modal
        const modal = document.querySelector('.modal-content');
        if (modal) {
            modal.style.background = `linear-gradient(145deg, ${theme.surface}, ${theme.surface})`;
            modal.style.borderColor = theme.secondary;
        }
    }

    createThemeStyles() {
        const themeStyles = document.createElement('style');
        themeStyles.id = 'theme-styles';
        themeStyles.textContent = `
            .theme-toggle {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1001;
                background: var(--color-surface, rgba(26, 26, 46, 0.9));
                border: 2px solid var(--color-primary, #00ff41);
                border-radius: 50%;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 1.2rem;
                backdrop-filter: blur(10px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            .theme-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 0 20px var(--color-primary, #00ff41);
            }
            
            .theme-toggle:active {
                transform: scale(0.95);
            }
            
            /* Theme-specific styles */
            .theme-light {
                color: var(--color-text, #2c3e50);
            }
            
            .theme-light .glitch-text {
                color: var(--color-primary, #2d5a87) !important;
            }
            
            .theme-light .hero h2 {
                color: var(--color-secondary, #e74c3c) !important;
            }
            
            .theme-light nav a {
                color: var(--color-text, #2c3e50) !important;
            }
            
            .theme-light nav a:hover {
                border-color: var(--color-primary, #2d5a87) !important;
                box-shadow: 0 0 10px var(--color-primary, #2d5a87) !important;
            }
            
            .theme-light .section h2 {
                color: var(--color-secondary, #e74c3c) !important;
            }
            
            .theme-light .section h2::after {
                background: var(--color-primary, #2d5a87) !important;
            }
            
            /* Smooth transitions */
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            }
            
            .no-transition * {
                transition: none !important;
            }
        `;
        
        // Remove existing theme styles
        const existingStyles = document.getElementById('theme-styles');
        if (existingStyles) {
            existingStyles.remove();
        }
        
        document.head.appendChild(themeStyles);
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.content = theme.primary;
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
            '0, 0, 0';
    }

    // Public methods for external components
    getCurrentTheme() {
        return this.currentTheme;
    }

    getThemeColors() {
        return this.themes[this.currentTheme];
    }
}

// Advanced Theme Effects
class ThemeEffectsManager {
    constructor(themeManager) {
        this.themeManager = themeManager;
        this.init();
    }

    init() {
        this.listenForThemeChanges();
        this.addParticleEffects();
    }

    listenForThemeChanges() {
        document.addEventListener('themeChange', (e) => {
            const { theme, colors } = e.detail;
            this.updateParticleColors(colors);
            this.updateCustomCursor(colors);
            this.updateGlitchEffects(colors);
        });
    }

    updateParticleColors(colors) {
        const particles = document.querySelector('.particles');
        if (particles) {
            const particleColor1 = this.hexToRgba(colors.primary, 0.5);
            const particleColor2 = this.hexToRgba(colors.secondary, 0.5);
            const particleColor3 = this.hexToRgba(colors.accent, 0.5);
            
            particles.style.background = `
                radial-gradient(2px 2px at 20px 30px, ${particleColor1}, transparent),
                radial-gradient(2px 2px at 40px 70px, ${particleColor2}, transparent),
                radial-gradient(1px 1px at 90px 40px, ${particleColor3}, transparent),
                radial-gradient(1px 1px at 130px 80px, ${particleColor1}, transparent),
                radial-gradient(2px 2px at 160px 30px, ${particleColor2}, transparent)
            `;
        }
    }

    updateCustomCursor(colors) {
        const cursor = document.getElementById('cursor');
        if (cursor) {
            cursor.style.background = colors.secondary;
        }
    }

    updateGlitchEffects(colors) {
        const style = document.createElement('style');
        style.textContent = `
            .glitch-text::before {
                color: ${colors.secondary} !important;
            }
            
            .glitch-text::after {
                color: ${colors.accent} !important;
            }
        `;
        document.head.appendChild(style);
        
        // Remove after animation
        setTimeout(() => style.remove(), 1000);
    }

    addParticleEffects() {
        // Add floating particles that respond to theme
        const particleContainer = document.createElement('div');
        particleContainer.className = 'theme-particles';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Create individual particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'theme-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--color-primary);
                border-radius: 50%;
                opacity: 0.3;
                animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleContainer.appendChild(particle);
        }
        
        document.body.appendChild(particleContainer);
        
        // Add animation
        const particleStyles = document.createElement('style');
        particleStyles.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.3;
                }
                90% {
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(particleStyles);
    }

    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
}

// Initialize theme system
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
    const themeEffects = new ThemeEffectsManager(themeManager);
    
    // Make theme manager globally available
    window.themeManager = themeManager;
});
