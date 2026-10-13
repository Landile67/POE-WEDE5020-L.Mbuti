document.addEventListener("DOMContentLoaded", () => {
    // Dynamically update copyright year if needed
    const yearSpan = document.querySelector(".copyright");
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = `&copy; ${currentYear} Green Haven Dog Rescue.`;
    }

    // Mobile Navigation Toggle (if a hamburger menu is added later)
    const headerInner = document.querySelector(".header-inner");
    if (headerInner && !document.querySelector(".nav-toggle")) {
        const navToggle = document.createElement("button");
        navToggle.classList.add("nav-toggle");
        navToggle.setAttribute("aria-label", "Toggle Navigation");
        navToggle.innerHTML = "☰";
        
        // Insert toggle before navigation
        const siteNav = document.querySelector(".site-nav");
        if (siteNav) {
            headerInner.insertBefore(navToggle, siteNav);
            
            navToggle.addEventListener("click", () => {
                siteNav.classList.toggle("nav-active");
            });
        }
    }
});