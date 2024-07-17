var n=15;   var speed=99;
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

//-----------------------------Bubbling----------------------

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

//------------------------------Inserting------------------------

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

//-------------------------------Merging---------------------------

function playMerge(){
    const copy=[...array];
  //  moves = [];
    mergeSort(copy, 0, array.length-1);

    animate(moves, speed);
}

function mergeSort(array, p, r){
    if(p<r)
    {
        let q = Math.floor((p+r)/2);        

        //console.log("merge: p= ",p," q= ",q," r= ",r);

        moves.push({indices:[p,q], type:"leftblock"});
        moves.push({indices:[q+1,r], type:"rightblock"});

        mergeSort(array,p,q);
        mergeSort(array,q+1,r);
        merge(array,p,q,r);

        moves.push({indices:[p,r], type:"over"});
    }
}

function merge(array, p, q, r){
    let n1 = q-p+1;
    let n2 = r-q;                let x=0;

    let L = []; let R = [];
    for(let i=0; i<n1; i++)
        L.push(array[p+i]);
    L[n1] = 5000;
    for(let j=0; j<n2; j++)
        R.push(array[q+j+1]);
    R[n2] = 5000;

    let i=0; let j=0;
    for(let k=p; k<=r; k++)
    {
        let a = i;  let b = j;
        if(L[i]<=R[j]){
           // [a,b]=[b,a];
            moves.push({indices:[k,p+i+x], type:"move"});
            x+=1;
            array[k] = L[i];  //j=i;
            i++;  a=j;
           // moves.push({indices:[k,p+i], type:"move"});
        }
        else{
            //[a,b]=[b,a];
            moves.push({indices:[k,q+j+1+x], type:"move"});
            x+=1;
            array[k] = R[j];  //i = j;
            j++;  b=i;
           // moves.push({indices:[k,p+i], type:"move"});
        }
    }
}


//--------------------------Animating Moves----------------------

function animate(moves, speed){
    if(moves.length==0){
        showBars();
        return;
    }
    let move = moves.shift();
    const [i,j] = move.indices;

    if(move.type=="swap"){
        [array[i], array[j]] = [array[j], array[i]];  
    }
    if(move.type=="move"){
       // [array[i], array[j]] = [array[j], array[i]];  
       // insertSort(copy);
        for(let p=j; p > i; p--){
            moves.unshift({indices:[p,p-1], type:"swap"});
        }
    }

    if(move.type=="leftblock" || move.type=="rightblock" || move.type=="over"){
        //move = [];
        delete move.indices;
        move.indices = [];
        for(let k=i; k<=j; k++)
            move.indices.push(k);
        showBars(move);
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
        if(move && move.indices.includes(i)){
            if(move.type=="leftblock")
                bar.style.backgroundColor="orange";
            if(move.type=="rightblock")
                bar.style.backgroundColor="blue";
            if(move.type=="over")
                bar.style.backgroundColor="yellow";
            if(move.type=="swap")
                bar.style.backgroundColor="red";
            if(move.type=="move")
                bar.style.backgroundColor="red";
            if(move.type=="insert")
                bar.style.backgroundColor="green";
            if(move.type=="comp")
                bar.style.backgroundColor="blue";

        }
        container.appendChild(bar);

    }
}

//-------------------------------The End-------------------------
