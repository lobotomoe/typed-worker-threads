/* eslint-disable @typescript-eslint/naming-convention */
export type DefaultListeners = {
	error: (error: Error) => void;
	exit: (exitCode: number) => void;
	messageerror: (error: Error) => void;
	online: () => void;
};

export type WithTypedMessage<T> = DefaultListeners & {
	message: (value: T) => void;
};

export type TypedWorkerOptions<
	TData,
	TArgv extends unknown[] = unknown[],
> = {
	argv?: TArgv | undefined;
	workerData?: TData | undefined;
} & WorkerOptions;
