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

function coordinateToLitAndNum(coordinate){
    const chars = coordinate.split('');
    const litera = chars[0];
    const number = +chars[1];
    return {litera,number};
}
function LitAndNumToCoordinate(litera,number){
    return litera+''+number;
}

function Empty(){
    this.name = FIGURES.EMPTY;
}
function Pawn(color){
    this.name = FIGURES.PAWN;
    this.color = color;
    this.isFirstMove = true;
    if(color === COLORS.BLACK){
        this.image_src = FIGURES_IMAGES_SRC.BLACK.BLACK_PAWN;
    } else {
        this.image_src = FIGURES_IMAGES_SRC.WHITE.WHITE_PAWN;
    }
    
    this.canMove = function(coordinate){
        
        const litAndNum = coordinateToLitAndNum(coordinate);
        const litera = litAndNum.litera;
        const number = litAndNum.number;
        let squaresToMove = [];
        let squaresToCut = [];

        const key = +Object.keys(LITERAS).find(k => LITERAS[k] === litera);

        const d = chessboardModel[LITERAS[key]+''+number].figure.color === COLORS.WHITE?1:-1;

                if(chessboardModel[LITERAS[key]+''+(number+d)]){
                    if(chessboardModel[LITERAS[key]+''+(number+d)].figure.name===FIGURES.EMPTY){
                        squaresToMove.push(LITERAS[key]+''+(number+d));
                    }
                }
                
                if(this.isFirstMove){
                    if(chessboardModel[LITERAS[key]+''+(number+2*d)]){
                        if(chessboardModel[LITERAS[key]+''+(number+2*d)].figure.name===FIGURES.EMPTY){
                            squaresToMove.push(LITERAS[key]+''+(number+2*d));
                        }
                    }
                }
        
            if(chessboardModel[LITERAS[key+1]+''+(number+d)]?.figure) {
                if(chessboardModel[LITERAS[key+1]+''+(number+d)].figure.color !== this.color) squaresToCut.push(LITERAS[key+1]+''+(number+d))
            }
            
            if(chessboardModel[LITERAS[key-1]+''+(number+d)]?.figure) {
                if(chessboardModel[LITERAS[key-1]+''+(number+d)].figure.color !== this.color) squaresToCut.push(LITERAS[key-1]+''+(number+d))
            }

        return {squaresToMove,squaresToCut};
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

    this.canMove = function(coordinate){
        const litAndNum = coordinateToLitAndNum(coordinate);
        const litera = litAndNum.litera;
        const number = litAndNum.number;
        let squaresToMove = [];
        let squaresToCut = [];

        for(let i = number + 1; i <= 8; i++){
            if(chessboardModel[litera+''+i].figure.name===FIGURES.EMPTY){
                squaresToMove.push(litera+''+i);
            } else {
                if(chessboardModel[litera+''+i].figure.color !== this.color) squaresToCut.push(litera+''+i); 
                break;
            }
        }

        for(let i = number - 1; i >= 1; i--){
            if(chessboardModel[litera+''+i].figure.name===FIGURES.EMPTY){
                squaresToMove.push(litera+''+i);
            } else {
                if(chessboardModel[litera+''+i].figure.color !== this.color) squaresToCut.push(litera+''+i);
                break;
            }
        }

        const key = +Object.keys(LITERAS).find(k => LITERAS[k] === litera);

        for(let i = key + 1; i <= 8; i++){
            if(chessboardModel[LITERAS[i]+''+number].figure.name===FIGURES.EMPTY){
                squaresToMove.push(LITERAS[i]+''+number);
            } else {
                if(chessboardModel[LITERAS[i]+''+number].figure.color !== this.color) squaresToCut.push(LITERAS[i]+''+number);
                break;
            }
        }

        for(let i = key - 1; i >= 1; i--){
            if(chessboardModel[LITERAS[i]+''+number].figure.name===FIGURES.EMPTY){
                squaresToMove.push(LITERAS[i]+''+number);
            } else {
                if(chessboardModel[LITERAS[i]+''+number].figure.color !== this.color) squaresToCut.push(LITERAS[i]+''+number);
                break;
            }
        }

        return {squaresToMove,squaresToCut};
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
    this.canMove = function(coordinate){
        
        const litAndNum = coordinateToLitAndNum(coordinate);
        const litera = litAndNum.litera;
        const number = litAndNum.number;
        let squaresToMove = [];
        let squaresToCut = [];

        const key = +Object.keys(LITERAS).find(k => LITERAS[k] === litera);

        const d_knightMoves = {
            1:{litera:-2,number:1},
            2:{litera:2,number:1},
            3:{litera:1,number:-2},
            4:{litera:1,number:2},
            5:{litera:-2,number:-1},
            6:{litera:2,number:-1},
            7:{litera:-1,number:-2},
            8:{litera:-1,number:2},
        }

        for(let i = 1; i <= 8; i++){
                let squareToMoveKnight = LITERAS[d_knightMoves[i].litera+key]+''+(d_knightMoves[i].number+number);
                if(!chessboardModel[squareToMoveKnight]) continue;
                if(chessboardModel[squareToMoveKnight].figure.name===FIGURES.EMPTY){
                    squaresToMove.push(squareToMoveKnight);
                } else {
                    if(chessboardModel[squareToMoveKnight].figure.color !== this.color) squaresToCut.push(squareToMoveKnight);
                }
            }
        return {squaresToMove,squaresToCut};
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
    
    this.canMove = function(coordinate){

        const litAndNum = coordinateToLitAndNum(coordinate);
        const litera = litAndNum.litera;
        const number = litAndNum.number;
        let squaresToMove = [];
        let squaresToCut = [];

        const key = +Object.keys(LITERAS).find(k => LITERAS[k] === litera);

        let j = key;
        for(let i = number + 1; i <= 8; i++){
            j++;
            if(!(j<=8)) break;
                if(chessboardModel[LITERAS[j]+''+i].figure.name===FIGURES.EMPTY){
                    squaresToMove.push(LITERAS[j]+''+i);
                } else {
                    if(chessboardModel[LITERAS[j]+''+i].figure.color !== this.color) squaresToCut.push(LITERAS[j]+''+i);
                    break;
                }
            }

        j = key;
        for(let i = number - 1; i >= 1; i--){
            j--;
            if(!(j>=1)) break;
                if(chessboardModel[LITERAS[j]+''+i].figure.name===FIGURES.EMPTY){
                    squaresToMove.push(LITERAS[j]+''+i);
                } else {
                    if(chessboardModel[LITERAS[j]+''+i].figure.color !== this.color) squaresToCut.push(LITERAS[j]+''+i);
                    break;
                }
        }

       
        j = key;
        for(let i = number + 1; i <= 8; i++){
            j--;
            if(!(j>=1)) break;
                if(chessboardModel[LITERAS[j]+''+i].figure.name===FIGURES.EMPTY){
                    squaresToMove.push(LITERAS[j]+''+i);
                } else {
                    if(chessboardModel[LITERAS[j]+''+i].figure.color !== this.color) squaresToCut.push(LITERAS[j]+''+i);
                    break;
                }
            }

        j = key;
        for(let i = number - 1; i >= 1; i--){
            j++;
            if(!(j<=8)) break;
                if(chessboardModel[LITERAS[j]+''+i].figure.name===FIGURES.EMPTY){
                    squaresToMove.push(LITERAS[j]+''+i);
                } else {
                    if(chessboardModel[LITERAS[j]+''+i].figure.color !== this.color) squaresToCut.push(LITERAS[j]+''+i);
                    break;
                }
        }

        return {squaresToMove,squaresToCut};
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

    this.canMove = function(coordinate){

        const litAndNum = coordinateToLitAndNum(coordinate);
        const litera = litAndNum.litera;
        const number = litAndNum.number;
        let squaresToMove = [];
        let squaresToCut = [];

        const key = +Object.keys(LITERAS).find(k => LITERAS[k] === litera);

        for(let i = number - 1; i <= number + 1; i++){
            for(let j = key - 1; j <= key + 1; j++){
                if(!chessboardModel[LITERAS[j]+''+i]) continue;
                if(i===number&&j===key) continue;
                if(chessboardModel[LITERAS[j]+''+i].figure.name===FIGURES.EMPTY){
                    squaresToMove.push(LITERAS[j]+''+i);
                } else {
                    if(chessboardModel[LITERAS[j]+''+i].figure.color !== this.color) squaresToCut.push(LITERAS[j]+''+i);
                }
                }
            }

        return {squaresToMove,squaresToCut};
    }

    this.isUnderAttack = function(coordinate){

        const litAndNum = coordinateToLitAndNum(coordinate);
        const litera = litAndNum.litera;
        const number = litAndNum.number;

        for(let i = number + 1; i <= 8; i++){
            if([FIGURES.QUEEN,FIGURES.ROOK].includes(chessboardModel[litera+''+i].figure.name)){
                if(chessboardModel[litera+''+i].figure.color !== this.color) return true;
            }
        }

        for(let i = number - 1; i >= 1; i--){
            if([FIGURES.QUEEN,FIGURES.ROOK].includes(chessboardModel[litera+''+i].figure.name)){
                if(chessboardModel[litera+''+i].figure.color !== this.color) return true;
            }
        }

        const key = +Object.keys(LITERAS).find(k => LITERAS[k] === litera);

        for(let i = key + 1; i <= 8; i++){
            if([FIGURES.QUEEN,FIGURES.ROOK].includes(chessboardModel[LITERAS[i]+''+number].figure.name)){
                if(chessboardModel[LITERAS[i]+''+number].figure.color !== this.color) return true;
            }
        }

        for(let i = key - 1; i >= 1; i--){
            if([FIGURES.QUEEN,FIGURES.ROOK].includes(chessboardModel[LITERAS[i]+''+number].figure.name)){
                if(chessboardModel[LITERAS[i]+''+number].figure.color !== this.color) return true;
            }
        }
        
        let j = key;
        for(let i = number + 1; i <= 8; i++){
            j++;
            if(!(j<=8)) break;
            
            if([FIGURES.QUEEN,FIGURES.BISHOP].includes(chessboardModel[LITERAS[j]+''+i].figure.name)){
                if(chessboardModel[LITERAS[j]+''+i].figure.color !== this.color) return true;
            }
        }

        j = key;
        for(let i = number - 1; i >= 1; i--){
            j--;
            if(!(j>=1)) break;
          
            if([FIGURES.QUEEN,FIGURES.BISHOP].includes(chessboardModel[LITERAS[j]+''+i].figure.name)){
                if(chessboardModel[LITERAS[j]+''+i].figure.color !== this.color) return true;
            }
        }

       
        j = key;
        for(let i = number + 1; i <= 8; i++){
            j--;
            if(!(j>=1)) break;
            
            if([FIGURES.QUEEN,FIGURES.BISHOP].includes(chessboardModel[LITERAS[j]+''+i].figure.name)){
                if(chessboardModel[LITERAS[j]+''+i].figure.color !== this.color) return true;
            }
            }

        j = key;
        for(let i = number - 1; i >= 1; i--){
            j++;
            if(!(j<=8)) break;
                
            if([FIGURES.QUEEN,FIGURES.BISHOP].includes(chessboardModel[LITERAS[j]+''+i].figure.name)){
                if(chessboardModel[LITERAS[j]+''+i].figure.color !== this.color) return true;
            }
        }

        const d_knightMoves = {
            1:{litera:-2,number:1},
            2:{litera:2,number:1},
            3:{litera:1,number:-2},
            4:{litera:1,number:2},
            5:{litera:-2,number:-1},
            6:{litera:2,number:-1},
            7:{litera:-1,number:-2},
            8:{litera:-1,number:2},
        }
        for(let i = 1; i <= 8; i++){
                let squareToMoveKnight = LITERAS[d_knightMoves[i].litera+key]+''+(d_knightMoves[i].number+number);
                if(!chessboardModel[squareToMoveKnight]) continue;
                if(chessboardModel[squareToMoveKnight].figure.name===FIGURES.KNIGHT&&chessboardModel[squareToMoveKnight].figure.color!==this.color){
                    return true;
                }
            }
            
        const d = this.color === COLORS.WHITE?1:-1;

    if(chessboardModel[LITERAS[key+1]+''+(number+d)]?.figure?.name === FIGURES.PAWN) {
        if(chessboardModel[LITERAS[key+1]+''+(number+d)].figure.color !== this.color) return true;
    }
    
    if(chessboardModel[LITERAS[key-1]+''+(number+d)]?.figure?.name === FIGURES.PAWN) {
        if(chessboardModel[LITERAS[key-1]+''+(number+d)].figure.color !== this.color) return true;
    }

        return false;
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

    this.canMove = function(coordinate){
        const litAndNum = coordinateToLitAndNum(coordinate);
        const litera = litAndNum.litera;
        const number = litAndNum.number;
        let squaresToMove = [];
        let squaresToCut = [];

        for(let i = number + 1; i <= 8; i++){
            if(chessboardModel[litera+''+i].figure.name===FIGURES.EMPTY){
                squaresToMove.push(litera+''+i);
            } else {
                if(chessboardModel[litera+''+i].figure.color !== this.color) squaresToCut.push(litera+''+i); 
                break;
            }
        }

        for(let i = number - 1; i >= 1; i--){
            if(chessboardModel[litera+''+i].figure.name===FIGURES.EMPTY){
                squaresToMove.push(litera+''+i);
            } else {
                if(chessboardModel[litera+''+i].figure.color !== this.color) squaresToCut.push(litera+''+i);
                break;
            }
        }

        const key = +Object.keys(LITERAS).find(k => LITERAS[k] === litera);

        for(let i = key + 1; i <= 8; i++){
            if(chessboardModel[LITERAS[i]+''+number].figure.name===FIGURES.EMPTY){
                squaresToMove.push(LITERAS[i]+''+number);
            } else {
                if(chessboardModel[LITERAS[i]+''+number].figure.color !== this.color) squaresToCut.push(LITERAS[i]+''+number);
                break;
            }
        }

        for(let i = key - 1; i >= 1; i--){
            if(chessboardModel[LITERAS[i]+''+number].figure.name===FIGURES.EMPTY){
                squaresToMove.push(LITERAS[i]+''+number);
            } else {
                if(chessboardModel[LITERAS[i]+''+number].figure.color !== this.color) squaresToCut.push(LITERAS[i]+''+number);
                break;
            }
        }
        
        let j = key;
        for(let i = number + 1; i <= 8; i++){
            j++;
            if(!(j<=8)) break;
                if(chessboardModel[LITERAS[j]+''+i].figure.name===FIGURES.EMPTY){
                    squaresToMove.push(LITERAS[j]+''+i);
                } else {
                    if(chessboardModel[LITERAS[j]+''+i].figure.color !== this.color) squaresToCut.push(LITERAS[j]+''+i);
                    break;
                }
            }

        j = key;
        for(let i = number - 1; i >= 1; i--){
            j--;
            if(!(j>=1)) break;
                if(chessboardModel[LITERAS[j]+''+i].figure.name===FIGURES.EMPTY){
                    squaresToMove.push(LITERAS[j]+''+i);
                } else {
                    if(chessboardModel[LITERAS[j]+''+i].figure.color !== this.color) squaresToCut.push(LITERAS[j]+''+i);
                    break;
                }
        }

       
        j = key;
        for(let i = number + 1; i <= 8; i++){
            j--;
            if(!(j>=1)) break;
                if(chessboardModel[LITERAS[j]+''+i].figure.name===FIGURES.EMPTY){
                    squaresToMove.push(LITERAS[j]+''+i);
                } else {
                    if(chessboardModel[LITERAS[j]+''+i].figure.color !== this.color) squaresToCut.push(LITERAS[j]+''+i);
                    break;
                }
            }

        j = key;
        for(let i = number - 1; i >= 1; i--){
            j++;
            if(!(j<=8)) break;
                if(chessboardModel[LITERAS[j]+''+i].figure.name===FIGURES.EMPTY){
                    squaresToMove.push(LITERAS[j]+''+i);
                } else {
                    if(chessboardModel[LITERAS[j]+''+i].figure.color !== this.color) squaresToCut.push(LITERAS[j]+''+i);
                    break;
                }
        }

        return {squaresToMove,squaresToCut};
    }
}

function createFigure(litera,number){
    // if(number ===4&&litera==='d'){
    //     return new Knight(COLORS.WHITE);
    // }
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
                    return new Queen(color);
                    break;
            case LITERAS[5]:
                    return new King(color);
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

const chessboardGameInfo = {
    selectedSquare: "",
    squaresToMove: [],
    squaresToCut: [],
    currentTurn:COLORS.WHITE,

    switchTurn: function(){
        this.currentTurn = this.currentTurn===COLORS.WHITE?COLORS.BLACK:COLORS.WHITE;
    },

    deselectSquare:function(){
        this.selectedSquare = "";
        this.squaresToMove = [];
        this.squaresToCut = [];
    },

    moveFigure: function(squareCoordinate){
        const litAndNum = coordinateToLitAndNum(squareCoordinate);

        if(!this.selectedSquare) return;
        
        if(!(this.squaresToCut.includes(squareCoordinate)||this.squaresToMove.includes(squareCoordinate))) {
            this.deselectSquare();
            return;
        };

        chessboardModel[squareCoordinate].figure = chessboardModel[this.selectedSquare].figure;

        if(chessboardModel[squareCoordinate].figure.isFirstMove){chessboardModel[squareCoordinate].figure.isFirstMove = false;}
        
        chessboardModel[this.selectedSquare].figure = new Empty();
        chessboardRender();
        this.deselectSquare();
    },

    selectSquare: function(squareCoordinate,squaresToMove,squaresToCut){
        this.selectedSquare = squareCoordinate;
        this.squaresToMove = squaresToMove;
        this.squaresToCut = squaresToCut;
    },

    clickHandler: function(squareCoordinate){
        if(!this.selectedSquare){
            if(chessboardModel[squareCoordinate].figure.name === FIGURES.EMPTY){return;}

            const canMoveSquares = chessboardModel[squareCoordinate].figure.canMove(squareCoordinate);
            chessboardGameInfo.selectSquare(squareCoordinate,canMoveSquares.squaresToMove,canMoveSquares.squaresToCut);
        } else {
            this.moveFigure(squareCoordinate);
        }
        chessboardRender();
    }
}

let chessboardHTML = "";
function chessboardRender(){
    chessboardHTML = "";
    for(let i = 1; i <= 8; i++){
        for(let j = 1; j <= 8; j++){
            let figureHTML = "";
            let classHTML = "";
            
            let figure = chessboardModel[LITERAS[i]+''+j].figure;
            if(figure.name!==FIGURES.EMPTY){
                figureHTML = `<img draggable="false" src="${figure.image_src}" alt="${figure.name}" width="100%" height="100%" >`
                classHTML = "can-select-square";
            }
            
            if(chessboardGameInfo.selectedSquare===LITERAS[i]+''+j){ classHTML = "selected-square"; }

            if(chessboardGameInfo.squaresToCut.includes(LITERAS[i]+''+j)){ classHTML = "can-cut-square"; }
            
            if(chessboardGameInfo.squaresToMove.includes(LITERAS[i]+''+j)){ classHTML = "can-move-square"; }
            
            //добавить класс toMove/toCut
            chessboardHTML = chessboardHTML+`<div id="${LITERAS[i]}${j}" class="сhessboard-square ${classHTML} ${LITERAS[i]} row${j} ${(i+j)%2===0?"black-square":"white-square"}">${figureHTML}</div>`;
        }
    }
    document.getElementsByClassName("сhessboard")[0].innerHTML = chessboardHTML;
    
    const squares = document.querySelectorAll('.сhessboard-square');
    
    squares.forEach(square => {
        square.onclick = function() {
            chessboardGameInfo.clickHandler(this.id);
        };
    });
    //getElementByClassName( toMove/toCut ).addEventListener (click, foo);
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



