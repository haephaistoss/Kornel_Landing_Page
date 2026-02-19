/**
 * Pályázat Management Landing Page
 * Main JavaScript functionality
 */

(function() {
    'use strict';

    // ===========================================
    // DOM Elements
    // ===========================================
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navBackdrop = document.querySelector('.nav-backdrop');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');
    const statNumbers = document.querySelectorAll('.stat-number');

    // ===========================================
    // Mobile Navigation Toggle
    // ===========================================
    function toggleMobileNav() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navBackdrop.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileNav() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for navigation
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // Close menu when clicking backdrop
    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeMobileNav);
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle')) {
            closeMobileNav();
        }
    });

    // ===========================================
    // Navbar Scroll Effect
    // ===========================================
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ===========================================
    // Smooth Scroll for Navigation Links
    // ===========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================================
    // Statistics Counter Animation
    // ===========================================
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    // Intersection Observer for counter animation
    function setupCounterAnimation() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    if (statNumbers.length > 0) {
        setupCounterAnimation();
    }

    // ===========================================
    // Contact Form Handling
    // ===========================================
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Kérjük, töltse ki az összes kötelező mezőt!', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Kérjük, adjon meg egy érvényes e-mail címet!', 'error');
                return;
            }

            // Simulate form submission (replace with actual API call)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Küldés...';
            submitButton.disabled = true;

            // Simulate API delay
            setTimeout(() => {
                showNotification('Köszönjük üzenetét! Hamarosan felvesszük Önnel a kapcsolatot.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // ===========================================
    // Notification System
    // ===========================================
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close" aria-label="Bezárás">&times;</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
            color: white;
            border-radius: 12px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 9999;
            animation: slideUp 0.3s ease;
            max-width: 90%;
        `;

        // Add animation keyframes
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translate(-50%, 20px);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Style close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Close handlers
        closeBtn.addEventListener('click', () => notification.remove());
        setTimeout(() => notification.remove(), 5000);
    }

    // ===========================================
    // Intersection Observer for Animations
    // ===========================================
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .about-text, .contact-form-container, .contact-info');

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Only run scroll animations if user hasn't requested reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setupScrollAnimations();
    }

    // ===========================================
    // Active Navigation Link Highlighting
    // ===========================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    // ===========================================
    // Initialize
    // ===========================================
    handleScroll();
    updateActiveNavLink();

})();
