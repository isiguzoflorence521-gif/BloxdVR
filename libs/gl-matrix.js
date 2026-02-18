// libs/gl-matrix.js
// Simplified version for BloxdVR head-tracking math
export const vec3 = {
    create: () => new Float32Array(3),
    set: (out, x, y, z) => { out[0] = x; out[1] = y; out[2] = z; return out; }
};

export const quat = {
    create: () => new Float32Array(4),
    slerp: (out, a, b, t) => {
        // Linear interpolation for smooth head movement
        for (let i = 0; i < 4; i++) out[i] = a[i] + t * (b[i] - a[i]);
        return out;
    }
};
