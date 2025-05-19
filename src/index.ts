import { App } from '@/App/App';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const params = new URLSearchParams(window.location.search);
const debug = params.get('debug') !== null ? true : false;

if ( canvas ) {
	const AppInstance = new App(canvas);
	AppInstance.init(debug);
}