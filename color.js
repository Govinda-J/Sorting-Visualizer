var n=15;   var speed=300; 


let min='#FF0000';  let max='#0000FF';

var mincolor=Number(`0x${min}`); var maxcolor=Number(`0x${max}`);
let x=mincolor;

array=[];


init();

function inputSize(value){
    n = value; 
    array.length = n;        
   // console.log(n);
    init();
}
function inputSpeed(value){
    speed = value;         
   // console.log(n);
   // init();
}


function init(){
    for(let i=0; i<n; i++){
        array[i] = Math.random();
        //console.log(array[i])
    }
    moves=[];
    showBars();
}

function playBubble(){
    const copy=[...array];
    const moves = bubbleSort(copy);
    animate(moves, speed);
}

function bubbleSort(array){
    const moves=[];
    do{
        var swapped=false;
        for(let i=1; i<array.length; i++)
        {
            moves.push({indices:[i-1,i], type:"comp"});
            if(array[i-1] > array[i])
            {
                swapped = true;
                moves.push({indices:[i-1,i], type:"swap"});
                [array[i-1],array[i]] = [array[i],array[i-1]];
            }
        }
    }while(swapped)
    return moves;
}



//------------------------------------------

function coloring(x, addcolor){

    let currentColor = x;
    let hitmax = false;
    if(currentColor >= maxcolor)
        hitmax = true;
    if(currentColor <= mincolor)
        hitmax = false;
    if(hitmax&&currentColor-addcolor < mincolor){
        hitmax = false;
        currentColor = mincolor;
    }
    else if(!hitmax&&currentColor+addcolor > maxcolor){
        hitmax = true;
        currentColor = maxcolor;
    }

    hitmax ? currentColor-=addcolor : currentColor+=addcolor;

    return currentColor.toString(16);
}


function animate(moves, speed){
    if(moves.length==0){
        showBars();
        return;
    }

    const move = moves.shift();
    const [i,j] = move.indices;

    if(move.type=="swap"){
        [array[i], array[j]] = [array[j], array[i]];
    }
    
    showBars(move);
    setTimeout(function(){
        animate(moves, speed);
    },speed);
}

function showBars(move){
    container.innerHTML = "";
    for(let i=0; i<array.length; i++){
        const bar = document.createElement("div");
        bar.style.height = array[i]*100 + "%";

        
        const addcolor = (mincolor+maxcolor)/n;
       // let addcolor = (mincolor+maxcolor)/(n.toString(16));
       //bar.style.backgroundColor = '#'+ coloring(x, addcolor);
         
       x += addcolor;
        
        bar.classList.add("bar");
        if(move && move.indices.includes(i))
        {
            if(move.type=="insert")
                bar.style.backgroundColor="green";
            else{
                bar.style.backgroundColor=
                    move.type=="swap"?'#FF0000':'#0000FF';
            }
        }
        container.appendChild(bar);

    }
}


