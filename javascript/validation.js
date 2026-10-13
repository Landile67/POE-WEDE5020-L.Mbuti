document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            let isValid = true;

            // Validate Name/First Name / Last Name fields
            const nameInputs = form.querySelectorAll('input[id*="name"], input[name="firstname"], input[name="lastname"], input[id="name"]');
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

            // Validate Textareas (Message)
            const textarea = form.querySelector("textarea");
            if (textarea && textarea.hasAttribute("required") || textarea.value.trim().length > 0) {
                if (textarea.value.trim().length < 10) {
                    isValid = false;
                    showError(textarea, "Message must be at least 10 characters long.");
                } else {
                    clearError(textarea);
                }
            }

            // Prevent submission if validation fails
            if (!isValid) {
                e.preventDefault();
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
    }

    function clearError(inputElement) {
        inputElement.style.borderColor = "#2ecc71";
        const errorSpan = inputElement.parentElement.querySelector(".error-message");
        if (errorSpan) {
            errorSpan.textContent = "";
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Target the enquiry form specifically
    const enquiryForm = document.querySelector(".enquiry-form");
    if (!enquiryForm) return;

    enquiryForm.addEventListener("submit", (e) => {
        let isValid = true;

        // 1. Validate Full Name (at least 3 characters)
        const nameInput = enquiryForm.querySelector("#name");
        if (nameInput) {
            const nameVal = nameInput.value.trim();
            if (nameVal.length < 3) {
                isValid = false;
                showError(nameInput, "Full name must be at least 3 characters long.");
            } else {
                clearError(nameInput);
            }
        }

        // 2. Validate Email Address using standard pattern
        const emailInput = enquiryForm.querySelector("#email");
        if (emailInput) {
            const emailRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;
            if (!emailRegex.test(emailInput.value.trim())) {
                isValid = false;
                showError(emailInput, "Please enter a valid email address.");
            } else {
                clearError(emailInput);
            }
        }

        // 3. Validate Phone Number (10 to 15 digits/chars, optional leading +)
        const phoneInput = enquiryForm.querySelector("#phone");
        if (phoneInput) {
            const phoneRegex = /^[+]?[\d\s\-()]{10,15}$/;
            if (!phoneRegex.test(phoneInput.value.trim())) {
                isValid = false;
                showError(phoneInput, "Please enter a valid phone number (at least 10 digits).");
            } else {
                clearError(phoneInput);
            }
        }

        // 4. Validate Service Selection
        const serviceSelect = enquiryForm.querySelector("#service");
        if (serviceSelect) {
            if (serviceSelect.value === "") {
                isValid = false;
                showError(serviceSelect, "Please select an available service.");
            } else {
                clearError(serviceSelect);
            }
        }

        // 5. Validate Message (at least 10 characters if provided, or required)
        const messageTextarea = enquiryForm.querySelector("#message");
        if (messageTextarea) {
            const msgVal = messageTextarea.value.trim();
            if (msgVal.length > 0 && msgVal.length < 10) {
                isValid = false;
                showError(messageTextarea, "Message must be at least 10 characters long.");
            } else {
                clearError(messageTextarea);
            }
        }

        // Prevent form submission if any validation check fails
        if (!isValid) {
            e.preventDefault();
        }
    });

    // Helper function to display error messages dynamically below fields
    function showError(inputElement, message) {
        inputElement.style.borderColor = "#e74c3c";
        let errorSpan = inputElement.parentElement.querySelector(".error-message");
        if (!errorSpan) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message");
            errorSpan.style.cssText = "color: #e74c3c; font-size: 0.85rem; margin-top: 5px; display: block;";
            inputElement.parentElement.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
    }

    // Helper function to clear error messages
    function clearError(inputElement) {
        inputElement.style.borderColor = "#2ecc71";
        const errorSpan = inputElement.parentElement.querySelector(".error-message");
        if (errorSpan) {
            errorSpan.textContent = "";
        }
    }
});