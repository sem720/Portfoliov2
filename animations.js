/* Animation Mouse Movement */

const container = document.querySelector("header");
const svg = document.querySelector(".trail");
const path = document.querySelector("path");

let points = [];
let segments = 20;
let mouse = { x: 0, y: 0 };

const move = (event) => {
  const rect = container.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
    mouse.x = x;
    mouse.y = y;

    if (points.length === 0) {
      for (let i = 0; i < segments; i++) {
        points.push({ x: x, y: y });
      }
    }
  }
};

const anim = () => {
  let px = mouse.x;
  let py = mouse.y;

  points.forEach((p, index) => {
    p.x = px;
    p.y = py;

    let n = points[index + 1];
    if (n) {
      px = px - (p.x - n.x) * 0.6;
      py = py - (p.y - n.y) * 0.6;
    }
  });

  // Stelle sicher, dass points nicht leer ist, bevor du das Attribut setzt
  if (points.length > 0) {
    path.setAttribute(
      "d",
      `M ${points.map((p) => `${p.x} ${p.y}`).join(` L `)}`
    );
  }

  requestAnimationFrame(anim);
};

const resize = () => {
  const rect = container.getBoundingClientRect();
  svg.style.width = rect.width + "px";
  svg.style.height = rect.height + "px";
  svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
};

container.addEventListener("mousemove", move);
window.addEventListener("resize", resize);

anim();
resize();

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
  showPreloader(4000); // preloader time
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

const firstImg = document.querySelector(".wallpaper-div");
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
  const scaleFactor = window.innerHeight * 2;
  const scale = Math.max(1 - delta / scaleFactor, 0.7);

  firstImg.style.transform = `scale(${scale})`;
  header.style.transform = `scale(${scale})`;
  svg.style.display = `none`;
  path.style.display = `none`;
});

function setOpacityAtTop(element) {
  window.addEventListener("scroll", () => {
    if (window.scrollY === 0) {
      svg.style.display = `flex`;
      path.style.display = `flex`;
    }
  });
}

setOpacityAtTop();

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

/* Magnet effect */

const magnets = document.querySelectorAll(".nav-button");

const activateMagnet = (event, magnet, magnetToText) => {
  const boundBox = magnet.getBoundingClientRect();
  const newX = (event.clientX - boundBox.left) / magnet.offsetWidth - 0.5;
  const newY = (event.clientY - boundBox.top) / magnet.offsetHeight - 0.5;
  const magnetToStrenght = 20;
  const magnetToTextStrenght = 30;

  gsap.to(magnet, {
    duration: 1,
    x: newX * magnetToStrenght,
    y: newY * magnetToStrenght,
    ease: "power4.out",
  });

  gsap.to(magnetToText, {
    duration: 1,
    x: newX * magnetToTextStrenght,
    y: newY * magnetToTextStrenght,
    ease: "power4.out",
  });
};

const resetMagnet = (magnet, magnetToText) => {
  gsap.to(magnet, {
    duration: 1,
    x: 0,
    y: 0,
    ease: "elastic.out",
  });

  gsap.to(magnetToText, {
    duration: 1,
    x: 0,
    y: 0,
    ease: "elastic.out",
  });
};

// Für jedes `.nav-button`-Element den Effekt registrieren
magnets.forEach((magnet) => {
  const magnetToText = magnet.querySelector(".text");

  magnet.addEventListener("mousemove", (event) =>
    activateMagnet(event, magnet, magnetToText)
  );
  magnet.addEventListener("mouseleave", () =>
    resetMagnet(magnet, magnetToText)
  );
});
