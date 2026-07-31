document.addEventListener("DOMContentLoaded", () => {
    
    // Sticky Header prilikom skrolovanja
    const header = document.getElementById("header");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });

    // Mobilni Meni (Hamburger toggle)
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links li a");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        
        // Promena ikonice hamburger/x
        const icon = hamburger.querySelector("i");
        if(navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });

    // Zatvaranje menija na klik na link
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.querySelector("i").classList.remove("fa-times");
            hamburger.querySelector("i").classList.add("fa-bars");
        });
    });

    // Scroll Animacije (Intersection Observer)
    const reveals = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Animira samo jednom
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

});