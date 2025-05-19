import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { FactoryInterface } from '@/App/Abstracts/Interfaces/FactoryInterface';
import { GameObjectInterface } from '@/App/Abstracts/Interfaces/GameObjectInterface';
import { WorldInterface } from '@/App/Abstracts/Interfaces/WorldInterface';
import { GameObject } from '@/App/World/GameObject';

export abstract class GameObjectFactoryAbstract<O extends GameObjectFactoryOptionsType> implements FactoryInterface<O, Promise<GameObjectInterface>> {
	protected modelName: string;
	protected WorldInstance: WorldInterface;
	protected CannonBodyFactoryInstance: FactoryInterface<CannonBodyFactoryOptionsType, CANNON.Body>;
	
	constructor(
		modelName: string,
		WorldInstance: WorldInterface,
		CannonBodyFactoryInstance: FactoryInterface<CannonBodyFactoryOptionsType, CANNON.Body>
	) {
		this.WorldInstance = WorldInstance;
		this.CannonBodyFactoryInstance = CannonBodyFactoryInstance;
		this.modelName = modelName;
	}

	protected abstract getMeshOffset(options: GameObjectFactoryOptionsType): GameObjectThreeMeshOffset;
	protected abstract createCannonBody(options: GameObjectFactoryOptionsType): CANNON.Body;
	protected abstract createThreeMesh(options: GameObjectFactoryOptionsType): Promise<THREE.Group>;

	async create(options: O): Promise<GameObjectInterface> {
		const CannonBodyInstance = this.createCannonBody(options);
		const ThreeGroupInstance = await this.createThreeMesh(options);
		const threeMeshOffset = this.getMeshOffset(options);
		const GameObjectInstance = new GameObject(ThreeGroupInstance, CannonBodyInstance, threeMeshOffset);

		ThreeGroupInstance.userData.gameObjectID = GameObjectInstance.getID();
		ThreeGroupInstance.traverse((ThreeMeshInstance) => {
			ThreeMeshInstance.userData.gameObjectID = GameObjectInstance.getID();
		});

		this.WorldInstance.addObject(GameObjectInstance);

		return GameObjectInstance;
	}
}