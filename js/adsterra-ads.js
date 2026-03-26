/**
 * Adsterra Ads Loader for getupdated.in
 * 
 * Centralized script to inject Adsterra ad units.
 * Existing Google AdSense code is NOT affected.
 * 
 * Ad Units:
 * - Social Bar: Floating notification bar (all pages)
 * - Banner 300x250: Sidebar ad (blog pages)  
 * - Banner 728x90: Leaderboard ad (main pages)
 * - Native Banner: In-article native ad (blog pages)
 * 
 * Popunder is loaded separately in <head> of each page.
 */

(function () {
    'use strict';

    function injectInlineAdSpacingStyle() {
        if (document.getElementById('inline-ad-spacing-style')) return;
        var style = document.createElement('style');
        style.id = 'inline-ad-spacing-style';
        style.textContent = '.article-inline-ad{display:flex;justify-content:center;margin:1.75rem 0 2rem;min-height:250px;}';
        document.head.appendChild(style);
    }

    // Build a clean in-article ad layout by inserting ads after every 3 to 4 paragraphs.
    function arrangeBlogInlineAds() {
        var articleContent = document.querySelector('.article-content');
        if (!articleContent) return;

        injectInlineAdSpacingStyle();

        var existingInlineAds = articleContent.querySelectorAll('.adsterra-native, .article-inline-ad');
        existingInlineAds.forEach(function (ad) { ad.remove(); });

        var paragraphs = Array.from(articleContent.querySelectorAll(':scope > p'));
        if (paragraphs.length < 4) return;

        var gapPattern = [3, 4];
        var patternIndex = 0;
        var currentIndex = gapPattern[patternIndex] - 1;

        while (currentIndex < paragraphs.length) {
            var adBlock = document.createElement('div');
            adBlock.className = 'adsterra-ad adsterra-native article-inline-ad';
            paragraphs[currentIndex].insertAdjacentElement('afterend', adBlock);

            patternIndex++;
            var nextGap = gapPattern[patternIndex % gapPattern.length];
            currentIndex += nextGap;
        }
    }

    // ========== Social Bar (loads on all pages) ==========
    function loadSocialBar() {
        var script = document.createElement('script');
        script.src = 'https://pl28651117.profitablecpmratenetwork.com/49/5b/52/495b52b6086994ad230aaaf172aba64c.js';
        document.body.appendChild(script);
    }

    // ========== Banner 300x250 ==========
    function loadBanner300x250(container) {
        if (!container) return;
        var optScript = document.createElement('script');
        optScript.textContent = "atOptions = { 'key': '8c8e95641949eb53920ed955003e36a9', 'format': 'iframe', 'height': 250, 'width': 300, 'params': {} };";
        container.appendChild(optScript);

        var invokeScript = document.createElement('script');
        invokeScript.src = 'https://www.highperformanceformat.com/8c8e95641949eb53920ed955003e36a9/invoke.js';
        container.appendChild(invokeScript);
    }

    // ========== Banner 728x90 ==========
    function loadBanner728x90(container) {
        if (!container) return;
        var optScript = document.createElement('script');
        optScript.textContent = "atOptions = { 'key': '935fe7821d46927df6296fe874433356', 'format': 'iframe', 'height': 90, 'width': 728, 'params': {} };";
        container.appendChild(optScript);

        var invokeScript = document.createElement('script');
        invokeScript.src = 'https://www.highperformanceformat.com/935fe7821d46927df6296fe874433356/invoke.js';
        container.appendChild(invokeScript);
    }

    // ========== Native Banner ==========
    function loadNativeBanner(container) {
        if (!container) return;
        var script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = 'https://pl28651056.profitablecpmratenetwork.com/77c8b09883a9d6e0e7c2d0be9cac6e83/invoke.js';
        container.appendChild(script);

        var div = document.createElement('div');
        div.id = 'container-77c8b09883a9d6e0e7c2d0be9cac6e83';
        container.appendChild(div);
    }

    // ========== Initialize all ads ==========
    function initAds() {
        // Social Bar on all pages
        loadSocialBar();

        // Blog inline ad experience (3 to 4 paragraph spacing)
        arrangeBlogInlineAds();

        // Banner 300x250 in sidebar containers
        var sidebar300 = document.querySelectorAll('.adsterra-300x250');
        sidebar300.forEach(function (el) { loadBanner300x250(el); });

        // Banner 728x90 in leaderboard containers
        var leaderboard = document.querySelectorAll('.adsterra-728x90');
        leaderboard.forEach(function (el) { loadBanner728x90(el); });

        // Native Banner in article containers
        var nativeBanners = document.querySelectorAll('.adsterra-native');
        nativeBanners.forEach(function (el) { loadNativeBanner(el); });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAds);
    } else {
        initAds();
    }
})();
