document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("fallingContainer");

    // Función encargada de fabricar un pétalo dinámico
    function createPetal() {
        const petal = document.createElement("div");
        petal.classList.add("js-falling-petal");

        // 1. Posición inicial aleatoria cerca del capullo de la rosa (centro)
        const minLeft = 35; // % dentro de su contenedor
        const maxLeft = 65; // % dentro de su contenedor
        const randomLeft = Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft;
        petal.style.left = `${randomLeft}%`;

        // 2. Dimensiones aleatorias para que no se vean todos iguales
        const randomSize = Math.floor(Math.random() * (22 - 14 + 1)) + 14; // entre 14px y 22px
        petal.style.width = `${randomSize}px`;
        petal.style.height = `${randomSize * 0.65}px`; // Proporción de aspecto del pétalo

        // 3. Variables CSS personalizadas pasadas a la animación keyframe
        const drift = (Math.random() * 40 - 20).toFixed(2); // Desplazamiento lateral (de -20px a 20px)
        const rotation = (Math.random() * 360 - 180).toFixed(2); // Giro final en grados
        petal.style.setProperty('--drift', `${drift}px`);
        petal.style.setProperty('--rotation', `${rotation}deg`);

        // 4. Duración de caída aleatoria (más lento o más rápido)
        const duration = (Math.random() * 4 + 5).toFixed(2); // Entre 5s y 9s
        petal.style.animationDuration = `${duration}s`;

        // Insertar el pétalo en la escena
        container.appendChild(petal);

        // Eliminar el elemento una vez termine de caer para no saturar la memoria
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }

    // Bucle generador: Crea un nuevo pétalo cada 3.5 segundos
    setInterval(createPetal, 3500);

    // Crea el primer pétalo inmediatamente al cargar la página
    createPetal();
});
