import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export interface GameObjectInterface {
	getThreeMesh(): THREE.Group;
	getCannonBody(): CANNON.Body;
	getID(): number;
	setDragAndDrop(value: boolean): void;
	canDragAndDrop(): boolean;
	update(): void;
}