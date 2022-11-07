import { CharsetEncoder } from "./CharsetEncoder";

export type IndexType = 1 | 2 | 4;

export class DataViewEx {
    public readonly littleEndian: boolean;

    private _offset: number;
    private readonly _dv: DataView;

    public constructor(buffer: ArrayBufferLike, littleEndian = true) {
        this._dv = new DataView(buffer);
        this._offset = 0;
        this.littleEndian = (littleEndian !== undefined) ? littleEndian : true;
    }

    public get offset(): number {
        return this._offset;
    }

    public getInt8(): number {
        const value = this._dv.getInt8(this._offset);
        this._offset += 1;
        return value;
    }

    public getInt8Array(size: number): number[] {
        const a = [];

        for (let i = 0; i < size; i++) {
            a.push(this.getInt8());
        }

        return a;
    }

    public getUint8(): number {
        const value = this._dv.getUint8(this._offset);
        this._offset += 1;
        return value;
    }

    public getUint8Array(size: number): number[] {
        const a: number[] = [];

        for (let i = 0; i < size; i++) {
            a.push(this.getUint8());
        }

        return a;
    }


    public getInt16(): number {
        const value = this._dv.getInt16(this._offset, this.littleEndian);
        this._offset += 2;
        return value;
    }

    public getInt16Array(size: number): number[] {
        const a: number[] = [];

        for (let i = 0; i < size; i++) {
            a.push(this.getInt16());
        }

        return a;
    }

    public getUint16(): number {
        const value = this._dv.getUint16(this._offset, this.littleEndian);
        this._offset += 2;
        return value;
    }

    public getUint16Array(size: number): number[] {
        const a: number[] = [];

        for (let i = 0; i < size; i++) {
            a.push(this.getUint16());
        }

        return a;
    }

    public getInt32(): number {
        const value = this._dv.getInt32(this._offset, this.littleEndian);
        this._offset += 4;
        return value;
    }

    public getInt32Array(size: number): number[] {
        const a: number[] = [];

        for (let i = 0; i < size; i++) {
            a.push(this.getInt32());
        }

        return a;
    }

    public getUint32(): number {
        const value = this._dv.getUint32(this._offset, this.littleEndian);
        this._offset += 4;
        return value;
    }

    public getUint32Array(size: number): number[] {
        const a: number[] = [];

        for (let i = 0; i < size; i++) {
            a.push(this.getUint32());
        }

        return a;
    }

    public getFloat32(): number {
        const value = this._dv.getFloat32(this._offset, this.littleEndian);
        this._offset += 4;
        return value;
    }

    public getFloat32Array(size: number): number[] {
        const a: number[] = [];

        for (let i = 0; i < size; i++) {
            a.push(this.getFloat32());
        }

        return a;
    }

    public getFloat64(): number {
        const value = this._dv.getFloat64(this._offset, this.littleEndian);
        this._offset += 8;
        return value;
    }

    public getFloat64Array(size: number): number[] {
        const a: number[] = [];

        for (let i = 0; i < size; i++) {
            a.push(this.getFloat64());
        }

        return a;
    }

    public getIndex(type: IndexType, isUnsigned: boolean): number {
        switch (type) {
        case 1:
            return (isUnsigned === true) ? this.getUint8() : this.getInt8();
        case 2:
            return (isUnsigned === true) ? this.getUint16() : this.getInt16();
        case 4:
            return this.getInt32(); // No Uint32
        default:
            throw "unknown number type " + type + " exception.";
        }
    }

    public getIndexArray(type: IndexType, size: number, isUnsigned: boolean): number[] {
        const a: number[] = [];

        for (let i = 0; i < size; i++) {
            a.push(this.getIndex(type, isUnsigned));
        }

        return a;
    }

    public getChars(size: number): string {
        let str = "";

        while (size > 0) {
            const value = this.getUint8();
            size--;

            if (value === 0) break;

            str += String.fromCharCode(value);
        }

        while (size > 0) {
            this.getUint8();
            size--;
        }

        return str;
    }

    public getSjisStringsAsUnicode(size: number): string {
        const a: number[] = [];

        while (size > 0) {
            const value = this.getUint8();
            size--;

            if (value === 0) break;

            a.push(value);
        }

        while (size > 0) {
            this.getUint8();
            size--;
        }

        return CharsetEncoder.s2u(new Uint8Array(a));
    }

    public getUnicodeStrings(size: number): string {
        let str = "";

        while (size > 0) {

            const value = this.getUint16();
            size -= 2;

            if (value === 0) break;

            str += String.fromCharCode(value);
        }

        while (size > 0) {
            this.getUint8();
            size--;
        }

        return str;
    }

    public getTextBuffer(): string {
        const size = this.getUint32();
        return this.getUnicodeStrings(size);
    }
}
