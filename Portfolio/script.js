/* ==========================
   MATRIX CODE RAIN EFFECT
========================== */
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to full window size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix characters
const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const charArray = chars.split("");
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize drops
for (let i = 0; i < columns; i++) {
  drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
}

function drawMatrix() {
  // Semi-transparent black to create trail effect
  ctx.fillStyle = document.body.hasAttribute('data-theme') && document.body.getAttribute('data-theme') === 'light' 
    ? "rgba(240, 242, 245, 0.05)" 
    : "rgba(5, 5, 8, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = document.body.hasAttribute('data-theme') && document.body.getAttribute('data-theme') === 'light' 
    ? "#3182ce" 
    : "#00ff41";
  ctx.font = `${fontSize}px 'Fira Code', monospace`;
  
  for (let i = 0; i < drops.length; i++) {
    const text = charArray[Math.floor(Math.random() * charArray.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    
    // Reset drop to top when it reaches bottom or randomly
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    
    drops[i]++;
  }
}

// Start the animation
setInterval(drawMatrix, 35);

/* ==========================
   FUN DIGITAL RAIN TRANSITIONS
========================== */
const digitalRainTransition = document.getElementById('digitalRainTransition');
let isTransitioning = false;

function triggerDigitalRainTransition(callback) {
  if (isTransitioning) return;
  
  isTransitioning = true;
  digitalRainTransition.classList.add('active');
  
  // Add random digital particles
  createDigitalParticles();
  
  setTimeout(() => {
    if (callback) callback();
    
    setTimeout(() => {
      digitalRainTransition.classList.remove('active');
      isTransitioning = false;
    }, 600);
  }, 400);
}

function createDigitalParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.style.position = 'fixed';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.pointerEvents = 'none';
  particlesContainer.style.zIndex = '10001';
  
  document.body.appendChild(particlesContainer);
  
  // Create multiple particles
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.background = document.body.hasAttribute('data-theme') && document.body.getAttribute('data-theme') === 'light' 
        ? '#3182ce' 
        : '#00ff41';
      particle.style.borderRadius = '50%';
      particle.style.boxShadow = '0 0 10px currentColor';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = '-10px';
      particle.style.animation = `fallParticle ${0.5 + Math.random() * 0.5}s linear forwards`;
      
      particlesContainer.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1000);
    }, i * 50);
  }
  
  // Remove container after all animations
  setTimeout(() => {
    if (particlesContainer.parentNode) {
      particlesContainer.parentNode.removeChild(particlesContainer);
    }
  }, 1500);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fallParticle {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(110vh) scale(0);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Add transitions to navigation links
document.querySelectorAll('[data-transition]').forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      
      triggerDigitalRainTransition(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    }
  });
});

/* ==========================
   COMBINED THEME TOGGLE (Dark Mode + Matrix Mode)
========================== */
const themeToggle = document.getElementById("theme-toggle");
let isMatrixMode = false;

themeToggle.addEventListener("click", () => {
  if (!isMatrixMode) {
    // First click: Enable Matrix Mode
    isMatrixMode = true;
    document.body.classList.add("matrix-mode");
    themeToggle.textContent = "💡";
    themeToggle.style.background = "var(--accent-primary)";
    themeToggle.style.color = "var(--bg-dark)";
    
    // Enhance matrix rain
    canvas.style.opacity = '0.3';
    
    // Trigger fun transition
    triggerDigitalRainTransition();
  } else {
    // Second click: Toggle between light and dark modes
    const isLightMode = document.body.hasAttribute("data-theme") && 
                        document.body.getAttribute("data-theme") === "light";
    
    if (isLightMode) {
      // Switch to dark mode
      document.body.removeAttribute("data-theme");
      themeToggle.textContent = "🌙";
      themeToggle.style.background = "none";
      themeToggle.style.color = "var(--accent-primary)";
    } else {
      // Switch to light mode
      document.body.setAttribute("data-theme", "light");
      themeToggle.textContent = "☀️";
      themeToggle.style.background = "var(--accent-primary)";
      themeToggle.style.color = "var(--bg-dark)";
    }
    
    // Exit matrix mode
    isMatrixMode = false;
    document.body.classList.remove("matrix-mode");
    canvas.style.opacity = document.body.hasAttribute("data-theme") && 
                          document.body.getAttribute("data-theme") === "light" 
                          ? '0.05' 
                          : '0.15';
    
    // Trigger fun transition
    triggerDigitalRainTransition();
  }
});

/* ==========================
   TYPING EFFECT
========================== */
const typingElement = document.querySelector(".typing");
const phrases = ["Front-End Developer", "UI Engineer", "Web Enthusiast", "Problem Solver"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  typingElement.textContent = currentPhrase.substring(0, charIndex) + "|";

  if (!isDeleting && charIndex < currentPhrase.length) {
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeEffect, 1200);
  }
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', typeEffect);

