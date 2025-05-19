import * as THREE from 'three';
import { GameObjectInterface } from '@/App/Abstracts/Interfaces/GameObjectInterface';

export interface MouseObjectsMoverInterface {
	takeObject(GameObjectInstance: GameObjectInterface, ThreeIntersectionInstance: THREE.Intersection): void;
	dropObject(): void;
	moveObject(ThreeIntersectionInstance: THREE.Intersection): void
	update(): void;
}