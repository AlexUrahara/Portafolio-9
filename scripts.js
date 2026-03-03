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
      if (link.closest('.dropdown') && window.innerWidth <= 992) {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = link.closest('.dropdown');
        dropdown.classList.toggle('active');
        return;
      }
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
      document.querySelectorAll('.dropdown.active').forEach(d => d.classList.remove('active'));
    }
  });

  // Intersection Observer para animaciones reveal (entrada y salida)
  const reveals = document.querySelectorAll('.reveal, .reveal-float');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });

  reveals.forEach(r => observer.observe(r));

  // Animación de barras de habilidades
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

  // Formulario demo
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Gracias por tu mensaje. Te contactaré a la brevedad (simulación).');
    });
  }
})();

// ===== MODAL DE SERVICIOS (mejorado) =====
document.addEventListener('DOMContentLoaded', function() {
  // Datos de los servicios
  const servicesData = [
    {
      title: 'Diseño Gráfico Profesional',
      images: [
        'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format',
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format'
      ],
      description: `<p><strong>Branding estratégico:</strong> Creación de identidades de marca únicas y memorables.</p>
        <p><strong>Diseño editorial:</strong> Folletos, revistas, catálogos y libros con maquetación profesional.</p>
        <p><strong>Material publicitario:</strong> Flyers, carteles, banners y piezas para campañas.</p>
        <p><strong>Ilustración personalizada:</strong> Gráficos vectoriales, iconos y elementos visuales.</p>
        <p><strong>Asesoría de imagen:</strong> Consultoría para definir la línea gráfica de tu empresa.</p>
        <p><strong>Packaging:</strong> Diseño de envases y etiquetas que destacan.</p>
        <p><strong>Redes sociales:</strong> Contenido visual para Instagram, Facebook y LinkedIn.</p>
        <p><strong>Presentaciones ejecutivas:</strong> Plantillas profesionales para PowerPoint.</p>
        <p><strong>Fotografía de producto:</strong> Sesiones y retoque digital para e-commerce.</p>
        <p><strong>Infografías:</strong> Representación visual de datos complejos.</p>
        <p><strong>Merchandising:</strong> Diseño de artículos promocionales.</p>`
    },
    {
      title: 'Desarrollo FrontEnd',
      images: [
        'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format'
      ],
      description: `<p><strong>Sitios web corporativos:</strong> Diseño y desarrollo profesional.</p>
        <p><strong>Landing pages:</strong> Optimizadas para campañas de marketing.</p>
        <p><strong>Tiendas online:</strong> Integración de carritos y pasarelas de pago.</p>
        <p><strong>Portafolios interactivos:</strong> Galerías dinámicas con efectos visuales.</p>
        <p><strong>Blogs personalizados:</strong> Plataformas de contenido con panel de administración.</p>
        <p><strong>Optimización SEO:</strong> Mejora de visibilidad en buscadores.</p>
        <p><strong>Diseño responsivo:</strong> Adaptación perfecta a todos los dispositivos.</p>
        <p><strong>Animaciones CSS:</strong> Microinteracciones para mejorar UX.</p>
        <p><strong>Integración con APIs:</strong> Conexión a servicios externos.</p>
        <p><strong>Mantenimiento web:</strong> Actualizaciones y soporte técnico.</p>
        <p><strong>Accesibilidad web:</strong> Cumplimiento de estándares WCAG.</p>`
    },
    {
      title: 'Seguridad Informática',
      images: [
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format'
      ],
      description: `<p><strong>Auditorías de seguridad:</strong> Análisis de vulnerabilidades.</p>
        <p><strong>Hardening de servidores:</strong> Configuración segura de sistemas.</p>
        <p><strong>Protección contra malware:</strong> Implementación de antivirus y firewalls.</p>
        <p><strong>Seguridad en aplicaciones web:</strong> Pruebas de penetración.</p>
        <p><strong>Cifrado de datos:</strong> SSL/TLS y protección de información sensible.</p>
        <p><strong>Gestión de identidades:</strong> Autenticación robusta (2FA, SSO).</p>
        <p><strong>Backups automatizados:</strong> Copias de seguridad periódicas.</p>
        <p><strong>Concienciación para empleados:</strong> Formación en ciberseguridad.</p>
        <p><strong>Cumplimiento normativo:</strong> Adecuación a GDPR, LOPD.</p>
        <p><strong>Monitorización 24/7:</strong> Alertas tempranas.</p>
        <p><strong>Análisis forense:</strong> Investigación de incidentes.</p>`
    },
    {
      title: 'Modelado 3D / RA',
      images: [
        'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format'
      ],
      description: `<p><strong>Modelado de productos:</strong> Representación 3D realista.</p>
        <p><strong>Realidad Aumentada:</strong> Experiencias interactivas.</p>
        <p><strong>Animaciones 3D:</strong> Videos promocionales con movimiento.</p>
        <p><strong>Renderizado fotorrealista:</strong> Imágenes de alta calidad.</p>
        <p><strong>Escenarios virtuales:</strong> Para videojuegos o simulaciones.</p>
        <p><strong>Modelado de personajes:</strong> Avatares y figuras.</p>
        <p><strong>Optimización para web:</strong> Modelos ligeros para navegadores.</p>
        <p><strong>Impresión 3D:</strong> Preparación de archivos STL.</p>
        <p><strong>Texturizado y shading:</strong> Materiales realistas.</p>
        <p><strong>Rigging:</strong> Preparación para animación.</p>
        <p><strong>Realidad Mixta:</strong> Proyectos inmersivos.</p>`
    },
    {
      title: 'Edición Audiovisual',
      images: [
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format',
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format'
      ],
      description: `<p><strong>Edición de video:</strong> Montaje profesional.</p>
        <p><strong>Corrección de color:</strong> Gradación cromática.</p>
        <p><strong>Motion graphics:</strong> Animaciones de títulos y gráficos.</p>
        <p><strong>Producción de spots:</strong> Anuncios para TV y redes.</p>
        <p><strong>Video corporativo:</strong> Entrevistas y presentaciones.</p>
        <p><strong>Edición de audio:</strong> Limpieza y mezcla.</p>
        <p><strong>Efectos especiales:</strong> Composición con CGI.</p>
        <p><strong>Formatos para web:</strong> Optimización para plataformas.</p>
        <p><strong>Subtitulación:</strong> Inclusión de subtítulos.</p>
        <p><strong>Grabación de pantalla:</strong> Tutoriales.</p>
        <p><strong>Restauración de video:</strong> Mejora de material antiguo.</p>`
    },
    {
      title: 'Automatización Excel',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format',
        'https://images.unsplash.com/photo-1555421689-3f034debb7a6?w=800&auto=format'
      ],
      description: `<p><strong>Macros y VBA:</strong> Automatización de tareas.</p>
        <p><strong>Formularios interactivos:</strong> Interfaces amigables.</p>
        <p><strong>Conexión con bases de datos:</strong> Importación/exportación.</p>
        <p><strong>Generación de informes:</strong> Dashboards dinámicos.</p>
        <p><strong>Limpieza de datos:</strong> Eliminación de duplicados.</p>
        <p><strong>Plantillas inteligentes:</strong> Hojas preconfiguradas.</p>
        <p><strong>Integración con otras apps:</strong> Outlook, Word, etc.</p>
        <p><strong>Cálculos complejos:</strong> Fórmulas avanzadas.</p>
        <p><strong>Control de inventarios:</strong> Automatización.</p>
        <p><strong>Facturación automática:</strong> Seguimiento de pagos.</p>
        <p><strong>Horarios y turnos:</strong> Gestión de personal.</p>`
    }
  ];

  const modal = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDescription');
  const modalImg1 = document.getElementById('modalImg1');
  const modalImg2 = document.getElementById('modalImg2');
  const closeBtn = document.querySelector('.close-modal');
  const prevServiceBtn = document.getElementById('prevService');
  const nextServiceBtn = document.getElementById('nextService');

  let currentServiceIndex = 0;
  let currentImageIndex = 0;
  let carouselInterval = null;

  // Abrir modal
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function(e) {
      e.stopPropagation();
      const index = this.getAttribute('data-service');
      if (index !== null) {
        currentServiceIndex = parseInt(index);
        loadServiceInModal(currentServiceIndex);
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        startCarousel();
      }
    });
  });

  // Cargar datos
  function loadServiceInModal(index) {
    const service = servicesData[index];
    modalTitle.textContent = service.title;
    modalDesc.innerHTML = service.description;
    modalImg1.src = service.images[0];
    modalImg2.src = service.images[1];
    currentImageIndex = 0;
    updateCarousel();
  }

  // Actualizar carrusel
  function updateCarousel() {
    const images = [modalImg1, modalImg2];
    images.forEach((img, i) => {
      if (i === currentImageIndex) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
  }

  // Carrusel automático
  function startCarousel() {
    if (carouselInterval) clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % 2;
      updateCarousel();
    }, 2000);
  }

  function stopCarousel() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
  }
