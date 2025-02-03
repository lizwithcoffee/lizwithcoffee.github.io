function initRain(config = {}) {
    // Configurações padrão
    const rainConfig = {
        dropCount: 100,
        dropColor: '#00a8ff',
        dropLength: 20,
        dropSpeed: 2,
        particleCount: 5,
        particleSize: 10,
        particleColor: '#00a8ff',
        particleDuration: 1,
        blurAmount: 2, // Quantidade de blur
        ...config // Sobrescreve as configurações padrão com as personalizadas
    };

    // Função para criar um pingo de chuva
    function createRainDrop(container) {
        const drop = document.createElement('div');
        drop.classList.add('drop');
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDuration = `${Math.random() * rainConfig.dropSpeed + 1}s`;
        drop.style.backgroundColor = rainConfig.dropColor;
        drop.style.height = `${rainConfig.dropLength}px`;
        drop.style.willChange = 'transform'; // Otimiza a renderização
        container.appendChild(drop);

        // Quando o pingo atingir o chão, criar partículas
        drop.addEventListener('animationiteration', () => {
            createParticles(container, drop.getBoundingClientRect().left, window.innerHeight);
        });
    }

    // Função para criar partículas
    function createParticles(container, x, y) {
        for (let i = 0; i < rainConfig.particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.width = `${rainConfig.particleSize}px`;
            particle.style.height = `${rainConfig.particleSize}px`;
            particle.style.backgroundColor = rainConfig.particleColor;
            particle.style.borderRadius = '50%';
            particle.style.setProperty('--spread-x', Math.random() * 100 - 50);
            particle.style.setProperty('--spread-y', Math.random() * 50 - 25);
            particle.style.animation = `spread ${rainConfig.particleDuration}s ease-out`;
            particle.style.willChange = 'transform, opacity'; // Otimiza a renderização
            container.appendChild(particle);

            // Remover partícula após a animação
            particle.addEventListener('animationend', () => {
                particle.remove();
            });
        }
    }

    // Inicializar o efeito de chuva
    const container = document.querySelector('.rain-container');
    container.style.filter = `blur(${rainConfig.blurAmount}px)`; // Aplica o blur
    for (let i = 0; i < rainConfig.dropCount; i++) {
        createRainDrop(container);
    }
}