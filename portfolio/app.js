document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.view-section');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const navSlider = document.querySelector('.nav-slider');

    function updateNavSlider() {
        if (!navSlider) return;
        const activeLink = document.querySelector('.nav-links li a.active');
        if (activeLink) {
            const linkRect = activeLink.getBoundingClientRect();
            const navRect = document.querySelector('.nav-links').getBoundingClientRect();
            navSlider.style.width = `${linkRect.width}px`;
            navSlider.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
        }
    }

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        let changed = false;
        navLinks.forEach(a => {
            const isActive = a.classList.contains('active');
            const shouldBeActive = (a.getAttribute('href').substring(1) === current);
            
            if (shouldBeActive && !isActive) {
                a.classList.add('active');
                changed = true;
            } else if (!shouldBeActive && isActive) {
                a.classList.remove('active');
                changed = true;
            }
        });
        
        if (changed) {
            updateNavSlider();
        }
    });

    setTimeout(updateNavSlider, 100);
    window.addEventListener('resize', updateNavSlider);
    if (document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: ['Mechatronics Student.', 'Full-Stack Developer.', 'Tech Enthusiast.'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|',
        });
    }
    let skillsSwiperInstance = null;
    if (document.querySelector('.skills-swiper')) {
        skillsSwiperInstance = new Swiper('.skills-swiper', {
            effect: 'coverflow',
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            speed: 3000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 0,
                modifier: 1,
                slideShadows: false,
                scale: 0.9, 
            },
            navigation: {
                nextEl: '.skills-next',
                prevEl: '.skills-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            grabCursor: true,
            on: {
                slideChange: function () {
                    const activeSlide = this.slides[this.activeIndex];
                    if (activeSlide) {
                        const category = activeSlide.getAttribute('data-category');
                        const displayEl = document.querySelector('.active-category-display');
                        if (displayEl && category) {
                            displayEl.textContent = category;
                        }
                    }
                }
            }
        });
    }

    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const swiperContainer = document.querySelector('.skills-swiper');
    const categoryDisplay = document.querySelector('.active-category-display');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.getAttribute('data-view') === 'grid') {
                if (swiperContainer) swiperContainer.classList.add('grid-view');
                if (categoryDisplay) categoryDisplay.style.display = 'none';
                if (skillsSwiperInstance) {
                    skillsSwiperInstance.autoplay.stop();
                }
            } else {
                if (swiperContainer) swiperContainer.classList.remove('grid-view');
                if (categoryDisplay) categoryDisplay.style.display = 'block';
                if (skillsSwiperInstance) {
                    skillsSwiperInstance.autoplay.start();
                }
            }
        });
    });

    const swipers = document.querySelectorAll('.project-swiper');
    swipers.forEach(swiperEl => {
        new Swiper(swiperEl, {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            }
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
            const mailtoLink = `mailto:linwel.colmo87@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            window.location.href = mailtoLink;
        });
    }

    gsap.registerPlugin(ScrollTrigger);
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%", 
                scroller: ".main-content" 
            },
            opacity: 0,
            x: -30,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out"
        });
    });

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const target = document.getElementById('tab-' + btn.getAttribute('data-tab'));
            if (target) target.classList.add('active');
        });
    });
    
    // VanillaTilt 3D Effect for some cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".stat-card, .timeline-content"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
            scale: 1.02
        });
    }

    // CV Download Button Interaction
    const cvBtn = document.getElementById('cv-download-btn');
    if (cvBtn) {
        cvBtn.addEventListener('click', (e) => {
            const icon = cvBtn.querySelector('iconify-icon');
            const text = cvBtn.querySelector('.cv-text');
            
            // Start rotation and scale down
            icon.style.transform = 'rotate(180deg) scale(0.5)';
            
            setTimeout(() => {
                icon.setAttribute('icon', 'ph:check-circle-bold');
                text.innerText = 'Downloaded CV';
                
                // Spring back with the check mark
                icon.style.transform = 'rotate(360deg) scale(1.2)';
                
                setTimeout(() => {
                    // Settle down
                    icon.style.transform = 'rotate(360deg) scale(1)';
                }, 200);

                // Reset back to original state after 10 seconds
                setTimeout(() => {
                    icon.style.transform = 'rotate(180deg) scale(0.5)';
                    
                    setTimeout(() => {
                        icon.setAttribute('icon', 'ph:download-simple');
                        text.innerText = 'Download CV';
                        icon.style.transform = 'rotate(0deg) scale(1.2)';
                        
                        setTimeout(() => {
                            icon.style.transform = 'rotate(0deg) scale(1)';
                        }, 200);
                    }, 250);
                }, 10000);

            }, 250);
        });
    }

    // --- Hero Canvas Forcefield Dots ---
    const canvas = document.getElementById('hero-canvas');
    const heroLayout = document.querySelector('.hero-layout');
    if (canvas && heroLayout) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        let mouse = { x: null, y: null, radius: 300 };

        heroLayout.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        heroLayout.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        function initCanvas() {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            particles = [];
            
            const spacing = 40;
            for (let x = spacing; x < width; x += spacing) {
                for (let y = spacing; y < height; y += spacing) {
                    particles.push({
                        baseX: x,
                        baseY: y,
                        x: x,
                        y: y,
                        size: 3.0,
                        color: 'rgba(120, 120, 120, 0.12)',
                        angle: Math.random() * Math.PI * 2,
                        speed: 1 + Math.random() * 2 // Independent floating speed
                    });
                }
            }
        }

        let time = 0;
        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);
            time += 0.01;
            
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                
                // Independent floating motion (orbiting their base position)
                let targetX = p.baseX + Math.sin(p.angle + time * p.speed) * 12;
                let targetY = p.baseY + Math.cos(p.angle + time * p.speed) * 12;
                
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - p.x;
                    let dy = mouse.y - p.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        
                        // Feathered edge (smoothened transition) using power curve
                        let force = (mouse.radius - distance) / mouse.radius;
                        force = Math.pow(force, 2); // Exponential falloff for soft edges
                        
                        const pushStrength = -200; // Total push distance
                        targetX += forceDirectionX * force * pushStrength;
                        targetY += forceDirectionY * force * pushStrength;
                    }
                }
                
                // Spring towards the calculated target
                p.x += (targetX - p.x) * 0.08;
                p.y += (targetY - p.y) * 0.08;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }
            requestAnimationFrame(animateCanvas);
        }

        initCanvas();
        animateCanvas();

        window.addEventListener('resize', initCanvas);
    }

    // --- Projects Filter, Search, and Pagination ---
    const projectSearch = document.getElementById('projectSearch');
    const projectFilter = document.getElementById('projectFilter');
    const projectsGrid = document.getElementById('projectsGrid');
    const showMoreBtn = document.getElementById('showMoreBtn');
    const collapseAllBtn = document.getElementById('collapseAllBtn');
    
    if (projectSearch && projectFilter && projectsGrid) {
        const allProjects = Array.from(projectsGrid.querySelectorAll('.project-card'));
        let filteredProjects = [...allProjects];
        let visibleCount = 6;
        const maxPerLoad = 6;
        
        function updateProjectsDisplay() {
            const searchTerm = projectSearch.value.toLowerCase();
            const filterValue = projectFilter.value;
            
            filteredProjects = allProjects.filter(project => {
                const title = project.querySelector('h3').textContent.toLowerCase();
                const desc = project.querySelector('p').textContent.toLowerCase();
                const tags = Array.from(project.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase());
                const category = project.getAttribute('data-category') || '';
                
                const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm) || tags.some(t => t.includes(searchTerm));
                const matchesFilter = filterValue === 'all' || category === filterValue;
                
                return matchesSearch && matchesFilter;
            });
            
            allProjects.forEach(p => p.style.display = 'none');
            
            for (let i = 0; i < Math.min(visibleCount, filteredProjects.length); i++) {
                filteredProjects[i].style.display = ''; 
            }
            
            if (filteredProjects.length > visibleCount) {
                if(showMoreBtn) showMoreBtn.style.display = 'flex';
            } else {
                if(showMoreBtn) showMoreBtn.style.display = 'none';
            }
            
            if (visibleCount > maxPerLoad && filteredProjects.length > maxPerLoad) {
                if(collapseAllBtn) collapseAllBtn.style.display = 'flex';
            } else {
                if(collapseAllBtn) collapseAllBtn.style.display = 'none';
            }
        }
        
        if (projectSearch) {
            projectSearch.addEventListener('input', () => {
                visibleCount = maxPerLoad;
                updateProjectsDisplay();
            });
        }
        
        if (projectFilter) {
            projectFilter.addEventListener('change', () => {
                visibleCount = maxPerLoad;
                updateProjectsDisplay();
            });
        }
        
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => {
                visibleCount += maxPerLoad;
                updateProjectsDisplay();
            });
        }
        
        if (collapseAllBtn) {
            collapseAllBtn.addEventListener('click', () => {
                visibleCount = maxPerLoad;
                updateProjectsDisplay();
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
        
        updateProjectsDisplay();
    }
});
