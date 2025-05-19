export interface ModelsFilesLoaderInterface<T> {
	load(key: string): Promise<T>;
}