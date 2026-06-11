document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".sparks-container");

    // 1. Generador de pequeños brillos ambientales optimizados
    function createSpark() {
        const spark = document.createElement("div");
        spark.classList.add("spark");

        const randomX = Math.random() * 160 + 30; 
        const duration = Math.random() * 2.5 + 2.5; // Animación ligeramente más rápida para evitar atascos
        const drift = Math.random() * 40 - 20; 

        spark.style.left = `${randomX}px`;
        spark.style.setProperty("--duration", `${duration}s`);
        spark.style.setProperty("--drift", `${drift}px`);
        
        const size = Math.random() * 2.5 + 1.8;
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;

        container.appendChild(spark);

        setTimeout(() => { spark.remove(); }, duration * 1000);
    }

    setInterval(createSpark, 160);

    // 2. Sistema infinito de pétalos desde el capullo
    function spawnFallingPetal() {
        const petal = document.createElement("div");
        petal.classList.add("falling-petal");
        
        // Puntos aleatorios en el suelo de la cúpula
        const targetX = Math.random() * 130 + 40;
        const targetRotation = Math.random() * 100 - 50;

        petal.style.setProperty("--target-x", `${targetX}px`);
        petal.style.setProperty("--target-rotation", `${targetRotation}deg`);

        container.appendChild(petal);
    }

    // Primer pétalo
    setTimeout(spawnFallingPetal, 2000);

    // Caida cíclica cada 7 segundos
    setInterval(spawnFallingPetal, 7000);
});
