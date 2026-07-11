// ==========================================
// MOBILE SIDEBAR
// ==========================================

const menuBtn = document.querySelector(".menu-icon");
const sideNavbar = document.querySelector(".side-navbar");
const closeBtn = document.querySelector(".close-btn");

if (menuBtn && sideNavbar) {

    menuBtn.addEventListener("click", () => {

        sideNavbar.classList.remove("-left-80");
        sideNavbar.classList.add("left-0");

    });

}

if (closeBtn && sideNavbar) {

    closeBtn.addEventListener("click", () => {

        sideNavbar.classList.remove("left-0");
        sideNavbar.classList.add("-left-80");

    });

}

// ==========================================
// HERO SLIDER
// ==========================================

const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

if (slides.length > 0) {

    let currentSlide = 0;

    function showSlide(index) {

        slides.forEach((slide) => {

            slide.classList.remove("active");
            slide.classList.add("hidden");

        });

        slides[index].classList.remove("hidden");
        slides[index].classList.add("active");

    }

    // Show first slide

    showSlide(currentSlide);

    // Next

    if (next) {

        next.addEventListener("click", () => {

            currentSlide++;

            if (currentSlide >= slides.length) {

                currentSlide = 0;

            }

            showSlide(currentSlide);

        });

    }

    // Previous

    if (prev) {

        prev.addEventListener("click", () => {

            currentSlide--;

            if (currentSlide < 0) {

                currentSlide = slides.length - 1;

            }

            showSlide(currentSlide);

        });

    }

    // Auto Slide

    setInterval(() => {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }, 4000);

}
// ==========================================
// COLLECTIONS PAGE
// SEARCH + FILTER
// ==========================================

const searchInput = document.getElementById("search");
const productCards = document.querySelectorAll(".product");
const filterCheckboxes = document.querySelectorAll(".filter-checkbox");

if (searchInput && productCards.length > 0) {

    function filterProducts() {

        const searchValue = searchInput.value.toLowerCase().trim();

        const selectedFilters = [];

        document.querySelectorAll(".filter-checkbox:checked").forEach((checkbox) => {
            selectedFilters.push(checkbox.value.toLowerCase());
        });

        productCards.forEach((product) => {

            const productName = product.dataset.name.toLowerCase();
            const productCategory = product.dataset.category.toLowerCase();

            const searchMatch = productName.includes(searchValue);

            let filterMatch = true;

            if (selectedFilters.length > 0) {

                filterMatch = selectedFilters.every((item) =>
                    productCategory.includes(item)
                );

            }

            if (searchMatch && filterMatch) {

                product.classList.remove("hidden");

            } else {

                product.classList.add("hidden");

            }

        });

    }

    // Live Search

    searchInput.addEventListener("input", filterProducts);

    // Checkbox Filter

    filterCheckboxes.forEach((checkbox) => {

        checkbox.addEventListener("change", filterProducts);

    });

}
// ==========================================
// CONTACT PAGE VALIDATION
// ==========================================

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const subjectError = document.getElementById("subject-error");
    const messageError = document.getElementById("message-error");

    // Name Validation

    function validateName() {

        const value = nameInput.value.trim();

        if (value === "") {

            nameError.textContent = "Name is required";
            return false;

        }

        if (value.length < 3) {

            nameError.textContent = "Minimum 3 characters";
            return false;

        }

        nameError.textContent = "";
        return true;

    }

    // Email Validation

    function validateEmail() {

        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailInput.value.trim() === "") {

            emailError.textContent = "Email is required";
            return false;

        }

        if (!pattern.test(emailInput.value)) {

            emailError.textContent = "Enter a valid email";
            return false;

        }

        emailError.textContent = "";
        return true;

    }

    // Subject Validation

    function validateSubject() {

        if (subjectInput.value.trim() === "") {

            subjectError.textContent = "Subject is required";
            return false;

        }

        subjectError.textContent = "";
        return true;

    }

    // Message Validation

    function validateMessage() {

        const value = messageInput.value.trim();

        if (value === "") {

            messageError.textContent = "Message is required";
            return false;

        }

        if (value.length < 10) {

            messageError.textContent = "Minimum 10 characters";
            return false;

        }

        messageError.textContent = "";
        return true;

    }

    // Real-time Validation

    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    subjectInput.addEventListener("input", validateSubject);
    messageInput.addEventListener("input", validateMessage);

    // Submit

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const isValid =
            validateName() &&
            validateEmail() &&
            validateSubject() &&
            validateMessage();

        if (isValid) {

            alert("Message sent successfully!");

            contactForm.reset();

        }

    });

}