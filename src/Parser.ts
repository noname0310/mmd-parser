import { DataCreationHelper } from "./DataCreationHelper";
import type { IndexType } from "./DataViewEx";
import { DataViewEx } from "./DataViewEx";
import type { Quaternion, Vector2, Vector3 } from "./Math";

export type ModelFormat = "pmd" | "pmx";

export type CorrdinateSystem = "left" | "right";

// #region Pmd

export type Pmd = {
    metadata: PmdMetadata;
    vertices: PmdVertexInfo[];
    faces: PmdFaceInfo[];
    materials: PmdMaterialInfo[];
    bones: PmdBoneInfo[];
    iks: PmdIkInfo[];
    morphs: PmdMorphInfo[];
    morphFrames: PmdMorphFrameInfo[];
    boneFrameNames: PmdBoneFrameNameInfo[];
    boneFrames: PmdBoneFrameInfo[];
    englishBoneNames: PmdEnglishBoneNameInfo[];
    englishMorphNames: PmdEnglishMorphNameInfo[];
    englishBoneFrameNames: PmdEnglishBoneFrameNameInfo[];
    toonTextures: PmdToonTextureInfo[];
    rigidBodies: PmdRigidBodyInfo[];
    constraints: PmdConstraintInfo[];
};

export type PmdMetadata = {
    format: "pmd";
    coordinateSystem: CorrdinateSystem;
    magic: string;
    version: number;
    modelName: string;
    comment: string;
    vertexCount: number;
    faceCount: number;
    materialCount: number;
    boneCount: number;
    ikCount: number;
    morphCount: number;
    morphFrameCount: number;
    boneFrameNameCount: number;
    boneFrameCount: number;
    englishCompatibility: number;
    englishModelName: string;
    englishComment: string;
    rigidBodyCount: number;
    constraintCount: number;
};

export type PmdVertexInfo = {
    position: Vector3;
    normal: Vector3;
    uv: Vector2;
    skinIndices: Vector2;
    skinWeights: Vector2;
    edgeFlag: number;
};

export type PmdFaceInfo = {
    indices: Vector3;
};

export type PmdMaterialInfo = {
    diffuse: [number, number, number, number];
    shininess: number;
    specular: Vector3;
    ambient: Vector3;
    toonIndex: number;
    edgeFlag: number;
    faceCount: number;
    fileName: string;
};

export type PmdBoneInfo = {
    name: string;
    parentIndex: number;
    tailIndex: number;
    type: number;
    ikIndex: number;
    position: Vector3;
};

export type PmdIkInfo = {
    target: number;
    effector: number;
    linkCount: number;
    iteration: number;
    maxAngle: number;
    links: { index: number; }[];
};

export type PmdMorphInfo = {
    name: string;
    elementCount: number;
    type: number;
    elements: {
        index: number;
        position: Vector3;
    }[];
};

export type PmdMorphFrameInfo = {
    index: number;
};

export type PmdBoneFrameNameInfo = {
    name: string;
};

export type PmdBoneFrameInfo = {
    boneIndex: number;
    frameIndex: number;
};

export type PmdEnglishBoneNameInfo = {
    name: string;
};

export type PmdEnglishMorphNameInfo = {
    name: string;
};

export type PmdEnglishBoneFrameNameInfo = {
    name: string;
};

export type PmdToonTextureInfo = {
    fileName: string;
};

export type PmdRigidBodyInfo = {
    name: string;
    boneIndex: number;
    groupIndex: number;
    groupTarget: number;
    shapeType: number;
    width: number;
    height: number;
    depth: number;
    position: Vector3;
    rotation: Vector3;
    weight: number;
    positionDamping: number;
    rotationDamping: number;
    restitution: number;
    friction: number;
    type: number;
};

export type PmdConstraintInfo = {
    name: string;
    rigidBodyIndex1: number;
    rigidBodyIndex2: number;
    position: Vector3;
    rotation: Vector3;
    translationLimitation1: Vector3;
    translationLimitation2: Vector3;
    rotationLimitation1: Vector3;
    rotationLimitation2: Vector3;
    springPosition: Vector3;
    springRotation: Vector3;
};

// #endregion

// #region Pmx

export type Pmx = {
    metadata: PmxMetadata;
    vertices: PmxVertexInfo[];
    faces: PmxFaceInfo[];
    textures: string[];
    materials: PmxMaterialInfo[];
    bones: PmxBoneInfo[];
    morphs: PmxMorphInfo[];
    frames: PmxFrameInfo[];
    rigidBodies: PmxRigidBodyInfo[];
    constraints: PmxConstraintInfo[];
};

export type PmxMetadata = {
    format: "pmx";
    coordinateSystem: CorrdinateSystem;
    magic: string;
    version: number;
    headerSize: number;
    encoding: number;
    additionalUvNum: number;
    vertexIndexSize: number;
    textureIndexSize: number;
    materialIndexSize: number;
    boneIndexSize: number;
    morphIndexSize: number;
    rigidBodyIndexSize: number;
    modelName: string;
    englishModelName: string;
    comment: string;
    englishComment: string;
    vertexCount: number;
    faceCount: number;
    textureCount: number;
    materialCount: number;
    boneCount: number;
    morphCount: number;
    frameCount: number;
    rigidBodyCount: number;
    constraintCount: number;
};

export type PmxVertexInfo = {
    position: Vector3;
    normal: Vector3;
    uv: Vector2;
    auvs: [number, number, number, number];
    type: number;
    skinIndices: number[];
    skinWeights: number[];
    skinC?: Vector3;
    skinR0?: Vector3;
    skinR1?: Vector3;
    edgeRatio: number;
};

export type PmxFaceInfo = {
    indices: [number, number, number];
};

export type PmxMaterialInfo = {
    name: string;
    englishName: string;
    diffuse: [number, number, number, number];
    specular: Vector3;
    shininess: number;
    ambient: Vector3;
    flag: number;
    edgeColor: [number, number, number, number];
    edgeSize: number;
    textureIndex: number;
    envTextureIndex: number;
    envFlag: number;
    toonFlag: number;
    toonIndex: number;
    comment: string;
    faceCount: number;
};

export type PmxBoneInfo = {
    name: string;
    englishName: string;
    position: Vector3;
    parentIndex: number;
    transformationClass: number;
    flag: number;
    connectIndex?: number;
    offsetPosition?: Vector3;
    grant?: {
        isLocal: boolean;
        affectRotation: boolean;
        affectPosition: boolean;
        parentIndex: number;
        ratio: number;
    };
    fixAxis?: Vector3;
    localXVector?: Vector3;
    localZVector?: Vector3;
    key?: number;
    ik?: {
        effector: number;
        target: any;
        iteration: number;
        maxAngle: number;
        linkCount: number;
        links: {
            index: number;
            angleLimitation: number;
            lowerLimitationAngle?: Vector3;
            upperLimitationAngle?: Vector3;
        }[];
    }
};

