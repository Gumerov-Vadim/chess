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
    PAWN:"pawn",
    ROOK:"rook",
    KNIGHT:"knight",
    BISHOP:"bishop",
    QUEEN:"queen",
    KING:"king",
    EMPTY:"empty",
}

const FIGURES_IMAGES_SRC = {
    BLACK: {
    BLACK_PAWN:"./images/black_pawn.png",
    BLACK_ROOK:"./images/black_rook.png",
    BLACK_KNIGHT:"./images/black_knight.png",
    BLACK_BISHOP:"./images/black_bishop.png",
    BLACK_QUEEN:"./images/black_queen.png",
    BLACK_KING:"./images/black_king.png",
        },
    WHITE: {
    WHITE_PAWN:"./images/white_pawn.png",
    WHITE_ROOK:"./images/white_rook.png",
    WHITE_KNIGHT:"./images/white_knight.png",
    WHITE_BISHOP:"./images/white_bishop.png",
    WHITE_QUEEN:"./images/white_queen.png",
    WHITE_KING:"./images/white_king.png",
        },
}

const COLORS = {
    BLACK: "black",
    WHITE: "white",
}

function Pawn(color){
    this.name = FIGURES.PAWN;
    this.color = color;
    
    if(color === COLORS.BLACK){
        this.image_src = FIGURES_IMAGES_SRC.BLACK.BLACK_PAWN;
    } else {
        this.image_src = FIGURES_IMAGES_SRC.WHITE.WHITE_PAWN;
    }
}
function Rook(color){
    this.name = FIGURES.ROOK;
    this.color = color;
    
    if(color === COLORS.BLACK){
        this.image_src = FIGURES_IMAGES_SRC.BLACK.BLACK_ROOK;
    } else {
        this.image_src = FIGURES_IMAGES_SRC.WHITE.WHITE_ROOK;
    }
}
function Bishop(color){
    this.name = FIGURES.PAWN;
    this.color = color;
    
    if(color === COLORS.BLACK){
        this.image_src = FIGURES_IMAGES_SRC.BLACK.BLACK_BISHOP;
    } else {
        this.image_src = FIGURES_IMAGES_SRC.WHITE.WHITE_BISHOP;
    }
}
function Knight(color){
    this.name = FIGURES.PAWN;
    this.color = color;
    
    if(color === COLORS.BLACK){
        this.image_src = FIGURES_IMAGES_SRC.BLACK.BLACK_KNIGHT;
    } else {
        this.image_src = FIGURES_IMAGES_SRC.WHITE.WHITE_KNIGHT;
    }
}

function ChessboardSquare(litera,number){
    this.litera = litera;
    this.number = number;
    this.figure = {};
    
    switch(litera){
        case "b":
            this.figure = FIGURES.WHITE_PAWN;
            break;
        case "g":
            this.figure = FIGURES.BLACK_PAWN;
            break;
        case "a":
            switch(number){
                case 1:
                case 8:
                    this.figure = FIGURES.WHITE_ROOK;
                    break;
                case 2:
                case 7:
                    this.figure = FIGURES.WHITE_KNIGHT;
                    break;
                case 3:
                case 6:
                    this.figure = FIGURES.WHITE_BISHOP;
                    break;
                case 4:
                    this.figure = FIGURES.WHITE_KING;
                    break;
                case 5:
                    this.figure = FIGURES.WHITE_QUEEN;
                    break;
            }
            break;
        case "g":
            switch(number){
                case 1:
                case 8:
                    this.figure = FIGURES.BLACK_ROOK;
                    break;
                case 2:
                case 7:
                    this.figure = FIGURES.BLACK_KNIGHT;
                    break;
                case 3:
                case 6:
                    this.figure = FIGURES.BLACK_BISHOP;
                    break;
                case 4:
                    this.figure = FIGURES.BLACK_KING;
                    break;
                case 5:
                    this.figure = FIGURES.BLACK_QUEEN;
                    break;
            }
            break;
    }
    //to do
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