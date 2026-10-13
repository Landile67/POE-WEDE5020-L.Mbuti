document.addEventListener("DOMContentLoaded", () => {
    // Target service images and about images for the lightbox
    const galleryImages = document.querySelectorAll(".service-image, .about-image-card img");

    if (galleryImages.length === 0) return;

    // Create lightbox container dynamically
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox-modal";
    lightbox.style.cssText = `
        display: none;
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.85);
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `;

    const lightboxImg = document.createElement("img");
    lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 80%;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    `;
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    // Open lightbox on image click
    galleryImages.forEach((img) => {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightbox.style.display = "flex";
        });
    });

    // Close lightbox on click anywhere
    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
});