export type GroupMorph = {
    index: number;
    ratio: number;
};

export type VertexMorph = {
    index: number;
    position: Vector3;
};

export type BoneMorph = {
    index: number;
    position: Vector3;
    rotation: Quaternion;
};

export type UvMorph = {
    index: number;
    uv: [number, number, number, number];
};

export type MaterialMorph = {
    index: number;
    type: number;
    diffuse: [number, number, number, number];
    specular: Vector3;
    shininess: number;
    ambient: Vector3;
    edgeColor: [number, number, number, number];
    edgeSize: number;
    textureColor: [number, number, number, number];
    sphereTextureColor: [number, number, number, number];
    toonColor: [number, number, number, number];
};

export type PmxMorphInfo = {
    name: string;
    englishName: string;
    panel: number;
    type: number;
    elementCount: number;
    elements: (GroupMorph | VertexMorph | BoneMorph | UvMorph | MaterialMorph)[];
};

export type PmxFrameInfo = {
    name: string;
    englishName: string;
    type: number;
    elementCount: number;
    elements: {
        target: number;
        index: number;
    }[];
};

export type PmxRigidBodyInfo = {
    name: string;
    englishName: string;
    boneIndex: number;
    groupIndex: number;
    groupTarget: number;
    shapeType: number;
    width: number;
    height: number;
    depth: number;
    position: Vector3;
    rotation: Vector3;
    weight: number;
    positionDamping: number;
    rotationDamping: number;
    restitution: number;
    friction: number;
    type: number;
};

export type PmxConstraintInfo = {
    name: string;
    englishName: string;
    type: number;
    rigidBodyIndex1: number;
    rigidBodyIndex2: number;
    position: Vector3;
    rotation: Vector3;
    translationLimitation1: Vector3;
    translationLimitation2: Vector3;
    rotationLimitation1: Vector3;
    rotationLimitation2: Vector3;
    springPosition: Vector3;
    springRotation: Vector3;
};

// #endregion

// #region Vmd

export type Vmd = {
    metadata: VmdMetadata;
    motions: VmdMotionFrame[];
    morphs: VmdMorphFrame[];
    cameras: VmdCameraFrame[];
    lights: VmdLightFrame[];
    shadows: VmdShadowFrame[];
    properties: VmdPropertyFrame[];
};

export type VmdMetadata = {
    coordinateSystem: CorrdinateSystem;
    magic: string;
    name: string;
    motionCount: number;
    morphCount: number;
    cameraCount: number;
    lightCount: number;
    shadowCount: number;
    propertyCount: number;
};

export type VmdMotionFrame = {
    boneName: string;
    frameNum: number;
    position: Vector3;
    rotation: Quaternion;
    interpolation: [
        //https://hariganep.seesaa.net/article/201103article_1.html
        /*
        The interpolation parameters are four Bezier curves (0,0), (x1,y1), (x2,y2), and (127,127).
        It represents the parameters of each axis.
        X-axis interpolation parameters (X_x1, X_y1), (X_x2, X_y2)
        Y-axis interpolation parameters (Y_x1, Y_y1), (Y_x2, Y_y2)
        Z-axis interpolation parameters (Z_x1, Z_y1), (Z_x2, Z_y2)
        Rotation interpolation parameters (R_x1, R_y1), (R_x2, R_y2)
        Then, the interpolation parameters are as follows.
        X_x1,Y_x1,Z_x1,R_x1,
        X_y1,Y_y1,Z_y1,R_y1,
        X_x2,Y_x2,Z_x2,R_x2,
        X_y2,Y_y2,Z_y2,R_y2,

        Y_x1,Z_x1,R_x1,X_y1,
        Y_y1,Z_y1,R_y1,X_x2,
        Y_x2,Z_x2,R_x2,X_y2,
        Y_y2,Z_y2,R_y2, 01,

        Z_x1,R_x1,X_y1,Y_y1,
        Z_y1,R_y1,X_x2,Y_x2,
        Z_x2,R_x2,X_y2,Y_y2,
        Z_y2,R_y2, 01, 00,
        R_x1,X_y1,Y_y1,Z_y1,
        R_y1,X_x2,Y_x2,Z_x2,
        R_x2,X_y2,Y_y2,Z_y2,
        R_y2, 01, 00, 00
        */
        //[4][4][4]
        number, number, number, number,
        number, number, number, number,
        number, number, number, number,
        number, number, number, number,

        number, number, number, number,
        number, number, number, number,
        number, number, number, number,
        number, number, number, number,

        number, number, number, number,
        number, number, number, number,
        number, number, number, number,
        number, number, number, number,

        number, number, number, number,
        number, number, number, number,
        number, number, number, number,
        number, number, number, number
    ];
};

export type VmdMorphFrame = {
    morphName: string;
    frameNum: number;
    weight: number;
};

export type VmdCameraFrame = {
    frameNum: number;
    distance: number;
    position: Vector3;
    rotation: Vector3; // yaw, pitch, roll
    interpolation: [
        //range: 0..127
        //default linear interpolation is 20, 107, 20, 107
        //x_ax, x_bx, x_ay, x_by
        number, number, number, number,
        //y_ax, y_bx, y_ay, y_by
        number, number, number, number,
        //z_ax, z_bx, z_ay, z_by
        number, number, number, number,
        //rot_ax, rot_bx, rot_ay, rot_by
        number, number, number, number,
        //distance_ax, distance_bx, distance_ay, distance_by
        number, number, number, number,
        //angle_ax, angle_bx, angle_ay, angle_by
        number, number, number, number
    ]
    fov: number;
    perspective: number;
};

export type VmdLightFrame = {
    frameNum: number;
    color: Vector3;
    direction: Vector3;
};

export type VmdShadowFrame = {
    frameNum: number;
    mode: 0 | 1 | 2;
    distance: number;
};

export type VmdPropertyFrame = {
    frameNum: number;
    visible: boolean;
    ikStates: { name: string, enabled: boolean }[];
};

// #endregion

// #region Vpd

export type Vpd = {
    metadata: VpdMetadata;
    bones: VpdBone[];
};

export type VpdMetadata = {
    coordinateSystem: CorrdinateSystem;
    parentFile: string;
    boneCount: number;
};

export type VpdBone = {
    name: string;
    translation: Vector3;
    quaternion: Quaternion;
};

// #endregion

