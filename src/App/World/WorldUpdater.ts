import { WorldUpdaterInterface } from '@/App/Abstracts/Interfaces/WorldUpdaterInterface';
import { WorldInterface } from '@/App/Abstracts/Interfaces/WorldInterface';
import { WorldDebugerInterface } from '@/App/Abstracts/Interfaces/WorldDebugerInterface';
import { CameraInterface } from '@/App/Abstracts/Interfaces/CameraInterface';
import { RendererInterface } from '@/App/Abstracts/Interfaces/RendererInterface';
import { MouseObjectsMoverInterface } from '@/App/Abstracts/Interfaces/MouseObjectsMoverInterface';

export class WorldUpdater implements WorldUpdaterInterface {
	private WorldInstance: WorldInterface;
	private WorldDebugerInstance: WorldDebugerInterface;
	private CameraInstance: CameraInterface;
	private RendererInstance: RendererInterface;
	private MouseObjectsMoverInstance: MouseObjectsMoverInterface;
	private rafID: number;
	
	constructor(
		WorldInstance: WorldInterface,
		WorldDebugerInstance: WorldDebugerInterface,
		CameraInstance: CameraInterface,
		RendererInstance: RendererInterface,
		MouseObjectsMoverInstance: MouseObjectsMoverInterface
	) {
		this.WorldInstance = WorldInstance;
		this.WorldDebugerInstance = WorldDebugerInstance;
		this.CameraInstance = CameraInstance;
		this.RendererInstance = RendererInstance;
		this.MouseObjectsMoverInstance = MouseObjectsMoverInstance;

		this.rafID = 0;
	}

	startUpdate(time = window.performance.now()) {
		const time2 = window.performance.now();
		const dt = Math.min((time2 - time) / 1000, 1/60);
		
		this.WorldInstance.update(dt);
		this.WorldDebugerInstance.update();
		this.RendererInstance.update();
		this.CameraInstance.update();
		this.MouseObjectsMoverInstance.update();
		
		this.rafID = requestAnimationFrame(() => {
			this.startUpdate(time2);
		});
	}

	stopUpdate(): void {
		cancelAnimationFrame(this.rafID);
	}
}