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
  // NOTA: navbar ya está declarado arriba, no volver a declarar

  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isActive = navLinks.classList.contains('active');
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
      
      // Gestionar clase menu-open en el navbar
      if (!isActive) {
        navbar.classList.add('menu-open');
      } else {
        navbar.classList.remove('menu-open');
      }
      
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
      navbar.classList.remove('menu-open');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Cerrar menú al hacer clic en un enlace (excepto dropdown)
// Manejo de clics en enlaces del nav
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    // Si es un enlace dentro de un dropdown en móvil
    if (link.closest('.dropdown') && window.innerWidth <= 992) {
      // Si es el enlace principal del dropdown (dropbtn)
      if (link.classList.contains('dropbtn')) {
        e.preventDefault(); // Prevenir navegación para desplegar submenú
        e.stopPropagation();
        const dropdown = link.closest('.dropdown');
        dropdown.classList.toggle('active');
        return;
      } else {
        // Es un enlace del submenú: permitir navegación y cerrar el menú principal
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
        navbar.classList.remove('menu-open');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        // El enlace navegará normalmente
      }
    } else if (window.innerWidth <= 992 && !link.closest('.dropdown')) {
      // Enlaces normales en móvil: cerrar menú
      navLinks.classList.remove('active');
      menuToggle.classList.remove('open');
      navbar.classList.remove('menu-open');
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
      navbar.classList.remove('menu-open');
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
 // ===== MANEJO DEL FORMULARIO DE CONTACTO (CORREGIDO) =====
const contactForm = document.getElementById('contactForm');
const popup = document.getElementById('popup-mensaje');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Recoger los datos del formulario
    const formData = new FormData(contactForm);
    
    // Convertir FormData a un objeto URLSearchParams (formato que espera FormSubmit)
    const urlEncodedData = new URLSearchParams(formData).toString();

    // Mostrar popup
    popup.classList.add('mostrar');

    // Vaciar campos del formulario
    contactForm.reset();

    try {
      await fetch('https://formsubmit.co/ajax/teeninformatics@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData
      });
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      // Opcional: mostrar un mensaje de error al usuario
    }

    // Ocultar popup después de 2 segundos
    setTimeout(() => {
      popup.classList.remove('mostrar');
    }, 1000);
  });
}
})();

