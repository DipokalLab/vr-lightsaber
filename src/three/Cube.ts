import * as THREE from "three";

type WeightType = {
  x: number;
  y: number;
  z: number;
  xw: number;
  yw: number;
  zw: number;
};

class Cube {
  weight: WeightType;
  constructor(weight: WeightType) {
    this.weight = weight;
  }

  public create() {
    const geometry = new THREE.BoxGeometry(
      this.weight.xw,
      this.weight.yw,
      this.weight.zw
    );
    const material = new THREE.MeshStandardMaterial();
    material.metalness = 0.45;
    material.roughness = 0.65;

    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(this.weight.x, this.weight.y, this.weight.z);
    cube.receiveShadow = true;
    cube.castShadow = true;

    return cube;
  }
}

export { Cube };
