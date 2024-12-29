const menu = document.getElementById("menu");
const closeButton = document.getElementById("close-mobile");
const nav = document.getElementById("nav-mobile");
const navLink = document.querySelectorAll(".nav-link");

menu.addEventListener("click", () => {
  nav.classList.add("show");
});

closeButton.addEventListener("click", () => {
  nav.classList.remove("show");
});

navLink.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
  });
});

particlesJS("particles-global", {
  "particles": {
      "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": "#ffffff" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.5 },
      "size": { "value": 3, "random": true },
      "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
      "move": { "enable": true, "speed": 2, "direction": "none" }
  },
  "interactivity": {
      "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } }
  },
  "retina_detect": true
});
/*
// Particles for About Section

particlesJS("particles-about", {
  "particles": {
      "number": { "value": 50, "density": { "enable": true, "value_area": 600 } },
      "color": { "value": "#ff5733" },
      "shape": { "type": "triangle" },
      "opacity": { "value": 0.7 },
      "size": { "value": 4, "random": true },
      "line_linked": { "enable": false },
      "move": { "enable": true, "speed": 3, "direction": "top" }
  }
});

// Particles for Projects Section
particlesJS("particles-projects", {
  "particles": {
      "number": { "value": 75, "density": { "enable": true, "value_area": 700 } },
      "color": { "value": "#00bfff" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.6 },
      "size": { "value": 2, "random": true },
      "line_linked": { "enable": true, "distance": 100, "color": "#00bfff", "opacity": 0.5 },
      "move": { "enable": true, "speed": 1, "direction": "none" }
  }
});
*/
const particleContainer = document.getElementById('interactive-background');

// Create particles
for (let i = 0; i < 100; i++) {
    const particle = document.createElement('div');
    particle.className = 'interactive-element';
    particleContainer.appendChild(particle);
}

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.interactive-element');
    particles.forEach((particle, index) => {
        const delay = index * 5;
        particle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        particle.style.transitionDelay = `${delay}ms`;
    });
});

// Ensure particles stay visible while scrolling
window.addEventListener('scroll', () => {
    particleContainer.style.height = `${document.body.scrollHeight}px`;
});

window.onload = () => {
  const bodyHeight = document.body.scrollHeight;
  particleContainer.style.height = `${bodyHeight}px`;
};


// Adjust the height of the particle container to match the document height
function adjustParticleContainer() {
    particleContainer.style.height = `${document.body.scrollHeight}px`;
}

// Call the function on page load and resize
window.onload = adjustParticleContainer;
window.onresize = adjustParticleContainer;

