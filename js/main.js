var buildNewModule = function () {
  //created object
  var module = {
    //module stored elements
    playButton: document.getElementById("playButton"),
    homeButton: document.getElementById("homeButton"),
    gameBoard: document.getElementById("play"),
    resetButton: document.getElementById("resetButton"),
    //module variables
      //none
    //module functions
    buildNewSession: function () {
      //created object
      var session = {
        //session stored elements
          //none
        //session variables
        playerOneScore: 0,
        playerTwoScore: 0,
        playerOneName: "",
        playerTwoName: "",
        drawScore: 0,
        nameEntryPlayer: "One",
        gridHeightWidth: 3,
        sessionTimerSeconds: 0,
        sessionTimerTicket: null,
        //session functions
        buildNewGame: function (reset) {
          //created object
          var game = {
            //game stored elements
              //none
            //game variables
            tilesSelected: 0,
            playerCurrentTurn: null,
            winningPlayer: ""
            //game functions
            checkIfWon: function(playerNumber) {
              //check if any patterns touching the most recent move are winners
              //if yes
                //set game.winner to <playerNumber>
                //increment <playerNumber>'s score
                //present winner's message (includes 'play again?')
                //
              //else
                //check if only one space remains
                //if yes
                  //check if this space will give win to <otherPlayer>
                  //if yes
                    //set game.winner to <playerNumber>
                    //increment <playerNumber>'s score
                    //present winner's message (includes 'play again?')
                  //else
                    //set game.winner to "draw"
                    //present draw message (includes 'play again?')
                //else
                  //switch game.playerCurrentTurn to <otherPlayer>
                  //present message to <otherPlayer> indicating its their turn
              console.log("checkIfWon");
            },
            clickSquare: function(event) {
              //confirm the clicked square is available to be selected
              //if so
                //update square to indicate the square has now been clicked
                //call checkIfWon(game.playerCurrentTurn)
              //else
                //present message to the user to indicate the square is not available
                console.log("clickSquare");
            },
            resetGame: function() {
              //present confirmation
              //if confirmed
                //call buildNewGame(true)
              //else
                //continue playing
                console.log("resetGame");
            },
            determineFirstPlayer: function() {
              //randomly determine who goes first
              //set game.playerCurrentTurn to this player
              console.log("determineFirstPlayer");
            },
          }
        }
        getPlayerName: function(playerNumber) {
          //if nameEntryPlayer === "One", take user to name entry for player one.
          //if nameEntryPlayer === "Two", take user to name entry for player two.
          console.log("getPlayerName");
         },
        submitPlayerName: function(input,playerNumber) {
          //validate input
          //if input accepted
            //if playerOne
              //set name and call getPlayerName("Two")
            //if playerTwo
              //set name and call buildNewGame()
          //else if bad input
            //clear and ask for valid input
          console.log("submitPlayerName");
        },
        returnHome: function() {
          //present confirmation message to the user
          //if confirmed
            //return home
          //else
            //continue playing
          console.log("returnHome");
        },
        buildGameBoard: function() {
          //build grid of specified dimensions according to session.gridHeightWidth
          console.log("buildGameBoard");
        },
        incrementSessionTimerSeconds() {
          //increment session time by one
          console.log("incrementSessionTimerSeconds");
        },
        startSessionTimerSeconds() {
          //install timer to call incrementSessionTimerSeconds() each second
          console.log("startSessionTimerSeconds");
        },
      }
    },
  //session actions
  session.sessionTimerTicket = startSessionTimerSeconds();
  }
//module actions
}

//event listeners
session.playButton.addEventListener("click",function() { getPlayerName(nameEntryPlayer) }
session.homeButton.addEventListener("click",returnHome);
game.gameBoard.addEventListener("click",clickSquare);
game.resetButton.addEventListener("click",resetGame);