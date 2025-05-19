import * as THREE from 'three';
import { RendererInterface } from '@/App/Abstracts/Interfaces/RendererInterface';

export class Renderer implements RendererInterface {
	private ThreeRendererInstance: THREE.WebGLRenderer;
	private ThreeSceneInstance: THREE.Scene;
	private ThreeCameraInstance: THREE.Camera;

	constructor(ThreeRendererInstance: THREE.WebGLRenderer, ThreeSceneInstance: THREE.Scene, ThreeCameraInstance: THREE.Camera) {
		this.ThreeRendererInstance = ThreeRendererInstance;
		this.ThreeSceneInstance = ThreeSceneInstance;
		this.ThreeCameraInstance = ThreeCameraInstance;
	}

	getThreeRenderer(): THREE.WebGLRenderer {
		return this.ThreeRendererInstance;
	}

	resize(width: number, height: number) {
		this.ThreeRendererInstance.setSize(width, height);
	}

	update() {
		this.ThreeRendererInstance.render(this.ThreeSceneInstance, this.ThreeCameraInstance);
	}
}