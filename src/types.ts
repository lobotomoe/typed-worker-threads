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

interface StructureClonedArray<T> extends Array<T> {}

interface StructureClonedRecord<T> extends Record<string | number | symbol, T> {}

export type StructureCloned =
	| StructureClonedArray<StructureCloned>
	| ArrayBuffer
	| boolean
	| DataView
	| Date
	| Error
	| Map<StructureCloned, StructureCloned>
	| StructureClonedRecord<StructureCloned>
	| number
	| string
	| RegExp
	| Set<StructureCloned>
	| TypedArray
	| undefined
	| null
	| bigint;

type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

