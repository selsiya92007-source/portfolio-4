
// ===== MOBILE NAVIGATION =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );
});

navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
    });
});

// ===== ACTIVE NAVIGATION =====
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navItems.forEach(function (link) {
                    const active =
                        link.getAttribute("href") === "#" + entry.target.id;

                    link.classList.toggle("active", active);
                });
            }
        });
    }, {
        rootMargin: "-20% 0px -65% 0px"
    });

    sections.forEach(function (section) {
        observer.observe(section);
    });
}

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
            const show =
                filter === "all" ||
                card.dataset.category === filter;

            card.hidden = !show;
        });
    });
});

// ===== PROJECT DETAILS =====
document.querySelectorAll(".details-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        const card = button.closest(".project-card");
        const details = card.querySelector(".extra-details");

        const expanded =
            button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", String(!expanded));
        details.hidden = expanded;
        button.textContent = expanded ? "+" : "−";

        button.setAttribute(
            "aria-label",
            expanded ? "Show project details" : "Hide project details"
        );
    });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    formMessage.textContent =
        "Thank you! Your form is valid. No message has been sent yet.";

    contactForm.reset();
});

// ===== AUTOMATIC FOOTER YEAR =====
document.getElementById("year").textContent =
    new Date().getFullYear();
