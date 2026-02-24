// ===== Preloader =====
const preloader = document.getElementById('preloader');
if (preloader) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 2000);
    });
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"], .nav-link[href="/#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });
}

// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
        updateThemeIcon(savedTheme);
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-count'));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, stepTime);
}

// ===== Jobs Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const jobCards = document.querySelectorAll('.job-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter jobs
        const filter = btn.getAttribute('data-filter');
        
        jobCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-type') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// ===== Job Deadline Checker =====
function checkJobDeadlines() {
    const jobCardsWithDeadline = document.querySelectorAll('.job-card[data-deadline]');
    const now = new Date();
    
    jobCardsWithDeadline.forEach(card => {
        const deadlineStr = card.getAttribute('data-deadline');
        const deadline = new Date(deadlineStr);
        
        if (now > deadline) {
            // Deadline has passed - update the card
            const deadlineTag = card.querySelector('.deadline-tag') || card.querySelector('.tag[style*="color: #ef4444"]');
            const applyBtn = card.querySelector('.apply-btn');
            const badge = card.querySelector('.job-badge');
            
            // Update the deadline tag
            if (deadlineTag) {
                deadlineTag.textContent = '❌ Registration Closed';
                deadlineTag.style.background = '#f3f4f6';
                deadlineTag.style.color = '#6b7280';
            }
            
            // Disable and grey out the apply button
            if (applyBtn) {
                applyBtn.textContent = 'Registration Closed';
                applyBtn.style.background = '#9ca3af';
                applyBtn.style.cursor = 'not-allowed';
                applyBtn.style.pointerEvents = 'none';
                applyBtn.removeAttribute('href');
            }
            
            // Update the badge
            if (badge) {
                badge.textContent = '⏰ EXPIRED';
                badge.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
            }
            
            // Grey out the card border
            card.style.borderColor = '#d1d5db';
            card.classList.remove('hot-job');
            card.classList.add('expired-job');
        }
    });
}

// Check deadlines on page load and every minute
checkJobDeadlines();
setInterval(checkJobDeadlines, 60000);

// ===== Bookmark Toggle =====
const bookmarkBtns = document.querySelectorAll('.bookmark-btn');

bookmarkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        
        if (icon.classList.contains('fas')) {
            showNotification('Job bookmarked successfully! 📌');
        } else {
            showNotification('Bookmark removed');
        }
    });
});

// ===== Notification System =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        padding: 1rem 1.5rem;
        background: linear-gradient(135deg, #6366f1, #ec4899);
        color: white;
        border-radius: 10px;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification animations
const notifStyle = document.createElement('style');
notifStyle.textContent = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
    }
`;
document.head.appendChild(notifStyle);

// ===== Countdown Timer =====
function updateCountdowns() {
    const countdowns = document.querySelectorAll('.countdown');
    
    countdowns.forEach(countdown => {
        let time = countdown.textContent.split(':');
        let hours = parseInt(time[0]);
        let minutes = parseInt(time[1]);
        let seconds = parseInt(time[2]);
        
        seconds--;
        
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        
        if (minutes < 0) {
            minutes = 59;
            hours--;
        }
        
        if (hours < 0) {
            hours = 23;
        }
        
        countdown.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    });
}

setInterval(updateCountdowns, 1000);

// ===== Back to Top Button =====
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Form Submissions =====
const newsletterForm = document.getElementById('newsletter-form');
const contactForm = document.getElementById('contact-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    
    if (validateEmail(email)) {
        showNotification('🎉 Successfully subscribed! Welcome aboard!');
        newsletterForm.reset();
    } else {
        showNotification('❌ Please enter a valid email address');
    }
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('✅ Message sent successfully! We\'ll get back to you soon.');
    contactForm.reset();
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.service-card, .tech-card, .job-card, .income-card, .offer-card, .testimonial-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// ===== Parallax Effect on Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Typing Effect for Hero Title =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const spans = heroTitle.querySelectorAll('.gradient-text');
    spans.forEach((span, index) => {
        span.style.animation = `fadeInUp 0.8s ease ${index * 0.3}s forwards`;
        span.style.opacity = '0';
    });
}

// Add typing animation
const typingStyle = document.createElement('style');
typingStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(typingStyle);

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Extract the hash part (works for both "#section" and "/#section")
        const hash = href.includes('#') ? '#' + href.split('#')[1] : href;
        const target = document.querySelector(hash);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Card Hover Effect =====
const cards = document.querySelectorAll('.service-card, .job-card, .income-card, .offer-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Service Worker Registration (for PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be registered here for PWA functionality
        console.log('GetUpdated website loaded successfully!');
    });
}

// ===== Easter Egg - Konami Code =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            showNotification('🎮 Konami Code activated! You found the secret! 🎉');
            document.body.style.animation = 'rainbow 2s ease';
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c GetUpdated', 'font-size: 24px; font-weight: bold; color: #6366f1');
    console.log('%c Welcome to GetUpdated - Your Gateway to Success!', 'font-size: 14px; color: #ec4899;');
});

// ===== Cookie Consent Banner (GDPR / Google AdSense Requirement) =====
(function () {
    if (localStorage.getItem('cookieConsent')) return;

    const banner = document.createElement('div');
    banner.id = 'cookie-consent';
    banner.innerHTML = `
        <div style="position:fixed;bottom:0;left:0;right:0;background:#1e1e2e;color:#e0e0e0;padding:16px 24px;z-index:99999;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:12px;font-family:'Poppins',sans-serif;font-size:14px;box-shadow:0 -2px 20px rgba(0,0,0,0.3);">
            <p style="margin:0;flex:1;min-width:280px;line-height:1.6;">
                We use cookies to enhance your experience, serve personalized ads through Google AdSense, and analyze traffic.
                By clicking "Accept All", you consent to our use of cookies.
                <a href="/privacy-policy.html" style="color:#818cf8;text-decoration:underline;">Privacy Policy</a>
            </p>
            <div style="display:flex;gap:8px;flex-shrink:0;">
                <button id="cookie-reject" style="padding:10px 20px;border:1px solid #818cf8;background:transparent;color:#818cf8;border-radius:8px;cursor:pointer;font-family:inherit;font-size:13px;font-weight:500;">Reject</button>
                <button id="cookie-accept" style="padding:10px 20px;border:none;background:linear-gradient(135deg,#6366f1,#ec4899);color:#fff;border-radius:8px;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;">Accept All</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function () {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.remove();
    });

    document.getElementById('cookie-reject').addEventListener('click', function () {
        localStorage.setItem('cookieConsent', 'rejected');
        banner.remove();
    });
})();
