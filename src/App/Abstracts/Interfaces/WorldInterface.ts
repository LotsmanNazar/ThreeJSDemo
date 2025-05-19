import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GameObjectInterface } from '@/App/Abstracts/Interfaces/GameObjectInterface';

export interface WorldInterface {
	addObject(GameObjectInstance: GameObjectInterface): void;
	getObject(id: number): GameObjectInterface | undefined;
	deleteObject(id: number): void;
	getThreeScene(): THREE.Scene;
	getCannonWorld(): CANNON.World;
	update(dt: number): void;
}