export class Parser {
    public static parsePmd(buffer: ArrayBufferLike, leftToRight: boolean): Pmd {
        const pmd: Partial<Pmd> = { };
        const dv = new DataViewEx(buffer);

        const metadata: Partial<PmdMetadata> = {
            format: "pmd",
            coordinateSystem: "left"
        };

        pmd.metadata = metadata as PmdMetadata;

        // parseHeader
        {
            metadata.magic = dv.getChars(3);

            if (metadata.magic !== "Pmd") {
                throw "PMD file magic is not Pmd, but " + metadata.magic;
            }

            metadata.version = dv.getFloat32();
            metadata.modelName = dv.getSjisStringsAsUnicode(20);
            metadata.comment = dv.getSjisStringsAsUnicode(256);
        }

        // parseVertices
        {
            function parseVertex(): PmdVertexInfo {
                const position = dv.getFloat32Array(3);
                const normal = dv.getFloat32Array(3);
                const uv = dv.getFloat32Array(2);
                const skinIndices = dv.getUint16Array(2);
                const skinWeights = [dv.getUint8() / 100];
                skinWeights.push(1.0 - skinWeights[0]);
                const edgeFlag = dv.getUint8();
                return {
                    position: position as Vector3,
                    normal: normal as Vector3,
                    uv: uv as Vector2,
                    skinIndices: skinIndices as Vector2,
                    skinWeights: skinWeights as Vector2,
                    edgeFlag
                };
            }

            metadata.vertexCount = dv.getUint32();

            pmd.vertices = [];

            for (let i = 0; i < metadata.vertexCount; i++) {
                pmd.vertices.push(parseVertex());
            }
        }

        // parseFaces
        {
            function parseFace(): PmdFaceInfo {
                const p = {
                    indices: dv.getUint16Array(3) as Vector3
                };
                return p;
            }

            metadata.faceCount = dv.getUint32() / 3;

            pmd.faces = [];

            for (let i = 0; i < metadata.faceCount; i++) {
                pmd.faces.push(parseFace());
            }
        }

        // parseMaterials
        {
            function parseMaterial(): PmdMaterialInfo {
                const p: Partial<PmdMaterialInfo> = { };
                p.diffuse = dv.getFloat32Array(4) as [number, number, number, number];
                p.shininess = dv.getFloat32();
                p.specular = dv.getFloat32Array(3) as Vector3;
                p.ambient = dv.getFloat32Array(3) as Vector3;
                p.toonIndex = dv.getInt8();
                p.edgeFlag = dv.getUint8();
                p.faceCount = dv.getUint32() / 3;
                p.fileName = dv.getSjisStringsAsUnicode(20);
                return p as PmdMaterialInfo;
            }

            metadata.materialCount = dv.getUint32();

            pmd.materials = [];

            for (let i = 0; i < metadata.materialCount; i++) {
                pmd.materials.push(parseMaterial());
            }
        }

        // parseBones
        {
            function parseBone(): PmdBoneInfo {
                const p: Partial<PmdBoneInfo> = { };
                p.name = dv.getSjisStringsAsUnicode(20);
                p.parentIndex = dv.getInt16();
                p.tailIndex = dv.getInt16();
                p.type = dv.getUint8();
                p.ikIndex = dv.getInt16();
                p.position = dv.getFloat32Array(3) as Vector3;
                return p as PmdBoneInfo;
            }

            metadata.boneCount = dv.getUint16();

            pmd.bones = [];

            for (let i = 0; i < metadata.boneCount; i++) {
                pmd.bones.push(parseBone());
            }
        }

        // parseIks
        {
            function parseIk(): PmdIkInfo {
                const p: Partial<PmdIkInfo> = { };
                p.target = dv.getUint16();
                p.effector = dv.getUint16();
                p.linkCount = dv.getUint8();
                p.iteration = dv.getUint16();
                p.maxAngle = dv.getFloat32();

                p.links = [];
                for (let i = 0; i < p.linkCount; i++) {
                    const link: Partial<PmdIkInfo["links"][number]> = { };
                    link.index = dv.getUint16();
                    p.links.push(link as PmdIkInfo["links"][number]);
                }

                return p as PmdIkInfo;
            }

            metadata.ikCount = dv.getUint16();

            pmd.iks = [];

            for (let i = 0; i < metadata.ikCount; i++) {
                pmd.iks.push(parseIk());
            }
        }

        // parseMorphs
        {
            function parseMorph(): PmdMorphInfo {
                const p: Partial<PmdMorphInfo> = { };
                p.name = dv.getSjisStringsAsUnicode(20);
                p.elementCount = dv.getUint32();
                p.type = dv.getUint8();

                p.elements = [];
                for (let i = 0; i < p.elementCount; i++) {
                    p.elements.push({
                        index: dv.getUint32(),
                        position: dv.getFloat32Array(3) as Vector3
                    });
                }

                return p as PmdMorphInfo;
            }

            metadata.morphCount = dv.getUint16();

            pmd.morphs = [];

            for (let i = 0; i < metadata.morphCount; i++) {
                pmd.morphs.push(parseMorph());
            }
        }

        // parseMorphFrames
        {
            function parseMorphFrame(): PmdMorphFrameInfo {
                const p: Partial<PmdMorphFrameInfo> = { };
                p.index = dv.getUint16();
                return p as PmdMorphFrameInfo;
            }

            metadata.morphFrameCount = dv.getUint8();

            pmd.morphFrames = [];

            for (let i = 0; i < metadata.morphFrameCount; i++) {
                pmd.morphFrames.push(parseMorphFrame());
            }
        }

        // parseBoneFrameNames
        {
            function parseBoneFrameName(): PmdBoneFrameNameInfo {
                const p: Partial<PmdBoneFrameNameInfo> = { };
                p.name = dv.getSjisStringsAsUnicode(50);
                return p as PmdBoneFrameNameInfo;
            }

            metadata.boneFrameNameCount = dv.getUint8();

            pmd.boneFrameNames = [];

            for (let i = 0; i < metadata.boneFrameNameCount; i++) {
                pmd.boneFrameNames.push(parseBoneFrameName());
            }
        }

        // parseBoneFrames
        {
            function parseBoneFrame(): PmdBoneFrameInfo {
                const p: Partial<PmdBoneFrameInfo> = { };
                p.boneIndex = dv.getInt16();
                p.frameIndex = dv.getUint8();
                return p as PmdBoneFrameInfo;
            }

            metadata.boneFrameCount = dv.getUint32();

            pmd.boneFrames = [];

            for (let i = 0; i < metadata.boneFrameCount; i++) {
                pmd.boneFrames.push(parseBoneFrame());
            }
        }

        // parseEnglishHeader
        {
            metadata.englishCompatibility = dv.getUint8();

            if (metadata.englishCompatibility > 0) {
                metadata.englishModelName = dv.getSjisStringsAsUnicode(20);
                metadata.englishComment = dv.getSjisStringsAsUnicode(256);
            }
        }

        // parseEnglishBoneNames
        {
            function parseEnglishBoneName(): PmdEnglishBoneNameInfo {
                const p: Partial<PmdEnglishBoneNameInfo> = { };
                p.name = dv.getSjisStringsAsUnicode(20);
                return p as PmdEnglishBoneNameInfo;
            }

            if (metadata.englishCompatibility !== 0) {
                pmd.englishBoneNames = [];

                for (let i = 0; i < metadata.boneCount; i++) {
                    pmd.englishBoneNames.push(parseEnglishBoneName());
                }
            }
        }

        // parseEnglishMorphNames
        {
            function parseEnglishMorphName(): PmdEnglishMorphNameInfo {
                const p: Partial<PmdEnglishMorphNameInfo> = { };
                p.name = dv.getSjisStringsAsUnicode(20);
                return p as PmdEnglishMorphNameInfo;
            }

            if (metadata.englishCompatibility !== 0) {
                pmd.englishMorphNames = [];

                for (let i = 0; i < metadata.morphCount - 1; i++) {
                    pmd.englishMorphNames.push(parseEnglishMorphName());
                }
            }
        }

        // parseEnglishBoneFrameNames
        {
            function parseEnglishBoneFrameName(): PmdEnglishBoneFrameNameInfo {
                const p: Partial<PmdEnglishBoneFrameNameInfo> = { };
                p.name = dv.getSjisStringsAsUnicode(50);
                return p as PmdEnglishBoneFrameNameInfo;
            }

            if (metadata.englishCompatibility !== 0) {
                pmd.englishBoneFrameNames = [];

                for (let i = 0; i < metadata.boneFrameNameCount; i++) {
                    pmd.englishBoneFrameNames.push(parseEnglishBoneFrameName());
                }
            }
        }

        // parseToonTextures
        {
            function parseToonTexture(): PmdToonTextureInfo {
                const p: Partial<PmdToonTextureInfo> = { };
                p.fileName = dv.getSjisStringsAsUnicode(100);
                return p as PmdToonTextureInfo;
            }

            pmd.toonTextures = [];

            for (let i = 0; i < 10; i++) {
                pmd.toonTextures.push(parseToonTexture());
            }
        }

        // parseRigidBodies
        {
            function parseRigidBody(): PmdRigidBodyInfo {
                const p: Partial<PmdRigidBodyInfo> = { };
                p.name = dv.getSjisStringsAsUnicode(20);
                p.boneIndex = dv.getInt16();
                p.groupIndex = dv.getUint8();
                p.groupTarget = dv.getUint16();
                p.shapeType = dv.getUint8();
                p.width = dv.getFloat32();
                p.height = dv.getFloat32();
                p.depth = dv.getFloat32();
                p.position = dv.getFloat32Array(3) as Vector3;
                p.rotation = dv.getFloat32Array(3) as Vector3;
                p.weight = dv.getFloat32();
                p.positionDamping = dv.getFloat32();
                p.rotationDamping = dv.getFloat32();
                p.restitution = dv.getFloat32();
                p.friction = dv.getFloat32();
                p.type = dv.getUint8();
                return p as PmdRigidBodyInfo;
            }

            metadata.rigidBodyCount = dv.getUint32();

            pmd.rigidBodies = [];

            for (let i = 0; i < metadata.rigidBodyCount; i++) {
                pmd.rigidBodies.push(parseRigidBody());
            }
        }

        // parseConstraints
        {
            function parseConstraint(): PmdConstraintInfo {
                const p: Partial<PmdConstraintInfo> = { };
                p.name = dv.getSjisStringsAsUnicode(20);
                p.rigidBodyIndex1 = dv.getUint32();
                p.rigidBodyIndex2 = dv.getUint32();
                p.position = dv.getFloat32Array(3) as Vector3;
                p.rotation = dv.getFloat32Array(3) as Vector3;
                p.translationLimitation1 = dv.getFloat32Array(3) as Vector3;
                p.translationLimitation2 = dv.getFloat32Array(3) as Vector3;
                p.rotationLimitation1 = dv.getFloat32Array(3) as Vector3;
                p.rotationLimitation2 = dv.getFloat32Array(3) as Vector3;
                p.springPosition = dv.getFloat32Array(3) as Vector3;
                p.springRotation = dv.getFloat32Array(3) as Vector3;
                return p as PmdConstraintInfo;
            }

            metadata.constraintCount = dv.getUint32();

            pmd.constraints = [];

            for (let i = 0; i < metadata.constraintCount; i++) {
                pmd.constraints.push(parseConstraint());
            }
        }

        if (leftToRight === true) this.leftToRightModel(pmd as Pmd);

        return pmd as Pmd;
    }

