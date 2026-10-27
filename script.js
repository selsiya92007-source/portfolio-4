// ===== MOBILE NAVIGATION =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile navigation after selecting a section
document.querySelectorAll("#navLinks a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    });
});

// ===== LIGHT AND DARK THEME =====
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
    const isDark = document.body.classList.toggle("dark-theme");

    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );
});

// ===== PROJECT FILTERS =====
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const filter = button.dataset.filter;

        filterButtons.forEach(function (item) {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        projectCards.forEach(function (card) {
            const matches =
                filter === "all" || card.dataset.category === filter;

            card.hidden = !matches;
        });
    });
});

// ===== EXPAND PROJECT DETAILS =====
document.querySelectorAll(".details-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.closest(".project-card");
        const details = card.querySelector(".extra-details");

        const isExpanded =
            button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", String(!isExpanded));
        details.hidden = isExpanded;

        button.textContent = isExpanded ? "→" : "×";
        button.setAttribute(
            "aria-label",
            isExpanded ? "Show project details" : "Hide project details"
        );
    });
});

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    formMessage.textContent =
        "Thank you! Your form is valid. No message has been sent.";

    contactForm.reset();
});

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById("backToTop");

function updateBackToTop() {
    backToTop.classList.toggle("show", window.scrollY > 300);
}

window.addEventListener("scroll", updateBackToTop, {
    passive: true
});

updateBackToTop();

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ===== CURRENT NAVIGATION HIGHLIGHT =====
const pageSections = document.querySelectorAll("main section[id]");
const pageLinks = document.querySelectorAll("#navLinks a");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    pageLinks.forEach(function (link) {
                        const isCurrent =
                            link.getAttribute("href") ===
                            "#" + entry.target.id;

                        link.classList.toggle("active", isCurrent);
                    });
                }
            });
        },
        {
            rootMargin: "-20% 0px -65% 0px"
        }
    );

    pageSections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}

// ===== AUTOMATIC FOOTER YEAR =====
document.getElementById("year").textContent =
    new Date().getFullYear();