// ===== MODAL DE SERVICIOS =====
document.addEventListener('DOMContentLoaded', function() {
  // Datos de los servicios
  const servicesData = [
    {
      title: 'Diseño Gráfico Profesional',
      images: [
        'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format',
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format'
      ],
      description: `<p>Creación de identidades de marca únicas y memorables, incluyendo branding estratégico, diseño editorial y material publicitario. Desarrollamos folletos, catálogos, flyers y campañas visuales que conectan con tu audiencia.</p>
        <p>Además, ofrecemos ilustración personalizada, asesoría de imagen corporativa, diseño de packaging y contenido para redes sociales. También creamos presentaciones ejecutivas profesionales en PowerPoint.</p>`
    },
    {
      title: 'Desarrollo FrontEnd',
      images: [
        'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format'
      ],
      description: `<p>Diseñamos y desarrollamos sitios web corporativos, landing pages optimizadas para campañas y tiendas online con carritos de compra y pasarelas de pago. También creamos portafolios interactivos y blogs personalizados con panel de administración.</p>
        <p>Nos enfocamos en la optimización SEO, diseño responsivo para todos los dispositivos y accesibilidad web cumpliendo estándares WCAG, garantizando una experiencia de usuario moderna y funcional.</p>`
    },
    {
      title: 'Seguridad Informática',
      images: [
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format'
      ],
      description: `<p>Realizamos auditorías de seguridad y análisis de vulnerabilidades, hardening de servidores y protección contra malware con antivirus y firewalls. Aseguramos tus aplicaciones web mediante pruebas de penetración y cifrado de datos SSL/TLS.</p>
        <p>Implementamos gestión de identidades con autenticación robusta (2FA, SSO), monitorización 24/7 para alertas tempranas y análisis forense en caso de incidentes, protegiendo tu negocio de principio a fin.</p>`
    },
    {
      title: 'Modelado 3D / RA',
      images: [
        'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format'
      ],
      description: `<p>Modelado de productos en 3D con representación realista y animaciones para videos promocionales. Creamos experiencias de Realidad Aumentada interactivas y renderizado fotorrealista de alta calidad para presentaciones.</p>
        <p>Desarrollamos escenarios virtuales para videojuegos o simulaciones, modelado de personajes y avatares, así como proyectos de Realidad Mixta para aplicaciones inmersivas.</p>`
    },
    {
      title: 'Edición Audiovisual',
      images: [
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format',
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format'
      ],
      description: `<p>Edición de video profesional con montaje, corrección de color y motion graphics para títulos y gráficos animados. Producimos spots publicitarios para TV y redes sociales, así como videos corporativos y entrevistas.</p>
        <p>Ofrecemos edición de audio (limpieza y mezcla), efectos especiales con composición CGI y restauración de material audiovisual antiguo para darle una nueva vida.</p>`
    },
    {
      title: 'Automatización Excel',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format',
        'https://images.unsplash.com/photo-1555421689-3f034debb7a6?w=800&auto=format'
      ],
      description: `<p>Automatización de tareas repetitivas con macros y VBA, creación de formularios interactivos y conexión con bases de datos para importar/exportar información. Generamos dashboards dinámicos e informes automáticos.</p>
        <p>Desarrollamos plantillas inteligentes preconfiguradas, limpiamos datos eliminando duplicados e integramos Excel con otras aplicaciones como Outlook y Word. También gestionamos horarios y turnos de personal.</p>`
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

  // Navegación entre servicios con slide completo de toda la ventana
  function changeService(direction) {
    stopCarousel(); // Detiene el carrusel automático mientras se anima
    
    const modalSlider = document.querySelector('.modal-slider');
    
    // Clases según dirección: 1 = siguiente, -1 = anterior
    const outClass = direction === 1 ? 'slide-out-left' : 'slide-out-right';
    const inClass = direction === 1 ? 'slide-in-right' : 'slide-in-left';
    
    // Aplicar clase de salida
    modalSlider.classList.add(outClass);
    
    // Esperar a que termine la animación de salida (600ms)
    setTimeout(() => {
      // Calcular nuevo índice
      currentServiceIndex = (currentServiceIndex + direction + servicesData.length) % servicesData.length;
      
      // Actualizar todo el contenido con el nuevo servicio
      const service = servicesData[currentServiceIndex];
      document.getElementById('modalTitle').textContent = service.title;
      document.getElementById('modalDescription').innerHTML = service.description;
      document.getElementById('modalImg1').src = service.images[0];
      document.getElementById('modalImg2').src = service.images[1];
      currentImageIndex = 0;
      updateCarousel(); // Reinicia el carrusel a la primera imagen
      
      // Quitar clase de salida y aplicar clase de entrada
      modalSlider.classList.remove(outClass);
      modalSlider.classList.add(inClass);
      
      // Reiniciar el carrusel automático después de que entre el nuevo contenido
      startCarousel();
      
      // Quitar la clase de entrada después de la animación para dejar el estado limpio
      setTimeout(() => {
        modalSlider.classList.remove(inClass);
      }, 600);
    }, 600); // Mismo tiempo que la transición CSS
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
});document.querySelectorAll('.nav-links a')

// ===== MANEJO DE BOTONES SOLICITAR (PLANES FREELANCER) =====
document.querySelectorAll('.btn-solicitar').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Obtener la tarjeta padre
    const card = this.closest('.plan-card');
    if (!card) return;

    // Extraer información del plan
    const planName = card.querySelector('h3').textContent.trim();
    const precio = card.querySelector('.plan-precio').textContent.trim();
    const caracteristicas = Array.from(card.querySelectorAll('.plan-caracteristicas li')).map(li => li.textContent.trim()).join('\n• ');

    // Construir el cuerpo del correo
    const subject = encodeURIComponent(`Solicitud de plan Freelancer: ${planName}`);
    const body = encodeURIComponent(
      `Hola Roberto,\n\nEstoy interesado en contratar el plan "${planName}" (${precio}).\n\nDetalles del plan:\n• ${caracteristicas}\n\nPor favor, contáctame para coordinar los detalles.\n\nSaludos.`
    );

    // Abrir el cliente de correo
    window.location.href = `mailto:teeninformatics@gmail.com?subject=${subject}&body=${body}`;
  });
});

// ===== MANEJO DE BOTONES CONTRATAR (DISEÑO GRÁFICO REMOTO) =====
document.querySelectorAll('.btn-contratar-grafico').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    const card = this.closest('.plan-card');
    if (!card) return;

    const planTitulo = card.querySelector('h3').textContent.trim();
    const precio = card.querySelector('.plan-precio').textContent.trim();
    const horas = planTitulo.includes('Media') ? '3 horas diarias' : '6 horas diarias';
    const sueldo = planTitulo.includes('Media') ? '$1,500 quincenales' : '$3,000 quincenales';

    // Obtener las características de la lista
    const caracteristicas = Array.from(card.querySelectorAll('.plan-caracteristicas li'))
      .map(li => li.textContent.trim())
      .join('\n• ');

    const subject = encodeURIComponent(`Solicitud de contratación: Diseñador Gráfico Remoto - ${planTitulo}`);
    const body = encodeURIComponent(
      `Hola Roberto,\n\nEstoy interesado en contratar tus servicios como diseñador gráfico remoto con el plan "${planTitulo}" (${sueldo}).\n\nDetalles del plan:\n• ${caracteristicas}\n\nMe gustaría que trabajes para mí de lunes a viernes, ${horas}, iniciando el [fecha de inicio]. Por favor, confírmame disponibilidad y los siguientes pasos.\n\nSaludos.`
    );

    window.location.href = `mailto:teeninformatics@gmail.com?subject=${subject}&body=${body}`;
  });
});