    public static parsePmx(buffer: ArrayBufferLike, leftToRight: boolean): Pmx {
        const pmx: Partial<Pmx> = { };
        const dv = new DataViewEx(buffer);

        const metadata: Partial<PmxMetadata> = {
            format: "pmx",
            coordinateSystem: "left"
        };

        pmx.metadata = metadata as PmxMetadata;

        // parseHeader
        {
            metadata.magic = dv.getChars(4);

            // Note: don't remove the last blank space.
            if (metadata.magic !== "PMX ") {
                throw "PMX file magic is not PMX , but " + metadata.magic;
            }

            metadata.version = dv.getFloat32();

            if (metadata.version !== 2.0 && metadata.version !== 2.1) {
                throw "PMX version " + metadata.version + " is not supported.";
            }

            metadata.headerSize = dv.getUint8();
            metadata.encoding = dv.getUint8();
            metadata.additionalUvNum = dv.getUint8();
            metadata.vertexIndexSize = dv.getUint8();
            metadata.textureIndexSize = dv.getUint8();
            metadata.materialIndexSize = dv.getUint8();
            metadata.boneIndexSize = dv.getUint8();
            metadata.morphIndexSize = dv.getUint8();
            metadata.rigidBodyIndexSize = dv.getUint8();
            metadata.modelName = dv.getTextBuffer();
            metadata.englishModelName = dv.getTextBuffer();
            metadata.comment = dv.getTextBuffer();
            metadata.englishComment = dv.getTextBuffer();
        }

        // parseVertices
        {
            function parseVertex(): PmxVertexInfo {
                const p: Partial<PmxVertexInfo> = { };
                p.position = dv.getFloat32Array(3) as Vector3;
                p.normal = dv.getFloat32Array(3) as Vector3;
                p.uv = dv.getFloat32Array(2) as Vector2;

                const auvs = [];

                for (let i = 0; i < metadata.additionalUvNum!; i++) {
                    auvs.push(dv.getFloat32Array(4));
                }

                p.type = dv.getUint8();

                const indexSize = metadata.boneIndexSize! as IndexType;

                if (p.type === 0) {  // BDEF1
                    p.skinIndices = dv.getIndexArray(indexSize, 1, false);
                    p.skinWeights = [1.0];
                } else if (p.type === 1) {  // BDEF2
                    p.skinIndices = dv.getIndexArray(indexSize, 2, false);
                    p.skinWeights = dv.getFloat32Array(1);
                    p.skinWeights.push(1.0 - p.skinWeights[0]);
                } else if (p.type === 2) {  // BDEF4
                    p.skinIndices = dv.getIndexArray(indexSize, 4, false);
                    p.skinWeights = dv.getFloat32Array(4);
                } else if (p.type === 3) {  // SDEF
                    p.skinIndices = dv.getIndexArray(indexSize, 2, false);
                    p.skinWeights = dv.getFloat32Array(1);
                    p.skinWeights.push(1.0 - p.skinWeights[0]);

                    p.skinC = dv.getFloat32Array(3) as Vector3;
                    p.skinR0 = dv.getFloat32Array(3) as Vector3;
                    p.skinR1 = dv.getFloat32Array(3) as Vector3;

                    // SDEF is not supported yet and is handled as BDEF2 so far.
                    // TODO: SDEF support
                    p.type = 1;
                } else {
                    throw "unsupport bone type " + p.type + " exception.";
                }

                p.edgeRatio = dv.getFloat32();
                return p as PmxVertexInfo;
            }

            metadata.vertexCount = dv.getUint32();
            pmx.vertices = [];

            for (let i = 0; i < metadata.vertexCount; i++) {
                pmx.vertices.push(parseVertex());
            }
        }

        // parseFaces
        {
            function parseFace(): PmxFaceInfo {
                const p: Partial<PmxFaceInfo> = { };
                p.indices = dv.getIndexArray(metadata.vertexIndexSize! as IndexType, 3, true) as Vector3;
                return p as PmxFaceInfo;
            }

            metadata.faceCount = dv.getUint32() / 3;
            pmx.faces = [];

            for (let i = 0; i < metadata.faceCount; i++) {
                pmx.faces.push(parseFace());
            }
        }

        // parseTextures
        {
            function parseTexture(): string {
                return dv.getTextBuffer();
            }

            metadata.textureCount = dv.getUint32();

            pmx.textures = [];

            for (let i = 0; i < metadata.textureCount; i++) {
                pmx.textures.push(parseTexture());
            }
        }

        // parseMaterials
        {
            function parseMaterial(): PmxMaterialInfo {
                const p: Partial<PmxMaterialInfo> = { };
                p.name = dv.getTextBuffer();
                p.englishName = dv.getTextBuffer();
                p.diffuse = dv.getFloat32Array(4) as [number, number, number, number];
                p.specular = dv.getFloat32Array(3) as Vector3;
                p.shininess = dv.getFloat32();
                p.ambient = dv.getFloat32Array(3) as Vector3;
                p.flag = dv.getUint8();
                p.edgeColor = dv.getFloat32Array(4) as [number, number, number, number];
                p.edgeSize = dv.getFloat32();
                p.textureIndex = dv.getIndex(metadata.textureIndexSize! as IndexType, false);
                p.envTextureIndex = dv.getIndex(metadata.textureIndexSize! as IndexType, false);
                p.envFlag = dv.getUint8();
                p.toonFlag = dv.getUint8();

                if (p.toonFlag === 0) {
                    p.toonIndex = dv.getIndex(metadata.textureIndexSize! as IndexType, false);
                } else if (p.toonFlag === 1) {
                    p.toonIndex = dv.getInt8();
                } else {
                    throw "unknown toon flag " + p.toonFlag + " exception.";
                }

                p.comment = dv.getTextBuffer();
                p.faceCount = dv.getUint32() / 3;
                return p as PmxMaterialInfo;
            }

            metadata.materialCount = dv.getUint32();
            pmx.materials = [];

            for (let i = 0; i < metadata.materialCount; i++) {
                pmx.materials.push(parseMaterial());
            }
        }

        // parseBones
        {
            function parseBone(): PmxBoneInfo {
                const p: Partial<PmxBoneInfo> = { };
                p.name = dv.getTextBuffer();
                p.englishName = dv.getTextBuffer();
                p.position = dv.getFloat32Array(3) as Vector3;
                p.parentIndex = dv.getIndex(metadata.boneIndexSize! as IndexType, false);
                p.transformationClass = dv.getUint32();
                p.flag = dv.getUint16();

                if (p.flag & 0x1) {
                    p.connectIndex = dv.getIndex(metadata.boneIndexSize! as IndexType, false);
                } else {
                    p.offsetPosition = dv.getFloat32Array(3) as Vector3;
                }

                if (p.flag & 0x100 || p.flag & 0x200) {
                    const grant: Partial<PmxBoneInfo["grant"]> = { };
                    grant.isLocal = (p.flag & 0x80) !== 0 ? true : false;
                    grant.affectRotation = (p.flag & 0x100) !== 0 ? true : false;
                    grant.affectPosition = (p.flag & 0x200) !== 0 ? true : false;
                    grant.parentIndex = dv.getIndex(metadata.boneIndexSize! as IndexType, false);
                    grant.ratio = dv.getFloat32();

                    p.grant = grant as PmxBoneInfo["grant"];
                }

                if (p.flag & 0x400) {
                    p.fixAxis = dv.getFloat32Array(3) as Vector3;
                }

                if (p.flag & 0x800) {
                    p.localXVector = dv.getFloat32Array(3) as Vector3;
                    p.localZVector = dv.getFloat32Array(3) as Vector3;
                }

                if (p.flag & 0x2000) {
                    p.key = dv.getUint32();
                }

                if (p.flag & 0x20) {
                    const ik: Partial<PmxBoneInfo["ik"]> = { };
                    ik.effector = dv.getIndex(metadata.boneIndexSize! as IndexType, false);
                    ik.target = null;
                    ik.iteration = dv.getUint32();
                    ik.maxAngle = dv.getFloat32();
                    ik.linkCount = dv.getUint32();
                    ik.links = [];

                    for (let i = 0; i < ik.linkCount; i++) {
                        const link: Partial<typeof ik.links[number]> = { };
                        link.index = dv.getIndex(metadata.boneIndexSize! as IndexType, false);
                        link.angleLimitation = dv.getUint8();

                        if (link.angleLimitation === 1) {
                            link.lowerLimitationAngle = dv.getFloat32Array(3) as Vector3;
                            link.upperLimitationAngle = dv.getFloat32Array(3) as Vector3;
                        }

                        ik.links.push(link as typeof ik.links[number]);
                    }
                    p.ik = ik as PmxBoneInfo["ik"];
                }

                return p as PmxBoneInfo;
            }

            metadata.boneCount = dv.getUint32();

            pmx.bones = [];

            for (let i = 0; i < metadata.boneCount; i++) {
                pmx.bones.push(parseBone());
            }
        }

        // parseMorphs
        {
            function parseMorph(): PmxMorphInfo {
                const p: Partial<PmxMorphInfo> = { };
                p.name = dv.getTextBuffer();
                p.englishName = dv.getTextBuffer();
                p.panel = dv.getUint8();
                p.type = dv.getUint8();
                p.elementCount = dv.getUint32();
                p.elements = [];

                for (let i = 0; i < p.elementCount; i++) {
                    if (p.type === 0) {  // group morph
                        const m: Partial<GroupMorph> = { };
                        m.index = dv.getIndex(metadata.morphIndexSize! as IndexType, false);
                        m.ratio = dv.getFloat32();
                        p.elements.push(m as GroupMorph);
                    } else if (p.type === 1) {  // vertex morph
                        const m: Partial<VertexMorph> = { };
                        m.index = dv.getIndex(metadata.vertexIndexSize! as IndexType, true);
                        m.position = dv.getFloat32Array(3) as Vector3;
                        p.elements.push(m as VertexMorph);

                    } else if (p.type === 2) {  // bone morph
                        const m: Partial<BoneMorph> = { };
                        m.index = dv.getIndex(metadata.boneIndexSize! as IndexType, false);
                        m.position = dv.getFloat32Array(3) as Vector3;
                        m.rotation = dv.getFloat32Array(4) as Quaternion;
                        p.elements.push(m as BoneMorph);

                    } else if (p.type === 3) {  // uv morph
                        const m: Partial<UvMorph> = { };
                        m.index = dv.getIndex(metadata.vertexIndexSize! as IndexType, true);
                        m.uv = dv.getFloat32Array(4) as [number, number, number, number];
                        p.elements.push(m as UvMorph);
                    } else if (p.type === 4) {  // additional uv1
                        // TODO: implement
                    } else if (p.type === 5) {  // additional uv2
                        // TODO: implement
                    } else if (p.type === 6) {  // additional uv3
                        // TODO: implement
                    } else if (p.type === 7) {  // additional uv4
                        // TODO: implement
                    } else if (p.type === 8) {  // material morph
                        const m: Partial<MaterialMorph> = { };
                        m.index = dv.getIndex(metadata.materialIndexSize! as IndexType, false);
                        m.type = dv.getUint8();
                        m.diffuse = dv.getFloat32Array(4) as [number, number, number, number];
                        m.specular = dv.getFloat32Array(3) as Vector3;
                        m.shininess = dv.getFloat32();
                        m.ambient = dv.getFloat32Array(3) as Vector3;
                        m.edgeColor = dv.getFloat32Array(4) as [number, number, number, number];
                        m.edgeSize = dv.getFloat32();
                        m.textureColor = dv.getFloat32Array(4) as [number, number, number, number];
                        m.sphereTextureColor = dv.getFloat32Array(4) as [number, number, number, number];
                        m.toonColor = dv.getFloat32Array(4) as [number, number, number, number];
                        p.elements.push(m as MaterialMorph);
                    }
                }
                return p as PmxMorphInfo;
            }

            const metadata = pmx.metadata;
            metadata.morphCount = dv.getUint32();

            pmx.morphs = [];

            for (let i = 0; i < metadata.morphCount; i++) {
                pmx.morphs.push(parseMorph());
            }
        }

        // parseFrames
        {
            function parseFrame(): PmxFrameInfo {
                const p: Partial<PmxFrameInfo> = { };
                p.name = dv.getTextBuffer();
                p.englishName = dv.getTextBuffer();
                p.type = dv.getUint8();
                p.elementCount = dv.getUint32();
                p.elements = [];

                for (let i = 0; i < p.elementCount; i++) {
                    const e: Partial<PmxFrameInfo["elements"][number]> = { };
                    e.target = dv.getUint8();
                    e.index = (e.target === 0)
                        ? dv.getIndex(metadata.boneIndexSize! as IndexType, false)
                        : dv.getIndex(metadata.morphIndexSize! as IndexType, false);
                    p.elements.push(e as PmxFrameInfo["elements"][number]);
                }
                return p as PmxFrameInfo;
            }

            metadata.frameCount = dv.getUint32();
            pmx.frames = [];

            for (let i = 0; i < metadata.frameCount; i++) {
                pmx.frames.push(parseFrame());
            }
        }

        // parseRigidBodies
        {
            function parseRigidBody(): PmxRigidBodyInfo {
                const p: Partial<PmxRigidBodyInfo> = { };
                p.name = dv.getTextBuffer();
                p.englishName = dv.getTextBuffer();
                p.boneIndex = dv.getIndex(metadata.boneIndexSize! as IndexType, false);
                p.groupIndex = dv.getUint8();
                p.groupTarget = dv.getUint16();
                p.shapeType = dv.getUint8();
                p.width = dv.getFloat32();
                p.height = dv.getFloat32();
                p.depth = dv.getFloat32();
                p.position = dv.getFloat32Array(3) as Vector3;
                p.rotation = dv.getFloat32Array(3) as Vector3;
                p.weight = dv.getFloat32();
                p.positionDamping = dv.getFloat32();
                p.rotationDamping = dv.getFloat32();
                p.restitution = dv.getFloat32();
                p.friction = dv.getFloat32();
                p.type = dv.getUint8();
                return p as PmxRigidBodyInfo;
            }

            const metadata = pmx.metadata;
            metadata.rigidBodyCount = dv.getUint32();

            pmx.rigidBodies = [];

            for (let i = 0; i < metadata.rigidBodyCount; i++) {
                pmx.rigidBodies.push(parseRigidBody());
            }
        }

        // parseConstraints
        {
            function parseConstraint(): PmxConstraintInfo {
                const p: Partial<PmxConstraintInfo> = { };
                p.name = dv.getTextBuffer();
                p.englishName = dv.getTextBuffer();
                p.type = dv.getUint8();
                p.rigidBodyIndex1 = dv.getIndex(metadata.rigidBodyIndexSize! as IndexType, false);
                p.rigidBodyIndex2 = dv.getIndex(metadata.rigidBodyIndexSize! as IndexType, false);
                p.position = dv.getFloat32Array(3) as Vector3;
                p.rotation = dv.getFloat32Array(3) as Vector3;
                p.translationLimitation1 = dv.getFloat32Array(3) as Vector3;
                p.translationLimitation2 = dv.getFloat32Array(3) as Vector3;
                p.rotationLimitation1 = dv.getFloat32Array(3) as Vector3;
                p.rotationLimitation2 = dv.getFloat32Array(3) as Vector3;
                p.springPosition = dv.getFloat32Array(3) as Vector3;
                p.springRotation = dv.getFloat32Array(3) as Vector3;
                return p as PmxConstraintInfo;
            }

            const metadata = pmx.metadata;
            metadata.constraintCount = dv.getUint32();

            pmx.constraints = [];

            for (let i = 0; i < metadata.constraintCount; i++) {
                pmx.constraints.push(parseConstraint());
            }
        }

        if (leftToRight === true) this.leftToRightModel(pmx as Pmx);

        return pmx as Pmx;
    }

