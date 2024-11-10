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
    PAWN:"./images/black_pawn.png",
    ROOK:"./images/black_rook.png",
    KNIGHT:"./images/black_knight.png",
    BISHOP:"./images/black_bishop.png",
    QUEEN:"./images/black_queen.png",
    KING:"./images/black_king.png",
        },
    WHITE: {
    PAWN:"./images/white_pawn.png",
    ROOK:"./images/white_rook.png",
    KNIGHT:"./images/white_knight.png",
    BISHOP:"./images/white_bishop.png",
    QUEEN:"./images/white_queen.png",
    KING:"./images/white_king.png",
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
        this.image_src = FIGURES_IMAGES_SRC.BLACK.PAWN;
    } else {
        this.image_src = FIGURES_IMAGES_SRC.WHITE.PAWN;
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

                        if(this.isFirstMove){
                            if(chessboardModel[LITERAS[key]+''+(number+2*d)]){
                                if(chessboardModel[LITERAS[key]+''+(number+2*d)].figure.name===FIGURES.EMPTY){
                                    squaresToMove.push(LITERAS[key]+''+(number+2*d));
                                }
                            }
                        }
                    }
                }
            
            const pawnColor = this.color;
            const pawnCut = function(squareToCut){
                const figureToCut = chessboardModel[squareToCut].figure;
                if(figureToCut.name!==FIGURES.EMPTY&&figureToCut.color !== pawnColor) squaresToCut.push(squareToCut)
            }

            if(chessboardModel[LITERAS[key+1]+''+(number+d)]?.figure) {
                pawnCut(LITERAS[key+1]+''+(number+d));
            }
            
            if(chessboardModel[LITERAS[key-1]+''+(number+d)]?.figure) {
                pawnCut(LITERAS[key-1]+''+(number+d));
            }

        return {squaresToMove,squaresToCut};
    }
}
function Rook(color){
    this.name = FIGURES.ROOK;
    this.color = color;
    this.isFirstMove = true;
    
    if(color === COLORS.BLACK){
        this.image_src = FIGURES_IMAGES_SRC.BLACK.ROOK;
    } else {
        this.image_src = FIGURES_IMAGES_SRC.WHITE.ROOK;
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
        this.image_src = FIGURES_IMAGES_SRC.BLACK.KNIGHT;
    } else {
        this.image_src = FIGURES_IMAGES_SRC.WHITE.KNIGHT;
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
        this.image_src = FIGURES_IMAGES_SRC.BLACK.BISHOP;
    } else {
        this.image_src = FIGURES_IMAGES_SRC.WHITE.BISHOP;
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
    this.isFirstMove = true;
    
    if(color === COLORS.BLACK){
        this.image_src = FIGURES_IMAGES_SRC.BLACK.KING;
    } else {
        this.image_src = FIGURES_IMAGES_SRC.WHITE.KING;
    }

    this.canMove = function(coordinate){

        const litAndNum = coordinateToLitAndNum(coordinate);
        const litera = litAndNum.litera;
        const number = litAndNum.number;
        let squaresToMove = [];
        let squaresToCut = [];
        let squaresToCastling = [];
        const key = +Object.keys(LITERAS).find(k => LITERAS[k] === litera);

        for(let i = number - 1; i <= number + 1; i++){
            for(let j = key - 1; j <= key + 1; j++){
                let currentCoordinate = LITERAS[j]+''+i;
                if(!chessboardModel[currentCoordinate]) continue;
                if(i===number&&j===key) continue;
                if(isUnderAttack(currentCoordinate,this.color)) continue;
                if(chessboardModel[currentCoordinate].figure.name===FIGURES.EMPTY){
                    squaresToMove.push(currentCoordinate);
                } else {
                    if(chessboardModel[currentCoordinate].figure.color !== this.color) squaresToCut.push(currentCoordinate);
                }
                }
            }
        if(this.isFirstMove){
            if(chessboardModel[LITERAS[8]+''+number].figure.isFirstMove){    
                for(let i = key; i <= 7; i++){
                    const currentSquare = LITERAS[i]+''+number;
                    
                    if((chessboardModel[currentSquare].figure.name !== FIGURES.EMPTY)&&(chessboardModel[currentSquare].figure!==this)){
                        break;
                    }

                    if(isUnderAttack(currentSquare,this.color)) break;

                    if(i===7) {
                        squaresToMove.push(currentSquare)
                        squaresToCastling.push(currentSquare);
                    }
                }
            }

            if(chessboardModel[LITERAS[1]+''+number].figure.isFirstMove){    
                for(let i = key; i >= 2; i--){
                    const currentSquare = LITERAS[i]+''+number;
                    
                    if((chessboardModel[currentSquare].figure.name !== FIGURES.EMPTY)&&(chessboardModel[currentSquare].figure!==this)){
                        break;
                    }

                    if(isUnderAttack(currentSquare,this.color)) break;

                    if(i===3) {
                        squaresToMove.push(currentSquare)
                        squaresToCastling.push(currentSquare);
                    }
                }
            }
        }
        return {squaresToMove,squaresToCut,squaresToCastling};
    }
}
function Queen(color){
    this.name = FIGURES.QUEEN;
    this.color = color;
    
    if(color === COLORS.BLACK){
        this.image_src = FIGURES_IMAGES_SRC.BLACK.QUEEN;
    } else {
        this.image_src = FIGURES_IMAGES_SRC.WHITE.QUEEN;
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
}
let chessboardModel= {

}

let chessboardGameInfo = {};
function chessboardGameInfoReset(){
    chessboardGameInfo.selectedSquare = "";
    chessboardGameInfo.squaresToMove = [];
    chessboardGameInfo.squaresToCut = [];
    chessboardGameInfo.squaresToCastling = [];
    chessboardGameInfo.currentTurnColor = COLORS.WHITE;
    chessboardGameInfo.pawnConversionSquare = "";
    }
chessboardGameInfoReset();

let gameController = {
    gameInfo: chessboardGameInfo,
    getCurrentGameInfo: function(){
        return this.gameInfo = chessboardGameInfo;
    },
    switchTurn: function(){
        this.gameInfo.currentTurnColor = this.gameInfo.currentTurnColor===COLORS.WHITE?COLORS.BLACK:COLORS.WHITE;
    },

    deselectSquare:function(){
        this.gameInfo.selectedSquare = "";
        this.gameInfo.squaresToMove = [];
        this.gameInfo.squaresToCut = [];
    },

    moveFigure: function(squareCoordinate){
        const litAndNum = coordinateToLitAndNum(squareCoordinate);

        if(!this.gameInfo.selectedSquare) return false;
        
        if(!(this.gameInfo.squaresToCut.includes(squareCoordinate)||this.gameInfo.squaresToMove.includes(squareCoordinate))) {
            this.deselectSquare();
            return false;
        };

        this.switchTurn();
        if(this.gameInfo.squaresToCastling?.includes(squareCoordinate)){
            chessboardModel[squareCoordinate].figure = chessboardModel[this.gameInfo.selectedSquare].figure;
            chessboardModel[squareCoordinate].figure.isFirstMove = false;

            chessboardModel[this.gameInfo.selectedSquare].figure = new Empty();

            const {litera,number} = coordinateToLitAndNum(squareCoordinate);
            
            const key = +Object.keys(LITERAS).find(k => LITERAS[k] === litera);

            if(squareCoordinate<this.selectedSquare){
                //длинная рокировка
                chessboardModel[LITERAS[4] + '' + number].figure = chessboardModel[LITERAS[1] + '' + number].figure;
                chessboardModel[LITERAS[4] + '' + number].figure.isFirstMove = false;
                chessboardModel[LITERAS[1] + '' + number].figure = new Empty();
            } else {
                //короткая рокировка
                chessboardModel[LITERAS[6] + '' + number].figure = chessboardModel[LITERAS[8] + '' + number].figure;
                chessboardModel[LITERAS[6] + '' + number].figure.isFirstMove = false;
                chessboardModel[LITERAS[8] + '' + number].figure = new Empty();
            }

            chessboardRender();
            this.deselectSquare();
            return true;
        }

        chessboardModel[squareCoordinate].figure = chessboardModel[this.gameInfo.selectedSquare].figure;

        if(chessboardModel[squareCoordinate].figure.isFirstMove){chessboardModel[squareCoordinate].figure.isFirstMove = false;}
        
        //превращение пешки
        if(chessboardModel[squareCoordinate].figure.name===FIGURES.PAWN&&((chessboardModel[squareCoordinate].number===8)||(chessboardModel[squareCoordinate].number)===1)){
            this.gameInfo.pawnConversionSquare = squareCoordinate;
        }

        chessboardModel[this.gameInfo.selectedSquare].figure = new Empty();
        chessboardRender();
        this.deselectSquare();
        return true;
    },

    selectSquare: function(squareCoordinate,squaresToMove,squaresToCut,squaresToCastling){
        this.gameInfo.selectedSquare = squareCoordinate;
        this.gameInfo.squaresToMove = squaresToMove;
        this.gameInfo.squaresToCut = squaresToCut;
        this.gameInfo.squaresToCastling = squaresToCastling;
    },
    getAvilableMoves: function(squareCoordinate,squaresToMove,squaresToCut,squaresToCastling){
        let squares = squaresToMove.concat(squaresToCut,squaresToCastling).filter((square)=>square!==undefined);

        return squares.filter(square=>{
                    gameController.selectSquare(squareCoordinate,squaresToMove,squaresToCut,squaresToCastling);
                    this.clickHandler(square);
                    this.switchTurn();
                    if(isThatCheck()){
                        cancelMove();
                        return false;
                    } else {
                        cancelMove();
                        return true;
                    }
                });
    },
    clickHandler: function(squareCoordinate){
        if(!this.gameInfo.selectedSquare){
            if(chessboardModel[squareCoordinate].figure.name === FIGURES.EMPTY){ return; }
            if(chessboardModel[squareCoordinate].figure.color !== this.gameInfo.currentTurnColor){ return; }
            let {squaresToMove,squaresToCut,squaresToCastling} = chessboardModel[squareCoordinate].figure.canMove(squareCoordinate);
            
            {
            let squares = this.getAvilableMoves(squareCoordinate,squaresToMove,squaresToCut,squaresToCastling)

            squaresToMove = squaresToMove?.filter((square)=>squares.includes(square));
            squaresToCut = squaresToCut?.filter((square)=>squares.includes(square));
            squaresToCastling = squaresToCastling?.filter((square)=>squares.includes(square));
            }

            gameController.selectSquare(squareCoordinate,squaresToMove,squaresToCut,squaresToCastling);
        } else {

            const chessboardGameInfoClone = Object.assign({},this.gameInfo);
            const chessboardModelClone = getChessboardModelPrototype();
            const selectedSquareClone = this.gameInfo.selectedSquare;
            if(this.moveFigure(squareCoordinate)){
                const figureName = chessboardModel[squareCoordinate].figure.name;
                saveMoveToHistory(figureName,selectedSquareClone,squareCoordinate,chessboardModelClone,chessboardGameInfoClone);
            }
        }
    },
    clickHandlerWithRender: function(squareCoordinate){
        this.clickHandler(squareCoordinate);
        chessboardRender();
    },
    pawnConversion: function(squareCoordinate){
        const keycolor = this.gameInfo.currentTurnColor !== COLORS.WHITE? "WHITE": "BLACK"; 
        const pawnConversionMenuHTML = `<div id="pawn-conversion-menu">
            <div class="pawn-conversion-figure" id="pawn-conversion-knight"><img src="${FIGURES_IMAGES_SRC[keycolor].KNIGHT}" alt="pawn-conversion-knight" width="100%" height="100%"/></div>
            <div class="pawn-conversion-figure" id="pawn-conversion-bishop"><img src="${FIGURES_IMAGES_SRC[keycolor].BISHOP}" alt="pawn-conversion-bishop" width="100%" height="100%"/></div>
            <div class="pawn-conversion-figure" id="pawn-conversion-queen"><img src="${FIGURES_IMAGES_SRC[keycolor].QUEEN}" alt="pawn-conversion-queen" width="100%" height="100%"/></div>
            <div class="pawn-conversion-figure" id="pawn-conversion-rook"><img src="${FIGURES_IMAGES_SRC[keycolor].ROOK}" alt="pawn-conversion-rook" width="100%" height="100%"/></div>
        </div>`;

        const pawnConversionSquare = document.getElementById(squareCoordinate);
        pawnConversionSquare.innerHTML = pawnConversionMenuHTML;

        const pawnConversionMenu = document.getElementById("pawn-conversion-menu");
        pawnConversionSquare.onclick = null;
        const conversionFigures = document.getElementsByClassName("pawn-conversion-figure");
        
        pawnConversionSquare.style.zIndex = 999;
        for(let key of conversionFigures){
            const currentFigure = key;
            const currentFigureName = currentFigure.firstChild?.getAttribute('alt');
            currentFigure.onclick = function(){
                console.log(currentFigure);
                pawnConversionMenu.remove();
                pawnConversionSquare.onclick = this.clickHandlerWithRender;
                //добавить обработчик выбора фигуры
                gameController.switchTurn();
                switch(currentFigureName){
                    case "pawn-conversion-rook":
                        chessboardModel[squareCoordinate].figure = new Rook(gameController.gameInfo.currentTurnColor);
                        break;
                    case "pawn-conversion-knight":
                        chessboardModel[squareCoordinate].figure = new Knight(gameController.gameInfo.currentTurnColor);
                        break;
                    case "pawn-conversion-queen":
                        chessboardModel[squareCoordinate].figure = new Queen(gameController.gameInfo.currentTurnColor);
                        break;
                    case "pawn-conversion-bishop":
                        chessboardModel[squareCoordinate].figure = new Bishop(gameController.gameInfo.currentTurnColor);
                        break;
                }
                
                const chessboardGameInfoClone = Object.assign({},this.gameInfo);
                const chessboardModelClone = getChessboardModelPrototype();
                const selectedSquareClone = squareCoordinate;
                const figureName = chessboardModel[squareCoordinate].figure.name;
                saveMoveToHistory(figureName,selectedSquareClone,squareCoordinate,chessboardModelClone,chessboardGameInfoClone);
                gameController.switchTurn();
                gameController.gameInfo.pawnConversionSquare = "";
                chessboardRender();
                // ошибка!!! -> gameController.clickHandlerWithoutRender(currentFigure.id);
            }
        }
        // chessboardModel[squareCoordinate].figure = new Rook(this.gameInfo.currentTurnColor);
        //     return true;
    }
    
}
let gameHistory = [];
function getChessboardModelPrototype(){
    const chessboardModelPrototype = {};
    for (key in chessboardModel){
        chessboardModelPrototype[key] = Object.assign({},chessboardModel[key]);
        chessboardModelPrototype[key].figure = {name:chessboardModel[key].figure.name,color:chessboardModel[key].figure.color}; 
        
        if(chessboardModel[key].figure.isFirstMove!=null){
            chessboardModelPrototype[key].figure.isFirstMove = chessboardModel[key].figure.isFirstMove
        }
        //to do сохранять isFirstMove в прототип
    }
    return chessboardModelPrototype;
}
function createFigureByNameAndColor(name,color){
    switch(name){
        case FIGURES.BISHOP:
            return new Bishop(color);
            break;
        case FIGURES.EMPTY:
            return new Empty();
            break;
        case FIGURES.KING:
            return new King(color);
            break;
        case FIGURES.KNIGHT:
            return new Knight(color);
            break;
        case FIGURES.PAWN:
            return new Pawn(color);
            break;
        case FIGURES.QUEEN:
            return new Queen(color);
            break;
        case FIGURES.ROOK:
            return new Rook(color);
    }
}
function setChessboardModelByPrototype(chessboardModelPrototype){
    chessboardModel = JSON.parse(JSON.stringify(chessboardModelPrototype));
    for (key in chessboardModel){
        chessboardModel[key].figure = createFigureByNameAndColor(chessboardModelPrototype[key].figure.name,chessboardModelPrototype[key].figure.color);
        if(chessboardModelPrototype[key].figure.isFirstMove!=null){
            chessboardModel[key].figure.isFirstMove = chessboardModelPrototype[key].figure.isFirstMove;
        }
    }
    return chessboardModel;
}
function saveMoveToHistory(figureName,fromSquare,toSquare,chessboardModelClone,chessboardGameInfoClone){
    gameHistory.push({figureName,fromSquare,toSquare,chessboardModel:chessboardModelClone,chessboardGameInfo:chessboardGameInfoClone});
}
function clearHistory(){
    gameHistory = [];
}
function cancelMove(){
    lastMove = gameHistory.pop();
    if(lastMove){
        setChessboardModelByPrototype(lastMove.chessboardModel);
        chessboardGameInfo = lastMove.chessboardGameInfo;
        gameController.gameInfo = chessboardGameInfo;
        gameController.deselectSquare();
    }
    }
function isUnderAttack(coordinate,figureColor){
    const litAndNum = coordinateToLitAndNum(coordinate);
    const litera = litAndNum.litera;
    const number = litAndNum.number;
    function isEmpty(coordinate){
        return chessboardModel[coordinate].figure.name === FIGURES.EMPTY;
    }

    const color = figureColor==null?chessboardModel[coordinate].figure.color:figureColor;
    
    for(let i = number + 1; i <= 8; i++){
        let currentCoordinate = litera+''+i;
        if(isEmpty(currentCoordinate)) continue;
        if([FIGURES.QUEEN,FIGURES.ROOK].includes(chessboardModel[currentCoordinate].figure.name)){
            if(chessboardModel[currentCoordinate].figure.color !== color) return true;
        }
        break;
    }

    for(let i = number - 1; i >= 1; i--){
        let currentCoordinate = litera+''+i;
        if(isEmpty(currentCoordinate)) continue;
        if([FIGURES.QUEEN,FIGURES.ROOK].includes(chessboardModel[litera+''+i].figure.name)){
            if(chessboardModel[litera+''+i].figure.color !== color) return true;
        }
        break;
    }

    const key = +Object.keys(LITERAS).find(k => LITERAS[k] === litera);

    for(let i = key + 1; i <= 8; i++){
        let currentCoordinate = LITERAS[i]+''+number;
        if(isEmpty(currentCoordinate)) continue;
        if([FIGURES.QUEEN,FIGURES.ROOK].includes(chessboardModel[LITERAS[i]+''+number].figure.name)){
            if(chessboardModel[LITERAS[i]+''+number].figure.color !== color) return true;
        }
        break;
    }

    for(let i = key - 1; i >= 1; i--){
        let currentCoordinate = LITERAS[i]+''+number;
        if(isEmpty(currentCoordinate)) continue;
        if([FIGURES.QUEEN,FIGURES.ROOK].includes(chessboardModel[LITERAS[i]+''+number].figure.name)){
            if(chessboardModel[LITERAS[i]+''+number].figure.color !== color) return true;
        }
        break;
    }
    
    let j = key;
    for(let i = number + 1; i <= 8; i++){
        j++;
        if(!(j<=8)) break;
        
        let currentCoordinate = LITERAS[j]+''+i;
        if(isEmpty(currentCoordinate)) continue;
        if([FIGURES.QUEEN,FIGURES.BISHOP].includes(chessboardModel[LITERAS[j]+''+i].figure.name)){
            if(chessboardModel[LITERAS[j]+''+i].figure.color !== color) return true;
        }
        break;
    }

    j = key;
    for(let i = number - 1; i >= 1; i--){
        j--;
        if(!(j>=1)) break;
      
        let currentCoordinate = LITERAS[j]+''+i;
        if(isEmpty(currentCoordinate)) continue;
        if([FIGURES.QUEEN,FIGURES.BISHOP].includes(chessboardModel[LITERAS[j]+''+i].figure.name)){
            if(chessboardModel[LITERAS[j]+''+i].figure.color !== color) return true;
        }
        break;
    }

   
    j = key;
    for(let i = number + 1; i <= 8; i++){
        j--;
        if(!(j>=1)) break;
        
        let currentCoordinate = LITERAS[j]+''+i;
        if(isEmpty(currentCoordinate)) continue;
        if([FIGURES.QUEEN,FIGURES.BISHOP].includes(chessboardModel[LITERAS[j]+''+i].figure.name)){
            if(chessboardModel[LITERAS[j]+''+i].figure.color !== color) return true;
        }
        break;
    }

    j = key;
    for(let i = number - 1; i >= 1; i--){
        j++;
        if(!(j<=8)) break;
            
        let currentCoordinate = LITERAS[j]+''+i;
        if(isEmpty(currentCoordinate)) continue;
        if([FIGURES.QUEEN,FIGURES.BISHOP].includes(chessboardModel[LITERAS[j]+''+i].figure.name)){
            if(chessboardModel[LITERAS[j]+''+i].figure.color !== color) return true;
        }
        break;
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
            if(chessboardModel[squareToMoveKnight].figure.name===FIGURES.KNIGHT&&chessboardModel[squareToMoveKnight].figure.color!==color){
                return true;
            }
        }
        
    const d = color === COLORS.WHITE?1:-1;

if(chessboardModel[LITERAS[key+1]+''+(number+d)]?.figure?.name === FIGURES.PAWN) {
    if(chessboardModel[LITERAS[key+1]+''+(number+d)].figure.color !== color) return true;
}

if(chessboardModel[LITERAS[key-1]+''+(number+d)]?.figure?.name === FIGURES.PAWN) {
    if(chessboardModel[LITERAS[key-1]+''+(number+d)].figure.color !== color) return true;
}

for(let i = number - 1; i <= number + 1; i++){
    for(let j = key - 1; j <= key + 1; j++){
        let currentCoordinate = LITERAS[j]+''+i;
        if(!chessboardModel[currentCoordinate]) continue;
        if(i===number&&j===key) continue;
        if(chessboardModel[currentCoordinate].figure.name===FIGURES.KING&&chessboardModel[currentCoordinate].figure.color!==color) return true;
        }
    }

    return false;
}
function getKingSquare(color){
    return Object.values(chessboardModel).find((square)=>{return (square.figure.name===FIGURES.KING)&&square.figure.color===color});
}
function isThatCheckmate(){
    const currentTurnColor = chessboardGameInfo.currentTurnColor;

    const kingSquare = getKingSquare(currentTurnColor)
    const kingCoordinate = LitAndNumToCoordinate(kingSquare.litera,kingSquare.number);
    
    if(!isUnderAttack(kingCoordinate,currentTurnColor)) return false;
    
    {
    const {squaresToMove,squaresToCut,squaresToCastling} = kingSquare.figure.canMove(kingCoordinate);
    if(squaresToMove.length||squaresToCut.length||squaresToCastling.length){ return false;}
    }

    const  friendlyFigureSquares = Object.values(chessboardModel).filter((square)=>{return ((square.figure.color===currentTurnColor)&&(square.figure.name!==FIGURES.KING))});
    
    return friendlyFigureSquares.every(friendlyFigureSquare => {
        const figureCoordinate = LitAndNumToCoordinate(friendlyFigureSquare.litera,friendlyFigureSquare.number);
        const {squaresToMove,squaresToCut,squaresToCastling} = friendlyFigureSquare.figure.canMove(figureCoordinate);
        return !gameController.getAvilableMoves(figureCoordinate,squaresToMove,squaresToCut,squaresToCastling).length;
    });
}
function isThatCheck(){
    const currentTurnColor = chessboardGameInfo.currentTurnColor;
    const kingSquare = getKingSquare(currentTurnColor)
    const kingCoordinate = LitAndNumToCoordinate(kingSquare.litera,kingSquare.number);
    
    return isUnderAttack(kingCoordinate,currentTurnColor);
}

function chessHistoryRender(){
    let gameHistoryHTML = "";
    for(let i=0;i<gameHistory.length;i++){
        const cannedMove = gameHistory[i];
        gameHistoryHTML = gameHistoryHTML + `<li id="move${i}">${i+1}. ${cannedMove.figureName===FIGURES.KNIGHT?"N":cannedMove.figureName.charAt(0).toUpperCase()} ${cannedMove.fromSquare} -> ${cannedMove.toSquare}</li>`
    }
    document.getElementById("chess-story").innerHTML = gameHistoryHTML;
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
            
            chessboardHTML = chessboardHTML+`<div id="${LITERAS[i]}${j}" class="сhessboard-square ${classHTML} ${LITERAS[i]} row${j} ${(i+j)%2===0?"black-square":"white-square"}">${figureHTML}</div>`;
        }
    }
    document.getElementsByClassName("сhessboard")[0].innerHTML = chessboardHTML;
    
    const squares = document.querySelectorAll('.сhessboard-square');
    
    if(!gameController.gameInfo.pawnConversionSquare){    
        squares.forEach(square => {
            square.onclick = function() {
                gameController.clickHandlerWithRender(this.id);
            };
        });
    } else {
        gameController.pawnConversion(gameController.gameInfo.pawnConversionSquare);
    }
    chessHistoryRender()
    if((!chessboardGameInfo.selectedSquare.length||!chessboardGameInfo.squaresToCut.length||!chessboardGameInfo.squaresToMove.length)&&isThatCheckmate()){
        gameController.switchTurn();
        checkmateHandler(chessboardGameInfo.currentTurnColor);
    }
}

function checkmateHandler(winner){
    const finishWindow = document.getElementById("finish-window");
    finishWindow.classList.remove("invisible");

    const winnerSpan = document.getElementById("winner-span");
    winnerSpan.innerHTML = winner;
}
function createChessboard(){
    for(let i = 1; i <= 8; i++){
        for(let j = 1; j <= 8; j++){
            chessboardModel[LITERAS[i]+''+j] = new ChessboardSquare(LITERAS[i],j);
        }
    }
}
function initFinishWindow(){
    const finishWindow = document.getElementById("finish-window");
    finishWindow.classList.add("invisible");
    const restartButton = document.getElementById("restart-button");

    restartButton.addEventListener('click',()=>{
        finishWindow.classList.add("invisible")
        resetChessboard();
    });
}
function resetChessboard(){
    createChessboard();
    clearHistory();
    chessHistoryRender();
    chessboardRender();
    chessboardGameInfoReset();
}
initFinishWindow();
resetChessboard();