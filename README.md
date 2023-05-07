# Typed Worker Threads

Typed Worker Threads is a library designed to make working with threads in Node.js easier, while providing type safety with TypeScript. This README will guide you through setting up and using the library in your project.

## Installation

Install the package using `npm` or `yarn` or `pnpm`.

```bash
npm install typed-worker-threads
```

## Usage (recommended)

1. Create a folder called `threads` in your project root.
2. Create a new file in the `threads` directory. Name it to describe the thread's purpose, for example, `pdf_thread.ts` or `compress_thread.ts`.
3. In the file, import the `Thread` class and create a new instance of it. Pass the path to the file that will be executed in the thread as the first argument. The path is relative to the `threads` directory. The second argument is the name of the thread, which is optional and defaults to the name of the file.
4. Export the instance of the `Thread` class.
5. In the main thread, import the created thread and use it (handle events, send messages, etc.).
6. In the worker thread, import `parentPort` from the created thread instance and use it.

Here's an example of how to set up a typed worker thread:

```ts
// 'compress_thread.ts' file in 'threads' directory
import { Thread } from "typed-worker-threads";

type ParentToChild = {
  type: "compress";
  payload: {
    name: string;
    buffer: ArrayBuffer;
    outDir: string;
    compressionLevel: number;
    type: "gzip" | "deflate";
  };
};

type CompressionError = {
  type: "error";
  payload: { error: Error };
};

type CompressionSuccess = {
  type: "success";
  payload: {
    name: string;
    path: string;
  };
};
type ChildToParent = CompressionError | CompressionSuccess;

const compressionThread = new Thread<ParentToChild, ChildToParent>(
  "../dist/workers/compress_worker.js",
  "compress_thread"
);

export default compressionThread;

// Main thread
import compressionThread from "./threads/compress_thread";

compressionThread.worker.on("message", (message) => {
  switch (message.type) {
    case "success":
      console.log(`File ${message.payload.name} compressed successfully`);
      break;
    case "error":
      console.error(message.payload.error);
      break;
  }
});

// Worker thread
import { parentPort } from "./threads/compress_thread";

parentPort.on("message", (message) => {
  // Make heavy computations (compress file, etc.)
  // If an error occurs, send an error message to the main thread
});
```

## API

- `Thread<ParentToChild, ChildToParent>`: Class for creating and managing worker threads.
- `parentPort`: An instance of `MessagePort` to communicate with the main thread.

## License

Typed Worker Threads is released under the BSD-3-Clause License. See [LICENSE](LICENSE) for details.
