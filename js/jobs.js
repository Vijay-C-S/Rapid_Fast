// ===== Jobs Module =====
// Handles job filtering, search, and bookmark functionality

export function initJobs() {
    // Jobs Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const jobCards = document.querySelectorAll('.job-card');

    function getActiveFilter() {
        const activeBtn = document.querySelector('.filter-btn.active');
        return activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    }

    function getSearchQuery() {
        const searchInput = document.getElementById('job-search');
        return searchInput ? searchInput.value.toLowerCase().trim() : '';
    }

    function getCardSearchText(card) {
        const title = card.querySelector('.job-title');
        const company = card.querySelector('.job-info h4');
        const location = card.querySelector('.job-location');
        const tags = card.querySelectorAll('.tag');
        const badge = card.querySelector('.job-badge');
        const salary = card.querySelector('.salary');
        const jobType = card.querySelector('.job-type');
        let text = '';
        if (title) text += title.textContent + ' ';
        if (company) text += company.textContent + ' ';
        if (location) text += location.textContent + ' ';
        if (badge) text += badge.textContent + ' ';
        if (salary) text += salary.textContent + ' ';
        if (jobType) text += jobType.textContent + ' ';
        tags.forEach(tag => { text += tag.textContent + ' '; });
        return text.toLowerCase();
    }

    function filterAndSearchJobs() {
        const filter = getActiveFilter();
        const query = getSearchQuery();
        let visibleCount = 0;
        const totalCount = jobCards.length;

        jobCards.forEach(card => {
            const isClosed = card.getAttribute('data-status') === 'closed';
            const matchesFilter = filter === 'all' || card.getAttribute('data-type') === filter;
            const matchesSearch = !query || getCardSearchText(card).includes(query);
            if (!isClosed && matchesFilter && matchesSearch) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        const noResults = document.getElementById('no-results');
        const searchCount = document.getElementById('job-search-count');
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
        if (searchCount) {
            if (query) {
                searchCount.textContent = `Showing ${visibleCount} of ${totalCount} jobs`;
            } else {
                searchCount.textContent = '';
            }
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterAndSearchJobs();
        });
    });

    // Search functionality
    const jobSearchInput = document.getElementById('job-search');
    const jobSearchClear = document.getElementById('job-search-clear');

    if (jobSearchInput) {
        let searchTimeout;
        jobSearchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                filterAndSearchJobs();
                if (jobSearchClear) {
                    jobSearchClear.style.display = jobSearchInput.value ? 'flex' : 'none';
                }
            }, 200);
        });
    }

    if (jobSearchClear) {
        jobSearchClear.addEventListener('click', () => {
            jobSearchInput.value = '';
            jobSearchClear.style.display = 'none';
            filterAndSearchJobs();
            jobSearchInput.focus();
        });
    }

    // Remove closed jobs as soon as the deadline passes.
    function removeExpiredJobs() {
        const now = new Date();
        document.querySelectorAll('.job-card[data-deadline]').forEach(card => {
            const deadline = new Date(card.getAttribute('data-deadline'));
            if (now > deadline) {
                card.setAttribute('data-status', 'closed');
                card.remove();
            }
        });
    }

    removeExpiredJobs();
    setInterval(removeExpiredJobs, 60000);

    // Bookmark Toggle
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
}

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Notification helper (will be imported from utils)
function showNotification(message) {
    const event = new CustomEvent('showNotification', { detail: message });
    document.dispatchEvent(event);
}
