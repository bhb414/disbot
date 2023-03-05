const main = document.getElementById("main");
const fileGroup = document.getElementById("file-group");

let selectFileDiv;

let isFileGroupClick = false;

let isCreate = true;
let fileDivList;
let createNum = 24;
let zIndexNumRight = 24;
let zIndexNumLeft = 0;

let start_x, move_X, end_x;



function createFileDiv(num,isFirst){

    for(i=0; i<num;i++){
        let colorCode = "#" + Math.floor(Math.random() * 16777215).toString(16);

        const fileDiv = document.createElement("div");
        const fileTag = document.createElement("div");
        const file = document.createElement("div");
        // const fileTagName = document.createElement("div");

        

        fileDiv.classList.add("fileDiv");
        if(i<12 && isCreate){
            fileDiv.classList.add("not-check-file-left");
            fileDiv.style.zIndex = `1`;
            zIndexNumLeft++;
        } else if(isCreate){
            fileDiv.classList.add("not-check-file-right");
            fileDiv.style.zIndex = `${-i}`;
        } else if(!isFirst){
            fileDiv.classList.add("not-check-file-right");
            
        } else{
            fileDiv.classList.add("not-check-file-left");
        }

        
        fileTag.classList.add("fileTag")
        file.classList.add("file");

        file.style.backgroundColor = colorCode;
        fileTag.style.backgroundColor = colorCode;

        if(isCreate){
            fileDiv.style.left=`${i*20}px`;
        } else if(!isFirst){
            fileDiv.style.left=`${(createNum-1)*20}px`;
            fileDiv.style.zIndex = `-${zIndexNumRight*2}`;
            zIndexNumRight++;
        } else{
            fileDiv.style.left=0;
            fileDiv.style.zIndex = `-${1}`;
        }

        // fileTag.appendChild(fileTagName);
        fileDiv.appendChild(fileTag);
        fileDiv.appendChild(file);
        if(isFirst){
            fileGroup.prepend(fileDiv);
        } else{
            fileGroup.appendChild(fileDiv);
        }
    }

    if(isCreate){
        fileDivList = document.querySelectorAll(".fileDiv");
        fileDivList[11].classList.add("check-file");
    }

    isCreate=false;

    

    


}


function onFileGroupRight(){
    fileDivList = document.querySelectorAll(".fileDiv");
    fileDivList[0].style.opacity="0";

    fileDivList[11].classList.remove("check-file")
    fileDivList[11].classList.add("not-check-file-left");
    fileDivList[11].style.zIndex="1";

    fileDivList[12].classList.remove("not-check-file-right");
    fileDivList[12].classList.add("check-file");

    for(i=1; i<fileDivList.length;i++){
        fileDivList[i].style.left=`${i*20-20}px`;
    }

    for(let i=12;i<fileDivList.length;i++){
        fileDivList[i].style.zIndex=`-${i*2}`;
    }
    
    createFileDiv(1,false);
    fileDivList[0].remove();

}

function onFileGroupLeft(){
    fileDivList = document.querySelectorAll(".fileDiv");
    fileDivList[createNum-1].style.opacity="0";

    for(let i=11;i<fileDivList.length;i++){
        fileDivList[i].style.zIndex=`-${i*2}`;
    }

    fileDivList[11].classList.remove("check-file")
    fileDivList[11].classList.add("not-check-file-right");
    
    fileDivList[10].classList.remove("not-check-file-left");
    fileDivList[10].classList.add("check-file");
    
    

    for(i=0; i<fileDivList.length;i++){
        fileDivList[i].style.left=`${i*20+20}px`;
    }
    

    fileDivList[createNum-1].remove();
    createFileDiv(1,true);

}

function fileSelectOn(){
    fileDivList = document.querySelectorAll(".fileDiv");
    selectFileDiv = fileDivList[11];
    selectFileDiv.classList.remove("check-file");
    selectFileDiv.classList.add("select-file");
    isFileGroupClick=true;
}

function fileSelectOff(){
    selectFileDiv.classList.remove("select-file");
    selectFileDiv.classList.add("check-file");
    isFileGroupClick=false;
}

function onFileGroupClick(){
    if(!isFileGroupClick){
        fileSelectOn();
    } else{
        fileSelectOff();
    }
}


fileGroup.addEventListener("click",onFileGroupClick);


fileGroup.addEventListener("wheel",function (e){
    if(isFileGroupClick){
        fileSelectOff();
    }

    if (e.deltaY >0){
        onFileGroupRight();
    } else{
        onFileGroupLeft();
    }
})

function touch_start(event) {
    start_x = event.touches[0].pageX
  }

function touch_move(event) {
    bodyScrollDisable();
    move_x = event.changedTouches[0].pageX;
    if(start_x > move_x){
      onFileGroupRight();
    }else{
      onFileGroupLeft();
    }
}
  
 
function touch_end(event) {
    setTimeout(bodyScrollAble,1000);
}


function bodyScrollDisable(){
    document.body.style.overflow = "hidden";
}

function bodyScrollAble(){
    document.body.style.overflow = "auto";
}

fileGroup.addEventListener('touchstart', touch_start);
fileGroup.addEventListener('touchmove', touch_move);
fileGroup.addEventListener('touchend', touch_end);

createFileDiv(createNum);
