import CannonDebugRenderer from 'cannon-es-debugger';
import { WorldDebugerInterface } from '@/App/Abstracts/Interfaces/WorldDebugerInterface';
import { WorldInterface } from '@/App/Abstracts/Interfaces/WorldInterface';

export class WorldDebuger implements WorldDebugerInterface {
	private DebugRendererInstance: {update: () => void};
	private enabled: boolean;
	
	constructor(WorldInstance: WorldInterface, enabled: boolean) {
		this.DebugRendererInstance = CannonDebugRenderer(WorldInstance.getThreeScene(), WorldInstance.getCannonWorld());
		this.enabled = enabled;
	}

	update(): void {
		if ( !this.enabled ) {
			return;
		}

		this.DebugRendererInstance.update();
	}
}