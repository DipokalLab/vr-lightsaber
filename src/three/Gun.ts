import * as THREE from "three";

import { OBB } from "three/examples/jsm/math/OBB";
import store from "../store";

class GunModel {
  scene: THREE.Scene;
  bullets: Bullet[];
  prevTime: number;
  nowTime: number;
  renderer: THREE.WebGLRenderer;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.bullets = [];
  }

  public shot({ initHeight }: any) {
    const bulletClass = new Bullet(this.scene, { y: initHeight });
    this.bullets.push(bulletClass);
  }

  private isFar({ x, y, z }: any) {
    const reference = 40;
    if (
      reference < Math.abs(x) ||
      reference < Math.abs(y) ||
      reference < Math.abs(z)
    ) {
      return true;
    }

    return false;
  }

  removeBullet({ index }: { index: number }) {
    this.bullets[index].removeModel();
    this.bullets.splice(1, index);
  }

  animateBullet() {
    this.nowTime = Date.now();

    for (let index = 0; index < this.bullets.length; index++) {
      const deltaTime = this.nowTime - this.prevTime;

      const element = this.bullets[index];
      if (element.isAvailable == false) {
        this.removeBullet({ index: index });
        continue;
      }

      if (
        this.isFar({
          x: element.model.position.x,
          y: element.model.position.y,
          z: element.model.position.z,
        })
      ) {
        this.removeBullet({ index: index });
        continue;
      }

      element.model.position.z += element.velocity.z * deltaTime;
      element.model.position.y += element.velocity.y * deltaTime;
      element.model.position.x += element.velocity.x * deltaTime;

      const mx = new THREE.Matrix4().lookAt(
        new THREE.Vector3(
          element.velocity.x,
          element.velocity.y,
          element.velocity.z
        ),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 1, 0)
      );
      const qt = new THREE.Quaternion().setFromRotationMatrix(mx);
      element.model.rotation.setFromQuaternion(qt);

      element.obb.center = element.model.position;
    }

    this.prevTime = Date.now();
  }
}

class Bullet {
  model: THREE.Mesh;
  scene: THREE.Scene;
  isAvailable: boolean;
  isCollisionAvailable: boolean;
  velocity: { x: number; y: number; z: number };
  initPosition: { y: number };
  obb: OBB;
  initHeight: number;

  constructor(scene: THREE.Scene, initPosition: { y: number }) {
    this.isAvailable = false;
    this.isCollisionAvailable = true;
    this.scene = scene;
    this.velocity = {
      x: 0.00000000001,
      y: 0.00000000001,
      z: 0.2,
    };
    this.initHeight = initPosition.y;
    this.model = this.addModel();
  }

  private radianToPosition({
    angle,
    offset,
  }: {
    angle: number;
    offset: number;
  }) {
    const x = Math.cos((angle * Math.PI) / 180) * offset;
    const y = Math.sin((angle * Math.PI) / 180) * offset;
    return { x: x, y: y };
  }

  addModel() {
    const state = store.getState();

    const addBoundingBox = new THREE.Mesh();
    const randomAngle =
      Math.random() *
        (state.game.gameMode.maxRadian - state.game.gameMode.minRadian) +
      state.game.gameMode.minRadian;

    const randomPosition = this.radianToPosition({
      angle: randomAngle,
      offset: 20,
    });
    addBoundingBox.position.z = randomPosition.x;
    addBoundingBox.position.x = randomPosition.y;
    addBoundingBox.position.y = this.initHeight;

    const dir = new THREE.Vector3();
    const dirVector = dir
      .subVectors(
        new THREE.Vector3(0, 2, 1),
        new THREE.Vector3(
          addBoundingBox.position.x,
          addBoundingBox.position.y,
          addBoundingBox.position.z
        )
      )
      .normalize();
    this.velocity.z = dirVector.z / 100;
    this.velocity.x = dirVector.x / 100;

    const geometry = new THREE.CapsuleGeometry(0.06, 1, 4, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xf73c28 });
    const cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = Math.PI / 2;

    addBoundingBox.add(cube);

    this.scene.add(addBoundingBox);
    this.isAvailable = true;
    this.obb = new OBB(
      addBoundingBox.position,
      new THREE.Vector3(0.07, 0.07, 0.07)
    );
    return addBoundingBox;
  }

  public removeModel() {
    try {
      this.model.geometry.dispose();
      this.scene.remove(this.model);
      this.isAvailable = false;
    } catch (error) {}
  }
}

export { GunModel };
