document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("fallingContainer");

    function createPetal() {
        const petal = document.createElement("div");
        petal.classList.add("js-falling-petal");

        // 1. Punto de salida centrado desde donde está la flor unida
        const minLeft = 35; 
        const maxLeft = 55; 
        const randomLeft = Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft;
        petal.style.left = `${randomLeft}%`;

        // 2. Parámetros de trayectorias físicas aleatorias (Cae y se bambolea)
        const drift = (Math.random() * 60 - 30).toFixed(2); // Desplazamiento horizontal (-30px a 30px)
        const rotation = (Math.random() * 260 - 130).toFixed(2); // Rotación orgánica en el aire
        petal.style.setProperty('--drift', `${drift}px`);
        petal.style.setProperty('--rotation', `${rotation}deg`);

        // 3. Velocidad de caída constante pero con ligeras variaciones mágicas
        const duration = (Math.random() * 3 + 6).toFixed(2); // Entre 6 y 9 segundos por pétalo
        petal.style.animationDuration = `${duration}s`;

        container.appendChild(petal);

        // Remover del DOM al tocar fondo para optimizar el rendimiento del navegador
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }

    // Intervalo de caída constante en bucle
    setInterval(createPetal, 4000);

    // Lanzar el primer pétalo al instante
    createPetal();
});
