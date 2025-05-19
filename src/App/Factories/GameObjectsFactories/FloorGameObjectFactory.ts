import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { FactoryInterface } from '@/App/Abstracts/Interfaces/FactoryInterface';
import { WorldInterface } from '@/App/Abstracts/Interfaces/WorldInterface';
import { ModelsFilesLoaderInterface} from '@/App/Abstracts/Interfaces/ModelsFilesLoaderInterface';
import { GameObjectFactoryAbstract } from '@/App/Abstracts/Abstracts/GameObjectFactoryAbstract';

export class FloorGameObjectFactory extends GameObjectFactoryAbstract<FloorGameObjectFactoryOptionsType> {
	private TexturesFilesLoaderInstance: ModelsFilesLoaderInterface<THREE.Texture>;
	
	constructor(
		WorldInstance: WorldInterface,
		CannonBodyFactoryInstance: FactoryInterface<CannonBodyFactoryOptionsType, CANNON.Body>,
		TexturesFilesLoaderInstance: ModelsFilesLoaderInterface<THREE.Texture>
	) {
		super('Refrigerator', WorldInstance, CannonBodyFactoryInstance);

		this.TexturesFilesLoaderInstance = TexturesFilesLoaderInstance;
	}

	protected getMeshOffset(options: GameObjectFactoryOptionsType): GameObjectThreeMeshOffset {
		return {
			x: 0 * options.scale,
			y: 0 * options.scale,
			z: 0 * options.scale
		}
	}

	protected createCannonBody(options: FloorGameObjectFactoryOptionsType): CANNON.Body {
		const CannonShapeInstance = new CANNON.Box(new CANNON.Vec3(options.width * options.scale, options.height * options.scale, options.length * options.scale));
		const CannonBodyInstance = this.CannonBodyFactoryInstance.create({
			shape: CannonShapeInstance,
			mass: 0,
			friction: 1,
			restitution: 0,
			x: options.x,
			y: options.y,
			z: options.z,
			angle: options.angle
		});

		return CannonBodyInstance;
	}

	protected async createThreeMesh(options: FloorGameObjectFactoryOptionsType): Promise<THREE.Group> {
		const ThreeGroupInstance = new THREE.Group();
		const ThreeGeometryInstance = new THREE.BoxGeometry(
			options.width * options.scale * 2,
			options.height * options.scale * 2,
			options.length * options.scale * 2
		);
		
		const ThreeTextureInstance = await this.TexturesFilesLoaderInstance.load('PinkTexture');
		ThreeTextureInstance.wrapS = THREE.RepeatWrapping;
		ThreeTextureInstance.wrapT = THREE.RepeatWrapping;
		ThreeTextureInstance.repeat.set(10, 10);
		const ThreeMaterialInstance = new THREE.MeshBasicMaterial({
			color: options.color,
			map: ThreeTextureInstance
		});
		const ThreeMeshInstance = new THREE.Mesh(ThreeGeometryInstance, ThreeMaterialInstance);
		ThreeGroupInstance.add(ThreeMeshInstance);

		return ThreeGroupInstance;
	}
}