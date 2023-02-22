
const book = document.getElementById("book");
const endCover = document.getElementById("book-cover-end");

let pageNum = 2;
let deg=0;

function createBookPage(){

    if (pageNum != 100){
        console.log(pageNum);
        let newPage = document.createElement("div");
        newPage.style.transform =`translateZ(-${pageNum}px)`;
        newPage.style.borderBottom = "1px solid rgb(0,0,0,0.1)"
        
        newPage.classList.add("book-page");
        endCover.insertAdjacentElement("beforebegin",newPage);
        pageNum+=2;
    } else{
        clearInterval(intervalPage);
    }
}

function onBookClick(){
    console.log(deg);
    deg+=90;
    book.style.transform = `rotateY(${deg}deg) rotateX(30deg)`
}

const intervalPage = setInterval(createBookPage);


book.addEventListener("click",onBookClick);