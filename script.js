/* ===================================
   PLAYFLOWER STUDIO - INTERACTIVE JS
   Performance-optimized vanilla JavaScript
   =================================== */

// ========================================
// 1. PARTICLE SYSTEM (Lightweight & Smooth)
// ========================================
class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.particles = [];
        this.maxParticles = 50;
        this.animationFrameId = null;
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.createParticles();
        this.startAnimation();
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            const particle = {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.3,
                element: this.createParticleElement()
            };
            this.particles.push(particle);
        }
    }

    createParticleElement() {
        const el = document.createElement('div');
        el.className = 'particle';
        el.style.width = Math.random() * 3 + 1 + 'px';
        el.style.height = el.style.width;
        this.container.appendChild(el);
        return el;
    }

    update() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Boundary wrapping
            if (p.x < 0) p.x = window.innerWidth;
            if (p.x > window.innerWidth) p.x = 0;
            if (p.y < 0) p.y = window.innerHeight;
            if (p.y > window.innerHeight) p.y = 0;

            p.element.style.left = p.x + 'px';
            p.element.style.top = p.y + 'px';
            p.element.style.opacity = p.opacity;
        });
    }

    startAnimation() {
        const animate = () => {
            this.update();
            this.animationFrameId = requestAnimationFrame(animate);
        };
        animate();
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.isAnimating = false;
        }
    }
}

// ========================================
// 2. CURSOR GLOW EFFECT (Hero Section)
// ========================================
class CursorGlow {
    constructor() {
        this.glow = document.getElementById('cursor-glow');
        this.hero = document.querySelector('.hero');
        this.isInHero = false;
        this.init();
    }

    init() {
        if (!this.hero) return;

        this.hero.addEventListener('mouseenter', () => {
            this.isInHero = true;
            this.glow.style.display = 'block';
        });

        this.hero.addEventListener('mouseleave', () => {
            this.isInHero = false;
            this.glow.style.display = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (this.isInHero) {
                this.glow.style.left = (e.clientX - 75) + 'px';
                this.glow.style.top = (e.clientY - 75) + 'px';
            }
        });
    }
}

// ========================================
// 3. BUTTON EFFECTS (Glint & Magnetic)
// ========================================
class ButtonEffects {
    constructor() {
        this.buttons = document.querySelectorAll('.button, .outline');
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => this.handleMagneticEffect(e, btn));
            btn.addEventListener('mouseleave', (e) => this.resetButton(e, btn));
        });
    }

    handleMagneticEffect(e, btn) {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = (e.clientX - centerX) * 0.2;
        const distY = (e.clientY - centerY) * 0.2;

        btn.style.transform = `translate(${distX}px, ${distY}px)`;

        // Store for gradient effect
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        btn.style.setProperty('--mouse-x', x + '%');
        btn.style.setProperty('--mouse-y', y + '%');
    }

    resetButton(e, btn) {
        btn.style.transform = 'translate(0, 0)';
        btn.style.setProperty('--mouse-x', '50%');
        btn.style.setProperty('--mouse-y', '50%');
    }
}

// ========================================
// 4. HAMBURGER MENU (Mobile Navigation)
// ========================================
class MobileMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburger-menu');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navLinks = this.mobileMenu.querySelectorAll('a');
        this.init();
    }

    init() {
        if (!this.hamburger) return;

        this.hamburger.addEventListener('click', () => this.toggleMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('header')) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        const isActive = this.hamburger.classList.toggle('active');
        this.mobileMenu.classList.toggle('active', isActive);
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.mobileMenu.classList.remove('active');
    }
}

// ========================================
// 5. PERFORMANCE OPTIMIZATION
// ========================================
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Reduce particle count on mobile
        if (window.innerWidth < 768) {
            window.particleSystem.maxParticles = 20;
            window.particleSystem.particles.slice(20).forEach(p => {
                p.element.remove();
            });
            window.particleSystem.particles = window.particleSystem.particles.slice(0, 20);
        }

        // Use passive event listeners for scroll
        window.addEventListener('scroll', () => {}, { passive: true });

        // Reduce animation on low-end devices
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0s');
        }
    }
}

// ========================================
// 6. INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    window.particleSystem = new ParticleSystem('particles-container');

    // Initialize cursor glow
    new CursorGlow();

    // Initialize button effects
    new ButtonEffects();

    // Initialize mobile menu
    new MobileMenu();

    // Optimize performance
    new PerformanceOptimizer();

    console.log('🌸 PlayFlower Studio interactive features loaded!');
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.particleSystem) {
        window.particleSystem.stop();
    }
});
