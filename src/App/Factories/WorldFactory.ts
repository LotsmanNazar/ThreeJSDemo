import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { FactoryInterface } from '@/App/Abstracts/Interfaces/FactoryInterface';
import { WorldInterface } from '@/App/Abstracts/Interfaces/WorldInterface';
import { World } from '@/App/World/World';

export class WorldFactory implements FactoryInterface<unknown, WorldInterface> {
	create(): WorldInterface {
		const CannonWorldInstance = new CANNON.World();
		CannonWorldInstance.gravity.set(0, -10, 0);

		const AmbientLightInstance = new THREE.AmbientLight(0xffffff);
		const SceneInstance = new THREE.Scene();
		SceneInstance.add(AmbientLightInstance);
		SceneInstance.background = new THREE.Color( 0xADD8E6 );
		SceneInstance.fog = new THREE.Fog( 0xADD8E6, 10, 30 );

		const WorldInstance = new World(SceneInstance, CannonWorldInstance);

		return WorldInstance;
	}
}