    public static parseVmd(buffer: ArrayBufferLike, leftToRight: boolean): Vmd {
        const vmd: Partial<Vmd> = { };
        const dv = new DataViewEx(buffer);

        const metadata: Partial<VmdMetadata> = {
            coordinateSystem: "left"
        };

        vmd.metadata = metadata as VmdMetadata;

        // parseHeader
        {
            metadata.magic = dv.getChars(30);

            if (metadata.magic !== "Vocaloid Motion Data 0002") {
                throw "VMD file magic is not Vocaloid Motion Data 0002, but " + metadata.magic;
            }

            metadata.name = dv.getSjisStringsAsUnicode(20);
        }

        // parseMotions
        {
            function parseMotion(): VmdMotionFrame {
                const p: Partial<VmdMotionFrame> = { };
                p.boneName = dv.getSjisStringsAsUnicode(15);
                p.frameNum = dv.getUint32();
                p.position = dv.getFloat32Array(3) as Vector3;
                p.rotation = dv.getFloat32Array(4) as Quaternion;
                p.interpolation = dv.getUint8Array(64) as VmdMotionFrame["interpolation"];
                return p as VmdMotionFrame;
            }

            metadata.motionCount = dv.getUint32();

            vmd.motions = [];
            for (let i = 0; i < metadata.motionCount; i++) {
                vmd.motions.push(parseMotion());
            }
        }

        // parseMorphs
        {
            function parseMorph(): VmdMorphFrame {
                const p: Partial<VmdMorphFrame> = { };
                p.morphName = dv.getSjisStringsAsUnicode(15);
                p.frameNum = dv.getUint32();
                p.weight = dv.getFloat32();
                return p as VmdMorphFrame;
            }

            metadata.morphCount = dv.getUint32();

            vmd.morphs = [];
            for (let i = 0; i < metadata.morphCount; i++) {
                vmd.morphs.push(parseMorph());
            }
        }

        // parseCameras
        {
            function parseCamera(): VmdCameraFrame {
                const p: Partial<VmdCameraFrame> = { };
                p.frameNum = dv.getUint32();
                p.distance = dv.getFloat32();
                p.position = dv.getFloat32Array(3) as Vector3;
                p.rotation = dv.getFloat32Array(3) as Vector3;
                p.interpolation = dv.getUint8Array(24) as VmdCameraFrame["interpolation"];
                p.fov = dv.getUint32();
                p.perspective = dv.getUint8();
                return p as VmdCameraFrame;
            }

            metadata.cameraCount = dv.getUint32();

            vmd.cameras = [];
            for (let i = 0; i < metadata.cameraCount; i++) {
                vmd.cameras.push(parseCamera());
            }
        }

        // parseLights
        {
            function parseLight(): VmdLightFrame {
                const p: Partial<VmdLightFrame> = { };
                p.frameNum = dv.getUint32();
                p.color = dv.getFloat32Array(3) as Vector3;
                p.direction = dv.getFloat32Array(3) as Vector3;
                return p as VmdLightFrame;
            }

            metadata.lightCount = dv.getUint32();

            vmd.lights = [];
            for (let i = 0; i < metadata.lightCount; i++) {
                vmd.lights.push(parseLight());
            }
        }

        // parseShadows
        {
            function parseShadow(): VmdShadowFrame {
                const p: Partial<VmdShadowFrame> = { };
                p.frameNum = dv.getUint32();
                p.mode = dv.getInt8() as VmdShadowFrame["mode"];
                p.distance = dv.getFloat32();
                return p as VmdShadowFrame;
            }

            metadata.shadowCount = dv.getUint32();

            vmd.shadows = [];
            for (let i = 0; i < metadata.shadowCount; i++) {
                vmd.shadows.push(parseShadow());
            }
        }

        // parseProperties
        {
            function parseProperty(): VmdPropertyFrame {
                const p: Partial<VmdPropertyFrame> = { };
                p.frameNum = dv.getUint32();
                p.visible = dv.getInt8() === 1;

                const ikStateCount = dv.getUint32();
                p.ikStates = [];
                for (let i = 0; i < ikStateCount; i++) {
                    const ikName = dv.getSjisStringsAsUnicode(20);
                    const ikState = dv.getInt8() === 1;
                    p.ikStates.push({ name: ikName, enabled: ikState });
                }

                return p as VmdPropertyFrame;
            }

            metadata.propertyCount = dv.getUint32();

            vmd.properties = [];
            for (let i = 0; i < metadata.propertyCount; i++) {
                vmd.properties.push(parseProperty());
            }
        }

        if (leftToRight === true) this.leftToRightVmd(vmd as Vmd);

        return vmd as Vmd;
    }

