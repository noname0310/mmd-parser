import type { Quaternion, Vector3 } from "./Math";

export class DataCreationHelper {
    private constructor() { /* static class */ }

    public static leftToRightVector3(v: Vector3): void {
        v[ 2 ] = -v[ 2 ];
    }
    
    public static leftToRightQuaternion(q: Quaternion): void {
        q[ 0 ] = -q[ 0 ];
        q[ 1 ] = -q[ 1 ];
    }

    public static leftToRightEuler(r: Vector3): void {
        r[ 0 ] = -r[ 0 ];
        r[ 1 ] = -r[ 1 ];
    }

    public static leftToRightIndexOrder(p: Vector3): void {
        const tmp = p[ 2 ];
        p[ 2 ] = p[ 0 ];
        p[ 0 ] = tmp;
    }

    public static leftToRightVector3Range(v1: Vector3, v2: Vector3): void {
        const tmp = -v2[ 2 ];
        v2[ 2 ] = -v1[ 2 ];
        v1[ 2 ] = tmp;
    }

    public static leftToRightEulerRange(r1: Vector3, r2: Vector3): void {
        const tmp1 = -r2[ 0 ];
        const tmp2 = -r2[ 1 ];
        r2[ 0 ] = -r1[ 0 ];
        r2[ 1 ] = -r1[ 1 ];
        r1[ 0 ] = tmp1;
        r1[ 1 ] = tmp2;
    }
}
