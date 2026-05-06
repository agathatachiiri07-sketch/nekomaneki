const yearNodes = document.querySelectorAll("[data-year]");

yearNodes.forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});
