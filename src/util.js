import map from 'lodash/map';

function getCell(cellDict, cell, pos) {
    switch (pos) {
    case 'top':
        return cellDict[`${cell.row - 1},${cell.col}`];
    case 'bottom':
        return cellDict[`${cell.row + 1},${cell.col}`];
    case 'left':
        return cellDict[`${cell.row},${cell.col - 1}`];
    case 'right':
        return cellDict[`${cell.row},${cell.col + 1}`];
    case 'topLeft':
        return cellDict[`${cell.row - 1},${cell.col - 1}`];
    case 'topRight':
        return cellDict[`${cell.row - 1},${cell.col + 1}`];
    case 'bottomLeft':
        return cellDict[`${cell.row + 1},${cell.col - 1}`];
    case 'bottomRight':
        return cellDict[`${cell.row + 1},${cell.col + 1}`];
    default:
        throw new Error();
    }
}

export function calcNextGen(cellDict) {
    return map(cellDict, cell => {
        let aliveCount = 0;

        if (cell.adjoin.top && getCell(cellDict, cell, 'top').isAlive) {
            aliveCount += 1;
        }
        if (cell.adjoin.bottom && getCell(cellDict, cell, 'bottom').isAlive) {
            aliveCount += 1;
        }
        if (cell.adjoin.left && getCell(cellDict, cell, 'left').isAlive) {
            aliveCount += 1;
        }
        if (cell.adjoin.right && getCell(cellDict, cell, 'right').isAlive) {
            aliveCount += 1;
        }

        if (cell.adjoin.top && cell.adjoin.left && getCell(cellDict, cell, 'topLeft').isAlive) {
            aliveCount += 1;
        }

        if (cell.adjoin.top && cell.adjoin.right && getCell(cellDict, cell, 'topRight').isAlive) {
            aliveCount += 1;
        }

        if (
            cell.adjoin.bottom
            && cell.adjoin.left
            && getCell(cellDict, cell, 'bottomLeft').isAlive
        ) {
            aliveCount += 1;
        }

        if (
            cell.adjoin.bottom
            && cell.adjoin.right
            && getCell(cellDict, cell, 'bottomRight').isAlive
        ) {
            aliveCount += 1;
        }

        if (cell.isAlive) {
            if (aliveCount <= 1 || aliveCount >= 4) {
                return { ...cell, isAlive: false };
            }
            return { ...cell };
        }
        return { ...cell, isAlive: aliveCount === 3 };
    });
}

export default {
    calcNextGen,
};
