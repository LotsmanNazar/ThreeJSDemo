import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GameObjectInterface } from '@/App/Abstracts/Interfaces/GameObjectInterface';

export class GameObject implements GameObjectInterface {
	private ThreeMeshInstance: THREE.Group;
	private CannonBodyInstance: CANNON.Body;
	private id: number;
	private threeMeshOffset: GameObjectThreeMeshOffset;
	private dragAndDrop: boolean;

	constructor(ThreeMeshInstance: THREE.Group, CannonBodyInstance: CANNON.Body, threeMeshOffset: GameObjectThreeMeshOffset) {
		this.ThreeMeshInstance = ThreeMeshInstance;
		this.CannonBodyInstance = CannonBodyInstance;
		this.threeMeshOffset = threeMeshOffset;
		this.id = CannonBodyInstance.id;
		this.dragAndDrop = true;
	}

	getThreeMesh(): THREE.Group {
		return this.ThreeMeshInstance;
	}

	getCannonBody(): CANNON.Body {
		return this.CannonBodyInstance;
	}

	getID(): number {
		return this.id;
	}

	setDragAndDrop(value: boolean) {
		this.dragAndDrop = value
	}

	canDragAndDrop(): boolean {
		return this.dragAndDrop;
	}

	update() {
		const quaternion = this.CannonBodyInstance.quaternion;
		const offset = new THREE.Vector3(this.threeMeshOffset.x, this.threeMeshOffset.y, this.threeMeshOffset.z);
		offset.applyQuaternion(new THREE.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));

		this.ThreeMeshInstance.position.x = this.CannonBodyInstance.position.x + offset.x;
		this.ThreeMeshInstance.position.y = this.CannonBodyInstance.position.y + offset.y;
		this.ThreeMeshInstance.position.z = this.CannonBodyInstance.position.z + offset.z;
		this.ThreeMeshInstance.quaternion.copy(this.CannonBodyInstance.quaternion);
	}
}