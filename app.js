
const book = document.getElementById("book");
const endCover = document.getElementById("book-cover-end");

let pageNum = 2;
let deg=0;


function onBookClick(){
    console.log(deg);
    deg+=90;
    book.style.transform = `rotateY(${deg}deg) rotateX(30deg)`
}




book.addEventListener("click",onBookClick);
