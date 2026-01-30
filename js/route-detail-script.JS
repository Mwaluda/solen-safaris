// ===================================
// ULTRA-SIMPLE MOBILE-SAFE VERSION
// Zero conflicts, maximum compatibility
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Script loaded');

    // ===================================
    // NAVBAR FUNCTIONALITY
    // ===================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (hamburger && navLinks) {
        // Toggle mobile menu
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🍔 Hamburger clicked');
            
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        });
    }

    // Mobile dropdown toggle
    dropdowns.forEach(function(dropdown) {
        const mainLink = dropdown.querySelector('a');
        if (mainLink) {
            mainLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close menu when clicking dropdown link
    document.querySelectorAll('.dropdown-menu a').forEach(function(link) {
        link.addEventListener('click', function() {
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        });
    });

    // ===================================
    // ACCORDION FUNCTIONALITY
    // ===================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    console.log('📋 Found accordion headers:', accordionHeaders.length);

    accordionHeaders.forEach(function(header) {
        // Use both click and touchend for maximum mobile compatibility
        header.addEventListener('click', handleAccordionClick);
        header.addEventListener('touchend', handleAccordionClick);
    });

    function handleAccordionClick(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('✅ Accordion clicked!');
        
        const item = this.parentElement;
        const wasActive = item.classList.contains('active');
        
        // Close all accordion items
        document.querySelectorAll('.accordion-item').forEach(function(accItem) {
            accItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!wasActive) {
            item.classList.add('active');
            console.log('📂 Accordion opened');
        } else {
            console.log('📁 Accordion closed');
        }
    }

    // ===================================
    // BOOKING MODAL FUNCTIONALITY
    // ===================================
    const modal = document.getElementById('bookingModal');
    const bookingBtns = document.querySelectorAll('.book-climb-btn');
    const closeBtn = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');

    console.log('🎫 Modal found:', !!modal);
    console.log('🔘 Booking buttons found:', bookingBtns.length);

    // Open modal function
    function openModal() {
        console.log('🔓 Opening modal...');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            console.log('✅ Modal opened');
        }
    }

    // Close modal function
    function closeModal() {
        console.log('🔒 Closing modal...');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            console.log('✅ Modal closed');
        }
    }

    // Attach click handlers to all booking buttons
    bookingBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎫 Booking button clicked');
            openModal();
        });
        
        // Also add touchend for mobile
        btn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('📱 Booking button touched');
            openModal();
        });
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    }

    // Close when clicking outside modal content
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // ===================================
    // FORM SUBMISSION WITH EMAILJS
    // ===================================
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📧 Form submitted');
            
            const formData = new FormData(bookingForm);
            
            // Validate email confirmation
            const email = formData.get('email');
            const confirmEmail = formData.get('confirmEmail');
            
            if (email !== confirmEmail) {
                alert('E-postadresserna matchar inte. Vänligen kontrollera och försök igen.');
                return;
            }
            
            // Get route name
            const modalHeading = document.querySelector('.modal-content h2');
            const routeName = modalHeading ? modalHeading.textContent : 'Kilimanjaro Route';
            
            // Prepare template parameters
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
            
            console.log('📦 Sending data:', templateParams);
            
            // Show loading state
            const submitBtn = bookingForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Skickar...';
            submitBtn.disabled = true;
            
            // Check if emailjs is available
            if (typeof emailjs === 'undefined') {
                console.error('❌ EmailJS not loaded!');
                alert('Ett tekniskt fel inträffade. Vänligen kontakta oss direkt.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            // Send email using EmailJS
            emailjs.send('service_lgxxjl5', 'template_cntt96k', templateParams)
                .then(function(response) {
                    console.log('✅ SUCCESS!', response.status);
                    alert('Tack! Din bokningsförfrågan har skickats. Vi återkommer till dig snart.');
                    bookingForm.reset();
                    closeModal();
                })
                .catch(function(error) {
                    console.error('❌ FAILED:', error);
                    alert('Något gick fel. Vänligen försök igen eller kontakta oss direkt.');
                })
                .finally(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // ===================================
    // NAVBAR SCROLL BEHAVIOR
    // ===================================
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // ===================================
    // SMOOTH SCROLL FOR NAVIGATION
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
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

    console.log('✅ All scripts initialized');
});

// ===================================
// PAGE LOAD ANIMATION
// ===================================
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    console.log('🎨 Page fully loaded');
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';