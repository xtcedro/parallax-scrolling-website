export function initAnimations() {
    const fadeElements = document.querySelectorAll(".fade-in");
    const hero = document.querySelector(".hero");
    const heroBanner = document.querySelector(".hero-banner");

    // Intersection Observer for fade-in elements
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible", "glow-effect"); // ✅ Add glow effect
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% is visible

    fadeElements.forEach(el => observer.observe(el));

    // Directly add animation & glow class for hero section on load
    if (hero) hero.classList.add("visible", "glow-effect");
    if (heroBanner) heroBanner.classList.add("visible", "glow-effect");
}