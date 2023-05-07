import {MessagePort, type TransferListItem} from 'worker_threads';
import {type StructureCloned, type WithTypedMessage} from './types.js';

export default class TypedMessagePort<
	TIn extends StructureCloned,
	TOut extends StructureCloned,
> extends MessagePort {
	override postMessage(value: TIn, transferList?: readonly TransferListItem[]) {
		super.postMessage(value, transferList);
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
}
