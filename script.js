document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("fallingContainer");

    function createPetal() {
        const petal = document.createElement("div");
        petal.classList.add("js-falling-petal");

        // Aparecen justo debajo del capullo de la flor
        const minLeft = 35; 
        const maxLeft = 55; 
        const randomLeft = Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft;
        petal.style.left = `${randomLeft}%`;

        // Desviación lateral controlada y rotación final
        const drift = (Math.random() * 40 - 20).toFixed(2); // Máximo 20px a los lados
        const rotation = (Math.random() * 120 - 60).toFixed(2); 
        
        petal.style.setProperty('--drift', `${drift}px`);
        petal.style.setProperty('--rotation', `${rotation}deg`);

        // Caída fluida y constante (6 a 8 segundos)
        const duration = (Math.random() * 2 + 6).toFixed(2); 
        petal.style.animationDuration = `${duration}s`;

        container.appendChild(petal);

        // Destrucción al terminar para mantener limpio el DOM de Vercel
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }

    // Intervalo de caída espaciado para que no se amontonen (un pétalo cada 4 segundos)
    setInterval(createPetal, 4000);
    createPetal();
});
