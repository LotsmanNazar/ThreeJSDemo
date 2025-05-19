import * as THREE from 'three';
import { MouseObjectsMoverInterface } from '@/App/Abstracts/Interfaces/MouseObjectsMoverInterface';
import { GameObjectInterface } from '@/App/Abstracts/Interfaces/GameObjectInterface';

export class MouseObjectsMover implements MouseObjectsMoverInterface {
	private GameObjectInstance: GameObjectInterface | null;
	private initailBodyPosition: {x: number, z: number};
	private initailIntersectionPosition: {x: number, z: number};
	private distance: {x: number, z: number};

	constructor() {
		this.GameObjectInstance = null;
		this.initailBodyPosition = {x: 0, z: 0};
		this.initailIntersectionPosition = {x: 0, z: 0};
		this.distance = {x: 0, z: 0};
	}

	takeObject(GameObjectInstance: GameObjectInterface, ThreeIntersectionInstance: THREE.Intersection) {
		this.GameObjectInstance = GameObjectInstance;
		const ThreeMeshInstance = this.GameObjectInstance.getThreeMesh();

		this.initailBodyPosition = {
			x: ThreeMeshInstance.position.x,
			z: ThreeMeshInstance.position.z
		};

		this.initailIntersectionPosition = {
			x: ThreeIntersectionInstance.point.x,
			z: ThreeIntersectionInstance.point.z
		};

		this.distance = {x: 0, z: 0};
	}

	dropObject() {
		this.GameObjectInstance = null;
	}

	moveObject(ThreeIntersectionInstance: THREE.Intersection) {
		this.distance.x = ThreeIntersectionInstance.point.x - this.initailIntersectionPosition.x;
		this.distance.z = ThreeIntersectionInstance.point.z - this.initailIntersectionPosition.z;
	}

	update() {
		if ( !this.GameObjectInstance || ( !this.distance.x && !this.distance.z) ) {
			return;
		}

		const CannonBodyInstance = this.GameObjectInstance.getCannonBody();
		CannonBodyInstance.position.x = this.initailBodyPosition.x + this.distance.x;
		CannonBodyInstance.position.z = this.initailBodyPosition.z + this.distance.z;
		CannonBodyInstance.velocity.setZero();
		CannonBodyInstance.angularVelocity.setZero();	
	}
}