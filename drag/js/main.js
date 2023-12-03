let params = {
  cubes: 0,
  scene_children: 0,
};

let room;
let cubes = [];

let texts = ['equivocal', 'lucid', 'precipitate', 'assuage', 'erudite', 'enigma', 'placate', 'zeal', 'audacious', 'gullible', 'pedant', 'vacillate', 'capricious', 'loquacious', 'pragmatic', 'volatile', 'ephemeral', 'laconic', 'cacophony', 'enervate', 'ingenuous', 'misanthrope', 'venerate', 'eulogy', 'lethargic', 'obdurate', 'philanthropic', 'garrulous', 'malleable', 'ostentation', 'prevaricate', 'prevaricate', 'eulogy', 'laconic', 'loquacious', 'cacophony', 'malleable', 'ephemeral', 'pedant', 'gullible', 'equivocal', 'lucid', 'precipitate', 'assuage', 'erudite', 'enigma', 'placate', 'zeal', 'audacious', 'gullible', 'pedant', 'vacillate', 'capricious', 'loquacious',
  'pragmatic', 'volatile', 'ephemeral', 'laconic', 'cacophony', 'enervate', 'ingenuous', 'misanthrope', 'venerate', 'eulogy', 'lethargic', 'obdurate', 'philanthropic', 'garrulous', 'malleable', 'ostentation', 'prevaricate', 'prevaricate', 'eulogy', 'laconic', 'loquacious', 'cacophony', 'malleable', 'ephemeral', 'pedant', 'equivocal', 'lucid', 'precipitate', 'assuage', 'erudite', 'enigma', 'placate', 'zeal', 'audacious', 'gullible', 'pedant', 'vacillate',
  'capricious', 'loquacious', 'pragmatic', 'volatile', 'ephemeral', 'laconic', 'cacophony', 'enervate', 'ingenuous', 'misanthrope', 'venerate', 'eulogy', 'lethargic', 'obdurate', 'philanthropic', 'garrulous', 'malleable', 'ostentation', 'prevaricate', 'prevaricate', 'eulogy', 'laconic', 'loquacious', 'cacophony', 'malleable', 'ephemeral', 'pedant'
];

function setupThree() {
  // renderer additional setup
  renderer.shadowMap.enabled = true;

  // WebXR
  setupWebXR();

  // room
  room = getRoom();
  scene.add(room);

  // floor
  const floorGeometry = new THREE.PlaneGeometry(6, 6);
  const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.25, blending: THREE.CustomBlending, transparent: false });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = - Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // lights
  const hemiLight = new THREE.HemisphereLight(0xa5a5a5, 0x898989, 3);
  scene.add(hemiLight);

  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(0, 6, 0);
  light.castShadow = true;
  light.shadow.camera.top = 3;
  light.shadow.camera.bottom = - 3;
  light.shadow.camera.right = 3;
  light.shadow.camera.left = - 3;
  light.shadow.mapSize.set(4096, 4096);
  scene.add(light);

  group = new THREE.Group();
  scene.add(group);

  for (let t of texts) {
    const loader = new FontLoader();
    loader.load('assets/font/Cinzel_Regular.json', function (font) {
      let tMesh = getText(t, font);
      group.add(tMesh);
    });
  }

  // const geometries = [
  //   new THREE.BoxGeometry(0.2, 0.2, 0.2),
  //   new THREE.ConeGeometry(0.2, 0.2, 64),
  //   new THREE.CylinderGeometry(0.2, 0.2, 0.2, 64),
  //   new THREE.IcosahedronGeometry(0.2, 8),
  //   new THREE.TorusGeometry(0.2, 0.04, 64, 32)
  // ];

  // for (let i = 0; i < 50; i++) {

  //   const geometry = geometries[Math.floor(Math.random() * geometries.length)];
  //   const material = new THREE.MeshStandardMaterial({
  //     color: Math.random() * 0xffffff,
  //     roughness: 0.7,
  //     metalness: 0.0
  //   });

  //   const object = new THREE.Mesh(geometry, material);

  //   object.position.x = Math.random() * 4 - 2;
  //   object.position.y = Math.random() * 2;
  //   object.position.z = Math.random() * 4 - 2;

  //   object.rotation.x = Math.random() * 2 * Math.PI;
  //   object.rotation.y = Math.random() * 2 * Math.PI;
  //   object.rotation.z = Math.random() * 2 * Math.PI;

  //   object.scale.setScalar(Math.random() + 0.5);

  //   object.castShadow = true;
  //   object.receiveShadow = true;

  //   group.add(object);

  // }

  // gui
  gui.add(params, "cubes", 0, 5000).step(1).listen();
  gui.add(params, "scene_children", 0, 5000).step(1).listen();
}