// Navegación entre servicios con efecto slide
function changeService(direction) {
  stopCarousel();
  
  const contentElement = document.querySelector('.modal-body');
  const carouselElement = document.querySelector('.modal-carousel');
  
  // Determinar clases según dirección
  const outClass = direction === 1 ? 'slide-out-left' : 'slide-out-right';
  const inClass = direction === 1 ? 'slide-in-right' : 'slide-in-left';
  
  // Aplicar clase de salida
  contentElement.classList.add(outClass);
  carouselElement.classList.add(outClass);
  
  setTimeout(() => {
    // Actualizar índice y contenido
    currentServiceIndex = (currentServiceIndex + direction + servicesData.length) % servicesData.length;
    loadServiceInModal(currentServiceIndex);
    
    // Quitar clase de salida y aplicar clase de entrada
    contentElement.classList.remove(outClass);
    carouselElement.classList.remove(outClass);
    contentElement.classList.add(inClass);
    carouselElement.classList.add(inClass);
    
    // Reiniciar carrusel automático después de la entrada
    startCarousel();
    
    // Quitar clase de entrada después de la animación
    setTimeout(() => {
      contentElement.classList.remove(inClass);
      carouselElement.classList.remove(inClass);
    }, 300);
  }, 150); // La mitad de la duración de la transición
}

  if (prevServiceBtn) {
    prevServiceBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      changeService(-1);
    });
  }

  if (nextServiceBtn) {
    nextServiceBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      changeService(1);
    });
  }

  // Cerrar modal con efecto
  function closeModal() {
    modal.classList.add('hide');
    stopCarousel();
    setTimeout(() => {
      modal.classList.remove('show', 'hide');
      document.body.style.overflow = '';
    }, 300);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Prevenir cierre al hacer clic dentro
  document.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Añadir estilos para transición de contenido
  modalTitle.style.transition = 'opacity 0.2s ease';
  modalDesc.style.transition = 'opacity 0.2s ease';
});