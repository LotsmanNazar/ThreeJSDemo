export interface WorldUpdaterInterface {
	startUpdate(time: number): void;
	stopUpdate(): void;
}