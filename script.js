document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollAnimations();
    initNavigationHighlight();
    initMenuCardHover();
});

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;

    const setBodyScroll = (enabled) => {
        document.body.style.overflow = enabled ? 'auto' : 'hidden';
    };

    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active', isActive);
        setBodyScroll(!isActive);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            setBodyScroll(true);
        });
    });
}

function initScrollAnimations() {
    if (typeof IntersectionObserver !== 'function') return;

    const observer = new IntersectionObserver((entries, observerRef) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('fade-in');
            observerRef.unobserve(entry.target);
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    const selectors = ['.section-title', '.feature-card', '.menu-item-card', '.category-card'];
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => observer.observe(el));
    });

    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const scrolled = currentScroll > 100;

        navbar.style.boxShadow = scrolled ? '0 5px 20px rgba(0, 0, 0, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = scrolled ? '10px 0' : '15px 0';
    }, { passive: true });
}

function initNavigationHighlight() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const normalized = href.replace('.html', '');
        const isActive = href === currentPage ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage.includes(normalized) && href !== 'index.html');

        link.classList.toggle('active', isActive);
    });
}

function initMenuCardHover() {
    document.querySelectorAll('.menu-item-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
}