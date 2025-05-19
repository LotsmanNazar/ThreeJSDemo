import * as THREE from 'three';

export interface MouseObjectsFinderInterface {
	find(x: number, y: number, ThreeMeshes: Array<THREE.Object3D>): THREE.Intersection | false;
}