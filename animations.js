/* Preloader */

function showPreloader(duration) {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.style.display = "flex";

    setTimeout(() => {
      preloader.classList.add("hidden");
      setTimeout(() => {
        preloader.style.display = "none";
        document.body.classList.add("loaded");
      }, 300);
    }, duration);
  } else {
    console.error("Preloader element not found!");
  }
}

window.addEventListener("load", () => {
  showPreloader(2000); // preloader time
});

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

/* Overlay About Me */

function toggleOverlay() {
  const portfolioScreen = document.querySelector(".overlay");
  if (portfolioScreen.classList.contains("close")) {
    portfolioScreen.classList.remove("close");
    portfolioScreen.classList.add("open");
  } else {
    portfolioScreen.classList.add("close");
    portfolioScreen.classList.remove("open");
  }
}

/* Picture Animation */

const firstImg = document.querySelector(".first-img");
const header = document.querySelector("header");
const layoutStart = document.querySelector(".Layout-Start");
const start = layoutStart.offsetTop;
const stop = start + layoutStart.offsetHeight;

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;

  if (scrollTop + window.innerHeight >= stop) {
    header.style.position = "sticky";
    header.style.top = "0";
  } else {
    header.style.position = "fixed";
    header.style.top = "0";
  }

  const delta = scrollTop - start;
  const scale = Math.max(1 - delta / 2200, 0.7);
  firstImg.style.transform = `scale(${scale})`;
  header.style.transform = `scale(${scale})`;
});

/* Project Pictures */
function setupScrollAnimation() {
  const projects = document.querySelectorAll(".Layout-Project");

  window.addEventListener("scroll", () => {
    projects.forEach((project) => {
      const imgDiv = project.querySelector(".img-project-div");
      const rect = project.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = Math.min(
        Math.max((windowHeight - rect.top) / rect.height, 0),
        1
      );

      const scale = 0.7 + progress * 0.3;

      imgDiv.style.transform = `scale(${scale})`;
    });
  });
}

setupScrollAnimation();
