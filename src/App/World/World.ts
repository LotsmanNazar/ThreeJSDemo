import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { WorldInterface } from '@/App/Abstracts/Interfaces/WorldInterface';
import { GameObjectInterface } from '@/App/Abstracts/Interfaces/GameObjectInterface';

export class World implements WorldInterface {
	private ThreeSceneInstance: THREE.Scene;
	private CannonWorldInstance: CANNON.World;
	private Objects: Map<number, GameObjectInterface>;

	constructor(SceneInstance: THREE.Scene, CannonWorldInstance: CANNON.World) {
		this.ThreeSceneInstance = SceneInstance;
		this.CannonWorldInstance = CannonWorldInstance;
		this.Objects = new Map();
	}

	addObject(GameObjectInstance: GameObjectInterface) {
		const CannonBodyInstance = GameObjectInstance.getCannonBody();
		const ThreeMeshInstance = GameObjectInstance.getThreeMesh();

		this.Objects.set(GameObjectInstance.getID(), GameObjectInstance);
		this.CannonWorldInstance.addBody(CannonBodyInstance);
		this.ThreeSceneInstance.add(ThreeMeshInstance);
	}

	getObject(id: number): GameObjectInterface | undefined {
		return this.Objects.get(id);
	}

	deleteObject(id: number) {
		this.Objects.delete(id);
	}

	getThreeScene(): THREE.Scene {
		return this.ThreeSceneInstance;
	}

	getCannonWorld(): CANNON.World {
		return this.CannonWorldInstance;
	}

	update(dt: number) {
		this.CannonWorldInstance.step(dt);

		for ( const [id, GameObjectInstance] of this.Objects ) {
			GameObjectInstance.update();
		}
	}
}