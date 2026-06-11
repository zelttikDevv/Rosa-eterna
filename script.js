const particles = document.getElementById("particles");

function createSpark() {

    const spark = document.createElement("div");

    spark.classList.add("spark");

    const size = Math.random() * 3 + 2;

    spark.style.width = size + "px";
    spark.style.height = size + "px";

    spark.style.left = Math.random() * 220 + "px";
    spark.style.top = "350px";

    spark.style.animationDuration =
        (Math.random() * 3 + 3) + "s";

    particles.appendChild(spark);

    setTimeout(() => {
        spark.remove();
    }, 6000);
}

setInterval(createSpark, 180);

function createPetal() {

    const petal = document.createElement("div");

    petal.classList.add("falling-petal");

    petal.style.setProperty(
        "--targetX",
        (Math.random() * 120 + 50) + "px"
    );

    particles.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 6000);
}

setTimeout(createPetal, 3000);

setInterval(createPetal, 8000);
