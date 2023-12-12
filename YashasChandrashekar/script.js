document.addEventListener('DOMContentLoaded', function() {
    
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    function smoothScroll(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scroll({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    }
});





