import * as THREE from 'three';

// Scene, Camera, Renderer 초기화
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 빛 추가
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

camera.position.z = 5;

// Phoneme → Viseme 매핑
const phonemeToScale = {
    'AA': 1.5, // 입을 크게 벌림
    'EE': 1.2, // 살짝 웃는 모양
    'OO': 0.8, // 입을 동그랗게 줄임
};



// Sphere 생성 (입모양 테스트용)
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// 텍스트 → Phoneme 매핑
function textToPhoneme(text) {
    if (text.startsWith('a') || text.startsWith('A')) return 'AA';
    if (text.startsWith('e') || text.startsWith('E')) return 'EE';
    if (text.startsWith('o') || text.startsWith('O')) return 'OO';
    return null; // 매핑되지 않는 경우
}

// Phoneme에 따른 입모양 업데이트
function updateViseme(phoneme) {
    if (!phoneme) return; // null 처리
    const scale = phonemeToScale[phoneme] || 1.0; // 기본 크기
    sphere.scale.set(scale, scale, scale); // 스케일 조정
}

// 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// 텍스트 입력 이벤트 처리
const inputField = document.createElement('input');
inputField.type = 'text';
inputField.placeholder = 'Type something...';
inputField.style.position = 'absolute';
inputField.style.top = '20px';
inputField.style.left = '20px';
inputField.style.padding = '10px';
inputField.style.fontSize = '16px';
document.body.appendChild(inputField);

inputField.addEventListener('input', (event) => {
    const text = event.target.value;
    const phoneme = textToPhoneme(text);
    updateViseme(phoneme);
    console.log(`Text: ${text}, Phoneme: ${phoneme}`);
});
