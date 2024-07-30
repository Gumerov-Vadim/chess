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

function Empty(){
    this.name = FIGURES.EMPTY;
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
function Knight(color){
    this.name = FIGURES.KNIGHT;
    this.color = color;
    
    if(color === COLORS.BLACK){
        this.image_src = FIGURES_IMAGES_SRC.BLACK.BLACK_KNIGHT;
    } else {
        this.image_src = FIGURES_IMAGES_SRC.WHITE.WHITE_KNIGHT;
    }
}
function Bishop(color){
    this.name = FIGURES.BISHOP;
    this.color = color;
    
    if(color === COLORS.BLACK){
        this.image_src = FIGURES_IMAGES_SRC.BLACK.BLACK_BISHOP;
    } else {
        this.image_src = FIGURES_IMAGES_SRC.WHITE.WHITE_BISHOP;
    }
}
function King(color){
    this.name = FIGURES.KING;
    this.color = color;
    
    if(color === COLORS.BLACK){
        this.image_src = FIGURES_IMAGES_SRC.BLACK.BLACK_KING;
    } else {
        this.image_src = FIGURES_IMAGES_SRC.WHITE.WHITE_KING;
    }
}
function Queen(color){
    this.name = FIGURES.QUEEN;
    this.color = color;
    
    if(color === COLORS.BLACK){
        this.image_src = FIGURES_IMAGES_SRC.BLACK.BLACK_QUEEN;
    } else {
        this.image_src = FIGURES_IMAGES_SRC.WHITE.WHITE_QUEEN;
    }
}
function createFigure(litera,number){
    if(number === 2){
        return new Pawn(COLORS.WHITE);
    } else if(number===7){
        return new Pawn(COLORS.BLACK);
    } else if(number===1||number===8){

        let color = "";
        if(number===1){
            color= COLORS.WHITE;
        } else {
            color= COLORS.BLACK;
        }

        switch(litera){
            case LITERAS[1]:
            case LITERAS[8]:
                return new Rook(color);
                break;
            case LITERAS[2]:
            case LITERAS[7]:
                return new Knight(color);
                break;
            case LITERAS[3]:
            case LITERAS[6]:
                return new Bishop(color);
                break;
            case LITERAS[4]:
                    return new King(color);
                    break;
            case LITERAS[5]:
                    return new Queen(color);
                    break;
        }
    } else {
        return new Empty();
    }
}
function ChessboardSquare(litera,number){
    this.litera = litera;
    this.number = number;
    this.figure = createFigure(litera,number);
    //to do
}
const chessboardModel= {

}

let chessboardHTML = "";

function chessboardRender(){
    for(let i = 1; i <= 8; i++){
        for(let j = 1; j <= 8; j++){
            let figureHTML = "";
            let figure = chessboardModel[LITERAS[i]+''+j].figure;
            if(figure.name!==FIGURES.EMPTY){
                figureHTML = `<img src="${figure.image_src}" alt="${figure.name}" width="100%" height="100%" >`
            }
            chessboardHTML = chessboardHTML+`<div id="${LITERAS[i]}${j}" class="сhessboard-square ${LITERAS[i]} ${j} ${(i+j)%2===0?"black-square":"white-square"}">${figureHTML}</div>`;
        }
    }
    document.getElementsByClassName("сhessboard")[0].innerHTML = chessboardHTML;
}
function createChessboard(){
    for(let i = 1; i <= 8; i++){
        for(let j = 1; j <= 8; j++){
            chessboardModel[LITERAS[i]+''+j]= new ChessboardSquare(LITERAS[i],j);
        }
    }
}
createChessboard();
chessboardRender();