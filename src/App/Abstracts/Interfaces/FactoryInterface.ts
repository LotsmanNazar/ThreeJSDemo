export interface FactoryInterface<O, T> {
	create(options: O): T;
}