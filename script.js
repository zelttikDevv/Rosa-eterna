const particles = document.getElementById("particles");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MAX_SPARKS = 36;
let sparkTimer = null;
let petalTimer = null;

function createSpark() {
    if (document.hidden || particles.childElementCount >= MAX_SPARKS) return;

    const spark = document.createElement("div");
    spark.classList.add("spark");

    const size = Math.random() * 3 + 2;
    spark.style.width = size + "px";
    spark.style.height = size + "px";
    spark.style.left = Math.random() * 220 + "px";
    spark.style.top = "350px";
    spark.style.animationDuration = (Math.random() * 3 + 3) + "s";

    particles.appendChild(spark);
    setTimeout(() => spark.remove(), 6000);
}

function createPetal() {
    if (document.hidden) return;

    const petal = document.createElement("div");
    petal.classList.add("falling-petal");
    petal.style.setProperty(
        "--targetX",
        (Math.random() * 120 + 50) + "px"
    );

    particles.appendChild(petal);
    setTimeout(() => petal.remove(), 6000);
}

if (!reducedMotion) {
    // A few sparks up front so the dome never looks empty, then a gentle cadence.
    for (let i = 0; i < 6; i++) {
        setTimeout(createSpark, i * 220);
    }
    sparkTimer = setInterval(createSpark, 260);
    setTimeout(createPetal, 3000);
    petalTimer = setInterval(createPetal, 9000);
}
