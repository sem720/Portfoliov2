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
  const portfolioScreen = document.querySelector('.overlay');
  if (portfolioScreen.classList.contains('close')) {
      portfolioScreen.classList.remove('close');
      portfolioScreen.classList.add('open');
  } else {
      portfolioScreen.classList.add('close');
      portfolioScreen.classList.remove('open');
  }
}



/* Picture Animation */

const firstImg = document.querySelector('.first-img');
const header = document.querySelector('header');
const layoutStart = document.querySelector('.Layout-Start');
const start = layoutStart.offsetTop;  
const stop = start + layoutStart.offsetHeight;  

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;  

    
    if (scrollTop + window.innerHeight >= stop) {
        
        header.style.position = 'sticky';
        header.style.top = '0'; // header is sticky outside div
    } else {
        // header is fixed inside div
        header.style.position = 'fixed';
        header.style.top = '0'; 
    }

    
    const delta = scrollTop - start;
    const scale = Math.max(1 - (delta) / 2200, 0.7);
    firstImg.style.transform = `scale(${scale})`;
    header.style.transform = `scale(${scale})`;  
});

/* Project Pictures */



/* Project Pictures */
// Alle Bilder mit der ID #img-project auswählen
const projectImages = document.querySelectorAll('#img-project');
const layoutProjects = document.querySelectorAll('.Layout-Project');

layoutProjects.forEach((layoutProject, index) => {
    const imgProject = projectImages[index]; // Bild zugehörig zum Container
    const start = layoutProject.offsetTop;  // Startposition des Containers
    const stop = start + layoutProject.offsetHeight;  // Endposition des Containers
    
    // Zu Beginn eine Scale von 0.7 setzen
    imgProject.style.transform = 'scale(0.7)';
    
    // Scroll-Event hinzufügen
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;

        // Berechnen, ob das Bild in den sichtbaren Bereich des Bildschirms kommt
        if (scrollTop + window.innerHeight >= stop) {
            // Bei Erreichen der Endposition des Containers, Bild wird sticky
            imgProject.style.position = 'sticky';
            imgProject.style.top = '0';
        } else {
            // Solange der Container im Bildbereich ist, wird das Bild skalieren
            imgProject.style.position = 'relative';
        }

        // Delta berechnen (scrollen im Container)
        const delta = scrollTop - start;
        // Berechnung der Skalierung von 0.7 bis 1
        const scale = Math.min(1 + delta / 2200, 1); // Anfang bei 0.7, max. bei 1
        imgProject.style.transform = `scale(${scale}) !important`;
    });
});
