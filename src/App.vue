<template>
  <div id="app">
    <div class="menu">
      <button class="rest-button"
              @click.stop="setRandomCells()">
        reset
      </button>
      <button class="toggle-button"
              :class="{'is-running': isRun }"
              @click.stop="toggleIsRun()">
        {{ toggleButtonText }}
      </button>
    </div>
    <div class="field"
         :style="fieldStyle">
      <div v-for="(cell, i) in cells"
           :key="i"
           :style="cellStyle"
           class="cell"
           :class="{ 'is-alive': cell.isAlive }"
           @click.stop="toggleCell(cell)" />
    </div>
  </div>
</template>

<script>
import keyBy from 'lodash/keyBy';
import { calcNextGen } from './util';

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
    name: 'app',
    data() {
        return {
            isRun: false,
            cellSize: 10,
            rowCount: 50,
            colCount: 50,
            cells: [],
        };
    },
    methods: {
        toggleIsRun() {
            this.isRun = !this.isRun;

            if (this.isRun) {
                this.next();
            }
        },
        toggleCell(cell) {
            const target = this.cells.find(
                c => c.row === cell.row && c.col === cell.col
            );
            target.isAlive = !target.isAlive;
        },
        setRandomCells() {
            const newCells = [];
            const { rowCount, colCount } = this;
            for (let row = 0; row < rowCount; row += 1) {
                for (let col = 0; col < colCount; col += 1) {
                    newCells.push({
                        row,
                        col,
                        isAlive: getRandomIntInclusive(0, 10) === 10,
                        adjoin: {
                            top: row !== 0,
                            left: col !== 0,
                            bottom: row !== rowCount - 1,
                            right: col !== colCount - 1,
                        },
                    });
                }
            }
            this.cells = newCells;
        },
        async next() {
            this.cells = calcNextGen(this.cellDict);
            if (this.isRun) {
                requestAnimationFrame(() => this.next());
            }
        },
    },
    computed: {
        toggleButtonText() {
            return this.isRun ? 'stop' : 'start';
        },
        fieldStyle() {
            return {
                width: `${this.colCount * this.cellSize}px`,
                height: `${this.rowCount * this.cellSize}px`,
            };
        },
        cellStyle() {
            const size = `${this.cellSize}px`;
            return { width: size, height: size };
        },
        cellDict() {
            return keyBy(this.cells, cell => `${cell.row},${cell.col}`);
        },
    },
    created() {
        this.setRandomCells();
    },
};
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}
html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #5f5f5f;
    background: #fefefe;

    width: 100%;
    height: 100%;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > .menu {
        position: fixed;
        right: 10px;
        bottom: 10px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        > .toggle-button {
            width: 50px;
            height: 50px;
            background-color: white;
            border: none;
            border-radius: 50%;
            box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.15);

            transition: background-color 0.1s ease-out, color 0.1s ease-out;

            &:hover {
                background-color: rgba(0, 0, 0, 0.2);
            }
            &:focus {
                outline: none;
            }
            &.is-running {
                background-color: #1f1f1f;
                color: #efefef;
            }
        }

        > .rest-button {
            width: 30px;
            height: 30px;
            margin-bottom: 10px;
            font-size: 8px;
            background-color: white;
            border: none;
            border-radius: 50%;
            box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            justify-content: center;

            transition: background-color 0.1s ease-out, color 0.1s ease-out;

            &:hover {
                background-color: rgba(0, 0, 0, 0.2);
            }
            &:focus {
                outline: none;
            }
        }
    }

    > .field {
        background: #ffffff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
        display: flex;
        flex-wrap: wrap;

        > .cell {
            border-right: 1px solid #dfdfdf;
            border-bottom: 1px solid #dfdfdf;
            border-collapse: collapse;

            will-change: background-color;
            transition: background-color 0.25s ease-out;

            &:hover {
                background-color: #5f5f5f;
            }

            &.is-alive {
                background-color: #2f2f2f;
            }
        }
    }
}
</style>
