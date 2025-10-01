// Enhanced Achievements with Flip Cards and Motion Detection
class AchievementFlipCards {
    constructor() {
        this.achievementCards = [];
        this.lastMousePosition = { x: 0, y: 0 };
        this.motionThreshold = 50; // pixels
        this.motionDetectionActive = true;
        this.autoFlipInterval = null;
        
        this.init();
    }

    init() {
        this.setupFlipCards();
        this.bindEvents();
        this.initMotionDetection();
        this.startAutoDemo();
    }

    setupFlipCards() {
        const cards = document.querySelectorAll('.achievement-flip-card');
        
        cards.forEach((card, index) => {
            this.achievementCards.push({
                element: card,
                isFlipped: false,
                lastMotionTime: 0,
                flipCount: 0
            });

            // Add click to flip functionality
            card.addEventListener('click', () => this.flipCard(index));
            
            // Add keyboard support
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.flipCard(index);
                }
            });

            // Add motion detection zone
            card.addEventListener('mouseenter', () => this.onCardHover(index));
            card.addEventListener('mouseleave', () => this.onCardLeave(index));
        });
    }

    bindEvents() {
        // Global mouse movement detection
        document.addEventListener('mousemove', (e) => this.detectMotion(e));
        
        // Pause motion detection when user is typing
        document.addEventListener('keydown', () => {
            this.motionDetectionActive = false;
            setTimeout(() => this.motionDetectionActive = true, 2000);
        });

        // Resume motion detection on mouse activity
        document.addEventListener('mousedown', () => {
            this.motionDetectionActive = true;
        });
    }

    initMotionDetection() {
        // Initialize mouse position
        document.addEventListener('mousemove', (e) => {
            this.lastMousePosition = { x: e.clientX, y: e.clientY };
        }, { once: true });
    }

    detectMotion(event) {
        if (!this.motionDetectionActive) return;

        const currentPosition = { x: event.clientX, y: event.clientY };
        const distance = Math.sqrt(
            Math.pow(currentPosition.x - this.lastMousePosition.x, 2) + 
            Math.pow(currentPosition.y - this.lastMousePosition.y, 2)
        );

        if (distance > this.motionThreshold) {
            this.triggerMotionReaction();
            this.lastMousePosition = currentPosition;
        }
    }

    triggerMotionReaction() {
        this.achievementCards.forEach((cardData, index) => {
            const { element } = cardData;
            const rect = element.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;

            if (isInView && Math.random() > 0.7) { // 30% chance to react
                element.classList.add('motion-detected');
                
                // Remove class after animation
                setTimeout(() => {
                    element.classList.remove('motion-detected');
                }, 600);

                // Sometimes auto-flip on strong motion
                if (Math.random() > 0.8 && !cardData.isFlipped) {
                    setTimeout(() => this.flipCard(index), 300);
                }
            }
        });
    }

    onCardHover(index) {
        const cardData = this.achievementCards[index];
        const emoji = cardData.element.querySelector('.achievement-emoji');
        
        if (emoji) {
            // Enhanced hover effect for emojis
            emoji.style.transform = 'scale(1.1) rotate(10deg)';
            emoji.style.filter = 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.9))';
            
            // Add pulsing effect
            emoji.style.animation = 'floatingIcon 1s ease-in-out infinite, pulseOnHover 0.5s ease-out';
        }

        // Show flip hint more prominently
        const flipIndicator = cardData.element.querySelector('.flip-indicator');
        if (flipIndicator) {
            flipIndicator.style.opacity = '1';
            flipIndicator.style.transform = 'translateX(-50%) translateY(-5px)';
        }
    }

    onCardLeave(index) {
        const cardData = this.achievementCards[index];
        const emoji = cardData.element.querySelector('.achievement-emoji');
        
        if (emoji) {
            // Reset emoji styles
            emoji.style.transform = '';
            emoji.style.filter = '';
            emoji.style.animation = '';
        }

        // Reset flip hint
        const flipIndicator = cardData.element.querySelector('.flip-indicator');
        if (flipIndicator) {
            flipIndicator.style.opacity = '';
            flipIndicator.style.transform = '';
        }
    }

    flipCard(index) {
        const cardData = this.achievementCards[index];
        const { element } = cardData;
        
        cardData.isFlipped = !cardData.isFlipped;
        cardData.flipCount++;
        
        if (cardData.isFlipped) {
            element.classList.add('flipped');
            this.playFlipSound('flip');
            
            // Analytics/feedback
            console.log(`🎉 Achievement card ${index + 1} flipped! (${cardData.flipCount} times)`);
            
            // Add special effect for frequent flippers
            if (cardData.flipCount > 3) {
                this.addSpecialEffect(element, 'frequent-flipper');
            }
        } else {
            element.classList.remove('flipped');
            this.playFlipSound('flip-back');
        }

        // Animate nearby cards slightly
        this.animateNearbyCards(index);
    }

    animateNearbyCards(centerIndex) {
        this.achievementCards.forEach((cardData, index) => {
            if (index !== centerIndex && Math.abs(index - centerIndex) <= 1) {
                const { element } = cardData;
                element.style.transform = 'scale(1.02)';
                element.style.transition = 'transform 0.3s ease';
                
                setTimeout(() => {
                    element.style.transform = '';
                }, 300);
            }
        });
    }

    addSpecialEffect(element, effectType) {
        switch (effectType) {
            case 'frequent-flipper':
                element.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4)';
                setTimeout(() => {
                    element.style.boxShadow = '';
                }, 2000);
                break;
        }
    }

    playFlipSound(type) {
        // Create audio context for sound effects (optional enhancement)
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            if (type === 'flip') {
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            } else {
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
            }
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            // Sound not critical, fail silently
            console.log('🔇 Audio context not available');
        }
    }

    startAutoDemo() {
        // Demonstrate flip functionality after page load
        setTimeout(() => {
            if (this.achievementCards.length > 0) {
                const randomIndex = Math.floor(Math.random() * this.achievementCards.length);
                this.flipCard(randomIndex);
                
                // Flip back after demonstration
                setTimeout(() => {
                    this.flipCard(randomIndex);
                }, 3000);
            }
        }, 5000);

        // Set up periodic subtle motion hints
        this.autoFlipInterval = setInterval(() => {
            this.createSubtleMotionHints();
        }, 15000);
    }

    createSubtleMotionHints() {
        const visibleCards = this.achievementCards.filter(cardData => {
            const rect = cardData.element.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        });

        if (visibleCards.length > 0 && Math.random() > 0.7) {
            const randomCard = visibleCards[Math.floor(Math.random() * visibleCards.length)];
            randomCard.element.classList.add('motion-detected');
            
            setTimeout(() => {
                randomCard.element.classList.remove('motion-detected');
            }, 600);
        }
    }

    // Public methods for external control
    flipAllCards() {
        this.achievementCards.forEach((_, index) => {
            setTimeout(() => this.flipCard(index), index * 200);
        });
    }

    resetAllCards() {
        this.achievementCards.forEach((cardData, index) => {
            if (cardData.isFlipped) {
                setTimeout(() => this.flipCard(index), index * 100);
            }
        });
    }

    destroy() {
        if (this.autoFlipInterval) {
            clearInterval(this.autoFlipInterval);
        }
        this.motionDetectionActive = false;
    }
}

