const readlineSync = require('readline-sync');

class TicTacToe {
  constructor() {
    //bind functions
    this.generateBoard = this.generateBoard.bind(this);
    this.getOpenLocations = this.getOpenLocations.bind(this);
    this.initializePlayers = this.initializePlayers.bind(this);
    this.promptUser = this.promptUser.bind(this);
    this.userOptionsSelect = this.userOptionsSelect.bind(this);
    this.getUserMove = this.getUserMove.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    //rendering functions
    this.renderBoard = this.renderBoard.bind(this);
    this.renderSpacing = this.renderSpacing.bind(this);
    this.play = this.play.bind(this);
    //initialize class variables
    this.board = [];
    this.players = {};
    this.currentPlayer = 0;
    this.winner = null;
  }

  //function to generate game board of any size, only square board of n dimensions 
  //default set to 3 by 3
  generateBoard(size = 3) {
    //ensure the board is reset
    this.board = [];
    //make empty row
    for (let i = 0; i < size; i++) {
      this.board[i] = [];
      //fill row with null
      for (let j = 0; j < size; j++) {
        this.board[i][j] = null;
      }
    }
  }

  //function returns a array with the open board locations
  getOpenLocations(board = this.board) {
    let open_locations = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === null ) {
          open_locations.push([i,j]);
        }
      }
    }
    return open_locations;
  }
  //initializes the players object
  initializePlayers() {
    //set initial player object
    this.players = {
      0: {
        "type": null,
        "token": null
      },
      1: {
        "type": null,
        "token": null
      }
    }
    console.log("initializing the players object:");
    console.log(this.players);
  }

  //prompts the users and saves the value
  promptUser(prompt, validAnswers){
    const index = readlineSync.keyInSelect(validAnswers, prompt);
    if(index > -1 && index < validAnswers.length) {
      console.log(validAnswers[index]);
      return validAnswers[index];
    } else {
      console.log("Please select a valid value:");
      promptUser(prompt, validAwnswers, valueToUpdate);
    }
  }

  //picks the pre-game options
  //desperate need of refactoring
  userOptionsSelect(userArray = this.players) {
    console.log("Options select started.")
    const typeOptions = ['computer', 'human'];
    var tokenOptions = ['X','O'];
    var tokenOptionsLeft = [];
    //this should be programatically handled, refactor for final submission    
    this.renderSpacing(50);
    this.players[0].type = this.promptUser("Is player 1 a human or computer? ", typeOptions);
    this.renderSpacing(50);
    this.players[0].token = this.promptUser("Pick a token.", tokenOptions);
    if (tokenOptions[0] == this.players[0].token) {
      tokenOptionsLeft.push(tokenOptions[1]);
    } else {
      tokenOptionsLeft.push(tokenOptions[0]);
    }
    this.renderSpacing(50);
    this.players[1].type = this.promptUser("Is player 2 a human or computer? ", typeOptions);
    this.renderSpacing(50);
    this.players[1].token = this.promptUser("Pick a token.", tokenOptionsLeft);
  }

  //gets the user input and places it in the board
  getUserMove(currentPlayer = this.currentPlayer) {
    const playerToken = this.players[currentPlayer].token;
    const openLocations = this.getOpenLocations();
    const moveCoordinates = this.promptUser(`It is player ${currentPlayer}'s turn`, openLocations);
    console.log("Player Move : " + moveCoordinates);
    //player move is the 2d coordinates
    this.updateBoard(this.board, moveCoordinates, playerToken );
    this.nextTurn();
  }

  nextTurn() {
    this.currentPlayer = this.currentPlayer == 0 ? 1 : 0; 
  }

  //updates the move to the board
  updateBoard(board = this.board, moveCoordinates, token) {
    console.log("Location Index: " + moveCoordinates);
    board[moveCoordinates[0]][moveCoordinates[1]] = token;
  }

  //renders the number of line breaks specified
  renderSpacing(numOfLineBreaks) {
    for (var i = 0; i < numOfLineBreaks; i++) {
      console.log("");
    }
  }
  
  //renders the board to the console
  renderBoard(board = this.board, top_spacing = 20){
    this.renderSpacing(top_spacing);
    for (let i = 0; i < board.length; i++) {
      let board_row = "";
      //between every row render the row seperator
      if (i > 0) {
        console.log('          _____________');
        console.log('');
      }
      //render the column seperators
      for (let j = 0; j < board[i].length; j++) {
        const cellValue = board[i][j] != null ? board[i][j] : ((i*3) + (j+1));
        if (j > 0) {
          board_row += ' | ' + cellValue;
        } else {
          board_row += "            " + cellValue;
        }
      }
      console.log(board_row);
    }
    console.log("");
    console.log("");
  }
  //prompts the turn of current player
  gameLoop(){
    this.renderBoard();
    while (this.getOpenLocations().length > 0 || this.winner != null) {
      this.getUserMove();
      this.renderBoard();
    }
  }

  //play loop
  play() {
    this.generateBoard();
    this.renderBoard();
    this.initializePlayers();
    this.userOptionsSelect();
    this.gameLoop();
  }
}

let test = new TicTacToe;
test.play();