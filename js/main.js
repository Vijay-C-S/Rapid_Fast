// ===== Main Application Entry Point =====
// Import and initialize all modules

import { initNavbar } from './navbar.js';
import { initTheme } from './theme.js';
import { initHero } from './hero.js';
import { initJobs } from './jobs.js';
import { initOffers } from './offers.js';
import { initContact } from './contact.js';
import { 
    initNotifications, 
    initPreloader, 
    initBackToTop, 
    initSmoothScroll, 
    initScrollReveal, 
    initCardEffects,
    initEasterEgg 
} from './utils.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    initPreloader();
    initNavbar();
    initTheme();
    initSmoothScroll();
    initNotifications();
    initBackToTop();
    
    // Section-specific functionality
    initHero();
    initJobs();
    initOffers();
    initContact();
    
    // Visual effects
    initScrollReveal();
    initCardEffects();
    
    // Fun stuff
    initEasterEgg();
    
    // Console branding
    console.log('%c RapidFast', 'font-size: 24px; font-weight: bold; color: #6366f1;');
    console.log('%c Welcome to RapidFast- Your Gateway to Success!', 'font-size: 14px; color: #ec4899;');
});

