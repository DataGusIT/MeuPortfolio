// Script para animar elementos e ativar efeitos tech
document.addEventListener('DOMContentLoaded', function () {
    // Animação ao rolar a página
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Adicionar efeito de digitação ao título principal
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.classList.add('typing-text');
    }

    // Adicionar efeitos às seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('tech-aura');
    });

    // Adicionar efeito de destaque aos títulos de seção
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.classList.add('header-highlight');
    });

    // Adicionar efeito de cyber-border aos cards de projeto
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.add('cyber-border');
        card.classList.add('scanner-effect');
    });

    // Adicionar efeito de carregamento às barras de habilidades
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(skillBar => {
        skillBar.classList.add('skill-loading');
    });

    // Adicionar efeito de matrix-bg a elementos
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        aboutSection.classList.add('matrix-bg');
    }

    // Adicionar efeito de zoom às imagens de projeto
    const projectImages = document.querySelectorAll('.project-img');
    projectImages.forEach(img => {
        img.classList.add('zoom-scan');
    });

    // Adicionar efeito de tech-focus aos ícones
    const allIcons = document.querySelectorAll('.fas, .fab');
    allIcons.forEach(icon => {
        icon.classList.add('tech-focus');
    });

    // Adicionar efeito de glitch ao logo e títulos importantes
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.classList.add('glitch-text');
    }

    // Botões com efeito de pulse
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(btn => {
        btn.classList.add('pulse-effect');
    });

    // Adicionar efeito de data-flow aos cards de formação
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach(card => {
        card.classList.add('data-flow');
    });

    // Partículas interativas de fundo (efeito avançado)
    createParticleBackground();
});

// Função para criar o efeito de partículas no fundo
function createParticleBackground() {
    // Criar o canvas apenas se o elemento #particles-js não existir
    if (!document.getElementById('particles-js')) {
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.zIndex = '-2';
        particlesContainer.style.pointerEvents = 'none';
        document.body.prepend(particlesContainer);

        // Adicionar script particles.js (verificando se já não foi carregado)
        if (!window.particlesJS) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
            script.onload = initParticles;
            document.head.appendChild(script);
        } else {
            initParticles();
        }
    }
}

// Configuração para as partículas
function initParticles() {
    if (window.particlesJS) {
        window.particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 40,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00a8ff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00a8ff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// Efeito de brilho em textos importantes
function applyTextShine() {
    const shineElements = document.querySelectorAll('.highlight');

    shineElements.forEach(element => {
        // Guardar o texto original
        const originalText = element.textContent;
        // Limpar o conteúdo
        element.innerHTML = '';

        // Criar uma span com o efeito de brilho
        const shineSpan = document.createElement('span');
        shineSpan.classList.add('shine-text');
        shineSpan.textContent = originalText;

        // Adicionar de volta ao elemento
        element.appendChild(shineSpan);
    });
}

// Efeito de digitação para texto de hero
function typeWriterEffect(element, text, speed = 50, delay = 1000) {
    if (!element) return;

    // Limpar o texto existente
    element.textContent = '';

    // Esperar o delay inicial
    setTimeout(() => {
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                // Adicionar cursor piscando no final
                element.classList.add('typing-cursor');
            }
        }, speed);
    }, delay);
}

// Iniciar o efeito de digitação após a página carregar
window.addEventListener('load', function () {
    // Aplicar efeito de brilho após um pequeno delay
    setTimeout(applyTextShine, 500);

    // Aplicar efeito de revelação gradual a todos elementos com a classe
    document.querySelectorAll('.reveal-content').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });

    // Adicionar efeito de digitação ao subtítulo do hero
    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriterEffect(heroSubtitle, originalText, 30, 1200);
    }
});