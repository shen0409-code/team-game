// 1. 初始化 3D 場景 (Scene)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a24); // 深藍灰天空背景
scene.fog = new THREE.FogExp2(0x1a1a24, 0.015); // 遠方迷霧效果

// 2. 初始化 3D 攝影機 (Camera) - 75度視野, 畫面寬高比, 近裁切面, 遠裁切面
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
// 設定初始攝影機位置（高處俯瞰）
camera.position.set(0, 10, 15);
camera.lookAt(0, 0, 0);

// 3. 初始化渲染器 (Renderer) 並綁定至 Canvas
const canvas = document.getElementById('gameCanvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true; // 開啟陰影功能

// 4. 新增光源 (Lighting)
// 環境光 (照亮整體)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// 平行日光 (產生陰影與立體感)
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(20, 40, 20);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
scene.add(dirLight);

// 5. 建立地面 (Ground Floor) 與 網格參考線
const floorGeometry = new THREE.PlaneGeometry(60, 60);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x22252a, roughness: 0.8 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // 轉平作為地面
floor.receiveShadow = true;
scene.add(floor);

const gridHelper = new THREE.GridHelper(60, 30, 0x00f0f0, 0x444455);
gridHelper.position.y = 0.01;
scene.add(gridHelper);

// 6. 建立玩家 3D 角色模型 (Player Cube)
const playerGroup = new THREE.Group(); // 玩家容器，未來方便掛載槍枝與相機

const bodyGeo = new THREE.BoxGeometry(1.2, 1.8, 1.2);
const bodyMat = new THREE.MeshStandardMaterial({ color: 0x00f0f0 }); // 青色玩家
const playerBody = new THREE.Mesh(bodyGeo, bodyMat);
playerBody.position.y = 0.9; // 讓腳貼住地面
playerBody.castShadow = true;
playerGroup.add(playerBody);

// 玩家正前方箭頭標示 (代表面向)
const noseGeo = new THREE.BoxGeometry(0.4, 0.4, 0.6);
const noseMat = new THREE.MeshStandardMaterial({ color: 0xffcc00 });
const playerNose = new THREE.Mesh(noseGeo, noseMat);
playerNose.position.set(0, 1.4, 0.7);
playerGroup.add(playerNose);

scene.add(playerGroup);

// 7. 視角微幅旋轉展示 (驗證 3D 效果)
let angle = 0;

// 8. 視角隨視窗大小自動縮放
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 9. 遊戲主渲染循環 (Render Loop)
function animate() {
    requestAnimationFrame(animate);

    // 鏡頭緩慢環繞展示 3D 世界
    angle += 0.005;
    camera.position.x = Math.sin(angle) * 15;
    camera.position.z = Math.cos(angle) * 15;
    camera.lookAt(0, 1, 0);

    renderer.render(scene, camera);
}

animate();