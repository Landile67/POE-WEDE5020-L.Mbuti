document.addEventListener("DOMContentLoaded", () => {
    // Dynamically update copyright year if needed
    const yearSpan = document.querySelector(".copyright");
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = `&copy; ${currentYear} Green Haven Dog Rescue.`;
    }

});