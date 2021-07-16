import isNumber from 'lodash/isNumber';

/**
 * Generate 2D Layout
 * The function help us to generate the 2D Layout of size based on the parameter
 * @param rowLength - number
 * @param colLength - number
 * 
 * @returns 2D Array
 */
const create2DLayout = (rowLength, colLength) => {
    if (!isNumber(rowLength) || !isNumber(colLength)) return []
    if (rowLength <= 0 || colLength <= 0) return []

    const matrix = [];
    for (var i = 0; i < rowLength; i++) {
        matrix[i] = [...new Array(colLength)].map((_) => 0)
    }
    return matrix
}

export default create2DLayout;
