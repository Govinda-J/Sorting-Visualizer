var n=15;   var speed=36;
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

//-------------Bubbling-------------------------

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

//----------------Inserting--------------------------

function playInsert(){
    const copy=[...array];
    const moves = insertionSort(copy);
    animate(moves, speed);
}

function insertionSort(array){
    const moves=[];
    
    let i, key, j;
    for(i=1; i<array.length; i++){
        key = array[i];
        j = i-1;

        while(j >= 0 && array[j]>key){
            moves.push({indices:[i,j], type:"comp"});
            moves.push({indices:[j,j+1], type:"swap"});

            array[j+1] = array[j];
            j = j-1;
        }
        moves.push({indices:[j+1,i], type:"insert"});
        array[j+1] = key;
    }
    return moves;

}

//----------------------Animating Moves-----------------------

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
        
        bar.classList.add("bar");
        if(move && move.indices.includes(i))
        {
            if(move.type=="insert")
                bar.style.backgroundColor="green";
            else{
                bar.style.backgroundColor=
                    move.type=="swap"?"red":"blue";
            }
        }
        container.appendChild(bar);

    }
}

