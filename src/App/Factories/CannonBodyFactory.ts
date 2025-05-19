import * as CANNON from 'cannon-es';
import { FactoryInterface } from '@/App/Abstracts/Interfaces/FactoryInterface';

export class CannonBodyFactory implements FactoryInterface<CannonBodyFactoryOptionsType, CANNON.Body> {
	create(options: CannonBodyFactoryOptionsType): CANNON.Body {
		const CannonBodyInstance = new CANNON.Body({
			shape: options.shape,
			mass: options.mass,
			position: new CANNON.Vec3(options.x, options.y, options.z),
			fixedRotation: true,
			material: new CANNON.Material({
				friction: options.friction,
				restitution: options.restitution
			})
		});

		CannonBodyInstance.quaternion.setFromEuler(0, options.angle, 0);
		
		return CannonBodyInstance;
	}
}