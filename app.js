window.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Set dynamic copyright year
    const yearEl = document.getElementById('copyright-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    initMobileMenu();
    initScrollSpy();
    initScrollToTop();
});

// ── Mobile Menu ──────────────────────────────────────────
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;

    if (!mobileMenuBtn || !mobileMenu || !mobileMenuOverlay) return;

    const openMobileMenu = () => {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuBtn.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
        body.classList.add('menu-open');
        // Re-initialize icons for dynamically shown content
        setTimeout(() => lucide.createIcons(), 50);
    };

    const closeMobileMenu = () => {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        body.classList.remove('menu-open');
    };

    mobileMenuBtn.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
        const isMenuOpen = mobileMenu.classList.contains('active');
        if (!isMenuOpen) return;
        const clickedInsideMenu = mobileMenu.contains(e.target);
        const clickedButton = mobileMenuBtn.contains(e.target);
        if (!clickedInsideMenu && !clickedButton) closeMobileMenu();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// ── Scroll Spy ───────────────────────────────────────────
function initScrollSpy() {
    const sections = document.querySelectorAll('.scroll-target[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, {
        rootMargin: '-10% 0px -60% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

// ── Scroll To Top ─────────────────────────────────────────
function initScrollToTop() {
    const btn = document.getElementById('scroll-top-btn');
    if (!btn) return;

    // Show button after scrolling 400px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Re-init icons after button is revealed (it has a lucide icon)
    lucide.createIcons();
}