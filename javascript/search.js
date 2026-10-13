document.addEventListener("DOMContentLoaded", () => {
    // 1. Hook into the static search bar in your HTML by its ID
    const searchInput = document.getElementById("site-search-input");
    if (!searchInput) return;

    // 2. Listen for live typing inside the search bar
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        // 3. Target all searchable cards/sections across Services, About, and Home pages
        const cards = document.querySelectorAll(
            ".service-card, .feature-card, .info-card, .about-hero-grid, .stats-bar"
        );

        // 4. Show/hide items dynamically based on match
        cards.forEach((card) => {
            const textContent = card.textContent.toLowerCase();
            if (textContent.includes(query)) {
                card.style.display = ""; // Show matching card
            } else {
                card.style.display = "none"; // Hide non-matching card
            }
        });
    });
});