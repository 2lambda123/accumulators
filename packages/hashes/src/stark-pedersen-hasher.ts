import { IHasher } from "@merkle-mountain-range/core";
import { pedersen } from "./pedersen/pedersen_wasm";

export class StarkPedersenHasher extends IHasher {
  constructor() {
    super({ blockSizeBits: 252 });
  }

  hash(data: string[]): string {
    if (data.length !== 2) throw new Error("Stark Pedersen Hasher only accepts two elements");
    return pedersen(data[0], data[1]);
  }
}