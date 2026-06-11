document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".sparks-container");

    // 1. Generación continua de pequeños brillos mágicos ambientales
    function createSpark() {
        const spark = document.createElement("div");
        spark.classList.add("spark");

        const randomX = Math.random() * 180 + 20; 
        const duration = Math.random() * 3.5 + 3; 
        const drift = Math.random() * 50 - 25; 

        spark.style.left = `${randomX}px`;
        spark.style.setProperty("--duration", `${duration}s`);
        spark.style.setProperty("--drift", `${drift}px`);
        
        const size = Math.random() * 2.5 + 2;
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;

        container.appendChild(spark);

        setTimeout(() => { spark.remove(); }, duration * 1000);
    }

    setInterval(createSpark, 140);


    // 2. Sistema infinito de pétalos cayendo DIRECTAMENTE DESDE EL TULIPÁN
    function spawnFallingPetal() {
        const petal = document.createElement("div");
        petal.classList.add("falling-petal");
        
        // Puntos de caída distribuidos aleatoriamente en el piso de la cúpula
        const targetX = Math.random() * 140 + 35;
        
        // Ángulos orgánicos de descanso
        const targetRotation = Math.random() * 100 - 50;

        petal.style.setProperty("--target-x", `${targetX}px`);
        petal.style.setProperty("--target-rotation", `${targetRotation}deg`);

        container.appendChild(petal);
    }

    // El primer pétalo cae a los 2.5 segundos de cargar la web
    setTimeout(spawnFallingPetal, 2500);

    // Bucle continuo: un pétalo desprendiéndose de la flor cada 6.5 segundos
    setInterval(spawnFallingPetal, 6500);
});
