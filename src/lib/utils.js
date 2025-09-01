/**
 * Creates a deep clone of a value.
 * @template T
 * @param {T} obj - The value to clone.
 * @returns {T} A deep copy of the value.
 */

const {randomBytes} = await import('node:crypto');
export const serializeNonPOJOs = (obj) => {
    return structuredClone(obj)
};


export const generateUsername = (name) => {
    const id = randomBytes(4).toString('hex');
    return `${name.slice(0, 5)}_${id}`;
}