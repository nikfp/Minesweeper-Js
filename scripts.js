// Board Controller

const boardController = function() {
    const board = {
        squares: [],
        size: 5,
        mineCount: 5,
        uncoveredCount: 0,
    }

    const getBoard = () => board;

    const resetBoard = () => {
        // Clear existing board
        board.squares.splice(0, board.squares.length);

        // Create squares for new board
        const squares = [];
        
        for (let row = 0; row < board.size; row++) {
            for (let column = 0; column < board.size; column++) {
                squares.push({
                    rowNumber: row,
                    colNumber: column,
                    mine: false,
                    flag: false,
                    adjacent: 0,
                    uncovered: false,
                });
            }
        };
        
        // Randomly place mines in newly created squares
        // Number created each iteration will be between 0 and number of squares
        // number represent 0 based index of mine
        const mineLocations = [];

        while (mineLocations.length < board.mineCount) {
          const placement = Math.floor(Math.random() * squares.length);
          // Only push mine location if it's not a duplicate. 
          if (!mineLocations.includes(placement)) {
            mineLocations.push(placement);
          }
        }
        
        // Flip square mine indicator to true based on locations values
        mineLocations.forEach((el) => {
          squares[el].mine = true;
        });
      
        // take board size chunks of squares array and push to board array, creating 2d array
        while (squares.length > 0) {
          board.squares.push(squares.splice(0, board.size));
        }
      
        // Iterate through each cell, and if cell is not a mine, count adjacent mines. 
        board.squares.forEach((row) => {
          row.forEach((cell) => {
            if (!cell.mine) {
              getAdjacentCells(cell.rowNumber, cell.colNumber).forEach((el) => {
                const testCell = board.squares[el[0]][el[1]];
      
                if (testCell.mine) {
                  cell.adjacent++;
                }
              });
            }
          });
        });
    };
    
    const getAdjacentCells = (row, col) => {

        // Values in this array can be added to cell coordinates
        // to locate adjacent coordinates
        const adjacentCellAdders = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ];
      
        // Adding operation - Tests each adder against cell coordinates, 
        // If new coordinates are within range of board, adds new coordinates 
        // to array, then return array
        const results = [];
      
        adjacentCellAdders.forEach((el) => {
          testRow = row + el[0];
          testCol = col + el[1];
          if (
            !(
              testRow < 0 ||
              testRow >= board.size ||
              testCol < 0 ||
              testCol >= board.size
            )
          ) {
            results.push([testRow, testCol]);
          }
        });
      
        return results;
      };

    return {
        resetBoard,
        getBoard
    }
}();

// UI Controller

const uiController = function() {

}();

// Global Controller 

const globalController = function(boardCtrl, uiCtrl) {

  return {
      init: function () {
          boardCtrl.resetBoard();
          console.log('Application Initialized');
      }
  }
}(boardController, uiController);

globalController.init();

