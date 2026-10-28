document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize EmailJS with your Public Key
    const PUBLIC_KEY = "K5S9kYKzmNQOuz4qO"; // Replace with your EmailJS Public Key
    const SERVICE_ID = "service_83q6kia"; // Replace with your EmailJS Service ID
    const TEMPLATE_ID = "template_iti6dno"; // Replace with your EmailJS Template ID

    if (typeof emailjs !== "undefined") {
        emailjs.init({ publicKey: PUBLIC_KEY });
    }

    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent default browser submit

            let isValid = true;

            // --- Field Validations ---
            
            // Validate Name / Full Name / First Name / Last Name
            const nameInputs = form.querySelectorAll('input[id*="name"], input[name="firstname"], input[name="lastname"], input[id="fname"], input[id="lname"]');
            nameInputs.forEach((input) => {
                if (input.value.trim().length < 2) {
                    isValid = false;
                    showError(input, "Must be at least 2 characters long.");
                } else {
                    clearError(input);
                }
            });

            // Validate Email
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput) {
                const emailRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;
                if (!emailRegex.test(emailInput.value.trim())) {
                    isValid = false;
                    showError(emailInput, "Please enter a valid email address.");
                } else {
                    clearError(emailInput);
                }
            }

            // Validate Phone Number
            const phoneInput = form.querySelector('input[type="tel"]');
            if (phoneInput) {
                const phoneRegex = /^[+]?[\d\s\-()]{10,15}$/;
                if (!phoneRegex.test(phoneInput.value.trim())) {
                    isValid = false;
                    showError(phoneInput, "Please enter a valid phone number.");
                } else {
                    clearError(phoneInput);
                }
            }

            // Validate Service Dropdown (Enquiry Form)
            const serviceSelect = form.querySelector('select');
            if (serviceSelect && serviceSelect.hasAttribute('required')) {
                if (serviceSelect.value === "") {
                    isValid = false;
                    showError(serviceSelect, "Please select an available service.");
                } else {
                    clearError(serviceSelect);
                }
            }

            // Validate Message Textarea
            const textarea = form.querySelector("textarea");
            if (textarea && (textarea.hasAttribute("required") || textarea.value.trim().length > 0)) {
                if (textarea.value.trim().length < 10) {
                    isValid = false;
                    showError(textarea, "Message must be at least 10 characters long.");
                } else {
                    clearError(textarea);
                }
            }

            // --- EmailJS Submission ---
            if (isValid) {
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn ? submitBtn.textContent : "Submit";

                if (submitBtn) {
                    submitBtn.textContent = "Sending...";
                    submitBtn.disabled = true;
                }

                emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
                    .then((response) => {
                        alert("Thank you! Your submission has been sent successfully.");
                        form.reset();
                        clearAllBorders(form);
                    })
                    .catch((error) => {
                        console.error("EmailJS Error:", error);
                        alert("Failed to send submission. Please try again later.");
                    })
                    .finally(() => {
                        if (submitBtn) {
                            submitBtn.textContent = originalBtnText;
                            submitBtn.disabled = false;
                        }
                    });
            }
        });
    });

    function showError(inputElement, message) {
        inputElement.style.borderColor = "#e74c3c";
        let errorSpan = inputElement.parentElement.querySelector(".error-message");
        if (!errorSpan) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message");
            errorSpan.style.cssText = "color: #e74c3c; font-size: 0.85rem; margin-top: 4px; display: block;";
            inputElement.parentElement.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
        errorSpan.style.display = "block";
    }

    function clearError(inputElement) {
        inputElement.style.borderColor = "#2ecc71";
        const errorSpan = inputElement.parentElement.querySelector(".error-message");
        if (errorSpan) {
            errorSpan.textContent = "";
            errorSpan.style.display = "none";
        }
    }

    function clearAllBorders(form) {
        const inputs = form.querySelectorAll("input, select, textarea");
        inputs.forEach(input => input.style.borderColor = "#ddd");
    }
});