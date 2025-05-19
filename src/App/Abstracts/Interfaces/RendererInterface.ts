import * as THREE from 'three';

export interface RendererInterface {
	getThreeRenderer(): THREE.WebGLRenderer;
	resize(width: number, height: number): void;
	update(): void;
}