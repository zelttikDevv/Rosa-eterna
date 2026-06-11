document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("fallingContainer");

    function createPetal() {
        const petal = document.createElement("div");
        petal.classList.add("js-falling-petal");

        // Punto de desprendimiento alineado con el capullo
        const minLeft = 35; 
        const maxLeft = 50; 
        const randomLeft = Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft;
        petal.style.left = `${randomLeft}%`;

        // Valores de dispersión física realista
        const drift = (Math.random() * 50 - 25).toFixed(2); // Desplazamiento en px
        const rotation = (Math.random() * 180 - 90).toFixed(2); // Rotación en el aire
        
        petal.style.setProperty('--drift', `${drift}px`);
        petal.style.setProperty('--rotation', `${rotation}deg`);

        // Tiempo de caída pausado, como flotando en magia
        const duration = (Math.random() * 3 + 6).toFixed(2); // Entre 6s y 9s
        petal.style.animationDuration = `${duration}s`;

        container.appendChild(petal);

        // Limpieza de memoria
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }

    // Un nuevo pétalo cada 4.5 segundos para evitar amontonamientos feos
    setInterval(createPetal, 4500);
    createPetal();
});
