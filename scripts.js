(function() {
  // Loader
  window.addEventListener('load', function() {
    setTimeout(() => {
      document.getElementById('loader').style.opacity = '0';
      document.getElementById('loader').style.visibility = 'hidden';
    }, 500);
  });

  // Progress bar
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', function() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // Navbar background on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Back to top button
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Elementos del menú responsivo
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const menuOverlay = document.getElementById('menu-overlay');

  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isActive = navLinks.classList.contains('active');
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
      if (menuOverlay) {
        menuOverlay.classList.toggle('active');
      }
      document.body.style.overflow = isActive ? '' : 'hidden';
    });
  }

  // Cerrar menú al hacer clic en overlay
  if (menuOverlay) {
    menuOverlay.addEventListener('click', function() {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('open');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Cerrar menú al hacer clic en un enlace (excepto dropdown)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      // Si es el enlace del dropdown en móvil, prevenir salto y toggle submenú
      if (link.closest('.dropdown') && window.innerWidth <= 992) {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = link.closest('.dropdown');
        dropdown.classList.toggle('active');
        return;
      }
      // Para otros enlaces, cerrar menú
      if (window.innerWidth <= 992 && !link.closest('.dropdown')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Cerrar menú al redimensionar a desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('open');
      if (menuOverlay) menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
      // Resetear dropdowns activos
      document.querySelectorAll('.dropdown.active').forEach(d => d.classList.remove('active'));
    }
  });

  // Intersection Observer para animaciones reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });

  reveals.forEach(r => observer.observe(r));

  // Animación de barras de habilidades cuando sean visibles
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillsSection = document.getElementById('skills');
  let animated = false;

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          skillBars.forEach(bar => {
            const width = bar.dataset.width || '0%';
            bar.style.width = width;
          });
          animated = true;
        }
      });
    }, { threshold: 0.5 });

    skillsObserver.observe(skillsSection);
  }

  // Prevenir envío del formulario (demostración)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Gracias por tu mensaje. Te contactaré a la brevedad (simulación).');
    });
  }
})();