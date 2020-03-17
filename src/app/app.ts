import './vendor';
import $ from 'jquery';
import _ from 'lodash';
import { countChanges } from 'jest-diff/build/printDiffs';

const a = 1;
// c onsole.log($, '');


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
    //c onsole.log("Coordinate x: " + x,
    // "Coordinate y: " + y);
    return { x, y }
}

$(function () {


    class Cell {
        static readonly CELL_WIDTH: number = 80
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
            () => new Cell("red")))


    // grid[4][6] = new Cell("red")
    // grid[4][6]=new Cell("red")
    // debugger
    // grid[4][6] = new Cell("white")

    // _.range(0, 7).map(n => grid[1][n] = new Cell("red"))

    // _.range(1, 5).map(n => grid[n][1] = new Cell("red"))
    // _.range(1, 5).map(n => grid[n][6] = new Cell("red"))

    // _.range(1, 4).map(n => grid[5][n] = new Cell("red"))


    /*
    let protoMap =
        [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
        [1, 0, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ]
    grid = protoMap.map((r) => r.map(c => c == 0 ? new Cell("red") : new Cell()))
    */



    // for (let i=0;i<10)

    // grid=grid.map( ()=>_.times(10, () => new Cell() ))

    // c onsole.log(`\n${
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

    function areAllValsFalse(myMap: Object) {
        _.values(myMap).forEach((val) => { if (val) return false })
        return true
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


    function renderCenteredRect(ctrPt: Point2D, radiusWidth: number, ctx: CanvasRenderingContext2D) {
        // ctx.clearRect(0, 0, 400, 400)
        // ctx.fillStyle = "#000000";
        // ctx.fillRect(ctrPt.x,ctrPt.x,ctrPt.x,ctrPt.x)
        ctx.fillRect(ctrPt.x - radiusWidth, ctrPt.y - radiusWidth, 2 * radiusWidth, 2 * radiusWidth);
    }


    //c onsole.log(printsGrid())

    // alert(grid)

    let objs: Array<{ x: number, y: number }> = [] //{x:3,y:1}
    // let enems = [] //{x:3,y:1, dir: 1}

    let controlKeys = { up: false, right: false, down: false, left: false, }

    let player: Point2D = idXToPos({ i: 1, j: 1 });
    let anchorPt: Point2D = { x: 0, y: 0 }
    let isMouseDown = false;

    let tension = 0;
    let powerCharge = 0;
    const PLAYER_SPEED = 2

    let playerVel: Point2D = { x: 3, y: 3 }



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
        if (i >= 0 && j >= 0 && i < grid.length && j < grid[i].length) {
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
        // if(code==38)
        //  alert("extraup")

        //  switch (code) {
        //     case 37: controlKeys.left = true; isARelevantKey=true; break; //Left key
        //     case 38: controlKeys.up = true; isARelevantKey=true; break; //Up key
        //     case 39: controlKeys.right = true; isARelevantKey=true; break; //Right key
        //     case 40: controlKeys.down = true; isARelevantKey=true; break; //Down key
        // }

        if (code == 37) { controlKeys.left = true; isARelevantKey = true; } //Left key
        if (code == 38) { controlKeys.up = true; isARelevantKey = true; } //Up key
        if (code == 39) { controlKeys.right = true; isARelevantKey = true; } //Right key
        if (code == 40) { controlKeys.down = true; isARelevantKey = true; } //Down key



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

        if (code == 37) { controlKeys.left = false; isARelevantKey = true; } //Left key
        if (code == 38) { controlKeys.up = false; isARelevantKey = true; } //Up key
        if (code == 39) { controlKeys.right = false; isARelevantKey = true; } //Right key
        if (code == 40) { controlKeys.down = false; isARelevantKey = true; } //Down key

        if (isARelevantKey) {
            e.preventDefault()
        }
    }

    canv.addEventListener('mousemove', function (evt) {


        anchorPt = getMousePosition(canv, evt)
        // player = getMousePosition(canv, evt)
        // player = getMousePosition(canv, evt)

        // ctx.fillStyle = "#FF0000";
        // ctx.clearRect(lastClientX - 10, lastClientY - 70, 10, 10);
        // ctx.fillRect(evt.clientX - 10, evt.clientY - 70, 10, 10);
        // lastClientX = evt.clientX
        // lastClientY = evt.clientY

        // c onsole.log(evt.clientX + ',' + evt.clientY);
        // alert(evt.clientX + ',' + evt.clientY);
        renderCanv()


    }, false);

    window.addEventListener('mousedown', function (evt) {
        isMouseDown = true
    })
    window.addEventListener('mouseup', function (evt) {
        isMouseDown = false
    })

    canv.addEventListener('click', function (evt) {
        //c onsole.log("fire")

        let mousePos = getMousePosition(canv, evt)
        let { i, j } = posToIdx(mousePos)

        /*
        grid[i][j] = grid[i][j].color == "brown" ? new Cell("red") : new Cell("brown");
        */

        // grid[i][j]=new Cell("red");


        /* objs.push(getMousePosition(canv, evt)) */



        // ctx.clearRect(lastClientX-10, lastClientY - 70, 10, 10);
        // ctx.fillRect(evt.clientX-10, evt.clientY - 70, 10, 10);
        // lastClientX = evt.clientX
        // lastClientY = evt.clientY

        renderCanv()

    }, false);

    let renderCanv = () => {
        ctx.clearRect(0, 0, 1000, 1000)

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
        ctx.fillRect(player.x - 5 - powerCharge / 10 / 2, player.y - 5 - powerCharge / 10 / 2, 10 + powerCharge / 10, 10 + powerCharge / 10);

        //render anchor point
        if (isMouseDown && anchorPt !== null) {
            ctx.fillStyle = "#00AA00";
            renderCenteredRect(anchorPt, 10, ctx);



            // draw line
            ctx.strokeStyle = "#000";

            ctx.beginPath();
            ctx.moveTo(anchorPt.x, anchorPt.y);
            ctx.lineTo(player.x, player.y);
            ctx.stroke();

        }
    }

    // renderCanv()

    let nextTurn = () => {

        renderCanv()

        // if (Math.random() < .1) {

        //     enems.push({ x: 3 + Math.random() * 400, y: 10, dir: 1 })
        //     // debugger
        // }

        let playerDesiredDelta: Point2D = { x: 0, y: 0 }


        playerDesiredDelta.x = playerVel.x
        playerDesiredDelta.y = playerVel.y


        if (Math.abs(playerVel.x) < 50) {
            if (!controlKeys.left && !controlKeys.right) {


            }
            else {

                if (controlKeys.left) playerDesiredDelta.x += -(PLAYER_SPEED + powerCharge / 10);
                if (controlKeys.right) playerDesiredDelta.x += +(PLAYER_SPEED + powerCharge / 10);
            }
        }

        if (Math.abs(playerVel.y) < 50) {

            if (!controlKeys.up && !controlKeys.down) { }
            else {
                if (controlKeys.up) playerDesiredDelta.y += -(PLAYER_SPEED + powerCharge / 10);
                if (controlKeys.down) playerDesiredDelta.y += +(PLAYER_SPEED + powerCharge / 10);

            }
        }


        // c onsole.log(playerVel)
        // console.log(playerDesiredDelta)


        powerCharge -= .5 //cooldown rate
        powerCharge = Math.max(powerCharge, 0);

        tension = 0
        if (controlKeys.left && controlKeys.right)
            tension += 1
        if (controlKeys.up && controlKeys.down)
            tension += 1




        let ptDist = (p1: Point2D, p2: Point2D): number => {
            return Math.hypot(p2.x - p1.x, p2.y - p1.y)
        }

        let ptAtan2 = (p1: Point2D, p2: Point2D): number => {
            return Math.atan2(p2.y - p1.y, p2.x - p1.x)
        }

        let ptMinus = (p1: Point2D, p2: Point2D): Point2D => {
            return { x: p1.x - p2.x, y: p1.y - p2.y }
        }

        let ptPlus = (p1: Point2D, p2: Point2D): Point2D => {
            return { x: p2.x + p1.x, y: p2.y + p1.y }
        }

        let ptScalarMult = (scal: number, p: Point2D): Point2D => {
            return { x: (p.x * scal), y: p.y * scal }
        }

        let ptDotP = (p1: Point2D, p2: Point2D): number => {
            return p2.x * p1.x + p2.y * p1.y
        }

        let ptMag = (p: Point2D): number => {
            return Math.hypot(p.x, p.y)
        }

        let ptProjScal = (v: Point2D, base: Point2D): number => {
            return ptDotP(v, base) / ptMag(base)
        }

        let ptProj = (v: Point2D, base: Point2D): Point2D => {
            return ptScalarMult(ptProjScal(v, base), base)
        }

        let ptNormalized = (v: Point2D): Point2D => {
            return ptScalarMult(1 / ptMag(v), v)
        }



        // let nextPos = { x: player.x + playerDesiredDelta.x, y: player.y + playerDesiredDelta.y }
        let nextPos = ptPlus(player, playerDesiredDelta)

        // if (checkMoveIsLegal(nextPos)) {
        //     player = nextPos
        // }


        if (isMouseDown) {
            ctx.fillStyle = "#0000FF"
            // renderCenteredRect(nextPos, 2, ctx)


            let ropeLength = ptDist(anchorPt, player)
            let attemptedNewLength = ptDist(anchorPt, nextPos)
            // let lengthDelta = attemptedNewLength - ropeLength

            let ropeVect = ptMinus(player, anchorPt)
            let ropePerpVect = ptNormalized({ y: 1, x: 1 * ropeVect.y / ropeVect.x })

            ctx.fillStyle = "#00AAAA"
            renderCenteredRect(ptPlus(player, ptScalarMult(10, ropePerpVect)), 2, ctx)


            if (attemptedNewLength > ropeLength) {

                // let theta = ptAtan2(player, nextPos);

                //#todo projections

                // nextPos.r -= attemptedNewLength - ropeLength
                // nextPos.x -= lengthDelta * Math.cos(theta)
                // nextPos.y -= lengthDelta * Math.sin(theta)

                // console.log("p",player)
                // console.log("a",anchorPt)
                // console.log(ropeVect)
                // console.log(ropePerpVect)
                // console.log(ptProj(playerDesiredDelta, ropePerpVect))

                let newPlayerDesiredDelta = ptScalarMult(
                    ptMag(playerDesiredDelta),
                    ptNormalized(ptProj(playerDesiredDelta, ropePerpVect)))
                // let newPlayerDesiredDelta=ptProj(playerDesiredDelta,ropePerpVect)
                console.log(ptProj(playerDesiredDelta, ropePerpVect))

                playerDesiredDelta = newPlayerDesiredDelta

            }
            // player
            // nextPos = 
        }

        nextPos = ptPlus(player, playerDesiredDelta)


        //splitting this achieves frictionless surface sliding
        if (checkMoveIsLegal({ x: nextPos.x, y: player.y })) { //check new x

            // if (powerCharge > 0 || allValsFalse(controlKeys))
            // if (powerCharge > 0 || allValsFalse(controlKeys))
            // playerVel.x = Math.max(0, nextPos.x - player.x)

            powerCharge -= Math.abs(playerDesiredDelta.x)
            player.x = nextPos.x


        }
        else {
            tension += 1
            playerVel.x *= -1
        }

        if (checkMoveIsLegal({ x: player.x, y: nextPos.y })) { //check new y
            // if (powerCharge > 0 || allValsFalse(controlKeys))
            // playerVel.y = Math.max(0, nextPos.y - player.y)

            powerCharge -= Math.abs(playerDesiredDelta.y)
            player.y = nextPos.y
        }
        else {
            tension += 1
            playerVel.y *= -1

        }

        const CHARGE_TENSION_MULTIPLIER = 3
        powerCharge += CHARGE_TENSION_MULTIPLIER * tension


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



        setTimeout(() => {
            nextTurn()

        }
            ,
            15
        )
    }

    nextTurn()

})