/* ==========================
   SCROLL REVEAL ANIMATION
========================== */
const revealEls = document.querySelectorAll(".reveal");
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  revealEls.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
// Initial check on page load
revealOnScroll();

/* ==========================
   PROJECT CARDS FUNCTIONALITY - FIXED
========================== */

// SINGLE, CLEAN Live Demo button handler
document.querySelectorAll(".live-demo").forEach(button => {
  button.addEventListener("click", (e) => {
    // Only handle if it's an anchor tag with href
    if (button.tagName === 'A' && button.getAttribute('href')) {
      e.preventDefault();
      e.stopPropagation();
      
      const url = button.getAttribute('href');
      
      // Add click effect
      button.style.transform = 'scale(0.95)';
      
      // Trigger digital rain transition before redirect
      triggerDigitalRainTransition(() => {
        // Restore button appearance
        button.style.transform = '';
        
        // Open URL in new tab after transition
        setTimeout(() => {
          if (url && url !== '#' && url !== '') {
            window.open(url, '_blank', 'noopener,noreferrer');
          }
        }, 100);
      });
    }
  });
});

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function(e) {
    // Only flip if clicking directly on the card (not buttons/links)
    if (!e.target.closest('.card-actions') && 
        !e.target.closest('.live-demo')) {
      const cardInner = this.querySelector('.project-card-inner');
      cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' 
        ? 'rotateY(0deg)' 
        : 'rotateY(180deg)';
    }
  });
});

/* ==========================
   SKILLS BAR ANIMATION
========================== */
const skillBars = document.querySelectorAll(".skill-bar span");
function animateSkills() {
  skillBars.forEach(bar => {
    const percent = bar.getAttribute("data-percent");
    bar.style.width = percent + "%";
  });
}

window.addEventListener("scroll", () => {
  const skillsSection = document.getElementById("skills");
  const sectionTop = skillsSection.getBoundingClientRect().top;
  if (sectionTop < window.innerHeight * 0.9) {
    animateSkills();
  }
});

/* ==========================
   BACK TO TOP BUTTON
========================== */
const backToTop = document.createElement("button");
backToTop.id = "backToTop";
backToTop.textContent = "↑";
backToTop.style.position = "fixed";
backToTop.style.bottom = "30px";
backToTop.style.right = "30px";
backToTop.style.padding = "12px 16px";
backToTop.style.borderRadius = "50%";
backToTop.style.background = "var(--accent-primary)";
backToTop.style.color = "var(--bg-dark)";
backToTop.style.border = "none";
backToTop.style.fontSize = "1.4rem";
backToTop.style.cursor = "pointer";
backToTop.style.display = "none";
backToTop.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
backToTop.style.transition = "0.3s ease";
backToTop.style.zIndex = "999";
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 600 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
  triggerDigitalRainTransition(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/* ==========================
   CONTACT FORM (SIMULATION)
========================== */
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", e => {
  e.preventDefault();
  formMsg.textContent = "Message sent successfully! ✅";
  form.reset();
  setTimeout(() => (formMsg.textContent = ""), 4000);
});

/* ==========================
   COPY EMAIL BUTTON
========================== */
document.getElementById("copyEmail").addEventListener("click", () => {
  navigator.clipboard.writeText("hello@khimjireh.dev");
  formMsg.textContent = "Email copied to clipboard 📋";
  setTimeout(() => (formMsg.textContent = ""), 4000);
});

/* ==========================
   YEAR AUTO UPDATE
========================== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ==========================
   ACTIVE NAV LINK ON SCROLL
========================== */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".primary-nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

/* ==========================
   RANDOM DIGITAL GLITCH EFFECT
========================== */
function triggerRandomGlitch() {
  if (!document.body.classList.contains('matrix-mode')) return;
  
  const glitchDuration = 100 + Math.random() * 200;
  document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
  
  setTimeout(() => {
    document.body.style.filter = 'none';
  }, glitchDuration);
}

// Random glitch effect in matrix mode
setInterval(() => {
  if (document.body.classList.contains('matrix-mode') && Math.random() > 0.7) {
    triggerRandomGlitch();
  }
}, 3000);

// Debug: Check if buttons are being detected
document.addEventListener('DOMContentLoaded', function() {
  const liveDemoButtons = document.querySelectorAll('.live-demo');
  console.log('Found Live Demo buttons:', liveDemoButtons.length);
  
  liveDemoButtons.forEach((button, index) => {
    console.log(`Button ${index + 1}:`, button);
    console.log(`Button ${index + 1} href:`, button.getAttribute('href'));
  });
});