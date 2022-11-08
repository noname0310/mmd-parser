import { DataCreationHelper } from "./DataCreationHelper";
import { DataViewEx } from "./DataViewEx";
import type { Quaternion, Vector2, Vector3 } from "./Math";

export type ModelFormat = "pmd" | "pmx";

export type CorrdinateSystem = "left" | "right";

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

export class Parser {
    public static parsePmd(buffer: ArrayBufferLike, leftToRight: boolean): Pmd {
        const pmd: Partial<Pmd> = { };
        const dv = new DataViewEx(buffer);

        const metadata: Partial<PmdMetadata> = {
            format: "pmd",
            coordinateSystem: "left"
        };

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
                skinWeights.push(1.0 - p.skinWeights[0]);
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
            };

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
                p.position = dv.getFloat32Array(3);
                p.rotation = dv.getFloat32Array(3);
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

    public static parsePmx = function (buffer, leftToRight) {

        const pmx = { };
        const dv = new DataViewEx(buffer);

        pmx.metadata = { };
        pmx.metadata.format = "pmx";
        pmx.metadata.coordinateSystem = "left";

        const parseHeader = function () {

            const metadata = pmx.metadata;
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

        };

        const parseVertices = function () {

            const parseVertex = function () {

                const p = { };
                p.position = dv.getFloat32Array(3);
                p.normal = dv.getFloat32Array(3);
                p.uv = dv.getFloat32Array(2);

                p.auvs = [];

                for (let i = 0; i < pmx.metadata.additionalUvNum; i++) {

                    p.auvs.push(dv.getFloat32Array(4));

                }

                p.type = dv.getUint8();

                const indexSize = metadata.boneIndexSize;

                if (p.type === 0) {  // BDEF1

                    p.skinIndices = dv.getIndexArray(indexSize, 1);
                    p.skinWeights = [1.0];

                } else if (p.type === 1) {  // BDEF2

                    p.skinIndices = dv.getIndexArray(indexSize, 2);
                    p.skinWeights = dv.getFloat32Array(1);
                    p.skinWeights.push(1.0 - p.skinWeights[0]);

                } else if (p.type === 2) {  // BDEF4

                    p.skinIndices = dv.getIndexArray(indexSize, 4);
                    p.skinWeights = dv.getFloat32Array(4);

                } else if (p.type === 3) {  // SDEF

                    p.skinIndices = dv.getIndexArray(indexSize, 2);
                    p.skinWeights = dv.getFloat32Array(1);
                    p.skinWeights.push(1.0 - p.skinWeights[0]);

                    p.skinC = dv.getFloat32Array(3);
                    p.skinR0 = dv.getFloat32Array(3);
                    p.skinR1 = dv.getFloat32Array(3);

                    // SDEF is not supported yet and is handled as BDEF2 so far.
                    // TODO: SDEF support
                    p.type = 1;

                } else {

                    throw "unsupport bone type " + p.type + " exception.";

                }

                p.edgeRatio = dv.getFloat32();
                return p;

            };

            var metadata = pmx.metadata;
            metadata.vertexCount = dv.getUint32();

            pmx.vertices = [];

            for (let i = 0; i < metadata.vertexCount; i++) {

                pmx.vertices.push(parseVertex());

            }

        };

        const parseFaces = function () {

            const parseFace = function () {

                const p = { };
                p.indices = dv.getIndexArray(metadata.vertexIndexSize, 3, true);
                return p;

            };

            var metadata = pmx.metadata;
            metadata.faceCount = dv.getUint32() / 3;

            pmx.faces = [];

            for (let i = 0; i < metadata.faceCount; i++) {

                pmx.faces.push(parseFace());

            }

        };

        const parseTextures = function () {

            const parseTexture = function () {

                return dv.getTextBuffer();

            };

            const metadata = pmx.metadata;
            metadata.textureCount = dv.getUint32();

            pmx.textures = [];

            for (let i = 0; i < metadata.textureCount; i++) {

                pmx.textures.push(parseTexture());

            }

        };

        const parseMaterials = function () {

            const parseMaterial = function () {

                const p = { };
                p.name = dv.getTextBuffer();
                p.englishName = dv.getTextBuffer();
                p.diffuse = dv.getFloat32Array(4);
                p.specular = dv.getFloat32Array(3);
                p.shininess = dv.getFloat32();
                p.ambient = dv.getFloat32Array(3);
                p.flag = dv.getUint8();
                p.edgeColor = dv.getFloat32Array(4);
                p.edgeSize = dv.getFloat32();
                p.textureIndex = dv.getIndex(pmx.metadata.textureIndexSize);
                p.envTextureIndex = dv.getIndex(pmx.metadata.textureIndexSize);
                p.envFlag = dv.getUint8();
                p.toonFlag = dv.getUint8();

                if (p.toonFlag === 0) {

                    p.toonIndex = dv.getIndex(pmx.metadata.textureIndexSize);

                } else if (p.toonFlag === 1) {

                    p.toonIndex = dv.getInt8();

                } else {

                    throw "unknown toon flag " + p.toonFlag + " exception.";

                }

                p.comment = dv.getTextBuffer();
                p.faceCount = dv.getUint32() / 3;
                return p;

            };

            const metadata = pmx.metadata;
            metadata.materialCount = dv.getUint32();

            pmx.materials = [];

            for (let i = 0; i < metadata.materialCount; i++) {

                pmx.materials.push(parseMaterial());

            }

        };

        const parseBones = function () {

            const parseBone = function () {

                const p = { };
                p.name = dv.getTextBuffer();
                p.englishName = dv.getTextBuffer();
                p.position = dv.getFloat32Array(3);
                p.parentIndex = dv.getIndex(pmx.metadata.boneIndexSize);
                p.transformationClass = dv.getUint32();
                p.flag = dv.getUint16();

                if (p.flag & 0x1) {

                    p.connectIndex = dv.getIndex(pmx.metadata.boneIndexSize);

                } else {

                    p.offsetPosition = dv.getFloat32Array(3);

                }

                if (p.flag & 0x100 || p.flag & 0x200) {

                    // Note: I don't think Grant is an appropriate name
                    //       but I found that some English translated MMD tools use this term
                    //       so I've named it Grant so far.
                    //       I'd rename to more appropriate name from Grant later.
                    const grant = { };

                    grant.isLocal = (p.flag & 0x80) !== 0 ? true : false;
                    grant.affectRotation = (p.flag & 0x100) !== 0 ? true : false;
                    grant.affectPosition = (p.flag & 0x200) !== 0 ? true : false;
                    grant.parentIndex = dv.getIndex(pmx.metadata.boneIndexSize);
                    grant.ratio = dv.getFloat32();

                    p.grant = grant;

                }

                if (p.flag & 0x400) {

                    p.fixAxis = dv.getFloat32Array(3);

                }

                if (p.flag & 0x800) {

                    p.localXVector = dv.getFloat32Array(3);
                    p.localZVector = dv.getFloat32Array(3);

                }

                if (p.flag & 0x2000) {

                    p.key = dv.getUint32();

                }

                if (p.flag & 0x20) {

                    const ik = { };

                    ik.effector = dv.getIndex(pmx.metadata.boneIndexSize);
                    ik.target = null;
                    ik.iteration = dv.getUint32();
                    ik.maxAngle = dv.getFloat32();
                    ik.linkCount = dv.getUint32();
                    ik.links = [];

                    for (let i = 0; i < ik.linkCount; i++) {

                        const link = { };
                        link.index = dv.getIndex(pmx.metadata.boneIndexSize);
                        link.angleLimitation = dv.getUint8();

                        if (link.angleLimitation === 1) {

                            link.lowerLimitationAngle = dv.getFloat32Array(3);
                            link.upperLimitationAngle = dv.getFloat32Array(3);

                        }

                        ik.links.push(link);

                    }

                    p.ik = ik;
                }

                return p;

            };

            const metadata = pmx.metadata;
            metadata.boneCount = dv.getUint32();

            pmx.bones = [];

            for (let i = 0; i < metadata.boneCount; i++) {

                pmx.bones.push(parseBone());

            }

        };

        const parseMorphs = function () {

            const parseMorph = function () {

                const p = { };
                p.name = dv.getTextBuffer();
                p.englishName = dv.getTextBuffer();
                p.panel = dv.getUint8();
                p.type = dv.getUint8();
                p.elementCount = dv.getUint32();
                p.elements = [];

                for (let i = 0; i < p.elementCount; i++) {

                    if (p.type === 0) {  // group morph

                        var m = { };
                        m.index = dv.getIndex(pmx.metadata.morphIndexSize);
                        m.ratio = dv.getFloat32();
                        p.elements.push(m);

                    } else if (p.type === 1) {  // vertex morph

                        var m = { };
                        m.index = dv.getIndex(pmx.metadata.vertexIndexSize, true);
                        m.position = dv.getFloat32Array(3);
                        p.elements.push(m);

                    } else if (p.type === 2) {  // bone morph

                        var m = { };
                        m.index = dv.getIndex(pmx.metadata.boneIndexSize);
                        m.position = dv.getFloat32Array(3);
                        m.rotation = dv.getFloat32Array(4);
                        p.elements.push(m);

                    } else if (p.type === 3) {  // uv morph

                        var m = { };
                        m.index = dv.getIndex(pmx.metadata.vertexIndexSize, true);
                        m.uv = dv.getFloat32Array(4);
                        p.elements.push(m);

                    } else if (p.type === 4) {  // additional uv1

                        // TODO: implement

                    } else if (p.type === 5) {  // additional uv2

                        // TODO: implement

                    } else if (p.type === 6) {  // additional uv3

                        // TODO: implement

                    } else if (p.type === 7) {  // additional uv4

                        // TODO: implement

                    } else if (p.type === 8) {  // material morph

                        var m = { };
                        m.index = dv.getIndex(pmx.metadata.materialIndexSize);
                        m.type = dv.getUint8();
                        m.diffuse = dv.getFloat32Array(4);
                        m.specular = dv.getFloat32Array(3);
                        m.shininess = dv.getFloat32();
                        m.ambient = dv.getFloat32Array(3);
                        m.edgeColor = dv.getFloat32Array(4);
                        m.edgeSize = dv.getFloat32();
                        m.textureColor = dv.getFloat32Array(4);
                        m.sphereTextureColor = dv.getFloat32Array(4);
                        m.toonColor = dv.getFloat32Array(4);
                        p.elements.push(m);

                    }

                }

                return p;

            };

            const metadata = pmx.metadata;
            metadata.morphCount = dv.getUint32();

            pmx.morphs = [];

            for (let i = 0; i < metadata.morphCount; i++) {

                pmx.morphs.push(parseMorph());

            }

        };

        const parseFrames = function () {

            const parseFrame = function () {

                const p = { };
                p.name = dv.getTextBuffer();
                p.englishName = dv.getTextBuffer();
                p.type = dv.getUint8();
                p.elementCount = dv.getUint32();
                p.elements = [];

                for (let i = 0; i < p.elementCount; i++) {

                    const e = { };
                    e.target = dv.getUint8();
                    e.index = (e.target === 0) ? dv.getIndex(pmx.metadata.boneIndexSize) : dv.getIndex(pmx.metadata.morphIndexSize);
                    p.elements.push(e);

                }

                return p;

            };

            const metadata = pmx.metadata;
            metadata.frameCount = dv.getUint32();

            pmx.frames = [];

            for (let i = 0; i < metadata.frameCount; i++) {

                pmx.frames.push(parseFrame());

            }

        };

        const parseRigidBodies = function () {

            const parseRigidBody = function () {

                const p = { };
                p.name = dv.getTextBuffer();
                p.englishName = dv.getTextBuffer();
                p.boneIndex = dv.getIndex(pmx.metadata.boneIndexSize);
                p.groupIndex = dv.getUint8();
                p.groupTarget = dv.getUint16();
                p.shapeType = dv.getUint8();
                p.width = dv.getFloat32();
                p.height = dv.getFloat32();
                p.depth = dv.getFloat32();
                p.position = dv.getFloat32Array(3);
                p.rotation = dv.getFloat32Array(3);
                p.weight = dv.getFloat32();
                p.positionDamping = dv.getFloat32();
                p.rotationDamping = dv.getFloat32();
                p.restitution = dv.getFloat32();
                p.friction = dv.getFloat32();
                p.type = dv.getUint8();
                return p;

            };

            const metadata = pmx.metadata;
            metadata.rigidBodyCount = dv.getUint32();

            pmx.rigidBodies = [];

            for (let i = 0; i < metadata.rigidBodyCount; i++) {

                pmx.rigidBodies.push(parseRigidBody());

            }

        };

        const parseConstraints = function () {

            const parseConstraint = function () {

                const p = { };
                p.name = dv.getTextBuffer();
                p.englishName = dv.getTextBuffer();
                p.type = dv.getUint8();
                p.rigidBodyIndex1 = dv.getIndex(pmx.metadata.rigidBodyIndexSize);
                p.rigidBodyIndex2 = dv.getIndex(pmx.metadata.rigidBodyIndexSize);
                p.position = dv.getFloat32Array(3);
                p.rotation = dv.getFloat32Array(3);
                p.translationLimitation1 = dv.getFloat32Array(3);
                p.translationLimitation2 = dv.getFloat32Array(3);
                p.rotationLimitation1 = dv.getFloat32Array(3);
                p.rotationLimitation2 = dv.getFloat32Array(3);
                p.springPosition = dv.getFloat32Array(3);
                p.springRotation = dv.getFloat32Array(3);
                return p;

            };

            const metadata = pmx.metadata;
            metadata.constraintCount = dv.getUint32();

            pmx.constraints = [];

            for (let i = 0; i < metadata.constraintCount; i++) {

                pmx.constraints.push(parseConstraint());

            }

        };

        parseHeader();
        parseVertices();
        parseFaces();
        parseTextures();
        parseMaterials();
        parseBones();
        parseMorphs();
        parseFrames();
        parseRigidBodies();
        parseConstraints();

        if (leftToRight === true) this.leftToRightModel(pmx);

        // console.log( pmx ); // for console debug

        return pmx;

    };

