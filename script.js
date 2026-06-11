document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".sparks-container");

    // 1. Generador de partículas de brillo (Sparks)
    function createSpark() {
        const spark = document.createElement("div");
        spark.classList.add("spark");

        // Configuración aleatoria para cada brillo
        const randomX = Math.random() * 180 + 20; // Dentro de la cúpula
        const duration = Math.random() * 3 + 3; // Entre 3 y 6 segundos
        const drift = Math.random() * 40 - 20; // Desviación horizontal

        spark.style.left = `${randomX}px`;
        spark.style.setProperty("--duration", `${duration}s`);
        spark.style.setProperty("--drift", `${drift}px`);
        
        // Tamaños variados
        const size = Math.random() * 3 + 2;
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;

        container.appendChild(spark);

        // Limpieza de memoria
        setTimeout(() => {
            spark.remove();
        }, duration * 1000);
    }

    // Intervalo constante de brillos
    setInterval(createSpark, 150);

    // 2. Sistema de caída de pétalos (Secuencia fiel al vídeo)
    function dropPetal(delay, targetX, targetRotation) {
        setTimeout(() => {
            const petal = document.createElement("div");
            petal.classList.add("falling-petal");
            
            // Pasamos las variables finales al CSS de manera dinámica
            petal.style.setProperty("--target-x", `${targetX}px`);
            petal.style.setProperty("--target-rotation", `${targetRotation}deg`);

            container.appendChild(petal);
        }, delay);
    }

    // Caída programada de pétalos como en el video de referencia
    // dropPetal(Tiempo de espera en ms, Posición X en el suelo, Rotación final)
    dropPetal(4000, 45, 65);   // Primer pétalo (Cae a la izquierda)
    dropPetal(8000, 140, -45); // Segundo pétalo (Cae a la derecha)
});
