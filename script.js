// Toggle Mobile Menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Toggle body scroll
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class based on element type
            if (entry.target.classList.contains('section-title')) {
                entry.target.classList.add('fade-in');
            } else if (entry.target.classList.contains('feature-card') || 
                       entry.target.classList.contains('item-card') || 
                       entry.target.classList.contains('category-card')) {
                // These elements already have animation classes added by CSS with delays
                // We just need to make sure they're visible
                entry.target.style.opacity = '1';
            }
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Observe section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe popular items
    const itemCards = document.querySelectorAll('.item-card');
    itemCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe menu categories
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage.includes(linkHref.replace('.html', '')) && linkHref !== 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '15px 0';
        }
        
        lastScroll = currentScroll;
    });
    
    // Add hover effect to menu item cards
    const menuItemCards = document.querySelectorAll('.menu-item-card');
    menuItemCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
});

// Form validation for contact page
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // In a real application, you would send the form data to a server here
        // For this example, we'll just show a success message
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.style.display = 'block';
            formMessage.className = 'form-message success';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// FAQ toggle functionality
const faqQuestions = document.querySelectorAll('.faq-question');
if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const toggleIcon = this.querySelector('.faq-toggle i');
            
            // Close other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                    item.querySelector('.faq-toggle i').classList.remove('fa-chevron-up');
                    item.querySelector('.faq-toggle i').classList.add('fa-chevron-down');
                }
            });
            
            // Toggle current FAQ item
            if (faqItem.classList.contains('active')) {
                faqItem.classList.remove('active');
                answer.style.maxHeight = null;
                toggleIcon.classList.remove('fa-chevron-up');
                toggleIcon.classList.add('fa-chevron-down');
            } else {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggleIcon.classList.remove('fa-chevron-down');
                toggleIcon.classList.add('fa-chevron-up');
            }
        });
    });
}