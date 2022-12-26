// CONSTANT
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 25;
const COLOR_MAPPING = ['red', 'orange', 'green', 'purple', 'blue', 'cyan', 'yellow', 'white'];
const WHITE_COLOR_ID = 7;
const BRICK_LAYOUT = [
  [
    [
      [1, 7, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 1],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 1, 7],
      [7, 1, 7],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [7, 1, 7],
      [7, 1, 1],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 1],
      [1, 1, 1],
      [7, 7, 7],
    ],
  ],
  [
    [
      [1, 7, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 1, 1],
      [1, 1, 7],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 7, 7],
      [7, 1, 1],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 7],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 7, 1],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 7],
      [7, 1, 1],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
    ],
    [
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 1, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
  ],
];
const KEY_CODE = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
};

const SECOND = 0.2 * 1000;

const canvas = document.querySelector('#board');
const context = canvas.getContext('2d');

context.canvas.width = COLS * BLOCK_SIZE;
context.canvas.height = ROWS * BLOCK_SIZE;

class Board {
  constructor(context) {
    this.context = context;
    this.grid = this.generateWhiteBoard();
    this.score = 0;
    this.gameOver = false;
  }

  generateWhiteBoard() {
    return Array.from({ length: ROWS }, () => {
      return Array(COLS).fill(WHITE_COLOR_ID);
    });
  }

  drawCell(xAxis, yAxis, colorId) {
    this.context.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
    this.context.fillRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    this.context.fillStyle = 'black';
    this.context.strokeRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  }

  drawBoard() {
    for (let row = 0; row < this.grid.length; ++row) {
      for (let col = 0; col < this.grid[0].length; ++col) {
        this.drawCell(col, row, this.grid[row][col]);
      }
    }
  }

  handleCompleteRows() {
    const latestGrid = board.grid.filter((row) => {
      return row.some((col) => col === WHITE_COLOR_ID);
    });

    const newScore = ROWS - latestGrid.length;
    const newRows = Array.from({ length: newScore }, () => {
      return Array(COLS).fill(WHITE_COLOR_ID);
    });

    if (newScore) {
      board.grid = [...newRows, ...latestGrid];
      this.handleScore(newScore * 10);
    }
  }

  handleScore(newScore) {
    this.score += newScore;
    document.querySelector('#score').innerHTML = this.score;
  }
  handleGameOver() {
    this.gameOver = true;
    alert('Game over');
  }
}

class Brick {
  constructor(id) {
    this.id = id;
    this.layout = BRICK_LAYOUT[id];
    this.activeIndex = 0;
    this.colPos = 3;
    this.rowPos = -3;
  }

  draw() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          board.drawCell(col + this.colPos, row + this.rowPos, this.id);
        }
      }
    }
  }

  clear() {
    for (let row = 0; row < this.layout[this.activeIndex].length; ++row) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; ++col) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID);
        }
      }
    }
  }

  moveLeft() {
    if (!this.checkCollision(this.rowPos, this.colPos - 1, this.layout[this.activeIndex])) {
      this.clear();
      this.colPos--;
      this.draw();
    }
  }

  moveRight() {
    if (!this.checkCollision(this.rowPos, this.colPos + 1, this.layout[this.activeIndex])) {
      this.clear();
      this.colPos++;
      this.draw();
    }
  }

  moveDown() {
    if (!this.checkCollision(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
      this.clear();
      this.rowPos++;
      this.draw();
      return;
    }

    this.handleLanded();
    if (!board.gameOver) {
      generateNewBrick();
    }
  }

  rotate() {
    if (!this.checkCollision(this.rowPos, this.colPos, this.layout[(this.activeIndex + 1) % 4])) {
      this.clear();
      this.activeIndex = (this.activeIndex + 1) % 4;
      this.draw();
    }
  }

  checkCollision(nextRow, nextCol, nextLayout) {
    for (let row = 0; row < nextLayout.length; ++row) {
      for (let col = 0; col < nextLayout[0].length; ++col) {
        if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0) {
          if (
            col + nextCol < 0 ||
            col + nextCol >= COLS ||
            row + nextRow >= ROWS ||
            board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID
          ) {
            return true;
          }
        }
      }
    }
  }

  handleLanded() {
    if (this.rowPos <= 0) {
      board.handleGameOver();
      return;
    }

    for (let row = 0; row < this.layout[this.activeIndex].length; ++row) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; ++col) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          board.grid[row + this.rowPos][col + this.colPos] = this.id;
        }
      }
    }

    board.handleCompleteRows();
    board.drawBoard();
  }
}

function generateNewBrick() {
  brick = new Brick(Math.floor(Math.random() * 10) % BRICK_LAYOUT.length);
}

board = new Board(context);
board.drawBoard();

generateNewBrick();
brick.draw();
function playGame() {
  board = new Board(context);
  board.drawBoard();

  generateNewBrick();
  brick.draw();

  const refresh = setInterval(() => {
    if (!board.gameOver) {
      brick.moveDown();
    } else {
      clearInterval(refresh);
    }
  }, SECOND);

  document.addEventListener('keydown', (e) => {
    if (!board.gameOver) {
      switch (e.code) {
        case KEY_CODE.UP: {
          brick.rotate();
          break;
        }
        case KEY_CODE.RIGHT: {
          brick.moveRight();
          break;
        }
        case KEY_CODE.DOWN: {
          brick.moveDown();
          break;
        }
        case KEY_CODE.LEFT: {
          brick.moveLeft();
          break;
        }
        default: {
          break;
        }
      }
    }
  });
}
const btnPlay = document.querySelector('.play-btn');
let isPlaying;
btnPlay.addEventListener('click', () => {
  if (!isPlaying) {
    playGame();
    isPlaying = true;
  } else {
    if (board.gameOver) {
      isPlaying = false;
      playGame();
    }
  }
});
