 const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking X (::before pseudo element area)
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
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
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
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        });
    });