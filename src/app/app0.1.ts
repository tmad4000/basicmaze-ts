import './vendor';
import $ from 'jquery';

const a = 1;
console.log($, '');
console.log("hi test")


if (true) {
}

// alert(
//     document.getElementById("bootn").innerHTML)




// alert("hi")
// $ = document.querySelector

$(function () {

    let objs = [] //{x:3,y:1}
    let enems = [] //{x:3,y:1, dir: 1}


    let player = { x: 0, y: 0 }
    let gunHeat = 0

    var c: any = document.getElementById("myCanvas");
    
    var ctx = c.getContext("2d");
    // ctx.beginPath();
    // ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    // ctx.stroke();

    // let lastClientX = 0
    // let lastClientY = 0
    document.getElementById('myCanvas').addEventListener('mousemove', function (evt) {

        player = { x: evt.clientX, y: evt.clientY }
        // ctx.fillStyle = "#FF0000";
        // ctx.clearRect(lastClientX - 10, lastClientY - 70, 10, 10);
        // ctx.fillRect(evt.clientX - 10, evt.clientY - 70, 10, 10);
        // lastClientX = evt.clientX
        // lastClientY = evt.clientY

        // console.log(evt.clientX + ',' + evt.clientY);
        // alert(evt.clientX + ',' + evt.clientY);
        renderCanv()


    }, false);

    document.getElementById('myCanvas').addEventListener('click', function (evt) {
        console.log("fire")

        objs.push({ x: evt.clientX, y: evt.clientY })

        // ctx.clearRect(lastClientX-10, lastClientY - 70, 10, 10);
        // ctx.fillRect(evt.clientX-10, evt.clientY - 70, 10, 10);
        // lastClientX = evt.clientX
        // lastClientY = evt.clientY

        renderCanv()

    }, false);

    let renderCanv = () => {
        ctx.clearRect(0, 0, 400, 400)
        ctx.fillStyle = "#000000";

        objs.forEach(o => {
            ctx.fillRect(o.x - 10 + 3, o.y - 70, 5, 5);
            // debugger
        }
        )

        ctx.fillStyle = "#0000FF";

        enems.forEach(o => {
            ctx.fillRect(o.x + 10 + 3, o.y + 50, 20, 10);
            // debugger
        }
        )


        ctx.fillStyle = "#FF0000";
        ctx.fillRect(player.x - 10, player.y - 20, 10, 10);


    }

    renderCanv()

    let nextTurn = () => {


        if (Math.random() < .1) {

            enems.push({ x: 3 + Math.random() * 400, y: 10, dir: 1 })
            // debugger
        }

        objs.forEach((o, i) => {
            o.y -= 10;
            if (o.y < 100) {
                // debugger
                objs.splice(i, 1)

            }
            // delete objs[i]
        })

        enems.forEach((o, i) => {
            if (o.x >= 350 && o.dir == 1) {
                o.dir = -1
                o.y += 15
                // debugger
            }
            else if (o.x <= 0 && o.dir == -1) {
                o.dir = 1
                o.y += 15
            }



            o.x += 5 * o.dir;

            // if(o.x>400) { 
            //     enems.splice(i,1)

            // }
        })


        renderCanv()

        setTimeout(() => {
            nextTurn()

        }
            ,
            30
        )
    }

    nextTurn()

})