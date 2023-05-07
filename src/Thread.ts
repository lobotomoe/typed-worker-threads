import type TypedMessagePort from './TypedMessagePort.js';
import TypedWorker from './TypedWorker.js';
import {parentPort, workerData, isMainThread} from 'worker_threads';
import {type StructureCloned, type TypedWorkerOptions} from './types.js';

export default class Thread<
	TIn extends StructureCloned,
	TOut extends StructureCloned,
	TData = unknown,
	TArgv extends unknown[] = unknown[],
> {
	readonly worker: TypedWorker<TIn, TOut, TData, TArgv>;

	constructor(
		filename: string | URL,
		options?: TypedWorkerOptions<TData, TArgv>,
	) {
		this.worker = new TypedWorker<TIn, TOut, TData, TArgv>(filename, options);
	}

	get parentPort(): TypedMessagePort<TOut, TIn> | null {
		if (isMainThread) {
			throw new Error('parentPort is only available in worker threads. Current thread is main thread.');
		}

		return parentPort;
	}

	get workerData(): TData {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return workerData;
	}
}