function updateThree() {
  cleanIntersected();

  intersectObjects(controller1);
  intersectObjects(controller2);
}


///// UTILS /////

function getRoom() {
  const geometry = new BoxLineGeometry(6, 6, 6, 10, 10, 10).translate(0, 3, 0);
  const materials = new THREE.LineBasicMaterial({
    color: 0xbcbcbc,
    transparent: true,
    opacity: 0.5,
  });
  const mesh = new THREE.LineSegments(geometry, materials);
  return mesh;
}

function getText(content, font) {
  const geometry = new TextGeometry(content, {
    font: font,
    size: random(10, 15),
    height: 5,
  });
  const material = new THREE.MeshBasicMaterial({
    color: 0x923e96,
  });
  const text = new THREE.Mesh(geometry, material);
  text.position.y = random(10, 300);
  text.position.x = random(-600, 600);
  text.position.z = random(-600, 600);
  text.lookAt(0, 0, 100);
  // scene.add(text);
  return text;
}

function getBox() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({
    color: Math.random() * 0xffffff
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

class Cube {
  constructor() {
    this.pos = createVector();
    this.vel = createVector();
    this.acc = createVector();

    this.scl = createVector(1, 1, 1);
    this.mass = this.scl.x * this.scl.y * this.scl.z;

    this.rot = createVector();
    this.rotVel = createVector();
    this.rotAcc = createVector();

    this.lifespan = 1.0;
    this.lifeReduction = random(0.005, 0.010);
    this.isDone = false;
    //
    this.mesh = getBox();
    scene.add(this.mesh);
  }
  setPosition(x, y, z) {
    this.pos = createVector(x, y, z);
    return this;
  }
  setVelocity(x, y, z) {
    this.vel = createVector(x, y, z);
    return this;
  }
  setRotationAngle(x, y, z) {
    this.rot = createVector(x, y, z);
    return this;
  }
  setRotationVelocity(x, y, z) {
    this.rotVel = createVector(x, y, z);
    return this;
  }
  setScale(w, h = w, d = w) {
    const minScale = 0.01;
    if (w < minScale) w = minScale;
    if (h < minScale) h = minScale;
    if (d < minScale) d = minScale;
    this.scl = createVector(w, h, d);
    this.mass = this.scl.x * this.scl.y * this.scl.z;
    return this;
  }
  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  rotate() {
    this.rotVel.add(this.rotAcc);
    this.rot.add(this.rotVel);
    this.rotAcc.mult(0);
  }
  applyForce(f) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }
  reappear() {
    if (this.pos.z > WORLD_SIZE / 2) {
      this.pos.z = -WORLD_SIZE / 2;
    }
  }
  disappear() {
    if (this.pos.z > WORLD_SIZE / 2) {
      this.isDone = true;
    }
  }
  age() {
    this.lifespan -= this.lifeReduction;
    if (this.lifespan <= 0) {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  update() {
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
    this.mesh.rotation.set(this.rot.x, this.rot.y, this.rot.z);

    let newScale = p5.Vector.mult(this.scl, this.lifespan);
    this.mesh.scale.set(newScale.x, newScale.y, newScale.z);
  }
}

let raycaster;

const intersected = [];
const tempMatrix = new THREE.Matrix4();

function getIntersections(controller) {

  controller.updateMatrixWorld();

  tempMatrix.identity().extractRotation(controller.matrixWorld);

  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
  raycaster.ray.direction.set(0, 0, - 1).applyMatrix4(tempMatrix);

  return raycaster.intersectObjects(group.children, false);

}

function intersectObjects(controller) {

  // Do not highlight in mobile-ar

  if (controller.userData.targetRayMode === 'screen') return;

  // Do not highlight when already selected

  if (controller.userData.selected !== undefined) return;

  const line = controller.getObjectByName('line');
  const intersections = getIntersections(controller);

  if (intersections.length > 0) {

    const intersection = intersections[0];

    const object = intersection.object;
    object.material.emissive.r = 1;
    intersected.push(object);

    line.scale.z = intersection.distance;

  } else {

    line.scale.z = 5;

  }

}

function cleanIntersected() {

  while (intersected.length) {

    const object = intersected.pop();
    object.material.emissive.r = 0;

  }

}