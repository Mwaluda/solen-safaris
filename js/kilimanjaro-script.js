// ===================================
// MOBILE MENU FUNCTIONALITY
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
    if (hamburger && navLinks) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
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

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// ROUTE DETAILS FUNCTION
// ===================================
function showRouteDetails(routeName) {
    const routeInfo = {
        machame: {
            name: 'Machame Route',
            duration: '6-7 days',
            difficulty: 'Moderate to Challenging',
            description: 'Known as the "Whiskey Route," this is one of the most popular and scenic routes. It offers excellent acclimatization and stunning views.',
            highlights: [
                'Diverse scenery from rainforest to alpine desert',
                'Good acclimatization profile',
                'High success rate',
                'Beautiful views of Kibo peak'
            ]
        },
        marangu: {
            name: 'Marangu Route',
            duration: '5-6 days',
            difficulty: 'Moderate',
            description: 'Also called the "Coca-Cola Route," it\'s the only route with hut accommodation. It\'s considered easier but has a lower success rate due to faster ascent.',
            highlights: [
                'Hut accommodation instead of camping',
                'Shorter duration',
                'Gradual, steady climb',
                'Popular with first-time climbers'
            ]
        },
        lemosho: {
            name: 'Lemosho Route',
            duration: '7-8 days',
            difficulty: 'Moderate',
            description: 'One of the newer routes offering spectacular scenery and excellent acclimatization. It approaches from the west and joins the Machame route.',
            highlights: [
                'Remote and pristine wilderness',
                'Excellent acclimatization',
                'High success rate',
                'Less crowded than other routes'
            ]
        },
        umbwe: {
            name: 'Umbwe Route',
            duration: '5-6 days',
            difficulty: 'Very Challenging',
            description: 'The most direct and steepest route on the mountain. Recommended only for experienced trekkers with good acclimatization.',
            highlights: [
                'Shortest and steepest route',
                'For experienced climbers',
                'Less crowded',
                'Dramatic and scenic'
            ]
        },
        rongai: {
            name: 'Rongai Route',
            difficulty: 'Moderate',
            duration: '6-7 days',
            description: 'The only route approaching from the north. It offers a more gradual ascent and is ideal during the rainy season as it\'s on the drier side of the mountain.',
            highlights: [
                'Approaches from the north',
                'Good for rainy season',
                'Less crowded',
                'Gradual ascent with good views'
            ]
        },
        northern: {
            name: 'Northern Circuit Route',
            duration: '8-9 days',
            difficulty: 'Moderate',
            description: 'The longest route with the highest success rate. It offers 360-degree views of the mountain and excellent acclimatization.',
            highlights: [
                'Highest success rate',
                'Most scenic route',
                '360-degree mountain views',
                'Excellent acclimatization'
            ]
        }
    };

    const route = routeInfo[routeName];
    if (route) {
        const modal = document.createElement('div');
        modal.className = 'route-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>${route.name}</h2>
                <div class="route-details-grid">
                    <div class="detail-item">
                        <strong>Duration:</strong> ${route.duration}
                    </div>
                    <div class="detail-item">
                        <strong>Difficulty:</strong> ${route.difficulty}
                    </div>
                </div>
                <p class="route-description">${route.description}</p>
                <h3>Highlights:</h3>
                <ul class="route-highlights">
                    ${route.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
                <button class="modal-cta" onclick="window.location.href='index.html#contact'">Book This Route</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Add styles for modal
        const style = document.createElement('style');
        style.textContent = `
            .route-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }

            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                animation: fadeIn 0.3s ease;
            }

            .modal-content {
                position: relative;
                background: white;
                padding: 40px;
                border-radius: 15px;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }

            .modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #7f8c8d;
                transition: color 0.3s;
            }

            .modal-close:hover {
                color: #2c3e50;
            }

            .modal-content h2 {
                font-family: 'Playfair Display', serif;
                font-size: 2rem;
                margin-bottom: 20px;
                color: #2c3e50;
            }

            .route-details-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin-bottom: 20px;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 10px;
            }

            .detail-item {
                font-size: 0.95rem;
            }

            .detail-item strong {
                display: block;
                color: #2c3e50;
                margin-bottom: 5px;
            }

            .route-description {
                font-size: 1rem;
                line-height: 1.7;
                margin-bottom: 25px;
                color: #2c3e50;
            }

            .modal-content h3 {
                font-family: 'Playfair Display', serif;
                font-size: 1.3rem;
                margin-bottom: 15px;
                color: #2c3e50;
            }

            .route-highlights {
                list-style: none;
                margin-bottom: 30px;
            }

            .route-highlights li {
                padding: 10px 0 10px 30px;
                position: relative;
                line-height: 1.6;
            }

            .route-highlights li::before {
                content: '✓';
                position: absolute;
                left: 0;
                color: #D4630F;
                font-weight: bold;
                font-size: 1.2rem;
            }

            .modal-cta {
                width: 100%;
                background: #2c3e50;
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 50px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .modal-cta:hover {
                background: #D4630F;
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(212, 99, 15, 0.3);
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @media (max-width: 768px) {
                .modal-content {
                    padding: 30px 20px;
                }

                .route-details-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);

        // Close modal handlers
        const closeModal = () => {
            modal.remove();
            style.remove();
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    }
}

// ===================================
// PDF DOWNLOAD FUNCTION
// ===================================
function loadJsPDF(callback) {
    // Check if jsPDF is already loaded
    if (window.jspdf) {
        callback();
        return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = callback;
    document.head.appendChild(script);
}

function downloadPackingListPDF() {
    loadJsPDF(() => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        let yPos = 20;
        const leftMargin = 20;
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const maxWidth = pageWidth - 40;
        
        // Title
        doc.setFontSize(18);
        doc.setFont(undefined, 'bold');
        doc.text('SOLEN SAFARIS', pageWidth / 2, yPos, { align: 'center' });
        yPos += 8;
        
        doc.setFontSize(14);
        doc.text('SUGGESTED PACKING LIST', pageWidth / 2, yPos, { align: 'center' });
        yPos += 6;
        
        doc.setFontSize(12);
        doc.text('Mount Kilimanjaro', pageWidth / 2, yPos, { align: 'center' });
        yPos += 10;
        
        // Disclaimer
        doc.setFontSize(9);
        doc.setFont(undefined, 'italic');
        doc.text('Please refer to our Terms and Conditions for further information.', pageWidth / 2, yPos, { align: 'center' });
        yPos += 12;
        
        // Function to check if we need a new page
        const checkNewPage = (requiredSpace = 10) => {
            if (yPos + requiredSpace > pageHeight - 20) {
                doc.addPage();
                yPos = 20;
            }
        };
        
        // Function to add section header
        const addSectionHeader = (title) => {
            checkNewPage(15);
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text(title, leftMargin, yPos);
            yPos += 7;
            doc.setLineWidth(0.5);
            doc.line(leftMargin, yPos, pageWidth - leftMargin, yPos);
            yPos += 6;
        };
        
        // Function to add checklist item
        const addItem = (text) => {
            checkNewPage(8);
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            
            // Checkbox
            doc.rect(leftMargin, yPos - 3, 3, 3);
            
            // Text with word wrap
            const lines = doc.splitTextToSize(text, maxWidth - 10);
            doc.text(lines, leftMargin + 6, yPos);
            yPos += lines.length * 6;
        };
        
        // KLÄDER & SKOR
addSectionHeader('KLÄDER & SKOR');
addItem('Tillräckligt med underkläder för 7 dagar på Mount Kilimanjaro');
addItem('Underställ – över- och underdel (vi rekommenderar Smartwool, Icebreaker eller liknande)');
addItem('3–4 kortärmade vandringströjor');
addItem('1–2 långärmade vandringströjor');
addItem('1–2 par vandringsbyxor');
addItem('1 fleecejacka i Polartec-material (vi rekommenderar Helly Hansen, The North Face eller liknande)');
addItem('1 isolerad vinterjacka (vi rekommenderar Columbia, Marmot, The North Face eller liknande)');
addItem('1 par isolerade vandringsbyxor (vandringsbyxor med innerfoder i fleece)');
addItem('1 vindtät skaljacka (om den inte är vattentät, skaffa istället en lätt regnjacka)');
addItem('Solhatt, gärna med nackskydd');
addItem('Varm mössa eller fleecepannband');
addItem('Bandana eller halsvärmare');
yPos += 8;

// UTRUSTNING & TILLBEHÖR
addSectionHeader('UTRUSTNING & TILLBEHÖR');
addItem('Pannlampa (vi rekommenderar Petzl Tikka eller liknande)');
addItem('Solglasögon (vi rekommenderar Julbo eller liknande)');
addItem('Lätta innerhandskar');
addItem('Varma ytterhandskar/vantar (vi rekommenderar Eiger, Black Diamond, Outdoor Research, The North Face eller liknande)');
addItem('Justerbara vandringsstavar (vi rekommenderar Leki, Black Diamond Alpine, TYTN eller liknande)');
addItem('Medeltunga vandringskängor (vi rekommenderar Salomon, Merrell, Columbia, Keen eller liknande)');
addItem('4–5 par vandringsstrumpor (vi rekommenderar Smartwool, Darn Tough eller liknande)');
addItem('1 par varma/tjocka vandringsstrumpor (vi rekommenderar Smartwool eller liknande)');
addItem('Vattentät duffelväska på 80–90 liter (vi rekommenderar Helly Hansen, TYTN eller liknande)');
addItem('Dagryggsäck på 20–30 liter (vi rekommenderar Osprey eller liknande)');
addItem('Regnskydd till dagryggsäck');
addItem('4-säsongs sovsäck (vi rekommenderar Marmot Trestles, Hyke & Byke eller liknande)');
addItem('Isolerat liggunderlag (vi rekommenderar Therm-a-Rest NeoAir eller liknande)');
addItem('Uppblåsbar kudde (valfritt)');
yPos += 8;

// NÖDVÄNDIGHETER & PERSONLIGA SAKER
addSectionHeader('NÖDVÄNDIGHETER & PERSONLIGA SAKER');
addItem('Stor vattenflaska eller vätskesystem (vi rekommenderar Camelbak, Platypus eller liknande)');
addItem('Våtservetter');
addItem('Svettålig solkräm');
addItem('Skavsårsplåster');
addItem('Myggmedel');
addItem('Allmänna läkemedel (Paracetamol, Imodium)');
addItem('Powerbank');
addItem('Snacks såsom energibars och sportdryckstillskott');
addItem('Ziplock-påsar för viktiga tillhörigheter (pass, pengar etc.)');
addItem('Vandringshandduk');
addItem('Toalettartiklar, inklusive en rulle toalettpapper');
addItem('Urinflaska (valfritt)');
yPos += 8;

// ELEKTRONIK & DOKUMENT
addSectionHeader('ELEKTRONIK & DOKUMENT');
addItem('Kamera');
addItem('GoPro (valfritt)');
addItem('Extra batterier och minneskort till kameran');
addItem('Kindle med bakgrundsbelysning (valfritt)');
addItem('Pass');
addItem('Visum');
addItem('Reseförsäkringsdokument');
addItem('Gula febern-vaccinationskort (om tillämpligt – rådfråga din läkare)');
addItem('Lås till din duffelväska');

        
        // Footer
        checkNewPage(20);
        yPos += 10;
        doc.setLineWidth(0.5);
        doc.line(leftMargin, yPos, pageWidth - leftMargin, yPos);
        yPos += 8;
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text('For more information and bookings:', pageWidth / 2, yPos, { align: 'center' });
        yPos += 6;
        doc.setFont(undefined, 'bold');
        doc.text('www.solensafaris.com', pageWidth / 2, yPos, { align: 'center' });
        yPos += 5;
        doc.text('info@solensafaris.com', pageWidth / 2, yPos, { align: 'center' });
        yPos += 8;
        doc.setFont(undefined, 'italic');
        doc.setFontSize(9);
        doc.text('Safe travels and enjoy your adventure!', pageWidth / 2, yPos, { align: 'center' });
        
        // Save the PDF
        doc.save('Solen-Safaris-Kilimanjaro-Packing-List.pdf');
    });
}

// Attach download function to button
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadPackingListPDF);
    }
});

// ===================================
// PAGE LOAD ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';

// ===================================
// LANGUAGE SELECTOR FUNCTION
// ===================================
function changeLanguage(langCode) {
    if (!langCode) return;
    
    localStorage.setItem('selectedLanguage', langCode);
    
    if (langCode === 'sv') {
        window.location.href = window.location.pathname;
        return;
    }
    
    const translateUrl = `https://translate.google.com/translate?sl=auto&tl=${langCode}&u=${encodeURIComponent(window.location.href)}`;
    window.location.href = translateUrl;
}

window.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const languageSelect = document.getElementById('language-select');
    
    if (languageSelect && savedLanguage) {
        languageSelect.value = savedLanguage;
    }
});