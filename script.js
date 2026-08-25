const yearNodes = document.querySelectorAll("[data-year]");

yearNodes.forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

const heroVideo = document.querySelector(".hero-video__media");

if (heroVideo instanceof HTMLVideoElement) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const syncHeroPlayback = () => {
    if (prefersReducedMotion.matches) {
      heroVideo.pause();
      return;
    }

    heroVideo.play().catch(() => {
      // Autoplay can be blocked until a later user gesture; keep the poster visible.
    });
  };

  syncHeroPlayback();
  prefersReducedMotion.addEventListener("change", syncHeroPlayback);
}
