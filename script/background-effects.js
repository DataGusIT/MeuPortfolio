// Este arquivo inicializa e controla os efeitos de background 3D

// Função para inicializar todos os efeitos de background
function initBackgroundEffects() {
    createParticles();
    createNeonBubbles();
    // Aplicar o efeito de parallax quando o mouse se move
    document.addEventListener('mousemove', handleMouseParallax);
}

// Cria partículas flutuantes no background
function createParticles() {
    const container = document.createElement('div');
    container.className = 'particles-container';

    // Criar partículas
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Definir propriedades aleatórias para cada partícula
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * 100;
        const translateX = (Math.random() - 0.5) * 200;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;

        // Aplicar estilos
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.setProperty('--translateX', `${translateX}px`);
        particle.style.setProperty('--duration', `${duration}s`);
        particle.style.animationDelay = `${delay}s`;

        // Adicionar à container
        container.appendChild(particle);
    }

    // Adicionar container ao body
    document.body.appendChild(container);
}

// Cria bolhas de neón flutuantes
function createNeonBubbles() {
    const container = document.createElement('div');
    container.className = 'neon-bubbles';

    // Lista de cores de bolhas para variedade
    const colors = [
        'rgba(103, 232, 249, 1)', // cyan
        'rgba(129, 140, 248, 1)', // indigo
        'rgba(192, 132, 252, 1)', // purple
        'rgba(251, 113, 133, 1)'  // rose
    ];

    // Criar bolhas
    for (let i = 0; i < 12; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'neon-bubble';

        // Definir propriedades aleatórias
        const size = Math.random() * 120 + 60;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const colorIndex = Math.floor(Math.random() * colors.length);

        // Valores de movimento aleatórios
        const x1 = (Math.random() - 0.5) * 40;
        const y1 = (Math.random() - 0.5) * 40;
        const x2 = (Math.random() - 0.5) * 40;
        const y2 = (Math.random() - 0.5) * 40;
        const x3 = (Math.random() - 0.5) * 40;
        const y3 = (Math.random() - 0.5) * 40;

        const duration = Math.random() * 30 + 20;

        // Aplicar estilos
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${posX}%`;
        bubble.style.top = `${posY}%`;
        bubble.style.setProperty('--bubble-color', colors[colorIndex]);

        // Definir parâmetros de animação
        bubble.style.setProperty('--x1', `${x1}px`);
        bubble.style.setProperty('--y1', `${y1}px`);
        bubble.style.setProperty('--x2', `${x2}px`);
        bubble.style.setProperty('--y2', `${y2}px`);
        bubble.style.setProperty('--x3', `${x3}px`);
        bubble.style.setProperty('--y3', `${y3}px`);
        bubble.style.setProperty('--duration', `${duration}s`);

        // Adicionar à container
        container.appendChild(bubble);
    }

    // Adicionar container ao body
    document.body.appendChild(container);
}

// Efeito parallax ao mover o mouse
function handleMouseParallax(event) {
    const mouseX = event.clientX / window.innerWidth;
    const mouseY = event.clientY / window.innerHeight;

    // Aplicar parallax à grade 3D
    const grid = document.querySelector('.grid-3d-inner');
    if (grid) {
        grid.style.transform = `rotateX(60deg) translateY(${mouseY * 10}px) translateX(${(mouseX - 0.5) * 20}px)`;
    }

    // Aplicar parallax às camadas de profundidade
    const layers = document.querySelectorAll('.depth-layer');
    layers.forEach((layer, index) => {
        const depth = (index + 1) * 30;
        layer.style.transform = `translateZ(-${100 * (index + 1)}px) translateX(${(mouseX - 0.5) * depth}px) translateY(${(mouseY - 0.5) * depth}px)`;
    });
}

// Criar os elementos de fundo principais
function createBackgroundElements() {
    // Elemento principal de fundo com gradiente
    const dynamicBg = document.createElement('div');
    dynamicBg.className = 'dynamic-background';
    document.body.appendChild(dynamicBg);

    // Elemento de grade 3D
    const grid3d = document.createElement('div');
    grid3d.className = 'grid-3d';
    const gridInner = document.createElement('div');
    gridInner.className = 'grid-3d-inner';
    grid3d.appendChild(gridInner);
    document.body.appendChild(grid3d);

    // Camadas de profundidade
    const depthLayers = document.createElement('div');
    depthLayers.className = 'depth-layers';

    for (let i = 1; i <= 3; i++) {
        const layer = document.createElement('div');
        layer.className = `depth-layer layer-${i}`;
        depthLayers.appendChild(layer);
    }

    document.body.appendChild(depthLayers);

    // Efeito de ondas
    const waveEffect = document.createElement('div');
    waveEffect.className = 'wave-effect';

    for (let i = 1; i <= 3; i++) {
        const wave = document.createElement('div');
        wave.className = `wave wave-${i}`;
        waveEffect.appendChild(wave);
    }

    document.body.appendChild(waveEffect);

    // Vinheta
    const vignette = document.createElement('div');
    vignette.className = 'vignette';
    document.body.appendChild(vignette);

    // Scanlines (opcional - comente se não quiser o efeito)
    const scanlines = document.createElement('div');
    scanlines.className = 'scanlines';
    document.body.appendChild(scanlines);
}

// Iniciar tudo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    createBackgroundElements();
    initBackgroundEffects();
});