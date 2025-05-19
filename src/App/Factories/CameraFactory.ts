import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FactoryInterface } from '@/App/Abstracts/Interfaces/FactoryInterface';
import { CameraInterface } from '@/App/Abstracts/Interfaces/CameraInterface';
import { Camera } from '@/App/Camera/Camera';

export class CameraFactory implements FactoryInterface<CameraFactoryOptionsType, CameraInterface> {
	create(options: CameraFactoryOptionsType): CameraInterface {
		const ThreeCameraInstance = new THREE.PerspectiveCamera(options.fov, options.aspect, options.near, options.far);
		const OrbitControlsInstance = new OrbitControls(ThreeCameraInstance, options.domElement);
		const CameraInstance = new Camera(ThreeCameraInstance, OrbitControlsInstance);

		CameraInstance.setPosition(options.x, options.y, options.z);

		return CameraInstance;
	}
}