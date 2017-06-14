var buildNewModule = function () {
  //object
  var module = {
    //module stored elements
    goButton: document.getElementById("goButton"),
    message: document.getElementsByClassName("message")[0],
    //module variables
      //none
    //module functions
    buildNewSession: function () {
      //object
      var session = {
        //session stored elements
        homeButton: document.getElementsByClassName("homeButton"),
        board: document.getElementsByClassName("board"),
        //session variables
        playerOneScore: 0,
        playerTwoScore: 0,
        playerOneName: "",
        playerTwoName: "",
        drawScore: 0,
        nameEntryPlayer: 1,
        //session functions
        buildNewGame: function (reset) {
          //object
          var game = {
            //game stored elements
            resetButton: document.getElementsByClassName("resetButton"),
            //game variables
            tilesSelected: 0,
            playerCurrentTurn: determineFirstPlayer();,
            winningPlayer: "",
            //game functions
            checkIfWon: function (playerNumber) {
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
            clickSquare: function (event) {
              //confirm the clicked square is available to be selected
              //if so
                //update square to indicate the square has now been clicked
                //call checkIfWon(game.playerCurrentTurn)
              //else
                //present message to the user to indicate the square is not available
              console.log("clickSquare");
            },
            resetGame: function () {
              //present confirmation
              //if confirmed
                //call buildNewGame(true)
              //else
                //continue playing
              console.log("resetGame");
            },
            determineFirstPlayer: function () {
              return ( Math.round(Math.random()) + 1 )
              console.log("determineFirstPlayer");
            }
          };//end game object

        //set message to advise which user is going first
        module.message.textContent = "Player " + game.playerCurrentTurn + "'s Turn!";

        //build game board
        buildGameBoard();

        //add game event listeners
        game.resetButton.addEventListener("click",resetGame);

        },//end buildNewGame()
        submitPlayerName: function (input) {
          if ( input.length > 0 ) {
            if ( session.nameEntryPlayer === 1 ) {
              session.playerOneName = input;
              session.nameEntryPlayer = 2;
              module.message.textContent = "Enter Player Two Name";
            } else {
              session.playerTwoName = input;
               = determineFirstPlayer();
            }
          }
          console.log("submitPlayerName");
        },//end submitPlayerName()
        returnHome: function () {
          location.reload();
          console.log("returnHome");
        },
        buildGameBoard: function () {
          //build grid
          console.log("buildGameBoard");
        },
        incrementSessionTimerSeconds() {
          //increment session time by one
          console.log("incrementSessionTimerSeconds");
        },
      };//end session object

    //change play button to submit button and move it to the right
    module.goButton.textContent = "Submit";
    module.goButton.className = "goRight";
    module.goButton.id = "";

    //place 'input field' on the page, move it to the center
    var inputButton = document.createElement("input");
    session.inputField = inputButton;
    session.inputField.className = "goCenter";
    var parent = document.getElementsByClassName("board")[0];
    parent.insertBefore(inputButton, module.goButton);

    //place 'home' button on the page, move it to the left
    var homeButton = document.createElement("div");
    session.homeButton = homeButton;
    session.homeButton.className = "goLeft";
    session.homeButton.textContent = "Home";
    var parent = document.getElementsByClassName("board")[0];
    parent.insertBefore(homeButton, session.inputField);

    //replace message with 'player one enter your name'
    module.message.textContent = "Enter Player One Name"

    //change go button event listener to submit player one name
    module.goButton.addEventListener("click",function () { var success = session.submitPlayerName(inputField.value) });

    //add homeButton event listener
    session.homeButton.addEventListener("click", session.returnHome);

    }//end buildNewSession()
  };//end module object

//add module event listeners
module.goButton.addEventListener("click",function () { module.buildNewSession() });

}//end buildNewModule()

//call build new module
buildNewModule();