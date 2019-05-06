<template>
    <div id="app">
        <div class="field"
             :style="fieldStyle">
            <div v-for="(cell, i) in cells"
                 :key="i"
                 class="cell"
                 :style="cellStyle">
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';

export default {
    name: 'app',
    data() {
        return {
            cellSize: 20,
            rowCount: 15,
            colCount: 15,
            cells: [],
        };
    },
    computed: {
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
    },
    created() {
        _.forEach(_.range(this.rowCount), row => {
            _.forEach(_.range(this.colCount), col => {
                this.cells.push({ row, col, isAlive: false });
            });
        });
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

    width: 100%;
    height: 100%;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    > .field {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
        display: flex;
        flex-wrap: wrap;

        > .cell {
            border-right: 1px solid #dfdfdf;
            border-bottom: 1px solid #dfdfdf;
            border-collapse: collapse;
        }
    }
}
</style>
