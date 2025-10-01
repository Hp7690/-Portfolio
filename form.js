// Contact Form Manager
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = this.form?.querySelector('.submit-btn');
        this.btnText = this.submitBtn?.querySelector('.btn-text');
        this.btnLoader = this.submitBtn?.querySelector('.btn-loader');
        
        this.validationRules = {
            name: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\s]+$/
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            },
            subject: {
                required: true
            },
            message: {
                required: true,
                minLength: 10,
                maxLength: 1000
            }
        };

        this.init();
    }

    init() {
        if (!this.form) return;
        
        this.bindEvents();
        this.setupRealTimeValidation();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add input events for real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    setupRealTimeValidation() {
        const nameInput = this.form.querySelector('#name');
        const emailInput = this.form.querySelector('#email');
        
        // Name input - only letters and spaces
        nameInput?.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        });

        // Email input - basic formatting
        emailInput?.addEventListener('input', (e) => {
            e.target.value = e.target.value.toLowerCase().trim();
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            this.shakeForm();
            return;
        }

        this.setLoadingState(true);
        
        try {
            await this.simulateFormSubmission();
            this.showSuccessMessage();
            this.form.reset();
        } catch (error) {
            this.showErrorMessage('Failed to send message. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    validateForm() {
        let isValid = true;
        const formData = new FormData(this.form);
        
        for (const [fieldName, rules] of Object.entries(this.validationRules)) {
            const value = formData.get(fieldName);
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            
            if (!this.validateFieldValue(fieldName, value, rules)) {
                this.showFieldError(field, this.getErrorMessage(fieldName, value, rules));
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        }
        
        return isValid;
    }

    validateField(field) {
        const fieldName = field.name;
        const value = field.value;
        const rules = this.validationRules[fieldName];
        
        if (!rules) return true;
        
        if (this.validateFieldValue(fieldName, value, rules)) {
            this.clearFieldError(field);
            return true;
        } else {
            this.showFieldError(field, this.getErrorMessage(fieldName, value, rules));
            return false;
        }
    }

    validateFieldValue(fieldName, value, rules) {
        // Required check
        if (rules.required && (!value || value.trim() === '')) {
            return false;
        }
        
        // Skip other validations if field is empty and not required
        if (!value || value.trim() === '') {
            return true;
        }
        
        // Length checks
        if (rules.minLength && value.length < rules.minLength) {
            return false;
        }
        
        if (rules.maxLength && value.length > rules.maxLength) {
            return false;
        }
        
        // Pattern check
        if (rules.pattern && !rules.pattern.test(value)) {
            return false;
        }
        
        return true;
    }

    getErrorMessage(fieldName, value, rules) {
        if (rules.required && (!value || value.trim() === '')) {
            return `${this.getFieldLabel(fieldName)} is required.`;
        }
        
        if (rules.minLength && value.length < rules.minLength) {
            return `${this.getFieldLabel(fieldName)} must be at least ${rules.minLength} characters.`;
        }
        
        if (rules.maxLength && value.length > rules.maxLength) {
            return `${this.getFieldLabel(fieldName)} must be less than ${rules.maxLength} characters.`;
        }
        
        if (rules.pattern && !rules.pattern.test(value)) {
            switch (fieldName) {
                case 'name':
                    return 'Please enter a valid name (letters only).';
                case 'email':
                    return 'Please enter a valid email address.';
                default:
                    return `Please enter a valid ${this.getFieldLabel(fieldName)}.`;
            }
        }
        
        return 'Please enter a valid value.';
    }

    getFieldLabel(fieldName) {
        const labels = {
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message'
        };
        return labels[fieldName] || fieldName;
    }

    showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup?.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        field.classList.add('error');
        formGroup?.classList.add('has-error');
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup?.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        field.classList.remove('error');
        formGroup?.classList.remove('has-error');
    }

    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
            if (this.btnText) this.btnText.style.opacity = '0';
            if (this.btnLoader) this.btnLoader.style.display = 'block';
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
            if (this.btnText) this.btnText.style.opacity = '1';
            if (this.btnLoader) this.btnLoader.style.display = 'none';
        }
    }

    async simulateFormSubmission() {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(() => {
                // Here you would typically send the form data to your backend
                console.log('Form submitted successfully');
                resolve();
            }, 2000);
        });
    }

    showSuccessMessage() {
        const message = this.createNotification('success', 'Message sent successfully! I\'ll get back to you soon.');
        this.showNotification(message);
    }

    showErrorMessage(text) {
        const message = this.createNotification('error', text);
        this.showNotification(message);
    }

    createNotification(type, text) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : '❌'}</span>
                <span class="notification-text">${text}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00ff41' : '#ff4757'};
            color: ${type === 'success' ? '#0f0f23' : '#fff'};
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
            font-family: 'Space Grotesk', sans-serif;
        `;
        
        return notification;
    }

    showNotification(notification) {
        document.body.appendChild(notification);
        
        // Trigger entrance animation
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    shakeForm() {
        this.form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            this.form.style.animation = '';
        }, 500);
    }
}

// Form Animation Enhancements
class FormAnimationEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.addFormAnimations();
        this.addInputAnimations();
    }

    addFormAnimations() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Add staggered animation to form fields
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                group.style.transition = 'all 0.6s ease';
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    addInputAnimations() {
        const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
        
        inputs.forEach(input => {
            // Add focus animations
            input.addEventListener('focus', () => {
                const formGroup = input.closest('.form-group');
                formGroup?.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                const formGroup = input.closest('.form-group');
                formGroup?.classList.remove('focused');
            });

            // Add typing effect
            input.addEventListener('input', () => {
                const formGroup = input.closest('.form-group');
                if (input.value) {
                    formGroup?.classList.add('has-value');
                } else {
                    formGroup?.classList.remove('has-value');
                }
            });
        });
    }
}

// Add CSS for animations
const formStyles = document.createElement('style');
formStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .form-group {
        position: relative;
    }
    
    .form-group.focused label {
        color: #00ff41;
        transform: scale(0.9);
    }
    
    .form-group.has-error input,
    .form-group.has-error select,
    .form-group.has-error textarea {
        border-color: #ff4757;
        box-shadow: 0 0 10px rgba(255, 71, 87, 0.3);
    }
    
    .error-message {
        color: #ff4757;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        display: none;
        animation: slideInError 0.3s ease;
    }
    
    @keyframes slideInError {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .submit-btn.loading .btn-loader {
        width: 20px;
        height: 20px;
        border: 2px solid transparent;
        border-top: 2px solid #0f0f23;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

document.head.appendChild(formStyles);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContactFormManager();
    new FormAnimationEnhancer();
});
