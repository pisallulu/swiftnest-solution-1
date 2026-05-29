// =============================================
// MOBILE MENU
// =============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.replace('fa-xmark', 'fa-bars');
        });
    });
}

// =============================================
// HEADER SCROLL EFFECT
// =============================================
const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    });
}

// =============================================
// ACTIVE NAV LINK
// =============================================
(function setActiveNav() {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === current || (current === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
})();

// =============================================
// SCROLL ANIMATIONS (IntersectionObserver)
// =============================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});

// =============================================
// COUNTER ANIMATION
// =============================================
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + (el.dataset.suffix || '');
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));
});

// =============================================
// SERVICE FILTERS
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('[data-category]');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            serviceCards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.style.display = match ? '' : 'none';
                if (match) {
                    card.style.animation = 'none';
                    card.offsetHeight;
                    card.style.animation = '';
                }
            });
        });
    });
});

// =============================================
// CONTACT FORM
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Clear previous errors
        form.querySelectorAll('.field-error').forEach(el => el.remove());
        form.querySelectorAll('input, select, textarea').forEach(el => {
            el.style.borderColor = '';
        });

        let valid = true;

        function showError(field, msg) {
            field.style.borderColor = 'var(--danger)';
            const err = document.createElement('p');
            err.className = 'field-error';
            err.style.cssText = 'color:var(--danger);font-size:0.8rem;margin-top:4px;';
            err.textContent = msg;
            field.parentNode.appendChild(err);
            valid = false;
        }

        if (!name) showError(form.querySelector('#name'), 'Full name is required.');
        if (!email) showError(form.querySelector('#email'), 'Email address is required.');
        else if (!emailRegex.test(email)) showError(form.querySelector('#email'), 'Please enter a valid email address.');
        if (!message) showError(form.querySelector('#message'), 'Message is required.');

        if (!valid) return;

        const btn = form.querySelector('[type="submit"]');
        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Message Sent!';
            btn.style.background = 'var(--success)';
            form.reset();
            setTimeout(() => {
                btn.textContent = 'Send Message';
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1200);
    });
});
