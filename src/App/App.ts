import { WorldFactory } from '@/App/Factories/WorldFactory';
import { CameraFactory } from '@/App/Factories/CameraFactory';
import { CannonBodyFactory } from '@/App/Factories/CannonBodyFactory';
import { RendererFactory } from '@/App/Factories/RendererFactory';
import { RefrigeratorGameObjectFactory } from '@/App/Factories/GameObjectsFactories/RefrigeratorGameObjectFactory';
import { ClosetGameObjectFactory } from '@/App/Factories/GameObjectsFactories/ClosetGameObjectFactory';
import { FloorGameObjectFactory } from '@/App/Factories/GameObjectsFactories/FloorGameObjectFactory';
import { MouseObjectsMover } from '@/App/Mouse/MouseObjectsMover';
import { MouseObjectsFinder } from '@/App/Mouse/MouseObjectsFinder';
import { WorldDebuger } from '@/App/World/WorldDebuger';
import { WorldUpdater } from '@/App/World/WorldUpdater';
import { GLTFFilesLoader } from '@/App/FilesLoaders/GLTFFilesLoader';
import { TexturesFilesLoader } from '@/App/FilesLoaders/TexturesFilesLoader';
import { modelsManifest } from '@/App/modelsManifest';
import { texturesManifest } from '@/App/texturesManifest';

export class App {
	private canvas: HTMLCanvasElement;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
	}
	
	async init(debug: boolean) {
		const WorldFactoryInstance = new WorldFactory();
		const CameraFactoryInstance = new CameraFactory();
		const CannonBodyFactoryInstance = new CannonBodyFactory();

		const WorldInstance = WorldFactoryInstance.create();
		const CameraInstance = CameraFactoryInstance.create({
			fov: 75,
			aspect: window.innerWidth / window.innerHeight,
			near: 0.1,
			far: 100,
			domElement: this.canvas,
			x: 5,
			y: 5,
			z: 10
		});

		const RendererFactoryInstance = new RendererFactory(WorldInstance, CameraInstance);
		const RendererInstance = RendererFactoryInstance.create(this.canvas);
		RendererInstance.resize(window.innerWidth, window.innerHeight);

		const MouseObjectsMoverInstance = new MouseObjectsMover();
		const MouseObjectsFinderInstance = new MouseObjectsFinder(CameraInstance)
		const WorldDebugerInstance = new WorldDebuger(WorldInstance, debug);
		const WorldUpdaterInstance = new WorldUpdater(WorldInstance, WorldDebugerInstance, CameraInstance, RendererInstance, MouseObjectsMoverInstance);
		const GLTFFilesLoaderInstance = new GLTFFilesLoader(modelsManifest);
		const TexturesFilesLoaderInstance = new TexturesFilesLoader(texturesManifest);

		const RefrigeratorGameObjectFactoryInstance = new RefrigeratorGameObjectFactory(
			WorldInstance,
			CannonBodyFactoryInstance,
			GLTFFilesLoaderInstance
		);

		const ClosetGameObjectFactoryInstance = new ClosetGameObjectFactory(
			WorldInstance,
			CannonBodyFactoryInstance,
			GLTFFilesLoaderInstance
		);

		const FloorGameObjectFactoryInstance = new FloorGameObjectFactory(
			WorldInstance,
			CannonBodyFactoryInstance,
			TexturesFilesLoaderInstance
		);

		const FloorGameObjectInstance = await FloorGameObjectFactoryInstance.create({
			scale: 1,
			x: 0,
			y: 0,
			z: 0,
			angle: 0,
			width: 10,
			height: 0.1,
			length: 10,
			color: 0xffffff
		});
		FloorGameObjectInstance.setDragAndDrop(false);

		const RefrigeratorGameObjectInstance = await RefrigeratorGameObjectFactoryInstance.create({
			scale: 3,
			x: 2,
			y: 2,
			z: 5,
			angle: 2.5
		});

		const RefrigeratorGameObjectInstance2 = await RefrigeratorGameObjectFactoryInstance.create({
			scale: 1,
			x: 5,
			y: 1,
			z: 5,
			angle: 0
		});

		const ClosetGameObjectInstance = await ClosetGameObjectFactoryInstance.create({
			scale: 1,
			x: 3.5,
			y: 2,
			z: -0.7,
			angle: -0.5
		});

		const ClosetGameObjectInstance2 = await ClosetGameObjectFactoryInstance.create({
			scale: 1.5,
			x: 0,
			y: 4,
			z: 0,
			angle: 1
		});

		document.addEventListener('mousedown', (event: MouseEvent) => {
			const ThreeSceneInstance = WorldInstance.getThreeScene();
			const FloorThreeMeshInstance = FloorGameObjectInstance.getThreeMesh();
			const x = (event.clientX / window.innerWidth) * 2 - 1;
			const y = -(event.clientY / window.innerHeight) * 2 + 1;

			const intersectionAll = MouseObjectsFinderInstance.find(x, y, ThreeSceneInstance.children);
			const intersectionFloor = MouseObjectsFinderInstance.find(x, y, [FloorThreeMeshInstance]);
			if ( !intersectionAll || !intersectionFloor ) {
				return;
			}

			const GameObjectInstance = WorldInstance.getObject(intersectionAll.object.userData.gameObjectID);
			if ( GameObjectInstance === undefined || !GameObjectInstance.canDragAndDrop() ) {
				return;
			}
			
			MouseObjectsMoverInstance.takeObject(GameObjectInstance, intersectionFloor);
			CameraInstance.freeze();
		});

		document.addEventListener('mouseup', (event: MouseEvent) => {
			MouseObjectsMoverInstance.dropObject();
			CameraInstance.unfreeze();
		});

		document.addEventListener('mousemove', (event: MouseEvent) => {
			const ThreeMeshInstance = FloorGameObjectInstance.getThreeMesh();
			const x = (event.clientX / window.innerWidth) * 2 - 1;
			const y = -(event.clientY / window.innerHeight) * 2 + 1;
			const intersection = MouseObjectsFinderInstance.find(x, y, [ThreeMeshInstance]);

			if ( !intersection ) {
				return;
			}

			MouseObjectsMoverInstance.moveObject(intersection);
		});

		window.addEventListener('resize', () => {
			CameraInstance.resize(window.innerWidth / window.innerHeight);
			RendererInstance.resize(window.innerWidth, window.innerHeight);
		});

		WorldUpdaterInstance.startUpdate();
	}
}