    public static parseVpd(text: string, leftToRight: boolean): Vpd {
        const vpd: Partial<Vpd> = { };

        const metadata: Partial<VpdMetadata> = {
            coordinateSystem: "left"
        };

        vpd.metadata = metadata as VpdMetadata;
        vpd.bones = [];

        const commentPatternG = /\/\/\w*(\r|\n|\r\n)/g;
        const newlinePattern = /\r|\n|\r\n/;

        const lines = text.replace(commentPatternG, "").split(newlinePattern);

        function throwError(): never {
            throw "the file seems not vpd file.";
        }

        // checkMagic
        {
            if (lines[0] !== "Vocaloid Pose Data file") {
                throwError();
            }
        }

        // parseHeader
        {
            if (lines.length < 4) {
                throwError();
            }

            vpd.metadata.parentFile = lines[2];
            vpd.metadata.boneCount = parseInt(lines[3]);
        }

        // parseBones
        {
            const boneHeaderPattern = /^\s*(Bone[0-9]+)\s*\{\s*(.*)$/;
            const boneVectorPattern = /^\s*(-?[0-9]+\.[0-9]+)\s*,\s*(-?[0-9]+\.[0-9]+)\s*,\s*(-?[0-9]+\.[0-9]+)\s*;/;
            const boneQuaternionPattern = /^\s*(-?[0-9]+\.[0-9]+)\s*,\s*(-?[0-9]+\.[0-9]+)\s*,\s*(-?[0-9]+\.[0-9]+)\s*,\s*(-?[0-9]+\.[0-9]+)\s*;/;
            const boneFooterPattern = /^\s*}/;

            const bones = vpd.bones;
            let n = null;
            let v = null;
            let q = null;

            for (let i = 4; i < lines.length; i++) {
                const line = lines[i];

                let result;

                result = line.match(boneHeaderPattern);

                if (result !== null) {
                    if (n !== null) {
                        throwError();
                    }
                    n = result[2];
                }

                result = line.match(boneVectorPattern);

                if (result !== null) {
                    if (v !== null) {
                        throwError();
                    }

                    v = [
                        parseFloat(result[1]),
                        parseFloat(result[2]),
                        parseFloat(result[3])
                    ];
                }

                result = line.match(boneQuaternionPattern);

                if (result !== null) {
                    if (q !== null) {
                        throwError();
                    }

                    q = [
                        parseFloat(result[1]),
                        parseFloat(result[2]),
                        parseFloat(result[3]),
                        parseFloat(result[4])
                    ];
                }

                result = line.match(boneFooterPattern);

                if (result !== null) {
                    if (n === null || v === null || q === null) {
                        throwError();
                    }

                    bones.push({
                        name: n,
                        translation: v as Vector3,
                        quaternion: q as Quaternion
                    });

                    n = null;
                    v = null;
                    q = null;
                }
            }

            if (n !== null || v !== null || q !== null) {
                throwError();
            }
        }

        if (leftToRight === true) this.leftToRightVpd(vpd as Vpd);

        return vpd as Vpd;
    }