// Enhanced Achievement Slider (for non-flip fallback)
class EnhancedAchievementSlider {
    constructor() {
        this.currentAchievement = 0;
        this.achievementCards = document.querySelectorAll('.achievement-card');
        this.autoSlideInterval = null;
        this.init();
    }

    init() {
        this.updateAchievementSlider();
        this.startAutoSlide();
    }

    updateAchievementSlider() {
        this.achievementCards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === this.currentAchievement) {
                card.classList.add('active');
                
                // Add entrance animation
                card.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 300);
            }
        });
    }

    changeAchievement(direction) {
        this.currentAchievement += direction;
        
        if (this.currentAchievement >= this.achievementCards.length) {
            this.currentAchievement = 0;
        } else if (this.currentAchievement < 0) {
            this.currentAchievement = this.achievementCards.length - 1;
        }
        
        this.updateAchievementSlider();
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.changeAchievement(1);
        }, 4000);
    }

    destroy() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }
}

// Global function for backward compatibility
function changeAchievement(direction) {
    if (window.achievementSlider) {
        window.achievementSlider.changeAchievement(direction);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if flip cards exist, otherwise use regular slider
    const flipCards = document.querySelectorAll('.achievement-flip-card');
    const regularCards = document.querySelectorAll('.achievement-card');
    
    if (flipCards.length > 0) {
        window.achievementFlipCards = new AchievementFlipCards();
        console.log('🎴 Enhanced flip cards initialized!');
    } else if (regularCards.length > 0) {
        window.achievementSlider = new EnhancedAchievementSlider();
        console.log('🎠 Enhanced slider initialized!');
    }

    // Add motion detection and flip functionality
    document.querySelectorAll('.achievement-flip-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.achievement-emoji').classList.add('motion-active');
        });

        card.addEventListener('mouseleave', () => {
            card.querySelector('.achievement-emoji').classList.remove('motion-active');
        });
    });
});

// Add dynamic CSS animations
const achievementStyles = document.createElement('style');
achievementStyles.textContent = `
    @keyframes pulseOnHover {
        0% { transform: scale(1.1) rotate(10deg); }
        50% { transform: scale(1.15) rotate(12deg); }
        100% { transform: scale(1.1) rotate(10deg); }
    }
    
    @keyframes flipCardEntrance {
        0% {
            opacity: 0;
            transform: translateY(50px) rotateY(-30deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) rotateY(0deg);
        }
    }
    
    .achievement-flip-card {
        animation: flipCardEntrance 0.8s ease-out forwards;
    }
    
    .achievement-flip-card:nth-child(1) { animation-delay: 0.1s; }
    .achievement-flip-card:nth-child(2) { animation-delay: 0.3s; }
    .achievement-flip-card:nth-child(3) { animation-delay: 0.5s; }
`;

document.head.appendChild(achievementStyles);
