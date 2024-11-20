/* Dom Element Fade in JS */

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.2, 
    }
  );

  elements.forEach((el) => observer.observe(el));
});


/* Picture Animation */

/*

document.addEventListener("scroll", () => {
  const layoutStart = document.querySelector(".Layout-Start");

  // Maximale Scrollhöhe (kann angepasst werden)
  const maxScroll = 500; // Ab wann das Bild nach oben verschwindet
  const scrollY = window.scrollY;

  if (scrollY <= maxScroll) {
      // Prozentsatz der aktuellen Scrollhöhe (zwischen 0 und 1)
      const progress = scrollY / maxScroll;

      // Skalierung: von 1 bis 0.8
      const scale = 1 - progress * 0.2;

      // Position: von translateY(0) bis translateY(-100vh)
      const translateY = -progress * 100;

      // Transform anwenden
      layoutStart.style.transform = `translateY(${translateY}vh) scale(${scale})`;
  } else {
      // Sobald über maxScroll gescrollt wurde, Bild vollständig nach oben verschieben
      layoutStart.style.transform = `translateY(-100vh) scale(0.8)`;
  }
});

*/

/* Overlay About Me */

function toggleOverlay() {
  const portfolioScreen = document.querySelector('.overlay');
  if (portfolioScreen.classList.contains('close')) {
      portfolioScreen.classList.remove('close');
      portfolioScreen.classList.add('open');
  } else {
      portfolioScreen.classList.add('close');
      portfolioScreen.classList.remove('open');
  }
}



