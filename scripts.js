// Toggle menu hamburger
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        const links = navLinks.querySelectorAll('a');
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
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

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const content = document.querySelectorAll('h1, h2, h3, p, a');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length > 2) {
            searchResults.innerHTML = '';
            searchResults.classList.add('active');
            
            content.forEach(element => {
                if (element.textContent.toLowerCase().includes(searchTerm)) {
                    const result = document.createElement('div');
                    result.classList.add('search-result');
                    result.textContent = element.textContent;
                    result.addEventListener('click', () => {
                        element.scrollIntoView({ behavior: 'smooth' });
                        searchResults.classList.remove('active');
                        searchInput.value = '';
                    });
                    searchResults.appendChild(result);
                }
            });
        } else {
            searchResults.classList.remove('active');
        }
    });
});