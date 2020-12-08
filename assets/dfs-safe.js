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


class Maze {
    constructor(size, rows, columns,totalCells) {
        this.size = size;
        this.rows = rows;
        this.totalCells = totalCells;
        this.columns = columns;
        this.grid = [];
        this.stack = [];

    }

    setup() {
       for (let r = 0; r < this.totalCells; r++) {
               let cell = new Cell(this.grid, this.size, cellDatas[r + 1]);
               //console.log(cell);
               this.grid.push(cell);
       }
        current = this.grid[0][0];
        }




    draw(){
        maze.width = this.size;
        maze.height = this.size;
        maze.style.background = 'black';
        let grid =this.grid;

        //current.visited= true;
        for (let r = 0; r < this.totalCells; r++) {
            console.log(grid[r]);
            grid[r].show(this.size,this.rows,this.columns);
console.log('------------------');
        }
        // for (let r = 0; r < this.rows; r++) {
        //     for (let c = 0; c < this.columns; c++) {
        //         let grid =this.grid;
        //         grid[r][c].show(this.size,this.rows,this.columns);
        //     }
        // }

        // let next = current.checkNeighbours();
        //
        // if (next){
        //     next.visited =true;
        //
        //     this.stack.push(current);
        //
        //     current.highlight(this.columns);
        //
        //     current.removeWall(current,next);
        //
        //     current = next;
        // } else if (this.stack.length>0){
        //     let cell = this.stack.pop();
        //     current = cell;
        //     current.highlight(this.columns);
        // }
        //
        // if (this.stack.length == 0){
        //     return;
        // }
        //
        // window.requestAnimationFrame(()=>{
        //     this.draw();
        // })
   }
}

class Cell {
    constructor( parentGrid, parentSize,cellData) {
        this.rowNumber = cellData['rowNumber'];
        this.colNumber = cellData['colNumber'];
        this.parentGrid = parentGrid;
        this.parentSize = parentSize;
        this.cellData = cellData;
        this.cellNumber = cellData['cell'];
        //this.visited = false;
        this.walls = {
            topWall: cellData['walls']['topWall'],
            rightWall: cellData['walls']['rightWall'],
            bottomWall: cellData['walls']['bottomWall'],
            leftWall: cellData['walls']['leftWall']
        };

    }

    checkNeighbours(){
        let grid = this.parentGrid;
        let row = this.rowNumber;
        let column = this.colNumber;
        let neighbours = [];

        let top = row !== 0 ? grid[row-1][column] : undefined;
        let right = column !== grid.length-1 ? grid[row][column+1] : undefined;
        let bottom = row !== grid.length-1 ? grid[row +1][column] : undefined;
        let left = column !== 0 ? grid[row][column-1] : undefined;

        if(top && !top.visited) neighbours.push(top);
        if(right && !right.visited) neighbours.push(right);
        if(bottom && !bottom.visited) neighbours.push(bottom);
        if(left && !left.visited) neighbours.push(left);

        if (neighbours.length !==0){
            let random = Math.floor(Math.random()* neighbours.length);
            return neighbours[random];
        }else{
            return undefined;
        }

    }

    drawTopWall(x, y, size, columns, rows) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + size / columns, y);
        context.stroke();
        console.log('mur Top construit');
    }

    // drawRightWall(x, y, size, columns, rows) {
    //     context.beginPath();
    //     context.moveTo(x + size / columns, y);
    //     context.lineTo(x + size / columns, y + size / rows);
    //     context.stroke();
    // }
    //
    // drawBottomWall(x, y, size, columns, rows) {
    //     context.beginPath();
    //     context.moveTo(x, y + size / rows);
    //     context.lineTo(x + size / columns, y + size / rows);
    //     context.stroke();
    // }
    //
    // drawLeftWall(x, y, size, columns, rows) {
    //     context.beginPath();
    //     context.moveTo(x , y);
    //     context.lineTo(x , y + size / rows);
    //     context.stroke();
    // }

    highlight(columns){
        let x = (this.colNumber *this.parentSize) / columns + 1;
        let y = (this.rowNumber * this.parentGrid) / columns +1 ;

        context.fillStyle = 'red';
        context.fillRect( x , y ,this.parentSize/columns-3, this.parentSize / columns -3 );
    }

    removeWall(cell1, cell2){
        let x = (cell1.colNumber - cell2.colNumber);
        if (x == 1){
            cell1.walls.leftWall =false;
            cell2.walls.rightWall = false;
        } else if (x == -1){
            cell1.walls.rightWall = false;
            cell2.walls.leftWall =false;
        }
        let y = (cell1.rowNumber - cell2.rowNumber);
        if (y == 1){
            cell1.walls.topWall =false;
            cell2.walls.bottomWall = false;
        } else if (y == -1){
            cell1.walls.bottomWall = false;
            cell2.walls.topWall =false;
        }
    }

    show(size, rows, columns){
        let x = this.rowNumber;
        let y = this.colNumber;
        console.log('x = '+ x);
        console.log('y = '+ y);
        context.strokeStyle = "red";
        context.fillStyle ="black";
        context.lineWidth = 2 ;

        if (this.walls.topWall)this.drawTopWall(x , y , size , columns , rows) ;
        // if (this.walls.rightWall)this.drawRightWall(x , y , size , columns , rows) ;
        // if (this.walls.bottomWall)this.drawBottomWall(x , y , size , columns , rows) ;
        // if (this.walls.leftWall)this.drawLeftWall(x , y , size , columns , rows) ;
        // if (this.visited){
        //     context.fillRect(x+1, y+1 , size/columns - 2 ,size/rows -2);
        // }

    }
}


let newMaze = new Maze(size, rows, columns,totalCells);
newMaze.setup();
newMaze.draw();