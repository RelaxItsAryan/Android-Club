// Modal functionality
let currentEventName = '';

function openModal(eventName) {
    currentEventName = eventName;
    document.getElementById('eventName').textContent = eventName;
    document.getElementById('registrationModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('registrationModal').classList.remove('active');
    document.getElementById('registrationForm').reset();
    document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Toast notification
function showToast(title, message, duration = 5000) {
    const toast = document.getElementById('toast');
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastMessage').textContent = message;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Form submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        regNumber: document.getElementById('regNumber').value
    };
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.regNumber) {
        showToast('Missing Information', 'Please fill in all fields to complete registration.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showToast('Invalid Email', 'Please enter a valid email address.');
        return;
    }
    
    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
        showToast('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
        return;
    }
    
    // Success
    console.log('Registration Data:', formData);
    console.log('Event:', currentEventName);
    
    showToast('Registration Successful! 🎉', `You've been registered for ${currentEventName}. Check your email for confirmation.`);
    
    // Close modal and reset form
    closeModal();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.feature-card, .event-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
