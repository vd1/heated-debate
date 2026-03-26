declare module "fs" {
  export function appendFileSync(path: string, data: string): void;
  export function existsSync(path: string): boolean;
  export function mkdirSync(path: string, options?: { recursive?: boolean }): string | undefined;
  export function readFileSync(path: string, encoding: "utf8"): string;
  export function writeFileSync(path: string, data: string): void;
}

declare module "path" {
  export function dirname(path: string): string;
  export function resolve(...paths: string[]): string;
}

declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
  }

  interface Process {
    argv: string[];
    env: ProcessEnv;
    cwd(): string;
    exit(code?: number): never;
    on(event: "SIGINT", listener: () => void): this;
    stdout: {
      write(chunk: string): void;
    };
    stderr: {
      write(chunk: string): void;
    };
  }
}

declare const process: NodeJS.Process;

interface BunSpawnOptions {
  env?: NodeJS.ProcessEnv;
  stdout?: "pipe";
  stderr?: "pipe";
}

interface BunSubprocess {
  stdout: ReadableStream<Uint8Array>;
  stderr: ReadableStream<Uint8Array>;
  exited: Promise<number>;
  kill(signal?: string): void;
}

interface BunSpawnSyncResult {
  exitCode: number;
  stdout: Uint8Array;
  stderr: Uint8Array;
}

interface BunGlobal {
  spawn(args: string[], options?: BunSpawnOptions): BunSubprocess;
  spawnSync(args: string[], options?: BunSpawnOptions): BunSpawnSyncResult;
}

declare const Bun: BunGlobal;

interface ImportMeta {
  readonly dir: string;
}

interface Crypto {
  randomUUID(): string;
}
