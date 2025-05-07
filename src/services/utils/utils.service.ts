export function flattenMatrix(matrix: number[][]): number[] {
    return matrix.reduce((acc, row) => [...acc, ...row], []);
}

export function calculateAverage(numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

export function calculateSum(numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
}

export function isMatrixDiagonal(matrix: number[][]): boolean {
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
        if (i !== j && matrix[i][j] !== 0) {
            return false;
        }
        }
    }
    return true;
}