// ===== MANEJO DE BOTONES SOLICITAR (DISEÑO DE LOGOS) =====
document.querySelectorAll('.btn-solicitar-logo').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    const card = this.closest('.plan-card');
    if (!card) return;

    const planTitulo = card.querySelector('h3').textContent.trim();
    const precio = card.querySelector('.plan-precio').textContent.trim();
    
    // Obtener las características de la lista
    const caracteristicas = Array.from(card.querySelectorAll('.plan-caracteristicas li'))
      .map(li => li.textContent.trim())
      .join('\n• ');

    const subject = encodeURIComponent(`Solicitud de información: Diseño de Logo - Plan ${planTitulo}`);
    const body = encodeURIComponent(
      `Hola Roberto,\n\nEstoy interesado en el plan "${planTitulo}" (${precio}) para el diseño de mi logo.\n\nMe gustaría recibir más información sobre los siguientes puntos:\n• Plazos de entrega\n• Proceso de trabajo\n• Formas de pago\n\nQuedo atento a tu respuesta.\n\nSaludos.`
    );

    window.location.href = `mailto:teeninformatics@gmail.com?subject=${subject}&body=${body}`;
  });
});

// ===== MANEJO DE BOTONES SOLICITAR (TARJETAS DE PRESENTACIÓN) =====
document.querySelectorAll('.btn-solicitar-tarjeta').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    const card = this.closest('.tarjeta-simple');
    if (!card) return;

    const tipo = card.querySelector('h3').textContent.trim();
    const precio = card.querySelector('.tarjeta-precio').textContent.trim();
    
    const subject = encodeURIComponent(`Solicitud de tarjetas de presentación (${tipo})`);
    const body = encodeURIComponent(
      `Hola Roberto,\n\nEstoy interesado en solicitar la impresión de tarjetas de presentación (${tipo}) por ${precio}.\n\nMe gustaría saber:\n• ¿Necesito enviar mi diseño? (Si no, puedo contratar el diseño adicional por $70 o $100 según corresponda)\n• ¿Requiero envío a domicilio en Mérida? (costo $29 extra)\n• Formas de pago.\n\nQuedo atento a tu respuesta.\n\nSaludos.`
    );

    window.location.href = `mailto:teeninformatics@gmail.com?subject=${subject}&body=${body}`;
  });
});

// ===== BOTÓN SOLICITAR BROCHURE =====
document.querySelector('.btn-solicitar-brochure')?.addEventListener('click', function(e) {
  e.preventDefault();
  
  const subject = encodeURIComponent('Solicitud de brochure empresarial');
  const body = encodeURIComponent(
    `Hola Roberto,\n\nEstoy interesado en contratar el servicio de brochure profesional (precio base $2,849).\n\nMe gustaría saber más sobre:\n• Plazos de entrega\n• Proceso de trabajo\n• Opciones de pago\n\nAdemás, necesito información sobre: [detalla aquí si requieres hojas extra, actualizaciones, etc.]\n\nQuedo atento a tu respuesta.\n\nSaludos.`
  );

  window.location.href = `mailto:teeninformatics@gmail.com?subject=${subject}&body=${body}`;
});

// ===== MANEJO DE BOTONES SOLICITAR (INVITACIONES DIGITALES) =====
document.querySelectorAll('.btn-solicitar-invitacion').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    const card = this.closest('.invitacion-card-mejorada');
    if (!card) return;

    const tipo = card.querySelector('h3').textContent.trim();
    const precio = card.querySelector('.precio').textContent.trim();
    
    const subject = encodeURIComponent(`Solicitud de invitación digital (${tipo})`);
    const body = encodeURIComponent(
      `Hola Roberto,\n\nEstoy interesado en la invitación digital formato "${tipo}" (${precio}).\n\nMe gustaría conocer más detalles sobre:\n• Plazos de entrega\n• Proceso de personalización\n• Formas de pago\n\nQuedo atento a tu respuesta.\n\nSaludos.`
    );

    window.location.href = `mailto:teeninformatics@gmail.com?subject=${subject}&body=${body}`;
  });
});