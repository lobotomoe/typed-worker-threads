/* eslint-disable @typescript-eslint/naming-convention */
import {type TransferListItem, Worker} from 'worker_threads';
import {type TypedWorkerOptions, type WithTypedMessage} from './types.js';

export default class TypedWorker<
	TIn,
	TOut,
	TData,
	TArgv extends unknown[] = unknown[],
> extends Worker {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(filename: string | URL, options?: TypedWorkerOptions<TData, TArgv>) {
		super(filename, options);
	}

	override on<K extends keyof WithTypedMessage<TOut>>(
		event: K,
		listener: WithTypedMessage<TOut>[K],
	): this {
		return super.on(event, listener as (...args: any[]) => void);
	}

	override addListener<K extends keyof WithTypedMessage<TOut>>(
		event: K,
		listener: WithTypedMessage<TOut>[K],
	): this {
		return super.addListener(event, listener as (...args: any[]) => void);
	}

	override once<K extends keyof WithTypedMessage<TOut>>(
		event: K,
		listener: WithTypedMessage<TOut>[K],
	): this {
		return super.once(event, listener as (...args: any[]) => void);
	}

	override emit<K extends keyof WithTypedMessage<TOut>>(
		event: K,
		...args: Parameters<WithTypedMessage<TOut>[K]>
	): boolean {
		return super.emit(event, ...args);
	}

	override removeListener<K extends keyof WithTypedMessage<TOut>>(
		event: K,
		listener: WithTypedMessage<TOut>[K],
	): this {
		return super.removeListener(event, listener as (...args: any[]) => void);
	}

	override off<K extends keyof WithTypedMessage<TOut>>(
		event: K,
		listener: WithTypedMessage<TOut>[K],
	): this {
		return super.off(event, listener as (...args: any[]) => void);
	}

	override removeAllListeners<K extends keyof WithTypedMessage<TOut>>(
		event?: K,
	): this {
		return super.removeAllListeners(event);
	}

	override prependListener<K extends keyof WithTypedMessage<TOut>>(
		event: K,
		listener: WithTypedMessage<TOut>[K],
	): this {
		return super.prependListener(event, listener as (...args: any[]) => void);
	}

	override prependOnceListener<K extends keyof WithTypedMessage<TOut>>(
		event: K,
		listener: WithTypedMessage<TOut>[K],
	): this {
		return super.prependOnceListener(event, listener as (...args: any[]) => void);
	}

	override postMessage(value: TIn, transferList?: readonly TransferListItem[]): void {
		super.postMessage(value, transferList);
	}
}
