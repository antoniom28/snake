let snake = document.querySelectorAll('.snake-body');
let snakePos = [];
let snakeTop = 0;
let snakeLeft = 0;
let gameStart = false;
let lose = false;
let goTop = 0;
let goLeft = 1;
let point = {top:300 , left: 300};


//startGame();

window.addEventListener('keydown' , ()=>{
    switch(event.key){
        case 'w':
            lose = false; 
            goTop = -1; 
            goLeft = 0;         
        break;
        case 's':
            lose = false; 
            goTop = 1; 
            goLeft = 0;         
        break;
        case 'a':
            lose = false; 
            goTop = 0; 
            goLeft = -1;         
        break;
        case 'd':
            lose = false; 
            goTop = 0; 
            goLeft = 1;         
        break;
        case ' ':
            lose = !lose;       
        break;
        case 'Space':
            lose = false;       
        break;
    }
});

function spawnPoint(){
    let boxPoint = document.getElementById('box-point');
    boxPoint.style.left = `${point.left}px`;
    boxPoint.style.top = `${point.top}px`;
}

function startGame(){
    document.getElementById('field').style.display = "block";
    document.getElementById('how-to-play').style.display = "none";

    spawnPoint();

    let movement = setInterval(() => {
        //if(lose == true)
            //clearInterval(movement);
    
        if(lose == false)
            snakeMove();
    }, 300);

    snake.forEach((body,i) => {
       //console.log(body,i);
      // body.style.top = `${50 * (i+1)}px`;
      snakePos.push( {left : 30*i , top : 300} );
    });
    updateSnake();
}

function updateSnake(){
    snake = document.querySelectorAll('.snake-body');
    snake.forEach((body,i) => {
        body.style.left = `${snakePos[i].left}px`;
        body.style.top = `${snakePos[i].top}px`;
        body.id = "";
     });

     snake[snake.length - 1].id = "head";
}

let touchPoint = false;

function snakeMove(){
    let field = document.getElementById('snake-box');
    let lastPos = 0;
    let head = snakePos[snakePos.length - 1];
    let tail = snakePos[0];

    console.log(head,point.left,point.top);

    if(head.top == point.top && head.left == point.left){
        console.log('OHOOHH TOCCATO');
        touchPoint = true;
        let rand = Math.floor(Math.random()*20);
        let rand2 = Math.floor(Math.random()*20);

        point = {top:30*rand , left: 30*rand2};
        spawnPoint();
    }

    if(touchPoint){
        let newPart = document.createElement('div');
        newPart.className = `snake-body body-${snake.length}`;
        newPart.style.left = `${head.left}px`;
        newPart.style.top = `${head.top}px`;
        field.append(newPart);
        touchPoint = false;

        snakePos.push( {
            left : head.left + 30*goLeft , 
            top : head.top + 30*goTop, 
        } );
    }

    
    

  setTimeout(() => {
    for(let i=0 , j=1; j<snakePos.length; i++ , j++){
        snakePos[i].left = snakePos[j].left;
        snakePos[i].top = snakePos[j].top;
    }

    snakePos[snakePos.length - 1].left += 30*goLeft;
    snakePos[snakePos.length - 1].top += 30*goTop;

    

   /* snakePos.forEach((pos,i) => {
        if(i == 0)
            lastPos = pos.left;
        pos.left += 30*goLeft;
        pos.top += 30*goTop;
     });*/
  //  head.style.left = `${}px`;

    //console.log(snakePos.length,head,tail);

        updateSnake();
  }, 50);
}