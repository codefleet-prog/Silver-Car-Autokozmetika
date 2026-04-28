document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // --- Sticky Navbar ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Before/After Slider Logic ---
    const sliderContainer = document.querySelector('.slider-container');
    const beforeImage = document.querySelector('.image-wrapper.before');
    const sliderHandle = document.querySelector('.slider-handle');

    let isSliding = false;

    // Mouse events
    sliderContainer.addEventListener('mousedown', (e) => {
        isSliding = true;
        slide(e.clientX);
    });

    window.addEventListener('mouseup', () => {
        isSliding = false;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isSliding) return;
        slide(e.clientX);
    });

    // Touch events for mobile
    sliderContainer.addEventListener('touchstart', (e) => {
        isSliding = true;
        slide(e.touches[0].clientX);
    });

    window.addEventListener('touchend', () => {
        isSliding = false;
    });

    window.addEventListener('touchmove', (e) => {
        if (!isSliding) return;
        // Prevent scrolling while interacting with the slider
        if (e.target.closest('.slider-container')) {
            e.preventDefault();
        }
        slide(e.touches[0].clientX);
    }, { passive: false });

    function slide(xPos) {
        const rect = sliderContainer.getBoundingClientRect();
        let x = xPos - rect.left;
        
        // Boundaries
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        
        const percentage = (x / rect.width) * 100;
        
        beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        sliderHandle.style.left = `${percentage}%`;
    }

    // --- Initial Hero Animation trigger ---
    setTimeout(() => {
        const heroAnims = document.querySelectorAll('.hero .animate-up');
        heroAnims.forEach(el => el.classList.add('visible'));
    }, 100);
    
    // --- Simple Form Prevention ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Küldés folyamatban...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerText = 'Sikeresen elküldve!';
                btn.classList.remove('btn-primary');
                btn.style.backgroundColor = '#10b981'; // green success
                btn.style.color = '#fff';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.classList.add('btn-primary');
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
