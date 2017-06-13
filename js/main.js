var buildNewGame = function () {
  var game = {
    //functions
    checkIfWon: function() {

    },
    clickSquare: function() {

    },
    submitPlayerName: function(number) {

    },
    resetGame: function() {
      
    },
    //variables
    tilesSelected: 0,
    playerCurrentTurn: null,
    //objects
    gameBoard: document.getElementById('play'),
    resetButton: document.getElementById('resetButton'),
  }
}

var buildNewSession = function () {
  var session = {
    //variables
    playerOneScore: 0,
    playerTwoScore: 0,
    playerOneName: "",
    playerTwoName: "",
    drawScore: 0,
    nameEntryPlayer: "One",
    //functions
    getPlayerName: function(playerNumber) {
      //if nameEntryPlayer === "One", take user to name entry for player one.
      //if nameEntryPlayer === "Two", take user to name entry for player two.
     },
    submitPlayerName: function(input,playerNumber) {
      //validate input
      //if playerOne, set name and call getPlayerName("Two")
      //if playerTwo, set name and call buildNewGame()
    }
    returnHome: function() {
      //present confirmation message to the user
      //if confirm, return home, otherwise continue playing
    }, 
    playButton: document.getElementById('playButton'),
    homeButton: document.getElementById('homeButton')
  }
}

}


//event listeners
session.playButton.addEventListener('click',function() { getPlayerName(nameEntryPlayer) }
session.homeButton.addEventListener('click',returnHome);
game.gameBoard.addEventListener('click',clickSquare);
game.resetButton.addEventListener('click',resetGame);


//present welcome screen with introduction and play button

//click play

  //present player one name entry input

  //click submit player one name

    //present player two name entry input

    //click submit player two name

    //present game board with instructions beneath

      //randomly determine which player is to go first

      //indicate to player x that its their turn

      //player click a board section

        //change graphic of clicked section to indicate clicked

        //CHECK if player has won the game

          //if so --- present winning messsage, ask 'Play again?'

            //if yes:

              //reset board

              //randomly determine which player is to go first

              //indicate to player x that its their turn

            //if no:

              //return to welcome screen

          //if no --- CHECK if only one space remains

            //if so --- mark remaining space as clicked by opposing player

              //CHECK if opposing player has won the game

                //if so --- present winning message to opposing player

                //if no --- present draw message

      //player click 'restart game'

        //present confirmation message

          //if yes:

            //reset board

            //randomly determine which player is to go first

            //indicate to player x that its their turn

          //if no:

            //return to game

      //player click 'home'

            //return to welcome screen
