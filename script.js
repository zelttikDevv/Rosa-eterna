document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".sparks-container");

    // 1. Generador continuo de partículas de brillo (Sparks)
    function createSpark() {
        const spark = document.createElement("div");
        spark.classList.add("spark");

        const randomX = Math.random() * 180 + 20; 
        const duration = Math.random() * 3 + 3; 
        const drift = Math.random() * 40 - 20; 

        spark.style.left = `${randomX}px`;
        spark.style.setProperty("--duration", `${duration}s`);
        spark.style.setProperty("--drift", `${drift}px`);
        
        const size = Math.random() * 3 + 2;
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;

        container.appendChild(spark);

        setTimeout(() => { spark.remove(); }, duration * 1000);
    }

    setInterval(createSpark, 150);


    // 2. NUEVO: Generador INFINITO y ALEATORIO de pétalos caídos
    function spawnFallingPetal() {
        const petal = document.createElement("div");
        petal.classList.add("falling-petal");
        
        // Genera un punto de aterrizaje aleatorio en el suelo de la cúpula (entre 30px y 190px)
        const targetX = Math.random() * 160 + 30;
        
        // Genera una rotación aleatoria para cuando toque el suelo (entre -60 y 60 grados)
        const targetRotation = Math.random() * 120 - 60;

        // Asignamos las variables dinámicas que usará la animación CSS
        petal.style.setProperty("--target-x", `${targetX}px`);
        petal.style.setProperty("--target-rotation", `${targetRotation}deg`);

        container.appendChild(petal);

        // OPCIONAL: Si no quieres que el suelo se sature de cientos de pétalos después de una hora, 
        // puedes desvanecer y borrar los pétalos viejos después de 20 segundos desenterrando esta línea:
        // setTimeout(() => { petal.remove(); }, 20000);
    }

    // Cae el primer pétalo a los 3 segundos de cargar la página
    setTimeout(spawnFallingPetal, 3000);

    // Sigue soltando un pétalo nuevo automáticamente cada 7 segundos (puedes bajarlo a 4000 o 5000 si los quieres más rápido)
    setInterval(spawnFallingPetal, 7000);
});
