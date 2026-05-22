// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animate-on-scroll elements
document.querySelectorAll('.animate-on-scroll, .timeline-item, .project-card, .edu-card').forEach(el => {
  observer.observe(el);
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-right form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name') || 'Not provided',
      email: formData.get('email') || 'Not provided',
      subject: formData.get('subject') || 'Portfolio Inquiry',
      message: formData.get('message') || 'No message'
    };

    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.background = 'var(--green-500)';
    
    // Log form data (in production, send to backend)
    console.log('Form Submission:', data);

    // Reset form
    setTimeout(() => {
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
    }, 2000);
  });
}

// Active Navigation Link Tracking
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = 'var(--text2)';
    if (link.getAttribute('href').slice(1) === current) {
      link.style.color = 'var(--accent)';
    }
  });
});

// Skills Chip Click Animation
document.querySelectorAll('.skill-chip').forEach(chip => {
  chip.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 150);
  });
});

// Timeline Item Stagger Animation
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.1}s`;
});

// Project Card Stagger Animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

// Education Card Stagger Animation
const eduCards = document.querySelectorAll('.edu-card');
eduCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

// Back to Top Button (optional enhancement)
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.style.cssText = `
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: var(--accent);
  color: #022c22;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  display: none;
  z-index: 99;
  transition: all 0.3s;
  box-shadow: 0 0 20px rgba(16,185,129,0.25);
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = 'flex';
    backToTopBtn.style.alignItems = 'center';
    backToTopBtn.style.justifyContent = 'center';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

backToTopBtn.addEventListener('mouseover', function() {
  this.style.background = 'var(--green-400)';
  this.style.transform = 'scale(1.1)';
});

backToTopBtn.addEventListener('mouseout', function() {
  this.style.background = 'var(--accent)';
  this.style.transform = 'scale(1)';
});

// Navbar scroll effect
const nav = document.querySelector('nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
  } else {
    nav.style.boxShadow = 'none';
  }
  
  lastScrollTop = scrollTop;
});

// Add ripple effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .contact-link').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255,255,255,0.5);
      border-radius: 50%;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      animation: ripple-animation 0.6s ease-out;
    `;

    if (!this.style.position || this.style.position === 'static') {
      this.style.position = 'relative';
    }
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Ripple animation keyframes
if (!document.querySelector('style[data-ripple]')) {
  const style = document.createElement('style');
  style.setAttribute('data-ripple', 'true');
  style.textContent = `
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Typed effect for hero title (optional)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const originalText = heroTitle.textContent;
  heroTitle.textContent = '';
  
  let index = 0;
  const typeSpeed = 50;
  
  function typeText() {
    if (index < originalText.length) {
      heroTitle.textContent += originalText.charAt(index);
      index++;
      setTimeout(typeText, typeSpeed);
    }
  }
  
  // Start typing when page loads
  window.addEventListener('load', () => {
    setTimeout(typeText, 500);
  });
}

console.log('Portfolio interactivity loaded successfully! 🚀');
