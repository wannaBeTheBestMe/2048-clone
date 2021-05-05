let fontRegular, fontItalic, fontBold;
let grid;
let tiles = [];

function preload() {
  fontRegular = loadFont("Assets/ClearSans-Regular.ttf");
  fontItalic = loadFont("Assets/ClearSans-Italic.ttf");
  fontBold = loadFont("Assets/ClearSans-Bold.ttf");
}

function setup() {
  createCanvas(800, 800);
  grid = new Grid(4, 4);
  for (let i = 0; i < 2; i++) {
    tiles[i] = new Grid.Tile(0, 0);
  }
}

function draw() {
  background(205, 193, 180, 255);
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].spawn();
    tiles[i].displayValue();
  }
  grid.display();
  grid.update();
  noLoop();
}

class Grid {
  constructor(length, breadth) {
    this.length = length;
    this.breadth = breadth;
    this.widthConstant = width / this.length;
    this.heightConstant = height / this.breadth;
    this.weight = 20;
    this.grid = [];
  }

  display() {
    for (let i = 0; i < this.length; i++) {
      this.grid[i] = new Array(this.breadth).fill(0);
    }

    let positions = [
      {
        x1: 0,
        y1: this.weight / 2,
        x2: width,
        y2: this.weight / 2,
      },
      {
        x1: width - this.weight / 2,
        y1: 0,
        x2: width - this.weight / 2,
        y2: height,
      },
      {
        x1: width,
        y1: height - this.weight / 2,
        x2: 0,
        y2: height - this.weight / 2,
      },
      {
        x1: this.weight / 2,
        y1: height,
        x2: this.weight / 2,
        y2: 0,
      },
      {
        x1: this.widthConstant,
        y1: height,
        x2: this.widthConstant,
        y2: 0,
      },
      {
        x1: 2 * this.widthConstant,
        y1: height,
        x2: 2 * this.widthConstant,
        y2: 0,
      },
      {
        x1: 3 * this.widthConstant,
        y1: height,
        x2: 3 * this.widthConstant,
        y2: 0,
      },
      {
        x1: 0,
        y1: this.heightConstant,
        x2: width,
        y2: this.heightConstant,
      },
      {
        x1: 0,
        y1: 2 * this.heightConstant,
        x2: width,
        y2: 2 * this.heightConstant,
      },
      {
        x1: 0,
        y1: 3 * this.heightConstant,
        x2: width,
        y2: 3 * this.heightConstant,
      },
    ];

    for (let position of positions) {
      strokeWeight(this.weight);
      stroke(187, 173, 160, 255);
      line(position.x1, position.y1, position.x2, position.y2);
    }
  }

  update() {
    for (let i = 0; i < tiles.length; i++) {
      let xCoordinateTile = Object.keys(tiles[i].x)[0];
      let yCoordinateTile = Object.keys(tiles[i].y)[0];
      this.grid[xCoordinateTile][yCoordinateTile] = tiles[i].value;
    }
  }
}

Grid.Tile = class {
  constructor(x, y, value, color) {
    let possibleXValues = [
      { 0: grid.weight },
      { 1: grid.widthConstant + 0.5 * grid.weight },
      { 2: 2 * grid.widthConstant + 0.5 * grid.weight },
      { 3: 3 * grid.widthConstant + 0.5 * grid.weight },
    ];
    let possibleYValues = [
      { 0: 3 * grid.heightConstant + 0.5 * grid.weight },
      { 1: 2 * grid.heightConstant + 0.5 * grid.weight },
      { 2: grid.heightConstant + 0.5 * grid.weight },
      { 3: grid.weight },
    ];

    if (tiles.length >= 2) {
      let lastTile = tiles[tiles.length - 1];
      let randomNumber = random();
      if (randomNumber > 0.5) {
        let lastTileCoordinate = parseFloat(Object.keys(lastTile.x)[0]);
        possibleXValues.splice(lastTileCoordinate, 1);
      } else {
        let lastTileCoordinate = parseFloat(Object.keys(lastTile.y)[0]);
        possibleYValues.splice(lastTileCoordinate, 1);
      }
    }

    console.log(possibleXValues);
    console.log(possibleYValues);

    this.x = random(possibleXValues);
    this.y = random(possibleYValues);

    this.value = random([2, 4]);
    this.color = this.value == 2 ? "RGB(238, 228, 218)" : "RGB(238, 225, 201)";
  }

  spawn() {
    noStroke();
    fill(this.color);
    let tileWidth = grid.widthConstant - 0.5 * grid.weight;
    let tileHeight = grid.heightConstant - 0.5 * grid.weight;
    rect(
      Object.values(this.x)[0],
      Object.values(this.y)[0],
      tileWidth,
      tileHeight
    );
  }

  displayValue() {
    noStroke();
    fill(119, 110, 101);
    let size = 100;
    textSize(size);
    textFont(fontBold);
    text(
      this.value,
      Object.values(this.x)[0] +
        (grid.widthConstant - 1.5 * grid.weight) / 2 -
        size / 4,
      Object.values(this.y)[0] +
        (grid.heightConstant - 1.5 * grid.weight) / 2 +
        size / 3
    );

    // strokeWeight(5);
    // stroke(51);
    // point(this.x + (grid.widthConstant - 1.5 * grid.weight) / 2, this.y + (grid.heightConstant - 1.5 * grid.weight) / 2)
  }
};

/*
Color Codes
  2: 238,228,218,255
  4: 238,225,201,255
  8: 243,178,122,255
  16: 246,150,100,255
  32: 247,124,95,255
  64: 247,95,59,255
  128: 237,208,115,255
  256: 236,203,101,255
  512: 236,200,90,255
  1024: 231,194,87,255
  2048: 232,190,78,255
 */
