// Variables globales de control
let scene, camera, renderer, controls, clock;
let currentRose, petalSystem;

function init() {
    const container = document.getElementById('canvas-container');
    clock = new THREE.Clock();

    // 1. Escena y Niebla de fondo
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030106, 0.05);

    // 2. Cámara
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2.5, 4.5);

    // 3. Renderizador
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 4. Controles de Cámara
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 8;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // Evita que la cámara baje del suelo

    // 5. Iluminación Mágica
    const ambientLight = new THREE.AmbientLight(0x1a0826, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Luz interna de la rosa (efecto místico)
    const roseGlow = new THREE.PointLight(0xff1493, 3, 8);
    roseGlow.position.set(0, 1.3, 0);
    scene.add(roseGlow);

    // 6. Instanciar módulos externos
    currentRose = createRoseAssembly();
    scene.add(currentRose);

    petalSystem = createPetalSystem(12); // Pasamos la cantidad de pétalos
    scene.add(petalSystem);

    // Eventos
    window.addEventListener('resize', onWindowResize);
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    controls.update();

    // Actualizamos la rosa (animación sutil de respiración o flotado)
    if (currentRose) {
        currentRose.position.y = Math.sin(elapsedTime * 1.2) * 0.03;
    }

    // Actualizamos el comportamiento de los pétalos independientes
    if (petalSystem && typeof updatePetals === 'function') {
        updatePetals(petalSystem, elapsedTime);
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Arranca todo al cargar la página
window.onload = init;
