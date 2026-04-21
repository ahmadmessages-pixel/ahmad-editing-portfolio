const projectCards = document.querySelectorAll(".project-card");

if ("IntersectionObserver" in window) {
  const cardObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 80}ms`;
    cardObserver.observe(card);
  });
} else {
  projectCards.forEach((card) => card.classList.add("visible"));
}

const fadeSections = [
  document.getElementById("about"),
  document.getElementById("project"),
  document.getElementById("contact"),
].filter(Boolean);

fadeSections.forEach((section) => section.classList.add("fade-section"));

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeSections.forEach((section, index) => {
    section.style.transitionDelay = `${index * 120}ms`;
    sectionObserver.observe(section);
  });
} else {
  fadeSections.forEach((section) => section.classList.add("in-view"));
}

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  const nameInput = contactForm.querySelector("#name");
  const emailInput = contactForm.querySelector("#email");
  const subjectInput = contactForm.querySelector("#subject");
  const messageInput = contactForm.querySelector("#message");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showError = (field, message) => {
    if (!field) return;
    field.classList.add("input-invalid");

    let errorEl = field.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains("field-error")) {
      errorEl = document.createElement("small");
      errorEl.className = "field-error";
      field.insertAdjacentElement("afterend", errorEl);
    }
    errorEl.textContent = message;
  };

  const clearError = (field) => {
    if (!field) return;
    field.classList.remove("input-invalid");

    const errorEl = field.nextElementSibling;
    if (errorEl && errorEl.classList.contains("field-error")) {
      errorEl.remove();
    }
  };

  [nameInput, emailInput, subjectInput, messageInput].forEach((field) => {
    field?.addEventListener("input", () => clearError(field));
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    const nameValue = nameInput?.value.trim() ?? "";
    const emailValue = emailInput?.value.trim() ?? "";
    const subjectValue = subjectInput?.value.trim() ?? "";
    const messageValue = messageInput?.value.trim() ?? "";

    if (!nameValue) {
      showError(nameInput, "Please enter your name.");
      isValid = false;
    }

    if (!emailValue) {
      showError(emailInput, "Please enter your e-mail.");
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      showError(emailInput, "Please enter a valid e-mail address.");
      isValid = false;
    }

    if (!messageValue) {
      showError(messageInput, "Please enter your message.");
      isValid = false;
    }

    if (!subjectValue) {
      showError(subjectInput, "Please enter a subject.");
      isValid = false;
    }

    if (!isValid) return;

    alert("Thank you for your message!");
    contactForm.reset();
  });
}

const backToTopBtn = document.getElementById("backToTopBtn");

if (backToTopBtn) {
  const toggleBackToTop = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  };

  window.addEventListener("scroll", toggleBackToTop);
  toggleBackToTop();

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

const themeToggleBtn = document.getElementById("themeToggleBtn");

if (themeToggleBtn) {
  const toggleIcon = themeToggleBtn.querySelector("i");
  const toggleText = themeToggleBtn.querySelector("span");
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  const refreshToggleUI = () => {
    const isDark = document.body.classList.contains("dark-theme");
    if (toggleIcon) {
      toggleIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
    if (toggleText) {
      toggleText.textContent = isDark ? "Light" : "Dark";
    }
    themeToggleBtn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  };

  refreshToggleUI();

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    refreshToggleUI();
  });
}

const typingTextEl = document.getElementById("typingText");

if (typingTextEl) {
  const words = ["video editor", "Designer", "Creator"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeEffect = () => {
    const currentWord = words[wordIndex];
    typingTextEl.textContent = currentWord.slice(0, charIndex);

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex += 1;
      setTimeout(typeEffect, 95);
      return;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }

    if (isDeleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(typeEffect, 55);
      return;
    }

    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 200);
  };

  typeEffect();
}
