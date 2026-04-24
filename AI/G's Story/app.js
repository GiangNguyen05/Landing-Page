document.addEventListener("DOMContentLoaded", () => {
    const revealEls = document.querySelectorAll("[data-reveal]");
    const groupOffsets = {};
  
    revealEls.forEach((el, i) => {
      const group = el.dataset.group || `single-${i}`;
      groupOffsets[group] = (groupOffsets[group] ?? -1) + 1;
      const step = groupOffsets[group];
      const delay = Math.min(step * 90, 450);
      el.style.setProperty("--delay", `${delay}ms`);
    });
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );
  
    revealEls.forEach((el) => observer.observe(el));
  });