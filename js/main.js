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
        nameEntryPlayer: "One",
        gridHeightWidth: 3,
        sessionTimerSeconds: 0,
        sessionTimerTicket: null,
        //session functions
        buildNewGame: function (reset) {
          //object
          var game = {
            //game stored elements
            resetButton: document.getElementsByClassName("resetButton"),
            //game variables
            tilesSelected: 0,
            playerCurrentTurn: null,
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
              //randomly determine who goes first
              //set game.playerCurrentTurn to this player
              console.log("determineFirstPlayer");
            }
          };//end game object

        //add game event listeners
        game.resetButton.addEventListener("click",resetGame);

        },//end buildNewGame()
        submitPlayerName: function (input,playerNumber) {
          //validate input
          //if input accepted
            //if playerOne
              //set name and call getPlayerName("Two")
            //if playerTwo
              //set name and call buildNewGame()
          //else if bad input
            //clear and ask for valid input
          console.log("submitPlayerName");
        },//end submitPlayerName()
        returnHome: function () {
          location.reload();
          console.log("returnHome");
        },
        buildGameBoard: function () {
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
        }
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
    module.goButton.addEventListener("click",function () { session.submitPlayerName(1,inputField.value) });

    //add homeButton event listener
    session.homeButton.addEventListener("click", session.returnHome);

    }//end buildNewSession()
  };//end module object

//add module event listeners
module.goButton.addEventListener("click",function () { module.buildNewSession() });

}//end buildNewModule()

//call build new module
buildNewModule();