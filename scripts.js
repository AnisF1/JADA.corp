// Toggle menu hamburger
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Animasi ketika elemen masuk viewport
    const teamMembers = document.querySelectorAll('.team-member');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    teamMembers.forEach(member => {
        observer.observe(member);
    });

    // Transparansi header saat scroll
    function toggleHeaderTransparency() {
        const header = document.querySelector('header');
        const scrollThreshold = 50;

        if (window.scrollY > scrollThreshold) {
            header.classList.add('transparent');
        } else {
            header.classList.remove('transparent');
        }
    }

    window.addEventListener('scroll', toggleHeaderTransparency);
});

// Fungsi goToBooking
function goToBooking() {
    window.location.href = "booking.html";
}