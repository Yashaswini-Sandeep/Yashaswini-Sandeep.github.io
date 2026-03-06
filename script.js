function changeTab(tabNumber) {
    document.querySelectorAll('.tab-content').forEach((content) => {
        content.classList.remove('active');
    });

    const selectedTabContent = document.getElementById(`tabContent${tabNumber}`);
    if (selectedTabContent) {
        selectedTabContent.classList.add('active');
    }

    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index + 1 === tabNumber);
    });
}

function changeTabExp(tabNumber) {
    document.querySelectorAll('.tab-contentExp').forEach((content) => {
        content.classList.remove('active');
    });

    const selectedTabContent = document.getElementById(`tabContentExp${tabNumber}`);
    if (selectedTabContent) {
        selectedTabContent.classList.add('active');
    }

    document.querySelectorAll('.dotExp').forEach((dot, index) => {
        dot.classList.toggle('active', index + 1 === tabNumber);
    });
}

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
    console.log('loading started');
};
loadingManager.onLoad = () => {
    console.log('loading finished');
};
loadingManager.onProgress = () => {
    console.log('loading progressing');
};
loadingManager.onError = () => {
    console.log('loading error');
};

document.addEventListener('DOMContentLoaded', function () {
    changeTab(1);
    changeTabExp(1);

    const tab1 = document.getElementById("tab1");
    const tab2 = document.getElementById("tab2");
    const tab3 = document.getElementById("tab3");

    const tabExp1 = document.getElementById("tabExp1");
    const tabExp2 = document.getElementById("tabExp2");
    const tabExp3 = document.getElementById("tabExp3");

    if (tab1) tab1.addEventListener("click", () => changeTab(1));
    if (tab2) tab2.addEventListener("click", () => changeTab(2));
    if (tab3) tab3.addEventListener("click", () => changeTab(3));

    if (tabExp1) tabExp1.addEventListener("click", () => changeTabExp(1));
    if (tabExp2) tabExp2.addEventListener("click", () => changeTabExp(2));
    if (tabExp3) tabExp3.addEventListener("click", () => changeTabExp(3));
});

const textureLoader = new THREE.TextureLoader(loadingManager);

/*
Put these files inside:
images/

You can rename them later, but then update the paths here.
*/
const texture0 = textureLoader.load('./images/profile.jpg');
const texture1 = textureLoader.load('./images/education.jpg');
const texture2 = textureLoader.load('./images/experience.jpg');
const texture3 = textureLoader.load('./images/projects.jpg');
const texture4 = textureLoader.load('./images/skills.jpg');
const texture5 = textureLoader.load('./images/certifications.jpg');

texture0.colorSpace = THREE.SRGBColorSpace;
texture1.colorSpace = THREE.SRGBColorSpace;
texture2.colorSpace = THREE.SRGBColorSpace;
texture3.colorSpace = THREE.SRGBColorSpace;
texture4.colorSpace = THREE.SRGBColorSpace;
texture5.colorSpace = THREE.SRGBColorSpace;

const cursor = {
    x: 0,
    y: 0
};

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

const objectDistance = 5;

const geoShape0 = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 2.4, 1),
    new THREE.MeshBasicMaterial({ map: texture0 })
);

const geoShape1 = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2.5, 1),
    new THREE.MeshBasicMaterial({ map: texture1 })
);

const geoShape2 = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2.5, 1),
    new THREE.MeshBasicMaterial({ map: texture2 })
);

const geoShape3 = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2.5, 1),
    new THREE.MeshBasicMaterial({ map: texture3 })
);

const geoShape4 = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2.5, 1),
    new THREE.MeshBasicMaterial({ map: texture4 })
);

const geoShape5 = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2.5, 1),
    new THREE.MeshBasicMaterial({ map: texture5 })
);

geoShape0.position.y = -objectDistance * 0;
geoShape1.position.y = -objectDistance * 1;
geoShape2.position.y = -objectDistance * 2;
geoShape3.position.y = -objectDistance * 3;
geoShape4.position.y = -objectDistance * 4;
geoShape5.position.y = -objectDistance * 5;

geoShape0.position.x = 2.5;
geoShape1.position.x = 2.5;
geoShape2.position.x = -2.5;
geoShape3.position.x = 2.5;
geoShape4.position.x = -2.5;
geoShape5.position.x = 2.5;

scene.add(geoShape0, geoShape1, geoShape2, geoShape3, geoShape4, geoShape5);

const sectionMeshes = [geoShape0, geoShape1, geoShape2, geoShape3, geoShape4, geoShape5];

const pointLight = new THREE.PointLight(0xff9000, 1.5);
scene.add(pointLight);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
cameraGroup.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
        (event.clientX / sizes.width) * 2 - 1,
        -(event.clientY / sizes.height) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);

    const clickableShapes = [geoShape1, geoShape2, geoShape3, geoShape4, geoShape5];
    const intersects = raycaster.intersectObjects(clickableShapes);

    document.body.style.cursor = intersects.length > 0 ? 'pointer' : 'auto';
});

let scrollY = window.scrollY;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    camera.position.y = -scrollY / sizes.height * objectDistance;

    const parallaxX = cursor.x * 0.5;
    const parallaxY = -cursor.y * 0.5;

    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

    for (const mesh of sectionMeshes) {
        mesh.rotation.y = elapsedTime * 0.09;
    }

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();

window.addEventListener('click', (event) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
        (event.clientX / sizes.width) * 2 - 1,
        -(event.clientY / sizes.height) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);

    if (raycaster.intersectObject(geoShape1).length > 0) {
        toggleSection('education');
    } else if (raycaster.intersectObject(geoShape2).length > 0) {
        toggleSection('experience');
    } else if (raycaster.intersectObject(geoShape3).length > 0) {
        toggleSection('projects');
    } else if (raycaster.intersectObject(geoShape4).length > 0) {
        toggleSection('skills');
    } else if (raycaster.intersectObject(geoShape5).length > 0) {
        toggleSection('certifications');
    }
});

