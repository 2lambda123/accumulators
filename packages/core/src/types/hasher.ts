export type hash = (data: string) => string;

export type HasherOptions = {
  blockSizeBits: number;
};

export const defaultHasherOptions: HasherOptions = {
  blockSizeBits: 256,
};

export type HexString = string;

export abstract class IHasher {
  constructor(public readonly options: HasherOptions = defaultHasherOptions) {}

  /**
   *
   * @param data - Array of elements to be hashed, the size of each element should not exceed the block bit-size
   */
  abstract hash(data: HexString[]): HexString;

  public isElementSizeValid = (element: HexString): boolean => IHasher.byteSize(element) <= this.options.blockSizeBits;

  static byteSize = (str: string) => new Blob([str.startsWith("0x") ? str.slice(2) : str]).size;

  hashSingle(data: string): string {
    return this.hash([data]);
  }

  public getGenesis = (): HexString => {
    const s = "brave new world";
    let hex = "0x";
    for (let i = 0; i < s.length; i++) {
      hex += s.charCodeAt(i).toString(16).padStart(2, "0");
    }
    return this.hashSingle(hex);
  };
}
