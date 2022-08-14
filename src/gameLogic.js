import { update } from "lodash";
import DOMstuff from "./DOMstuff";

const Game = (() => {
    const runGameOnClick = (event) => {  
        Game.doGameLogic(event.target);
        Game.updateGameDOM();
    }

    const initializeGameDOM = () => {
        createDOMelements();
        addContentToDOM();
        addEventListeners();
    }

    const createDOMelements = () => {
        DOMstuff.appendElementToBodyWithClasses('h1', ['heading']);
        DOMstuff.appendElementToBodyWithClasses('h2', ['now-playing']);
        DOMstuff.appendElementToBodyWithClasses('div', ['grid-wrap']);
        DOMstuff.appendElementToBodyWithClasses('button', ['reset-button']);

        DOMstuff.createSqureGridDiv(9, '.grid-wrap');
    }

    const addContentToDOM = () => {
        DOMstuff.addContentToQuery("❌ TIC-TAC-TOE ⭕", '.heading');
        DOMstuff.addContentToQuery(Board.prompt + Player.icon, '.now-playing');
        DOMstuff.addContentToQuery('RESET', '.reset-button');
    }

    const addEventListeners = () => {
        document.querySelector('body').addEventListener('click', Game.runGameOnClick);
    }

    const doGameLogic = (clickLocation) => {
        resetOnResetButtonPress(clickLocation);
        
        if(isGameOver() || !clickLocation.classList.contains('grid-item')) return; //Doesn't update game if a grid-item is not pressed
        updateGridArray(clickLocation.classList[1], Player.icon);
        calculateWinDrawOrLoss();
        switchPlayer();
    }

    const resetOnResetButtonPress = (clickLocation) => {
        if(clickLocation.classList.contains('reset-button')) resetGame();
    };

    const updateGridArray = (index) => {
        if(Board.gameBoard[index] === null) {
            Board.gameBoard[index] = Player.icon;
        }
    }

    const switchPlayer = () => {
        if(Player.icon === 'X') Player.icon = 'O';
        else Player.icon = 'X';
    }
    
    const calculateWinDrawOrLoss = () => {
        setWinnerIconAndPrompt();
        calculateDraw();
    }

    const calculateDraw = () => {
        if(isGameOver()) return;
        let draw=0;
        for (let i = 0; i < 9; i++) {
            if(Board.gameBoard[i] !== null) draw++;            
        }
        
        if(draw === 9){
            Board.prompt = "It's a TIE";
            Board.someOneWon = true;
            Player.winner = ' !';
            return;
        }else draw = 0;
    }
    
    const setWinnerIconAndPrompt = () => {
        for (let i = 0; i < Board.winCombos.length; i++) {
            if(Board.gameBoard[Board.winCombos[i][0]] === null) continue;
            
            if(
            Board.gameBoard[Board.winCombos[i][0]] === Board.gameBoard[Board.winCombos[i][1]] &&
            Board.gameBoard[Board.winCombos[i][1]] == Board.gameBoard[Board.winCombos[i][2]]){
                Player.winner = Player.icon === 'X' ? 'X WON' : 'O WON';
                Board.prompt = 'GAME OVER: '
                Board.someOneWon = true;
            }
        }
    }

    const resetGame = () => {
        Board.reset();
        Player.reset();
        Game.reset = false;
        Player.winner = null;
        updateGameDOM();
    }

    const updateGameDOM = () => {
        syncDOMwithGameBoardArray();
        updateNowPlayingPlayer();
        updateGameOverDOM(); //Should be at the buttom. Try putting up to see why.
    }

    
    const updateGameOverDOM = () => {
        if(!isGameOver()) return;
        DOMstuff.addContentToQuery(Board.prompt + Player.winner ,'.now-playing');
    }
    
    const isGameOver = () => {
        return Board.someOneWon;
    }
    
    const syncDOMwithGameBoardArray = () => {
        for (let i = 0; i < Board.gameBoard.length; i++) {
            if(Board.gameBoard[i] !== null) {
                Board.gameBoardDOM[i].innerHTML = Board.gameBoard[i];
                Board.gameBoardDOM[i].classList.remove('box-shadow');
            }else{
                Board.gameBoardDOM[i].innerHTML = '';
            }
        }
    }

    const updateNowPlayingPlayer = () => {
        DOMstuff.changeWhoIsPlaying(Board.prompt + Player.icon);
    }

    return{
        initializeGameDOM, doGameLogic, updateGameDOM, runGameOnClick,
    }

})();


const Board = (() => {
    let gameBoard = [null, null, null, null, null, null, null, null, null];
    let winCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    let someOneWon = false;
    let prompt = 'NOW PLAYING: ';
    let gameBoardDOM = document.getElementsByClassName('grid-item');
    
    const reset = () => {
        Board.gameBoard = new Array(9).fill(null);
        Board.gameBoardDOM = document.getElementsByClassName('grid-item');
        Board.prompt = 'NOW PLAYING: ';
        Board.someOneWon = false;
    }
    
    return {
        gameBoard, gameBoardDOM, winCombos, someOneWon, prompt, reset
      };
})();

const Player = (() => {
    let icon = 'X';

    const changeIcon = () => {
        if(icon === 'X') {
            icon = 'O';
        }
        else icon = 'X';
        console.log(icon);
    }   

    const reset = () => {
        Player.icon = 'X';
    }
    return {
        icon, changeIcon, reset
    }
})();

export {Game};