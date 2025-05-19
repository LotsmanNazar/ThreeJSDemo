import * as THREE from 'three';
import { MouseObjectsFinderInterface } from '@/App/Abstracts/Interfaces/MouseObjectsFinderInterface';
import { CameraInterface } from '@/App/Abstracts/Interfaces/CameraInterface';

export class MouseObjectsFinder implements MouseObjectsFinderInterface {
	private CameraInstance: CameraInterface;
	private ThreeRaycasterInstance: THREE.Raycaster;
	private mouseVector: THREE.Vector2;

	constructor(CameraInstance: CameraInterface) {
		this.CameraInstance = CameraInstance;
		this.ThreeRaycasterInstance = new THREE.Raycaster();
		this.mouseVector = new THREE.Vector2(0, 0);
	}

	find(x: number, y: number, ThreeMeshes: Array<THREE.Object3D>): THREE.Intersection | false {
		const ThreeCameraInstance = this.CameraInstance.getThreeCamera();

		this.mouseVector.x = x;
		this.mouseVector.y = y;

		this.ThreeRaycasterInstance.setFromCamera(this.mouseVector, ThreeCameraInstance);
		const intersections = this.ThreeRaycasterInstance.intersectObjects(ThreeMeshes);

		for ( const intersection of intersections ) {
			if ( intersection.object.userData.gameObjectID === undefined ) {
				continue;
			}

			return intersection;
		}

		return false;
	}
}