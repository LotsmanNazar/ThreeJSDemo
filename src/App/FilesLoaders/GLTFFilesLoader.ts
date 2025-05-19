import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ModelsFilesLoaderInterface } from '@/App/Abstracts/Interfaces/ModelsFilesLoaderInterface';

export class GLTFFilesLoader implements ModelsFilesLoaderInterface<THREE.Group> {
	private GLTFLoader: GLTFLoader;
	private ThreeGroups: Map<string, THREE.Group>;
	private modelsManifest: ModelsManifestType;

	constructor(modelsManifest: ModelsManifestType) {
		this.GLTFLoader = new GLTFLoader();
		this.ThreeGroups = new Map();
		this.modelsManifest = modelsManifest;
	}

	load(key: string): Promise<THREE.Group> {
		if ( !this.modelsManifest[key] ) {
			throw new Error('Model not found');
		}

		return new Promise((resolve, reject) => {
			const modelURL = this.modelsManifest[key];
			const ExistThreeGroupInstance = this.ThreeGroups.get(key);

			if ( ExistThreeGroupInstance ) {
				resolve(ExistThreeGroupInstance.clone());
			} else {
				this.GLTFLoader.load(modelURL,
					(gltf) => {
						const ThreeGroupInstance = new THREE.Group();
						const ThreeSceneInstance = gltf.scene ? gltf.scene : false;

						if ( ThreeSceneInstance ) {
							this.ThreeGroups.set(key, ThreeSceneInstance);
							ThreeGroupInstance.add(ThreeSceneInstance);
							resolve(ThreeGroupInstance);
						} else {
							throw new Error('Scene not found in model');
						}
					},
				
					(event: ProgressEvent) => {},
					(error: any) => {
						const errorMessage = typeof error.toString === 'function' ? error.toString() : 'Error loading model';
						throw new Error(errorMessage)
					}
				);
			}
		});
	}
}