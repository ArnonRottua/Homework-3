let n = [];
let c = 0;
let cc= 9;

let submit = document.querySelector('.guessSubmit');
let num = document.querySelector('.blank');
let ans = Math.ceil((Math.random()*100)+1);
let first = document.querySelector('.guess');
let last = document.querySelector('.preResult');
let con = document.querySelector('.lowHi');
let counter = document.querySelector('.chance');
let replace;

console.log(ans);

submit.addEventListener('click',function(){
    last.style.width='300px';
    let a = Number(num.value);
    if(a===ans){
        console.log("Correct");
        last.textContent='Correct!!!';
        last.style.backgroundColor='orange';
        gameOver();  
    }
    else{
        n.push(a);
        console.log(n[c]);
        num.value='';
        num.focus();
        if(c===0){
            first.textContent='Previous guesses: ';
            counter.textContent='Chance left: '+String(cc);
        }
        if(n[c]>ans){
            if(cc===0){
                last.textContent='Try Again. '+'Answer is '+String(ans);
                last.style.backgroundColor='pink';
                counter.textContent='Chance left: '+String(cc);
                gameOver();
            }
            else{
            last.textContent='Must be lower';
            last.style.backgroundColor='yellow';
            counter.textContent='Chance left: '+String(cc);
            }
        }
        if(n[c]<ans){
            if(cc===0){
                last.textContent='Try Again. '+'Answer is '+ String(ans);
                last.style.backgroundColor='pink';
                counter.textContent='Chance left: '+String(cc);
                gameOver();
            }
            else{
            last.textContent='Must be higher';
            last.style.backgroundColor='red';
            counter.textContent='Chance left: '+String(cc);
            }
        }
        first.textContent+=' '+String(n[c]);
        c++;
        cc--;   
    }
});

function gameOver(){
    submit.disabled = true;
    num.disabled = true;
    replace = document.querySelector('.popup');
    rebutton = document.createElement('button');
    rebutton.textContent='New Game';
    replace.appendChild(rebutton);
    rebutton.addEventListener('click',setOver);
}

function setOver(){

    submit.disabled = false;
    num.disabled = false;
    rebutton.parentNode.removeChild(rebutton);

    let reall = document.querySelectorAll('.result p')
    for(let i =0 ;i<reall.length;i++){
        reall[i].textContent='';
    }

    num.value='';
    num.focus();
    last.style.backgroundColor='white';
    n=[];
    c=0;
    cc=9;
    ans = Math.floor((Math.random()*100)+1);
    console.log(ans);
}

