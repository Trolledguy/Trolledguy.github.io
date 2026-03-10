// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => 
{
    anchor.addEventListener('click', function (e) 
    {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation effect to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards and skill categories
document.querySelectorAll('.project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Project preview video hover + click modal
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalClose = videoModal?.querySelector('.video-modal__close');

function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    videoModal.setAttribute('aria-hidden', 'true');
    if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
        modalVideo.removeAttribute('src');
        modalVideo.load();
    }
}

modalClose?.addEventListener('click', closeVideoModal);
videoModal?.addEventListener('click', (event) => {
    if (event.target === videoModal) closeVideoModal();
});

document.querySelectorAll('.project-image').forEach(el => {
    const preview = el.querySelector('.project-preview');
    const videoSrc = el.dataset.videoSrc;
    if (!preview || !videoSrc) return;

    preview.src = videoSrc;

    el.addEventListener('mouseenter', () => {
        preview.play().catch(() => {});
    });

    el.addEventListener('mouseleave', () => {
        preview.pause();
        preview.currentTime = 0;
    });

    el.addEventListener('click', () => {
        if (!videoModal || !modalVideo) return;
        videoModal.classList.add('active');
        videoModal.setAttribute('aria-hidden', 'false');
        modalVideo.src = videoSrc;
        modalVideo.play().catch(() => {});
    });
});