import * as THREE from 'three';
import { ModelsFilesLoaderInterface } from '@/App/Abstracts/Interfaces/ModelsFilesLoaderInterface';

export class TexturesFilesLoader implements ModelsFilesLoaderInterface<THREE.Texture> {
	private ThreeTextureLoaderInstance: THREE.TextureLoader;
	private ThreeTextures: Map<string, THREE.Texture>;
	private texturesManifest: TexturesManifestType;

	constructor(texturesManifest: TexturesManifestType) {
		this.ThreeTextureLoaderInstance = new THREE.TextureLoader();
		this.ThreeTextures = new Map();
		this.texturesManifest = texturesManifest;
	}

	load(key: string): Promise<THREE.Texture> {
		if ( !this.texturesManifest[key] ) {
			throw new Error('Texture not found');
		}

		return new Promise((resolve, reject) => {
			const texturePath = this.texturesManifest[key];
			const ExistThreeTextureInstance = this.ThreeTextures.get(key);

			if ( ExistThreeTextureInstance ) {
				resolve(ExistThreeTextureInstance.clone());
			} else {
				this.ThreeTextureLoaderInstance.load(texturePath,
					(ThreeTextureInstance: THREE.Texture) => {
						this.ThreeTextures.set(key, ThreeTextureInstance);
						resolve(ThreeTextureInstance);
					},
					() => {},
					(error: any) => {
						const errorMessage = typeof error.toString === 'function' ? error.toString() : 'Error loading texture';
						throw new Error(errorMessage)
					}
				);
			}
		});
	}
}