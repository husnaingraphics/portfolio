document.addEventListener('DOMContentLoaded', function() {
    // Load Lenis from CDN
    const lenisScript = document.createElement('script');
    lenisScript.src = 'https://cdn.jsdelivr.net/npm/lenis@1.0.0/dist/lenis.min.js';
    document.head.appendChild(lenisScript);

    lenisScript.onload = function() {
        // Initialize Lenis Smooth Scroll
        const lenis = new Lenis({
            lerp: 0.1,
            smooth: true,
            direction: 'vertical'
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Connect Lenis to GSAP
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                // Close mobile menu if open
                if (document.querySelector('nav').classList.contains('active')) {
                    document.querySelector('nav').classList.remove('active');
                    document.querySelector('.mobile-menu-btn').textContent = '☰';
                    gsap.to('.menu-overlay', {
                        clipPath: 'circle(0% at 90% 5%)',
                        duration: 0.8,
                        ease: 'power3.in'
                    });
                }
                
                // Use Lenis for smooth scroll
                lenis.scrollTo(targetId, {
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    offset: -80
                });
            });
        });
    };

    // Preloader Animation
    let counter = 0;
    const counterInterval = setInterval(() => {
        if (counter < 100) {
            counter++;
            document.querySelector('.preloader-counter').textContent = counter + '%';
        } else {
            clearInterval(counterInterval);
            
            // Complex preloader exit animation
            const tl = gsap.timeline();
            
            // Animate name and counter
            tl.to('.preloader-name', {
                opacity: 0,
                y: -20,
                duration: 0.5,
                ease: 'power2.inOut'
            })
            .to('.preloader-counter', {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: 'power2.inOut'
            }, 0)
            .to('.preloader-overlay-1', {
                clipPath: 'polygon(0 0, 100% 100%, 100% 100%, 0% 100%)',
                duration: 1,
                ease: 'power2.inOut'
            }, 0.2)
            .to('.preloader-overlay-2', {
                clipPath: 'polygon(0 0, 100% 0, 0% 100%, 0% 100%)',
                duration: 1,
                ease: 'power2.inOut'
            }, 0.3)
            .to('.preloader', {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    document.querySelector('.preloader').style.display = 'none';
                    // Animate header in after preloader is gone
                    gsap.to('header', {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                }
            }, 1);
        }
    },10);

    // Initialize name and counter animations
    gsap.to('.preloader-name', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out'
    });

    gsap.to('.preloader-counter', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out'
    });

    // Mobile Menu Animation
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.menu-overlay');
    
    menuBtn.addEventListener('click', () => {
        const isOpen = nav.classList.contains('active');
        
        if (isOpen) {
            // Close animation
            gsap.to(overlay, {
                clipPath: 'circle(0% at 90% 5%)',
                duration: 0.8,
                ease: 'power3.in',
                onComplete: () => {
                    nav.classList.remove('active');
                    menuBtn.textContent = '☰';
                }
            });
        } else {
            // Open animation
            nav.classList.add('active');
            menuBtn.textContent = '✕';
            gsap.to(overlay, {
                clipPath: 'circle(150% at 90% 5%)',
                duration: 0.8,
                ease: 'power3.out'
            });
        }
    });

    // Hero section animations
    gsap.to('.hero h1', {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out'
    });
    
    gsap.to('.hero h2', {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out'
    });
    
    gsap.to('.hero-btns', {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.7,
        ease: 'power2.out'
    });
    
    gsap.to('.hero-stats', {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.9,
        ease: 'power2.out'
    });
    
    gsap.to('.hero-social', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 1.1,
        ease: 'power2.out'
    });
    
    gsap.to('.hero-image', {
        x: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.5,
        ease: 'power2.out'
    });

    // About section animations
    gsap.to('.section-title', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.to('.about-image', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.to('.about-text', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    });

    // Section Transition Animation
    gsap.to("#section-transition-div_1", {
        scrollTrigger: {
            trigger: ".hero",
            scrub: true,
            start: 'bottom bottom',
            end: 'bottom +=100',
        },
        height: "100px",
        ease: 'none',
    });

    gsap.to("#section-transition-div_2", {
        scrollTrigger: {
            trigger: ".hero",
            scrub: true,
            start: 'bottom bottom',
            end: 'bottom +=100',
        },
        height: "200px",
        ease: 'none',
    });

    gsap.to("#section-transition-div_3", {
        scrollTrigger: {
            trigger: ".hero",
            scrub: true,
            start: 'bottom bottom',
            end: 'bottom +=100',
        },
        height: "400px",
        ease: 'none',
    });

    gsap.to("#section-transition-div_4", {
        scrollTrigger: {
            trigger: ".hero",
            scrub: true,
            start: 'bottom bottom',
            end: 'bottom +=100',
        },
        height: "200px",
        ease: 'none',
    });

    gsap.to("#section-transition-div_5", {
        scrollTrigger: {
            trigger: ".hero",
            scrub: true,
            start: 'bottom bottom',
            end: 'bottom +=100',
        },
        height: "300px",
        ease: 'none',
    });

    // Animate skill bars
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const width = bar.getAttribute('data-width');
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
                toggleActions: 'play '
            },
            width: width + '%',
            duration: 1.5,
            ease: 'power2.out'
        });
    });

    

    // Initialize Swiper
    const swiper = new Swiper('.mySwiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
 // Animate testimonial items
    gsap.to('.testimonial-item', {
        scrollTrigger: {
            trigger: '.testimonials',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Contact section animations
    gsap.to('.contact .section-title', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Contact section animations
    gsap.to('.contact .section-title', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.to('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.to('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            document.querySelector('header').style.background = 'rgba(255, 255, 255, 0.95)';
            document.querySelector('header').style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            document.querySelector('header').style.background = 'rgba(255, 255, 255, 0.9)';
            document.querySelector('header').style.boxShadow = 'none';
        }
    });

    
     
      const viewMoreBtn = document.querySelector('.view-more-btn');
      const viewLessBtn = document.querySelector('.view-less-btn');
      const expandedProjects = document.querySelector('.expanded-projects');

      viewMoreBtn.addEventListener('click', function () {
        expandedProjects.style.display = 'block';
        viewMoreBtn.style.display = 'none';
        viewLessBtn.style.display = 'block';
        expandedProjects.scrollIntoView({ behavior: 'smooth' });
      });

      viewLessBtn.addEventListener('click', function () {
        expandedProjects.style.display = 'none';
        viewMoreBtn.style.display = 'block';
        viewLessBtn.style.display = 'none';
        document.querySelector('.projects-section').scrollIntoView({ behavior: 'smooth' });
      });
    
     gsap.utils.toArray('.timeline-item').forEach((item, index) => {
      gsap.from(item, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay: index * 0.1
      });
    });


            // Image zoom functionality
            const zoomOverlay = document.querySelector('.zoom-overlay');
            const zoomedImage = document.querySelector('.zoomed-image');
            const categoryCards = document.querySelectorAll('.category-card');

            categoryCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    const img = this.querySelector('.category-image');
                    zoomedImage.src = img.src;
                    zoomOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling when zoomed
                });
            });

            // Close zoom when clicking overlay
            zoomOverlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    zoomOverlay.classList.remove('active');
                    document.body.style.overflow = ''; // Restore scrolling
                }
            });

            // Close zoom with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && zoomOverlay.classList.contains('active')) {
                    zoomOverlay.classList.remove('active');
                    document.body.style.overflow = ''; // Restore scrolling
                }
            });
        

                 
 // Get all service cards
            const serviceCards = document.querySelectorAll('.service-card');
            
            // Add click event to each card
            serviceCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    // Prevent event bubbling if needed
                    e.stopPropagation();
                    
                    const popupId = this.getAttribute('data-popup') + '-popup';
                    const popup = document.getElementById(popupId);
                    
                    if (popup) {
                        popup.classList.add('active');
                        document.body.style.overflow = 'hidden'; // Prevent scrolling
                    }
                });
            });
            
            // Add close event to all popup close buttons
            const closeButtons = document.querySelectorAll('.popup-close');
            closeButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const popup = this.closest('.popup-overlay');
                    popup.classList.remove('active');
                    document.body.style.overflow = ''; // Re-enable scrolling
                });
            });
            
            // Close popup when clicking outside content
            const popups = document.querySelectorAll('.popup-overlay');
            popups.forEach(popup => {
                popup.addEventListener('click', function(e) {
                    if (e.target === this) {
                        this.classList.remove('active');
                        document.body.style.overflow = ''; // Re-enable scrolling
                    }
                });
            });
            
            // Close popup with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    document.querySelectorAll('.popup-overlay.active').forEach(popup => {
                        popup.classList.remove('active');
                        document.body.style.overflow = ''; // Re-enable scrolling
                    });
                }

                });
});


   