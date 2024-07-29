const LITERAS = {
    1:"a",
    2:"b",
    3:"c",
    4:"d",
    5:"e",
    6:"f",
    7:"g",
    8:"h",
}

const FIGURES = {
    PAWN:"",
    ROOK:"",
    KNIGHT:"",
    BISHOP:"",
    QUEEN:"",
    KING:"",
    EMPTY:"",
}
function ChessboardSquare(litera,number){
    this.litera = litera;
    this.number = number;
}
const chessFieldModel= {

}

let chessFieldHTML = "";

function createChessboard(){
    for(let i = 1; i <= 8; i++){
        for(let j = 1; j <= 8; j++){
            chessFieldHTML = chessFieldHTML+`<div id="${LITERAS[i]}${j}" class="сhessboard-square ${LITERAS[i]} ${j} ${(i+j)%2===0?"black-square":"white-square"}">${i},${j}</div>`;
            chessFieldModel[LITERAS[i]+''+j]= new ChessboardSquare(LITERAS[i],j);
        }
    }
    document.getElementsByClassName("сhessboard")[0].innerHTML = chessFieldHTML;
}
createChessboard();