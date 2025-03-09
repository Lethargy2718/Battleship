export default function createGridMatrix(size = 10, defaultValue = "") {
    return new Array(size).fill(null).map(() => new Array(size).fill(defaultValue));
}