    public static mergeVmds(vmds: Vmd[]): Vmd {
        const metadata: VmdMetadata = {
            coordinateSystem: vmds[0].metadata.coordinateSystem,
            magic: vmds[0].metadata.magic,
            name: vmds[0].metadata.name,
            motionCount: 0,
            morphCount: 0,
            cameraCount: 0,
            lightCount: 0,
            shadowCount: 0,
            propertyCount: 0
        };
        const motions = [];
        const morphs = [];
        const cameras = [];
        const lights = [];
        const shadows = [];
        const properties = [];

        for (let i = 0; i < vmds.length; i++) {
            const v2 = vmds[i];

            metadata.motionCount += v2.metadata.motionCount;
            metadata.morphCount += v2.metadata.morphCount;
            metadata.cameraCount += v2.metadata.cameraCount;
            metadata.lightCount += v2.metadata.lightCount;
            metadata.shadowCount += v2.metadata.shadowCount;
            metadata.propertyCount += v2.metadata.propertyCount;

            for (let j = 0; j < v2.metadata.motionCount; j++) {
                motions.push(v2.motions[j]);
            }

            for (let j = 0; j < v2.metadata.morphCount; j++) {
                morphs.push(v2.morphs[j]);
            }

            for (let j = 0; j < v2.metadata.cameraCount; j++) {
                cameras.push(v2.cameras[j]);
            }

            for (let j = 0; j < v2.metadata.lightCount; j++) {
                lights.push(v2.lights[j]);
            }

            for (let j = 0; j < v2.metadata.shadowCount; j++) {
                shadows.push(v2.shadows[j]);
            }

            for (let j = 0; j < v2.metadata.propertyCount; j++) {
                properties.push(v2.properties[j]);
            }
        }

        return {
            metadata: metadata,
            motions: motions,
            morphs: morphs,
            cameras: cameras,
            lights: lights,
            shadows: shadows,
            properties: properties
        };
    }

