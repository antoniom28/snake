let snake = document.querySelectorAll('.snake-body');
let maxW = document.getElementById('field').offsetWidth;
let maxH = document.getElementById('field').offsetHeight;

let snakePos = [];
let lose = false;
let goTop = 0;
let goLeft = 1;
let point = {top:300 , left: 300};
let movement;
let noClick = false;

function spawnPoint(){
    let boxPoint = document.getElementById('box-point');
    boxPoint.style.left = `${point.left}px`;
    boxPoint.style.top = `${point.top}px`;
}

function startGame(){
    window.addEventListener('keypress' , ()=>{
        if(!noClick){
            switch(event.key){
                case 'w':
                    if(goTop == 0){
                        lose = false; 
                        goTop = -1; 
                        goLeft = 0; 
                    }        
                break;
                case 's':
                    if(goTop == 0){
                        lose = false; 
                        goTop = 1; 
                        goLeft = 0;  
                    }       
                break;
                case 'a':
                    if(goLeft == 0){
                        lose = false; 
                        goTop = 0; 
                        goLeft = -1; 
                    }        
                break;
                case 'd':
                    if(goLeft == 0){
                        lose = false; 
                        goTop = 0; 
                        goLeft = 1; 
                    }        
                break;
                case ' ':
                    lose = !lose;       
                break;
                case 'Space':
                    lose = false;       
                break;
            }
            noClick = true;
        }
    });

    document.getElementById('field').style.display = "block";
    document.getElementById('how-to-play').style.display = "none";

    spawnPoint();

    movement = setInterval(() => {    
        if(lose == false)
            snakeMove();
    }, 150);

    snake.forEach((body,i) => {
      snakePos.push( {left : 30*i , top : 300} );
    });
    updateSnake();
}

function updateSnake(head){
    noClick = false;
    maxW = document.getElementById('field').offsetWidth;
    maxH = document.getElementById('field').offsetHeight;
    if(head)
        if(head.top >= maxH || head.top < 0 || head.left >= maxW || head.left < 0){
            lose = true;
            effectForLose();
            return;
        }

    snake = document.querySelectorAll('.snake-body');
    snake.forEach((body,i) => {
        body.style.left = `${snakePos[i].left}px`;
        body.style.top = `${snakePos[i].top}px`;
        body.id = "";
     });

     snake[snake.length - 1].id = "head";
}

function effectForLose(){
    clearInterval(movement);
    snake.forEach((item,index) => {
        setTimeout(() => {
            item.style.transition="all 300ms linear";
            item.style.transform="scale(0)";
        }, 150*index);
    });
    setTimeout(() => {
        document.getElementById('snake-box').innerHTML = "";
        document.getElementById('lose-box').style.display = "flex";
    }, 150*snake.length);
}

let touchPoint = false;

function snakeMove(){
    let field = document.getElementById('snake-box');
    let head = snakePos[snakePos.length - 1];

    for(let i=0; i<snakePos.length; i++){
        if(i != snakePos.length - 1)
            if(head.top == snakePos[i].top && head.left == snakePos[i].left){
                lose = true;
                effectForLose();
                return;
            }
    }

    if(head.top == point.top && head.left == point.left){
        touchPoint = true;
        let rand = Math.floor(Math.random()*20);
        let rand2 = Math.floor(Math.random()*20);

        point = {top:30*rand , left: 30*rand2};
        spawnPoint();
    }

    if(touchPoint){
        let score = document.getElementById('score');
        score.innerHTML =parseInt(score.innerHTML) + 1;
        let newPart = document.createElement('div');
        newPart.className = `snake-body body-${snake.length}`;
        newPart.style.left = `${head.left}px`;
        newPart.style.top = `${head.top}px`;
        field.append(newPart);
        touchPoint = false;

        snakePos.push( {
            left : head.left , 
            top : head.top , 
        } );
    }

  setTimeout(() => {
    for(let i=0 , j=1; j<snakePos.length; i++ , j++){
        snakePos[i].left = snakePos[j].left;
        snakePos[i].top = snakePos[j].top;
    }

    snakePos[snakePos.length - 1].left += 30*goLeft;
    snakePos[snakePos.length - 1].top += 30*goTop;

    updateSnake(head);
  }, 0);
}