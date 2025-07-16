lucide.createIcons();

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("font-semibold", "text-black");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("font-semibold", "text-black");
    }
  });
});
