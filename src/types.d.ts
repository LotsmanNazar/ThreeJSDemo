declare module '*.glb?url' {
	const value: string;
	export default value;
}

declare module '*.png' {
	const value: string;
	export default value;
}

declare module '*.jpg' {
	const value: string;
	export default value;
}

type CameraFactoryOptionsType = {
	fov: number,
	aspect: number,
	near: number,
	far: number,
	domElement: HTMLCanvasElement,
	x: number,
	y: number,
	z: number
}

type CannonBodyFactoryOptionsType = {
	shape: CANNON.Shape,
	mass: number,
	friction: number,
	restitution: number,
	x: number,
	y: number,
	z: number,
	angle: number
}

type GameObjectFactoryOptionsType = {
	scale: number,
	x: number,
	y: number,
	z: number,
	angle: number
}

type FloorGameObjectFactoryOptionsType = GameObjectFactoryOptionsType & {
	color: number,
	width: number,
	height: number,
	length: number
}

type GameObjectThreeMeshOffset = {
	x: number,
	y: number,
	z: number
}

type ModelsManifestType = Record<string, string>
type TexturesManifestType = Record<string, string>