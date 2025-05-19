import * as THREE from 'three';

export interface CameraInterface {
	getThreeCamera(): THREE.PerspectiveCamera;
	setPosition(x: number, y: number, z: number): void;
	freeze(): void;
	unfreeze(): void;
	resize(aspect: number): void;
	update(): void;
}