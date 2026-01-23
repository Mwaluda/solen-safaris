// ===================================
// MOBILE MENU TOGGLE
// ===================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#" or invalid
        if (!href || href === '#' || href.length <= 1) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 90;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// NAVBAR SCROLL EFFECT - HIDE ON SCROLL DOWN
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// FADE IN ANIMATION ON SCROLL
// ===================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// Apply fade-in to intro text
const introTexts = document.querySelectorAll('.intro-text');
introTexts.forEach((text, index) => {
    text.style.opacity = '0';
    text.style.transform = 'translateY(20px)';
    text.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    fadeInObserver.observe(text);
});

// Apply fade-in to about content
const aboutContent = document.querySelector('.about-content');
if (aboutContent) {
    aboutContent.style.opacity = '0';
    aboutContent.style.transform = 'translateX(30px)';
    aboutContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(aboutContent);
}

// ===================================
// MORE DETAILS BUTTON FUNCTIONALITY
// ===================================
const moreDetailsButtons = document.querySelectorAll('.more-details-btn');
moreDetailsButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.service-card');
        const serviceName = card.querySelector('h3').textContent;
        
        // Create a simple modal or alert (you can customize this)
        showServiceModal(serviceName);
    });
});

function showServiceModal(serviceName) {
    // Simple notification
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        text-align: center;
        max-width: 500px;
        animation: slideIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <h3 style="font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 20px; color: #2c3e50;">${serviceName}</h3>
        <p style="margin-bottom: 25px; line-height: 1.6; color: #7f8c8d;">Thank you for your interest in ${serviceName}! Please contact us for detailed information about this tour package.</p>
        <button onclick="this.parentElement.remove(); document.querySelector('.modal-overlay').remove()" style="background: #2c3e50; color: white; border: none; padding: 12px 30px; border-radius: 50px; cursor: pointer; font-size: 15px;">Close</button>
    `;
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
    `;
    
    overlay.addEventListener('click', () => {
        modal.remove();
        overlay.remove();
    });
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -45%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// HERO PARALLAX EFFECT
// ===================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ===================================
// PAGE LOAD ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log('Solen Safaris website loaded successfully! 🌍✨');
});

// Set initial body opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';

// ===================================
// LANGUAGE SELECTOR FUNCTION
// ===================================
function translatePage(languageCode) {
    if (!languageCode || languageCode === 'sv') {
        // Remove any saved language and reload for Swedish
        localStorage.removeItem('selectedLanguage');
        if (window.location.search.includes('lang=')) {
            window.location.href = window.location.pathname;
        }
        return;
    }
    
    // Save language preference
    localStorage.setItem('selectedLanguage', languageCode);
    
    // Redirect to Google Translate (most reliable method)
    const currentUrl = window.location.origin + window.location.pathname;
    const translateUrl = `https://translate.google.com/translate?sl=sv&tl=${languageCode}&u=${encodeURIComponent(currentUrl)}`;
    window.location.href = translateUrl;
}

// Restore language preference on load (but don't auto-translate)
window.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const languageSelect = document.getElementById('language-select');
    
    if (languageSelect && savedLanguage) {
        languageSelect.value = savedLanguage;
        // Note: We don't auto-translate here to prevent blinking/flickering
    }
});