    public static leftToRightModel(model: Pmd | Pmx): void {
        if (model.metadata.coordinateSystem === "right") {
            return;
        }

        model.metadata.coordinateSystem = "right";

        for (let i = 0; i < model.metadata.vertexCount; i++) {
            DataCreationHelper.leftToRightVector3(model.vertices[i].position);
            DataCreationHelper.leftToRightVector3(model.vertices[i].normal);
        }

        for (let i = 0; i < model.metadata.faceCount; i++) {
            DataCreationHelper.leftToRightIndexOrder(model.faces[i].indices);
        }

        for (let i = 0; i < model.metadata.boneCount; i++) {
            DataCreationHelper.leftToRightVector3(model.bones[i].position);
        }

        // TODO: support other morph for PMX
        for (let i = 0; i < model.metadata.morphCount; i++) {
            const m = model.morphs[i];

            if (model.metadata.format === "pmx" && m.type !== 1) {

                // TODO: implement
                continue;
            }

            for (let j = 0; j < m.elements.length; j++) {
                DataCreationHelper.leftToRightVector3((m.elements[j] as VertexMorph).position);
            }
        }

        for (let i = 0; i < model.metadata.rigidBodyCount; i++) {
            DataCreationHelper.leftToRightVector3(model.rigidBodies[i].position);
            DataCreationHelper.leftToRightEuler(model.rigidBodies[i].rotation);
        }

        for (let i = 0; i < model.metadata.constraintCount; i++) {
            DataCreationHelper.leftToRightVector3(model.constraints[i].position);
            DataCreationHelper.leftToRightEuler(model.constraints[i].rotation);
            DataCreationHelper.leftToRightVector3Range(model.constraints[i].translationLimitation1, model.constraints[i].translationLimitation2);
            DataCreationHelper.leftToRightEulerRange(model.constraints[i].rotationLimitation1, model.constraints[i].rotationLimitation2);
        }
    }

    public static leftToRightVmd(vmd: Vmd): void {
        if (vmd.metadata.coordinateSystem === "right") {
            return;
        }

        vmd.metadata.coordinateSystem = "right";

        for (let i = 0; i < vmd.metadata.motionCount; i++) {
            DataCreationHelper.leftToRightVector3(vmd.motions[i].position);
            DataCreationHelper.leftToRightQuaternion(vmd.motions[i].rotation);
        }

        for (let i = 0; i < vmd.metadata.cameraCount; i++) {
            DataCreationHelper.leftToRightVector3(vmd.cameras[i].position);
            DataCreationHelper.leftToRightEuler(vmd.cameras[i].rotation);
        }

        for (let i = 0; i < vmd.metadata.lightCount; i++) {
            DataCreationHelper.leftToRightVector3(vmd.lights[i].direction); // TODO: check
        }
    }

    public static leftToRightVpd(vpd: Vpd): void {
        if (vpd.metadata.coordinateSystem === "right") {
            return;
        }

        vpd.metadata.coordinateSystem = "right";

        for (let i = 0; i < vpd.bones.length; i++) {
            DataCreationHelper.leftToRightVector3(vpd.bones[i].translation);
            DataCreationHelper.leftToRightQuaternion(vpd.bones[i].quaternion);
        }
    }
}
