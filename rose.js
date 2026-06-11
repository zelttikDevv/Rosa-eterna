function createRoseAssembly() {
    const assemblyGroup = new THREE.Group();

    // --- BASE DE MADERA ---
    const baseGeo = new THREE.CylinderGeometry(1.2, 1.3, 0.15, 32);
    const baseMat = new THREE.MeshStandardMaterial({ 
        color: 0x140a05, 
        roughness: 0.7,
        metalness: 0.1 
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = -0.075;
    assemblyGroup.add(base);

    // --- TALLO ---
    const stemGroup = new THREE.Group();
    const stemGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.3, 16);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x1c3b1e, roughness: 0.9 });
    const mainStem = new THREE.Mesh(stemGeo, stemMat);
    mainStem.position.y = 0.65;
    stemGroup.add(mainStem);

    // Hojas del tallo
    const leafGeo = new THREE.ConeGeometry(0.08, 0.25, 3);
    leafGeo.rotateX(Math.PI / 3);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x153017, side: THREE.DoubleSide });
    
    const leaf1 = new THREE.Mesh(leafGeo, leafMat);
    leaf1.position.set(0.05, 0.7, 0.05);
    leaf1.rotation.y = Math.PI / 4;
    stemGroup.add(leaf1);

    const leaf2 = new THREE.Mesh(leafGeo, leafMat);
    leaf2.position.set(-0.05, 0.4, -0.05);
    leaf2.rotation.y = -Math.PI / 1.5;
    stemGroup.add(leaf2);

    assemblyGroup.add(stemGroup);

    // --- CAPULLO DE LA ROSA (Diseño por capas) ---
    const roseBudGroup = new THREE.Group();
    roseBudGroup.position.y = 1.3;

    // Núcleo central
    const coreGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const roseMat = new THREE.MeshStandardMaterial({ 
        color: 0xb3002d, 
        roughness: 0.5,
        metalness: 0.1 
    });
    const core = new THREE.Mesh(coreGeo, roseMat);
    roseBudGroup.add(core);

    // Pétalos externos envolventes (Geometrías simples rotadas)
    const petalGeo = new THREE.SphereGeometry(0.2, 16, 16, 0, Math.PI, 0, Math.PI / 2);
    petalGeo.rotateX(-Math.PI / 6);

    for (let i = 0; i < 6; i++) {
        const pMesh = new THREE.Mesh(petalGeo, roseMat);
        pMesh.rotation.y = (i * Math.PI / 3);
        pMesh.scale.set(1 + i*0.05, 1 + i*0.02, 1);
        roseBudGroup.add(pMesh);
    }
    assemblyGroup.add(roseBudGroup);

    // --- CÁPSULA DE CRISTAL (URNA) ---
    const domeGroup = new THREE.Group();
    
    // Parte cilíndrica + Cúpula superior esférica fusionadas en un grupo visual
    const cylinderGeo = new THREE.CylinderGeometry(1.05, 1.05, 2.0, 32, 1, true);
    const topSphereGeo = new THREE.SphereGeometry(1.05, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    topSphereGeo.translate(0, 1.0, 0);

    const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15,
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.95, 
        ior: 1.45, // Índice de refracción del vidrio corriente
        side: THREE.DoubleSide,
        depthWrite: false // Evita fallos de renderizado de transparencias con las partículas detrás
    });

    const glassCylinder = new THREE.Mesh(cylinderGeo, glassMat);
    const glassTop = new THREE.Mesh(topSphereGeo, glassMat);
    
    domeGroup.add(glassCylinder);
    domeGroup.add(glassTop);
    domeGroup.position.y = 1.0;

    assemblyGroup.add(domeGroup);

    return assemblyGroup;
                           }
