document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Loading Screen
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 600);
    }, 1500);

    // 2. Custom Cursor (Samo za Desktop)
    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");
    
    if(window.innerWidth > 768) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
            setTimeout(() => {
                follower.style.left = e.clientX + "px";
                follower.style.top = e.clientY + "px";
            }, 80);
        });
    }

    // 3. Scroll Progress Bar, Sticky Header & Scroll To Top
    const header = document.getElementById("header");
    const progressBar = document.getElementById("progressBar");
    const scrollToTopBtn = document.getElementById("scrollToTop");

    window.addEventListener("scroll", () => {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";

        if (window.scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }

        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add("visible");
        } else {
            scrollToTopBtn.classList.remove("visible");
        }
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 4. Reveal Animations on Scroll
    const reveals = document.querySelectorAll(".reveal");
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 5. Interaktivna Dinamička Meni Navigacija (Tab / Accordion Sistem)
    const quickBtns = document.querySelectorAll('.quick-btn');
    const categoryItems = document.querySelectorAll('.menu-category-item');
    const meniSection = document.getElementById('meni');

    quickBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetCategory = btn.getAttribute('data-category');

            // Ukloni active klasu sa svih dugmadi i kategorija
            quickBtns.forEach(b => b.classList.remove('active'));
            categoryItems.forEach(item => item.classList.remove('active'));

            // Aktivirej kliknuto dugme i odgovarajuću kategoriju
            btn.classList.add('active');
            const activeCategoryItem = document.getElementById(targetCategory);
            if(activeCategoryItem) {
                activeCategoryItem.classList.add('active');
            }

            // Pozicioniraj ekran na početak Meni sekcije da ne skroluje daleko
            const headerOffset = 120;
            const elementPosition = meniSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // 6. Floating Particles u Hero Sekciji
    const particlesContainer = document.getElementById('particles-js');
    const particleCount = window.innerWidth > 768 ? 40 : 15;

    for(let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'var(--primary-red)';
        particle.style.borderRadius = '50%';
        particle.style.bottom = '-10px';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.opacity = Math.random();
        particle.style.boxShadow = '0 0 10px var(--primary-red)';
        
        let duration = Math.random() * 10 + 5; 
        let delay = Math.random() * 5;
        
        particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
        particlesContainer.appendChild(particle);
    }
});
