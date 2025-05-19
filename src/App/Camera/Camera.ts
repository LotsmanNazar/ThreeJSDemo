import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CameraInterface } from '@/App/Abstracts/Interfaces/CameraInterface';

export class Camera implements CameraInterface {
	private ThreeCameraInstance: THREE.PerspectiveCamera;
	private OrbitControlsInstance: OrbitControls;

	constructor(ThreeCameraInstance: THREE.PerspectiveCamera, OrbitControlsInstance: OrbitControls) {
		this.ThreeCameraInstance = ThreeCameraInstance;
		this.OrbitControlsInstance = OrbitControlsInstance;
	}

	getThreeCamera(): THREE.PerspectiveCamera {
		return this.ThreeCameraInstance;
	}

	setPosition(x: number, y: number, z: number) {
		this.ThreeCameraInstance.position.set(x, y, z);
	}

	freeze() {
		this.OrbitControlsInstance.enabled = false;
	}

	unfreeze() {
		this.OrbitControlsInstance.enabled = true;
	}

	resize(aspect: number) {
		this.ThreeCameraInstance.aspect = aspect;
		this.ThreeCameraInstance.updateProjectionMatrix();
	}

	update() {
		this.OrbitControlsInstance.update();
	}
}