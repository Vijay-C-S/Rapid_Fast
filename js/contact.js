// ===== Contact Module =====
// NOTE: not currently loaded by any page - the live handler lives in script.js.
// RapidFast is a static site with no server, so the contact form hands the
// message to the visitor's own email client. It must never claim to have sent
// a message it cannot send.

export function initContact() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        return;
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = (document.getElementById('contact-name') || {}).value || '';
        const email = (document.getElementById('contact-email') || {}).value || '';
        const subject = (document.getElementById('contact-subject') || {}).value || '';
        const message = (document.getElementById('contact-message') || {}).value || '';

        if (!name.trim() || !message.trim()) {
            showNotification('Please add your name and a message before sending.');
            return;
        }

        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address so we can reply.');
            return;
        }

        const nl = String.fromCharCode(10);
        const mailSubject = subject.trim() || ('Message from ' + name.trim() + ' via RapidFast');
        const mailBody = message.trim() + nl + nl + '---' + nl
            + 'From: ' + name.trim() + nl
            + 'Reply to: ' + email.trim();

        showNotification('Opening your email app with this message ready to send.');
        window.location.href = 'mailto:updated456updated@gmail.com'
            + '?subject=' + encodeURIComponent(mailSubject)
            + '&body=' + encodeURIComponent(mailBody);
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message) {
    const event = new CustomEvent('showNotification', { detail: message });
    document.dispatchEvent(event);
}
