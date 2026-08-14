const yearNodes = document.querySelectorAll("[data-year]");
yearNodes.forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

const onScroll = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const open = primaryNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    menuToggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "メニューを開く");
    });
  });
}

const revealNodes = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );
  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

const track = document.querySelector("[data-hero-track]");
const slides = track ? Array.from(track.querySelectorAll(".hero-slide")) : [];
const prevBtn = document.querySelector("[data-hero-prev]");
const nextBtn = document.querySelector("[data-hero-next]");
const dotsWrap = document.querySelector("[data-hero-dots]");

if (slides.length > 0) {
  let index = slides.findIndex((slide) => slide.classList.contains("is-active"));
  if (index < 0) index = 0;
  let timerId = null;

  const dots = slides.map((_, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `スライド ${i + 1}`);
    button.addEventListener("click", () => goTo(i));
    dotsWrap?.appendChild(button);
    return button;
  });

  const render = () => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });
  };

  const goTo = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    render();
    restart();
  };

  const restart = () => {
    if (timerId) window.clearInterval(timerId);
    timerId = window.setInterval(() => goTo(index + 1), 6500);
  };

  prevBtn?.addEventListener("click", () => goTo(index - 1));
  nextBtn?.addEventListener("click", () => goTo(index + 1));

  track?.addEventListener("mouseenter", () => {
    if (timerId) window.clearInterval(timerId);
  });
  track?.addEventListener("mouseleave", restart);

  render();
  restart();
}
