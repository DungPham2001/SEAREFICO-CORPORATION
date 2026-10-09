(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  const year = document.getElementById("year");
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const navLinks = nav ? nav.querySelectorAll('a[href^="#"]') : [];

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function closeMenu() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      const offset = header ? header.offsetHeight + 8 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      history.replaceState(null, "", id);
    });
  });

  const sections = ["home", "about", "services", "projects", "contact"]
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  function setActiveNav() {
    const offset = (header ? header.offsetHeight : 0) + 24;
    let current = "home";
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= offset) current = section.id;
    });
    navLinks.forEach(function (link) {
      const href = link.getAttribute("href");
      link.classList.toggle("is-active", href === "#" + current);
    });
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const service = String(data.get("service") || "General inquiry").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !email || !message) {
        if (status) {
          status.hidden = false;
          status.textContent = "Please complete name, email, and message.";
        }
        return;
      }

      const subject = encodeURIComponent("SEAREFICO inquiry — " + service);
      const body = encodeURIComponent(
        "Name: " +
          name +
          "\nEmail: " +
          email +
          "\nPhone: " +
          (phone || "Not provided") +
          "\nSystem of interest: " +
          service +
          "\n\n" +
          message
      );

      window.location.href = "mailto:sincely2233@gmail.com?subject=" + subject + "&body=" + body;

      if (status) {
        status.hidden = false;
        status.textContent = "Opening your email app to send this message.";
      }
    });
  }
})();
