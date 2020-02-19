import './vendor';
import $ from 'jquery';
import _ from 'lodash';

const a = 1;
console.log($, '');
console.log("hi test")


if (true) {
}

// alert(
//     document.getElementById("bootn").innerHTML)



// alert("hi")
// $ = document.querySelector

type Point2D = { x: number, y: number }
type IdxPair = { i: number, j: number }

function getMousePosition(canvas, event): Point2D {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    // alert(rect.top)
    console.log("Coordinate x: " + x,
        "Coordinate y: " + y);
    return { x, y }
}

$(function () {


    class Cell {
        static readonly CELL_WIDTH: number = 40
        color: string
        constructor(color: string = "brown") {
            this.color = color
        }
    }


    // let grid: Array<Array<Cell>> = (new Array(10))
    //     .map(r => (new Array(10)).map(c1 => new Cell()))
    // debugger
    // .fill(new Array(10)
    //     .fill(new Cell()))


    // let grid: Array<Array<Cell>> = _.fill(new Array(10),
    //     _.fill(new Array(10),
    //         new Cell()))

    let grid: Array<Array<Cell>> = _.times(10,
        () => _.times(10,
            () => new Cell()))

    // debugger
    // console.log(grid)

    // grid[4][6] = new Cell("red")
    // grid[4][6]=new Cell("red")
    // debugger
    // grid[4][6] = new Cell("white")

    _.range(0, 7).map(n => grid[1][n] = new Cell("red"))
    _.range(1, 5).map(n => grid[n][1] = new Cell("red"))
    _.range(1, 5).map(n => grid[n][6] = new Cell("red"))
    _.range(1, 4).map(n => grid[5][n] = new Cell("red"))

    // for (let i=0;i<10)

    // grid=grid.map( ()=>_.times(10, () => new Cell() ))

    // console.log(`\n${
    //     grid.map((r) => `|${r.map((c) => `${c.color.substr(0, 1)}`)}|\n`)}
    //     `)

    function printsGrid() {
        return `\n${
            grid.map((r) => `|${r.map((c) => `${c.color.substr(0, 1)}`)}|\n`)}
                `
    }

    function printsGridBasic() {
        return grid.map((r) => r.map((c) => `${c.color.substr(0, 1)}`))
    }

    function posToIdx(pt: Point2D): IdxPair {
        return { i: Math.floor(pt.y / Cell.CELL_WIDTH), j: Math.floor(pt.x / Cell.CELL_WIDTH) }
    }

    function idXToPos(pt: IdxPair): Point2D {
        return { x: pt.j * Cell.CELL_WIDTH, y: pt.i * Cell.CELL_WIDTH }
    }


    function renderGrid(ctx: CanvasRenderingContext2D) {
        // ctx.clearRect(0, 0, 400, 400)
        // ctx.fillStyle = "#000000";

        grid.forEach((r, i) => {
            r.forEach((c, j) => {
                ctx.fillStyle = c.color;
                ctx.fillRect(Cell.CELL_WIDTH * j, Cell.CELL_WIDTH * i, Cell.CELL_WIDTH - 1, Cell.CELL_WIDTH - 1);

            })

        })

    }


    console.log(printsGrid())

    // alert(grid)

    let objs: Array<{ x: number, y: number }> = [] //{x:3,y:1}
    // let enems = [] //{x:3,y:1, dir: 1}

    let controlKeys = { up: false, right: false, down: false, left: false, }

    let player: Point2D = idXToPos({ i: 1, j: 1 });
    const PLAYER_SPEED = 3


    // let player: Point2D = { x: 100, y: 100 }
    let gunHeat = 0

    var canv: HTMLCanvasElement = document.getElementById("myCanvas") as HTMLCanvasElement;

    var ctx = canv.getContext("2d");
    // ctx.beginPath();
    // ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    // ctx.stroke();

    // let lastClientX = 0
    // let lastClientY = 0


    function checkMoveIsLegal(nextPos: Point2D) {
        let { i, j } = posToIdx(nextPos)

        // return
        if(i>=0&&j>=0&&i<grid.length&&j<grid[i].length) {
            return grid[i][j].color === "red" //else it means collision
        }
        else {
            return false;
        }
    }

    $(window).keydown(checkKeyDown)
    $(window).keyup(checkKeyUp)
    // canv.addEventListener('keydown',check,false)
    function checkKeyDown(e) {
        let isARelevantKey = false;
        var code = e.keyCode;

        switch (code) {
            case 37: controlKeys.left = true; isARelevantKey=true; break; //Left key
            case 38: controlKeys.up = true; isARelevantKey=true; break; //Up key
            case 39: controlKeys.right = true; isARelevantKey=true; break; //Right key
            case 40: controlKeys.down = true; isARelevantKey=true; break; //Down key
        }


        // switch (code) {
        //     case 37: player.x-=PLAYER_SPEED; break; //Left key
        //     case 38: player.y-=PLAYER_SPEED; break; //Up key
        //     case 39: player.x+=PLAYER_SPEED; break; //Right key
        //     case 40: player.y+=PLAYER_SPEED; break; //Down key
        //     default: isARelevantKey=false // alert(code); //Everything else
        // }

        if (isARelevantKey) {
            e.preventDefault()
        }
    }

    function checkKeyUp(e) {
        let isARelevantKey = false;
        var code = e.keyCode;

        switch (code) {
            case 37: controlKeys.left = false; isARelevantKey=true; break; //Left key
            case 38: controlKeys.up = false; isARelevantKey=true; break; //Up key
            case 39: controlKeys.right = false; isARelevantKey=true; break; //Right key
            case 40: controlKeys.down = false; isARelevantKey=true; break; //Down key
        }

        if (isARelevantKey) {
            e.preventDefault()
        }
    }

    canv.addEventListener('mousemove', function (evt) {

        // player = getMousePosition(canv, evt)
        // player = getMousePosition(canv, evt)

        // ctx.fillStyle = "#FF0000";
        // ctx.clearRect(lastClientX - 10, lastClientY - 70, 10, 10);
        // ctx.fillRect(evt.clientX - 10, evt.clientY - 70, 10, 10);
        // lastClientX = evt.clientX
        // lastClientY = evt.clientY

        // console.log(evt.clientX + ',' + evt.clientY);
        // alert(evt.clientX + ',' + evt.clientY);
        renderCanv()


    }, false);

    canv.addEventListener('click', function (evt) {
        console.log("fire")

        let mousePos = getMousePosition(canv, evt)
        let { i, j } = posToIdx(mousePos)

        grid[i][j] = grid[i][j].color == "brown" ? new Cell("red") : new Cell("brown");
        // grid[i][j]=new Cell("red");


        objs.push(getMousePosition(canv, evt))

        // ctx.clearRect(lastClientX-10, lastClientY - 70, 10, 10);
        // ctx.fillRect(evt.clientX-10, evt.clientY - 70, 10, 10);
        // lastClientX = evt.clientX
        // lastClientY = evt.clientY

        renderCanv()

    }, false);

    let renderCanv = () => {
        ctx.clearRect(0, 0, 400, 400)

        renderGrid(ctx)

        ctx.fillStyle = "#000000";

        objs.forEach(o => {
            ctx.fillRect(o.x - 10, o.y - 10, 5, 5);
            // debugger
        }
        )

        ctx.fillStyle = "#0000FF";

        // enems.forEach(o => {
        //     ctx.fillRect(o.x + 10 + 3, o.y + 50, 20, 10);
        //     // debugger
        // }
        // )


        //render player
        ctx.fillStyle = "#FFFF00";
        ctx.fillRect(player.x-5, player.y-5, 10, 10);


    }

    // renderCanv()

    let nextTurn = () => {
        console.log(controlKeys)

        // if (Math.random() < .1) {

        //     enems.push({ x: 3 + Math.random() * 400, y: 10, dir: 1 })
        //     // debugger
        // }

        let playerDelta: Point2D = { x: 0, y: 0 }

        if (controlKeys.left) playerDelta.x += -PLAYER_SPEED;
        if (controlKeys.up) playerDelta.y += -PLAYER_SPEED;
        if (controlKeys.right) playerDelta.x += +PLAYER_SPEED;
        if (controlKeys.down) playerDelta.y += +PLAYER_SPEED;

        let nextPos = { x: player.x + playerDelta.x, y: player.y + playerDelta.y }
        // if (checkMoveIsLegal(nextPos)) {
        //     player = nextPos
        // }

        //splitting this achieves frictionless surface sliding
        if (checkMoveIsLegal({x:nextPos.x,y:player.y})) { //check new x
            player.x = nextPos.x
        }

        if (checkMoveIsLegal({x:player.x,y:nextPos.y})) { //check new y
            player.y = nextPos.y
        }



        objs.forEach((o, i) => {
            o.y -= 10;
            if (o.y < 0) { //delete bullet if it's off screen
                // debugger
                objs.splice(i, 1)

            }
            // delete objs[i]
        })

        // enems.forEach((o, i) => {
        //     if (o.x >= 350 && o.dir == 1) {
        //         o.dir = -1
        //         o.y += 15
        //         // debugger
        //     }
        //     else if (o.x <= 0 && o.dir == -1) {
        //         o.dir = 1
        //         o.y += 15
        //     }



        //     o.x += 5 * o.dir;

        //     // if(o.x>400) { 
        //     //     enems.splice(i,1)

        //     // }
        // })


        renderCanv()

        setTimeout(() => {
            nextTurn()

        }
            ,
            15
        )
    }

    nextTurn()

})