    public static parseVmd = function (buffer, leftToRight) {

        const vmd = { };
        const dv = new DataViewEx(buffer);

        vmd.metadata = { };
        vmd.metadata.coordinateSystem = "left";

        const parseHeader = function () {

            const metadata = vmd.metadata;
            metadata.magic = dv.getChars(30);

            if (metadata.magic !== "Vocaloid Motion Data 0002") {

                throw "VMD file magic is not Vocaloid Motion Data 0002, but " + metadata.magic;

            }

            metadata.name = dv.getSjisStringsAsUnicode(20);

        };

        const parseMotions = function () {

            const parseMotion = function () {

                const p = { };
                p.boneName = dv.getSjisStringsAsUnicode(15);
                p.frameNum = dv.getUint32();
                p.position = dv.getFloat32Array(3);
                p.rotation = dv.getFloat32Array(4);
                p.interpolation = dv.getUint8Array(64);
                return p;

            };

            const metadata = vmd.metadata;
            metadata.motionCount = dv.getUint32();

            vmd.motions = [];
            for (let i = 0; i < metadata.motionCount; i++) {

                vmd.motions.push(parseMotion());

            }

        };

        const parseMorphs = function () {

            const parseMorph = function () {

                const p = { };
                p.morphName = dv.getSjisStringsAsUnicode(15);
                p.frameNum = dv.getUint32();
                p.weight = dv.getFloat32();
                return p;

            };

            const metadata = vmd.metadata;
            metadata.morphCount = dv.getUint32();

            vmd.morphs = [];
            for (let i = 0; i < metadata.morphCount; i++) {

                vmd.morphs.push(parseMorph());

            }

        };

        const parseCameras = function () {

            const parseCamera = function () {

                const p = { };
                p.frameNum = dv.getUint32();
                p.distance = dv.getFloat32();
                p.position = dv.getFloat32Array(3);
                p.rotation = dv.getFloat32Array(3);
                p.interpolation = dv.getUint8Array(24);
                p.fov = dv.getUint32();
                p.perspective = dv.getUint8();
                return p;

            };

            const metadata = vmd.metadata;
            metadata.cameraCount = dv.getUint32();

            vmd.cameras = [];
            for (let i = 0; i < metadata.cameraCount; i++) {

                vmd.cameras.push(parseCamera());

            }

        };

        parseHeader();
        parseMotions();
        parseMorphs();
        parseCameras();

        if (leftToRight === true) this.leftToRightVmd(vmd);

        // console.log( vmd ); // for console debug

        return vmd;

    };

