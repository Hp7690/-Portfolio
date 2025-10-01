// Loading Screen Animation
class LoadingManager {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressPercentage = document.querySelector('.progress-percentage');
        this.loadingSteps = [
            'Initializing systems...',
            'Loading assets...',
            'Rendering components...',
            'Optimizing performance...',
            'Finalizing setup...',
            'Ready to launch!'
        ];
        this.currentStep = 0;
        this.progress = 0;
    }

    init() {
        if (!this.loadingScreen) return;
        
        this.startLoading();
    }

    startLoading() {
        const loadingText = document.querySelector('.loading-text p');
        let stepInterval = setInterval(() => {
            if (this.currentStep < this.loadingSteps.length) {
                loadingText.textContent = this.loadingSteps[this.currentStep];
                this.currentStep++;
            } else {
                clearInterval(stepInterval);
            }
        }, 800);

        // Animate progress bar
        this.animateProgress();
    }

    animateProgress() {
        const duration = 4000; // 4 seconds
        const steps = 100;
        const stepDuration = duration / steps;
        
        let currentProgress = 0;
        
        const progressInterval = setInterval(() => {
            if (currentProgress <= 100) {
                // Smooth easing function
                const easedProgress = this.easeOutCubic(currentProgress / 100) * 100;
                
                this.progressFill.style.width = `${easedProgress}%`;
                this.progressPercentage.textContent = `${Math.round(easedProgress)}%`;
                
                currentProgress += 1;
            } else {
                clearInterval(progressInterval);
                setTimeout(() => this.hideLoading(), 500);
            }
        }, stepDuration);
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    hideLoading() {
        this.loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Trigger entrance animations for main content
            this.triggerEntranceAnimations();
        }, 1000);
    }

    triggerEntranceAnimations() {
        const mainSections = document.querySelectorAll('.section');
        const nav = document.querySelector('nav');
        
        // Add entrance class to nav
        if (nav) {
            nav.style.opacity = '0';
            nav.style.transform = 'translateY(-50px)';
            
            setTimeout(() => {
                nav.style.transition = 'all 0.8s ease';
                nav.style.opacity = '1';
                nav.style.transform = 'translateY(0)';
            }, 100);
        }

        // Add entrance animations to sections
        mainSections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                section.style.transition = 'all 0.8s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });

        // Dispatch custom event for other components
        document.dispatchEvent(new CustomEvent('portfolioLoaded'));
    }

    // Simulate resource loading (for demonstration)
    simulateResourceLoading() {
        return new Promise((resolve) => {
            const resources = [
                'images/hero-bg.jpg',
                'images/project1.jpg', 
                'images/project2.jpg',
                'scripts/animations.js',
                'styles/components.css'
            ];
            
            let loadedCount = 0;
            
            resources.forEach((resource, index) => {
                setTimeout(() => {
                    loadedCount++;
                    const progress = (loadedCount / resources.length) * 100;
                    this.updateProgress(progress);
                    
                    if (loadedCount === resources.length) {
                        resolve();
                    }
                }, (index + 1) * 300);
            });
        });
    }

    updateProgress(progress) {
        if (this.progressFill && this.progressPercentage) {
            this.progressFill.style.width = `${progress}%`;
            this.progressPercentage.textContent = `${Math.round(progress)}%`;
        }
    }
}

// Initialize loading manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loadingManager = new LoadingManager();
    loadingManager.init();
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen && loadingScreen.style.display !== 'none') {
            // Restart loading if page becomes visible again
            const loadingManager = new LoadingManager();
            loadingManager.init();
        }
    }
});

// Preload critical resources
const preloadCriticalResources = () => {
    const criticalResources = [
        'components/modal.css',
        'components/timeline.css',
        'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap'
    ];

    criticalResources.forEach(resource => {
        if (resource.endsWith('.css') || resource.includes('fonts.googleapis')) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = resource;
            document.head.appendChild(link);
        }
    });
};

// Initialize preloading
preloadCriticalResources();
