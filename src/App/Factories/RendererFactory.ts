import * as THREE from 'three';
import { FactoryInterface } from '@/App/Abstracts/Interfaces/FactoryInterface';
import { WorldInterface } from '@/App/Abstracts/Interfaces/WorldInterface';
import { CameraInterface } from '@/App/Abstracts/Interfaces/CameraInterface';
import { RendererInterface } from '@/App/Abstracts/Interfaces/RendererInterface';
import { Renderer } from '@/App/Camera/Renderer';

export class RendererFactory implements FactoryInterface<HTMLCanvasElement, RendererInterface> {
	private WorldInstance: WorldInterface;
	private CameraInstance: CameraInterface;

	constructor(WorldInstance: WorldInterface, CameraInstance: CameraInterface) {
		this.WorldInstance = WorldInstance;
		this.CameraInstance = CameraInstance;
	}

	create(canvas: HTMLCanvasElement): RendererInterface {
		const ThreeRendererInstance = new THREE.WebGLRenderer({
			antialias: true,
			canvas: canvas
		});

		const ThreeSceneInstance = this.WorldInstance.getThreeScene();
		const ThreeCameraInstance = this.CameraInstance.getThreeCamera();
		const RendererInstance = new Renderer(ThreeRendererInstance, ThreeSceneInstance, ThreeCameraInstance);

		return RendererInstance;
	}
}