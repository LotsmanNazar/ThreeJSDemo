import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { FactoryInterface } from '@/App/Abstracts/Interfaces/FactoryInterface';
import { WorldInterface } from '@/App/Abstracts/Interfaces/WorldInterface';
import { ModelsFilesLoaderInterface} from '@/App/Abstracts/Interfaces/ModelsFilesLoaderInterface';
import { GameObjectFactoryAbstract } from '@/App/Abstracts/Abstracts/GameObjectFactoryAbstract';

export class ClosetGameObjectFactory extends GameObjectFactoryAbstract<GameObjectFactoryOptionsType> {
	private ModelsFilesLoaderInstance: ModelsFilesLoaderInterface<THREE.Group>;
	private shapeSizes: {
		width: number,
		height: number,
		length: number
	}

	constructor(
		WorldInstance: WorldInterface,
		CannonBodyFactoryInstance: FactoryInterface<CannonBodyFactoryOptionsType, CANNON.Body>,
		ModelsFilesLoaderInstance: ModelsFilesLoaderInterface<THREE.Group>
	) {
		super('Closet', WorldInstance, CannonBodyFactoryInstance);

		this.ModelsFilesLoaderInstance = ModelsFilesLoaderInstance;
		this.shapeSizes = {
			width: 1.83,
			height: 1.72,
			length: 0.45
		}
	}

	protected getMeshOffset(options: GameObjectFactoryOptionsType): GameObjectThreeMeshOffset {
		return {
			x: -0.2 * options.scale,
			y: -1.63 * options.scale,
			z: 0 * options.scale
		}
	}

	protected createCannonBody(options: GameObjectFactoryOptionsType): CANNON.Body {
		const CannonShapeInstance = new CANNON.Box(new CANNON.Vec3(
			this.shapeSizes.width * options.scale,
			this.shapeSizes.height * options.scale,
			this.shapeSizes.length * options.scale
		));

		const CannonBodyInstance = this.CannonBodyFactoryInstance.create({
			shape: CannonShapeInstance,
			mass: 1,
			friction: 1,
			restitution: 0,
			x: options.x,
			y: options.y,
			z: options.z,
			angle: options.angle
		});

		return CannonBodyInstance;
	}

	protected async createThreeMesh(options: GameObjectFactoryOptionsType): Promise<THREE.Group> {
		const ThreeGroupInstance = await this.ModelsFilesLoaderInstance.load(this.modelName);
		ThreeGroupInstance.position.set(0, 0, 0);
		ThreeGroupInstance.scale.set(options.scale, options.scale, options.scale);

		return ThreeGroupInstance;
	}
}