    public static parseVpd = function (text, leftToRight) {

        const vpd = { };

        vpd.metadata = { };
        vpd.metadata.coordinateSystem = "left";

        vpd.bones = [];

        const commentPatternG = /\/\/\w*(\r|\n|\r\n)/g;
        const newlinePattern = /\r|\n|\r\n/;

        const lines = text.replace(commentPatternG, "").split(newlinePattern);

        function throwError() {

            throw "the file seems not vpd file.";

        }

        function checkMagic() {

            if (lines[0] !== "Vocaloid Pose Data file") {

                throwError();

            }

        }

        function parseHeader() {

            if (lines.length < 4) {

                throwError();

            }

            vpd.metadata.parentFile = lines[2];
            vpd.metadata.boneCount = parseInt(lines[3]);

        }

        function parseBones() {

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

                var result;

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
                        translation: v,
                        quaternion: q

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

        checkMagic();
        parseHeader();
        parseBones();

        if (leftToRight === true) this.leftToRightVpd(vpd);

        // console.log( vpd );  // for console debug

        return vpd;

    };

    public static mergeVmds = function (vmds) {

        const v = { };
        v.metadata = { };
        v.metadata.name = vmds[0].metadata.name;
        v.metadata.coordinateSystem = vmds[0].metadata.coordinateSystem;
        v.metadata.motionCount = 0;
        v.metadata.morphCount = 0;
        v.metadata.cameraCount = 0;
        v.motions = [];
        v.morphs = [];
        v.cameras = [];

        for (let i = 0; i < vmds.length; i++) {

            const v2 = vmds[i];

            v.metadata.motionCount += v2.metadata.motionCount;
            v.metadata.morphCount += v2.metadata.morphCount;
            v.metadata.cameraCount += v2.metadata.cameraCount;

            for (var j = 0; j < v2.metadata.motionCount; j++) {

                v.motions.push(v2.motions[j]);

            }

            for (var j = 0; j < v2.metadata.morphCount; j++) {

                v.morphs.push(v2.morphs[j]);

            }

            for (var j = 0; j < v2.metadata.cameraCount; j++) {

                v.cameras.push(v2.cameras[j]);

            }

        }

        return v;

    };

    public static leftToRightModel(model: Pmd): void {
        if (model.metadata.coordinateSystem === "right") {
            return;
        }

        model.metadata.coordinateSystem = "right";

        for (var i = 0; i < model.metadata.vertexCount; i++) {
            DataCreationHelper.leftToRightVector3(model.vertices[i].position);
            DataCreationHelper.leftToRightVector3(model.vertices[i].normal);
        }

        for (var i = 0; i < model.metadata.faceCount; i++) {
            DataCreationHelper.leftToRightIndexOrder(model.faces[i].indices);
        }

        for (var i = 0; i < model.metadata.boneCount; i++) {
            DataCreationHelper.leftToRightVector3(model.bones[i].position);
        }

        // TODO: support other morph for PMX
        for (var i = 0; i < model.metadata.morphCount; i++) {
            const m = model.morphs[i];

            if (model.metadata.format === "pmx" && m.type !== 1) {

                // TODO: implement
                continue;
            }

            for (let j = 0; j < m.elements.length; j++) {
                DataCreationHelper.leftToRightVector3(m.elements[j].position);
            }
        }

        for (var i = 0; i < model.metadata.rigidBodyCount; i++) {
            DataCreationHelper.leftToRightVector3(model.rigidBodies[i].position);
            DataCreationHelper.leftToRightEuler(model.rigidBodies[i].rotation);
        }

        for (var i = 0; i < model.metadata.constraintCount; i++) {
            DataCreationHelper.leftToRightVector3(model.constraints[i].position);
            DataCreationHelper.leftToRightEuler(model.constraints[i].rotation);
            DataCreationHelper.leftToRightVector3Range(model.constraints[i].translationLimitation1, model.constraints[i].translationLimitation2);
            DataCreationHelper.leftToRightEulerRange(model.constraints[i].rotationLimitation1, model.constraints[i].rotationLimitation2);
        }
    }

    public static leftToRightVmd = function (vmd) {
        if (vmd.metadata.coordinateSystem === "right") {
            return;
        }

        vmd.metadata.coordinateSystem = "right";

        for (var i = 0; i < vmd.metadata.motionCount; i++) {
            DataCreationHelper.leftToRightVector3(vmd.motions[i].position);
            DataCreationHelper.leftToRightQuaternion(vmd.motions[i].rotation);
        }

        for (var i = 0; i < vmd.metadata.cameraCount; i++) {
            DataCreationHelper.leftToRightVector3(vmd.cameras[i].position);
            DataCreationHelper.leftToRightEuler(vmd.cameras[i].rotation);
        }
    };

    public static leftToRightVpd = function (vpd) {

        if (vpd.metadata.coordinateSystem === "right") {

            return;

        }

        vpd.metadata.coordinateSystem = "right";

        const helper = new DataCreationHelper();

        for (let i = 0; i < vpd.bones.length; i++) {

            helper.leftToRightVector3(vpd.bones[i].translation);
            helper.leftToRightQuaternion(vpd.bones[i].quaternion);

        }

    };
}
