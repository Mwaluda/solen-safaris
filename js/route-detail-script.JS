// ===================================
// NAVBAR FUNCTIONALITY (from contact.html)
// ===================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.dropdown');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking X (::before pseudo element area)
if (navLinks) {
    navLinks.addEventListener('click', (e) => {
        const rect = navLinks.getBoundingClientRect();
        const closeButtonArea = {
            left: rect.right - 60,
            right: rect.right - 20,
            top: rect.top + 20,
            bottom: rect.top + 60
        };
        
        if (e.clientX >= closeButtonArea.left && e.clientX <= closeButtonArea.right &&
            e.clientY >= closeButtonArea.top && e.clientY <= closeButtonArea.bottom) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
}

// Mobile dropdown toggle - prevent redirect and show submenu
dropdowns.forEach(dropdown => {
    const mainLink = dropdown.querySelector('a');
    
    mainLink.addEventListener('click', (e) => {
        // On mobile, prevent redirect and toggle dropdown
        if (window.innerWidth <= 992) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger && navLinks && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Close menu when clicking dropdown link
document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navLinks) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
});

// ===================================
// ACCORDION FUNCTIONALITY
// ===================================
function toggleAccordion(header) {
    console.log('Accordion clicked!'); // Debug log
    const item = header.parentElement;
    const wasActive = item.classList.contains('active');
    
    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(accItem => {
        accItem.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!wasActive) {
        item.classList.add('active');
        console.log('Accordion opened'); // Debug log
    } else {
        console.log('Accordion closed'); // Debug log
    }
}

// ===================================
// BOOKING MODAL FUNCTIONALITY
// ===================================
function openBookingForm() {
    console.log('Opening booking form...'); // Debug log
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Force the transition
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        console.log('Booking form opened'); // Debug log
    } else {
        console.error('Modal not found!'); // Debug log
    }
}

function closeBookingForm() {
    console.log('Closing booking form...'); // Debug log
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }, 300);
        console.log('Booking form closed'); // Debug log
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeBookingForm();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('bookingModal');
        if (modal && modal.classList.contains('show')) {
            closeBookingForm();
        }
    }
});

// ===================================
// FORM SUBMISSION WITH EMAILJS
// ===================================
function handleBookingSubmit(event) {
    event.preventDefault();
    console.log('Form submitted'); // Debug log
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validate email confirmation
    const email = formData.get('email');
    const confirmEmail = formData.get('confirmEmail');
    
    if (email !== confirmEmail) {
        alert('E-postadresserna matchar inte. Vänligen kontrollera och försök igen.');
        return;
    }
    
    // Get route name from modal heading or default to page title
    const modalHeading = document.querySelector('.modal-content h2');
    const routeName = modalHeading ? modalHeading.textContent : 'Kilimanjaro Route';
    
    // Prepare template parameters for EmailJS
    const templateParams = {
        route_name: routeName,
        days: formData.get('days') || 'Inte specificerat',
        people: formData.get('people'),
        first_name: formData.get('firstName'),
        last_name: formData.get('lastName'),
        email: formData.get('email'),
        preferred_date: formData.get('date') || 'Inte specificerat',
        message: formData.get('message')
    };
    
    console.log('Booking data:', templateParams); // Debug log
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Skickar...';
    submitBtn.disabled = true;
    
    // Send email using EmailJS
    emailjs.send('service_lgxxjl5', 'template_cntt96k', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Tack! Din bokningsförfrågan har skickats. Vi återkommer till dig snart.');
            form.reset();
            closeBookingForm();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Något gick fel. Vänligen försök igen eller kontakta oss direkt.');
        })
        .finally(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

// ===================================
// SMOOTH SCROLL FOR NAVIGATION
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
// NAVBAR SCROLL BEHAVIOR
// ===================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for styling
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ===================================
// PAGE LOAD ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log('Page loaded'); // Debug log
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';

// ===================================
// LANGUAGE SELECTOR FUNCTION
// ===================================
function translatePage(languageCode) {
    if (!languageCode || languageCode === 'sv') {
        localStorage.removeItem('selectedLanguage');
        if (window.location.search.includes('lang=')) {
            window.location.href = window.location.pathname;
        }
        return;
    }
    
    localStorage.setItem('selectedLanguage', languageCode);
    
    const currentUrl = window.location.origin + window.location.pathname;
    const translateUrl = `https://translate.google.com/translate?sl=sv&tl=${languageCode}&u=${encodeURIComponent(currentUrl)}`;
    window.location.href = translateUrl;
}

// ===================================
// INITIALIZATION
// ===================================
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded'); // Debug log
    
    // Set saved language
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const languageSelect = document.getElementById('language-select');
    
    if (languageSelect && savedLanguage) {
        languageSelect.value = savedLanguage;
    }
    
    // Check if modal exists
    const modal = document.getElementById('bookingModal');
    if (modal) {
        console.log('Booking modal found'); // Debug log
    } else {
        console.log('Booking modal NOT found - this is OK if not on a route detail page'); // Debug log
    }
    
    // Check if accordion exists
    const accordion = document.querySelector('.accordion');
    if (accordion) {
        console.log('Accordion found'); // Debug log
    } else {
        console.log('Accordion NOT found - this is OK if not on a route detail page'); // Debug log
    }
});