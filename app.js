window.onload = function () {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Toggle Functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;

    // Function to open mobile menu
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuBtn.classList.add('active');
        body.classList.add('menu-open');

        // Re-initialize icons for dynamically shown content
        setTimeout(() => {
            lucide.createIcons();
        }, 100);
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Toggle mobile menu when hamburger button is clicked
    mobileMenuBtn.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close mobile menu when close button is clicked
    mobileMenuClose.addEventListener('click', closeMobileMenu);

    // Close mobile menu when overlay is clicked
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // Close mobile menu when any navigation link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close menu on escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}