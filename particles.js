function createPetalSystem(count) {
    const systemGroup = new THREE.Group();

    // Geometría curva para simular un pétalo orgánico caído
    const petalShapeGeo = new THREE.ConeGeometry(0.07, 0.14, 4);
    const petalMat = new THREE.MeshStandardMaterial({ 
        color: 0x990022, 
        side: THREE.DoubleSide,
        roughness: 0.6 
    });

    for (let i = 0; i < count; i++) {
        const petalMesh = new THREE.Mesh(petalShapeGeo, petalMat);
        
        // Resetear posición inicial en una altura aleatoria simulando desprendimiento continuo
        resetPetalPosition(petalMesh);
        // Desfasar la altura inicial para que no caigan todos al mismo tiempo al cargar
        petalMesh.position.y = 0.2 + Math.random() * 1.3;

        // Configuraciones individuales para la animación en el loop
        petalMesh.userData = {
            fallSpeed: 0.004 + Math.random() * 0.006,
            rotationSpeedX: 0.01 + Math.random() * 0.02,
            rotationSpeedY: 0.005 + Math.random() * 0.015,
            wobbleSpeed: 1.5 + Math.random() * 2,
            wobbleIntensity: 0.003 + Math.random() * 0.004,
            seed: Math.random() * 100
        };

        systemGroup.add(petalMesh);
    }

    return systemGroup;
}

function resetPetalPosition(petal) {
    // Aparecen cerca del capullo de la rosa en la parte superior
    petal.position.x = (Math.random() - 0.5) * 0.2;
    petal.position.y = 1.3 + (Math.random() * 0.2);
    petal.position.z = (Math.random() - 0.5) * 0.2;
    
    petal.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
}

function updatePetals(system, time) {
    system.children.forEach(petal => {
        const data = petal.userData;

        // 1. Desplazamiento vertical hacia abajo
        petal.position.y -= data.fallSpeed;

        // 2. Efecto hoja/pétalo flotando (bamboleo usando Seno y Coseno)
        petal.position.x += Math.sin(time * data.wobbleSpeed + data.seed) * data.wobbleIntensity;
        petal.position.z += Math.cos(time * data.wobbleSpeed * 0.8 + data.seed) * data.wobbleIntensity;

        // 3. Rotación constante en el aire
        petal.rotation.x += data.rotationSpeedX;
        petal.rotation.y += data.rotationSpeedY;

        // 4. Lógica de reajuste: si llega a la base, sube de nuevo (bucle infinito eterno)
        if (petal.position.y < 0.06) {
            resetPetalPosition(petal);
        }
    });
}