function toggleSection(sectionName) {
    if (sectionName === 'education') {
        gsap.to('#Education', {
            duration: 0.5,
            opacity: 0,
            display: 'none',
            onComplete: () => {
                const targetX = geoShape1.position.x === 2.5 ? -3 : 2.5;

                gsap.to(geoShape1.position, {
                    duration: 0.8,
                    x: targetX,
                    ease: 'power2.inOut',
                    onStart: () => {
                        gsap.to('#EducationId', {
                            duration: 0.00001,
                            opacity: 0,
                            display: 'none'
                        });
                    },
                    onComplete: () => {
                        if (targetX === 2.5) {
                            gsap.to('#Education', { duration: 0.5, opacity: 1, display: 'block' });
                            gsap.to('#EducationId', { duration: 0.00001, opacity: 0, display: 'none' });
                        } else {
                            gsap.to('#EducationId', { duration: 0.5, opacity: 1, display: 'inline-block' });
                            gsap.to('#Education', { duration: 0.5, opacity: 0, display: 'none' });
                        }
                    }
                });
            }
        });
    }

    else if (sectionName === 'experience') {
        gsap.to('#Experience', {
            duration: 0.5,
            opacity: 0,
            display: 'none',
            onComplete: () => {
                const targetX = geoShape2.position.x === -2.5 ? 3 : -2.5;

                gsap.to(geoShape2.position, {
                    duration: 0.8,
                    x: targetX,
                    ease: 'power2.inOut',
                    onStart: () => {
                        gsap.to('#ExperienceId', {
                            duration: 0.00001,
                            opacity: 0,
                            display: 'none'
                        });
                    },
                    onComplete: () => {
                        if (targetX === -2.5) {
                            gsap.to('#Experience', { duration: 0.5, opacity: 1, display: 'block' });
                            gsap.to('#ExperienceId', { duration: 0.00001, opacity: 0, display: 'none' });
                        } else {
                            gsap.to('#ExperienceId', { duration: 0.5, opacity: 1, display: 'inline-block' });
                            gsap.to('#Experience', { duration: 0.5, opacity: 0, display: 'none' });
                        }
                    }
                });
            }
        });
    }

    else if (sectionName === 'projects') {
        gsap.to('#Projects', {
            duration: 0.5,
            opacity: 0,
            display: 'none',
            onComplete: () => {
                const targetX = geoShape3.position.x === 2.5 ? -3 : 2.5;

                gsap.to(geoShape3.position, {
                    duration: 0.8,
                    x: targetX,
                    ease: 'power2.inOut',
                    onStart: () => {
                        gsap.to('#ProjectsId', {
                            duration: 0.00001,
                            opacity: 0,
                            display: 'none'
                        });
                    },
                    onComplete: () => {
                        if (targetX === 2.5) {
                            gsap.to('#Projects', { duration: 0.5, opacity: 1, display: 'block' });
                            gsap.to('#ProjectsId', { duration: 0.00001, opacity: 0, display: 'none' });
                        } else {
                            gsap.to('#ProjectsId', { duration: 0.5, opacity: 1, display: 'inline-block' });
                            gsap.to('#Projects', { duration: 0.5, opacity: 0, display: 'none' });
                        }
                    }
                });
            }
        });
    }

    else if (sectionName === 'skills') {
        gsap.to('#Skills', {
            duration: 0.5,
            opacity: 0,
            display: 'none',
            onComplete: () => {
                const targetX = geoShape4.position.x === -2.5 ? 3 : -2.5;

                gsap.to(geoShape4.position, {
                    duration: 0.8,
                    x: targetX,
                    ease: 'power2.inOut',
                    onStart: () => {
                        gsap.to('#SkillsId', {
                            duration: 0.00001,
                            opacity: 0,
                            display: 'none'
                        });
                    },
                    onComplete: () => {
                        if (targetX === -2.5) {
                            gsap.to('#Skills', { duration: 0.5, opacity: 1, display: 'block' });
                            gsap.to('#SkillsId', { duration: 0.00001, opacity: 0, display: 'none' });
                        } else {
                            gsap.to('#SkillsId', { duration: 0.5, opacity: 1, display: 'inline-block' });
                            gsap.to('#Skills', { duration: 0.5, opacity: 0, display: 'none' });
                        }
                    }
                });
            }
        });
    }

    else if (sectionName === 'certifications') {
        gsap.to('#Certifications', {
            duration: 0.5,
            opacity: 0,
            display: 'none',
            onComplete: () => {
                const targetX = geoShape5.position.x === 2.5 ? -3 : 2.5;

                gsap.to(geoShape5.position, {
                    duration: 0.8,
                    x: targetX,
                    ease: 'power2.inOut',
                    onStart: () => {
                        gsap.to('#CertificationsId', {
                            duration: 0.00001,
                            opacity: 0,
                            display: 'none'
                        });
                    },
                    onComplete: () => {
                        if (targetX === 2.5) {
                            gsap.to('#Certifications', { duration: 0.5, opacity: 1, display: 'block' });
                            gsap.to('#CertificationsId', { duration: 0.00001, opacity: 0, display: 'none' });
                        } else {
                            gsap.to('#CertificationsId', { duration: 0.5, opacity: 1, display: 'inline-block' });
                            gsap.to('#Certifications', { duration: 0.5, opacity: 0, display: 'none' });
                        }
                    }
                });
            }
        });
    }
}
