/** --------------------- DECLARATION DES VARIABLES --------------------- */
let maze = document.querySelector('.maze');
let context = maze.getContext('2d');
let mazeData = labyrinthe ;
let size = 500;
let totalCells =  mazeData['totalCells'];
let rows = mazeData['totalRows'];
let columns = mazeData['totalColumns'];
let start = mazeData['start'];
let finish = mazeData['finish'];
let cellDatas = mazeData['cellDatas'];
let current;


/** --------------------- LES CLASS --------------------- */

/** Génération d'un labyrinthe composé d'un grille et de cellules */
class Maze {
    constructor(size, rows, columns,totalCells) {
        this.size = size;
        this.rows = rows;
        this.totalCells = totalCells;
        this.columns = columns;
        this.start = start;
        this.finish =finish;
        this.grid = [];
    }

    setup() {
       for (let r = 0; r < this.totalCells; r++) {
               let cell = new Cell(this.grid, this.size, cellDatas[r + 1]);
               this.grid.push(cell);
       }
        current = this.grid[0][0];
        }




    draw(){
        maze.width = this.size;
        maze.height = this.size;
        maze.style.background = 'black';
        let grid =this.grid;

        for (let r = 0; r < this.totalCells; r++) {
            grid[r].show(this.size,this.rows,this.columns);

        }

   }
}

/** Génération de cellules */
class Cell {
    constructor( parentGrid, parentSize,cellData) {
        this.rowNumber = cellData['rowNumber'];
        this.colNumber = cellData['colNumber'];
        this.parentGrid = parentGrid;
        this.parentSize = parentSize;
        this.cellData = cellData;
        this.cellNumber = cellData['cell'];
 //if(this.cellNumber =
        this.walls = {
            topWall: cellData['walls']['topWall'],
            rightWall: cellData['walls']['rightWall'],
            bottomWall: cellData['walls']['bottomWall'],
            leftWall: cellData['walls']['leftWall']
        };

    }

    drawStart(x, y, size, columns, rows){
        context.beginPath();
        context.fillStyle = "orange";
        context.fillRect(x, y, ((size / columns)-4)/2, (( size / rows)-4))/2;

    }


    drawTopWall(x, y, size, columns, rows) {
        context.beginPath();
        context.moveTo(x*(size / columns), y*( size / rows));
        context.lineTo(x*(size / columns) + size / columns, y*( size / rows));
        context.stroke();

    }

    drawRightWall(x, y, size, columns, rows) {
        context.beginPath();
        context.moveTo(x*(size / columns) + size / columns, y*( size / rows));
        context.lineTo(x*(size / columns) + size / columns, y*( size / rows) + size / rows);
        context.stroke();
    }

    drawBottomWall(x, y, size, columns, rows) {
        context.beginPath();
        context.moveTo(x*(size / columns), y*( size / rows) + size / rows);
        context.lineTo(x*(size / columns) + size / columns, y*( size / rows) + size / rows);
        context.stroke();
    }

    drawLeftWall(x, y, size, columns, rows) {
        context.beginPath();
        context.moveTo(x*(size / columns) , y*( size / rows));
        context.lineTo(x*(size / columns) , y*( size / rows) + size / rows);
        context.stroke();
        //DrawRect
    }



    show(size, rows, columns){
        let x = this.rowNumber;
        let y = this.colNumber;
        let cellNumber = this.cellNumber;
        console.log(cellNumber);
        context.strokeStyle = "red";
        context.lineWidth = 2 ;

        if (this.start == cellNumber){
            drawStart(x , y , size , columns , rows) ;
        }
        if (this.walls.topWall)this.drawTopWall(x , y , size , columns , rows) ;
        if (this.walls.rightWall)this.drawRightWall(x , y , size , columns , rows) ;
        if (this.walls.bottomWall)this.drawBottomWall(x , y , size , columns , rows) ;
        if (this.walls.leftWall)this.drawLeftWall(x , y , size , columns , rows) ;

    }
}

/** --------------------- LES FONCTIONS --------------------- */

/** Génération du labyrinthe */
function initMaze(){
    let newMaze = new Maze(size, rows, columns,totalCells);
    newMaze.setup();
    newMaze.draw();
}

/** --------------------- LA GENERATION --------------------- */
/** Génération du labyrinthe */
initMaze()