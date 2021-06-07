/*

*/

let fontRegular, fontItalic, fontBold;
let grid;
let tiles = [];
let size = 100;

function preload() {
  fontRegular = loadFont("Assets/ClearSans-Regular.ttf");
  fontItalic = loadFont("Assets/ClearSans-Italic.ttf");
  fontBold = loadFont("Assets/ClearSans-Bold.ttf");
}

function setup() {
  createCanvas(800, 800);
  background(Colors.BACKGROUND);
  grid = new Grid(4, 4);
  for (let i = 0; i < 2; i++) {
    let randomValue = random([2, 4]);
    let randomColor = randomValue == 2 ? Colors._2 : Colors._4;
    tiles[i] = new Grid.Tile(0, 0, randomValue, randomColor);
  }
  grid.spawn(2);
}

function draw() {
  grid.updateGrid();
  grid.displayOutlines();
}

class Grid {
  constructor(_length, breadth) {
    this._length = _length;
    this.breadth = breadth;
    this.widthConstant = width / this._length;
    this.heightConstant = height / this.breadth;
    this.weight = 20;
    this.grid = [];
    for (let i = 0; i < this._length; i++) {
      this.grid[i] = new Array(this.breadth).fill(0);
    }
    this.possibleXValues = [
      this.weight,
      this.widthConstant + 0.5 * this.weight,
      2 * this.widthConstant + 0.5 * this.weight,
      3 * this.widthConstant + 0.5 * this.weight
    ];

    this.possibleYValues = [
      3 * this.heightConstant + 0.5 * this.weight,
      2 * this.heightConstant + 0.5 * this.weight,
      this.heightConstant + 0.5 * this.weight,
      this.weight
    ];
  }

  displayOutlines() {
    for (let j = 0; j < 5; j++) {
      stroke(187, 173, 160, 255);
      j === 0 || j === 4 ? strokeWeight(2 * this.weight) : strokeWeight(this.weight);

      line(0, this.heightConstant * j, width, this.heightConstant * j);
      line(this.widthConstant * j, 0, this.widthConstant * j, height);
    }
  }

  spawn(numberOfTiles) {
    let possibleXValues = [0, 1, 2, 3];
    let possibleYValues = [0, 1, 2, 3];

    let i = 0;
    while (i < numberOfTiles) {
      let xValue = random(possibleXValues);
      let yValue = random(possibleYValues);

      if (this.grid[yValue][xValue] === 0) {
        tiles[i].spawn(xValue, yValue);
        this.grid[yValue][xValue] = tiles[i].value;
        i++;
      } else {
        continue;
      }
    }
  }

  updateGrid() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] !== 0) {
          noStroke();
          fill(this.grid[i][j] === 2 ? Colors._2 : Colors._4);
          let tileWidth = this.widthConstant - 0.5 * this.weight;
          let tileHeight = this.heightConstant - 0.5 * this.weight;
          let x = this.possibleXValues[j];
          let y = this.possibleYValues[i];
          rect(x, y, tileWidth, tileHeight);
          Grid.Tile.displayValue(
            this.grid[i][j],
            x + (this.widthConstant - 1.5 * this.weight) / 2 - size / 4,
            y + (this.heightConstant - 1.5 * this.weight) / 2 + size / 3
          );
        }
      }
    }
  }
}

Grid.Tile = class {
  constructor(x, y, value, color) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.color = color;
  }

  spawn(xPos, yPos) {
    this.x = grid.possibleXValues[xPos];
    this.y = grid.possibleYValues[yPos];

    noStroke();
    fill(this.color);
    let tileWidth = grid.widthConstant - 0.5 * grid.weight;
    let tileHeight = grid.heightConstant - 0.5 * grid.weight;
    rect(this.x, this.y, tileWidth, tileHeight);
    Grid.Tile.displayValue(
      this.value,
      this.x + (grid.widthConstant - 1.5 * grid.weight) / 2 - size / 4,
      this.y + (grid.heightConstant - 1.5 * grid.weight) / 2 + size / 3
    );
  }

  static displayValue(textMessage, textX, textY) {
    noStroke();
    fill(Colors.TEXT);
    textSize(size);
    textFont(fontBold);
    text(textMessage, textX, textY);
  }

  updatePositions() {
    if (keyCode === UP_ARROW) {
      console.log("once");
    }
  }
};

function keyReleased() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].updatePositions();
  }
}

class Colors {
  static BACKGROUND = "RGBA(205, 193, 180, 1)";
  static LINES = "RGBA(187, 173, 160, 1)";
  static TEXT = "RGBA(119, 110, 101, 1)";
  static _2 = "RGBA(238, 228, 218, 1)";
  static _4 = "RGBA(238, 225, 201, 1)";
  static _8 = "RGBA(243, 178, 122, 1)";
  static _16 = "RGBA(246, 150, 100, 1)";
  static _32 = "RGBA(247, 124, 95, 1)";
  static _64 = "RGBA(247, 95, 59, 1)";
  static _128 = "RGBA(237, 208, 115, 1)";
  static _256 = "RGBA(236, 203, 101, 1)";
  static _512 = "RGBA(236, 200, 90, 1)";
  static _1024 = "RGBA(231, 194, 87, 1)";
  static _2048 = "RGBA(232, 190, 78, 1)";
}
