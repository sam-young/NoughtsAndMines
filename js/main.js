var buildNewModule = function () {
  //object
  var module = {
    //module stored elements
    goButton: document.getElementById("goButton"),
    message: document.getElementsByClassName("message")[0],
    //module variables
    boardWidthRem: 300,
    boardHeightRem: 300,
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
        rowCount: 3,
        //session functions
        buildNewGame: function () {
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
            determineFirstPlayer: function () {
              console.log("determineFirstPlayer");
              return ( Math.round(Math.random()) + 1 )
            }
          };//end game object

        //determine player's turn
        game.playerCurrentTurn = game.determineFirstPlayer();

        //set message to advise which user is going first
        if ( game.playerCurrentTurn === 1 ) {
          module.message.textContent = ( session.playerOneName + "'s Turn" )
        } else {
          module.message.textContent = ( session.playerTwoName + "'s Turn" )
        };

        //add reset button to the top bar, shrink up NOT DRY CODE NOT DRY CODE NOT DRY CODE
        if ( document.getElementById("reset") === null ) {
          var resetButton = document.createElement("div");
          game.resetButton = resetButton;
          game.resetButton.className = "goRight button";
          game.resetButton.textContent = "Reset";
          game.resetButton.id = "reset";
          var parent = document.getElementsByTagName("header")[0];
          parent.appendChild(resetButton);
        } else {
          game.resetButton = document.getElementById("reset")
        };

        //add resetButton event listener
        game.resetButton.addEventListener("click", function() { session.buildNewGame() } );

        },//end buildNewGame()
        submitPlayerName: function (input) {
          if ( input.length > 0 ) {
            if ( session.nameEntryPlayer === 1 ) {
              session.playerOneName = input;
              session.nameEntryPlayer = 2;
              session.inputField.value = "";
              module.message.textContent = "Enter Player Two Name";
            } else {
              session.playerTwoName = input;
              session.buildGameBoard();
              session.buildNewGame();
            }
          }
          console.log("submitPlayerName");
        },//end submitPlayerName()
        returnHome: function () {
          location.reload();
          console.log("returnHome");
        },
        buildGameBoard: function () {

          //shrink down and delete home and submit buttons, and delete input field.
          session.homeButton.remove();
          session.inputField.remove();
          session.submitButton.remove();

          //add home button to the top bar, shrink up NOT DRY CODE NOT DRY CODE NOT DRY CODE
          var homeButton = document.createElement("div");
          session.homeButton = homeButton;
          session.homeButton.className = "goLeft button";
          session.homeButton.textContent = "Home";
          var parent = document.getElementsByTagName("header")[0];
          parent.appendChild(homeButton);

          //add homeButton event listener
          session.homeButton.addEventListener("click", session.returnHome);

          //remove existing row
          existingRow = document.getElementsByClassName("boardRow")[0];
          existingRow.remove();

          //make boxes
          for ( var rowIndex = 0 ; rowIndex < session.rowCount ; rowIndex++ ) {
            var parentBoard = document.getElementsByClassName("board")[0];
            var newRow = document.createElement("div");
            newRow.className = "boardRow";
            height = ( module.boardHeightRem / session.rowCount );
            newRow.style.height = (String(height) + "px");
            parentBoard.appendChild(newRow);
            for ( var columnIndex = 0 ; columnIndex < session.rowCount ; columnIndex++ ) {
              var parentBoardRow = document.getElementsByClassName("boardRow")[rowIndex];
              var newBox = document.createElement("div");
              newBox.className = "goCenter tile";
              boxTag = ( rowIndex + 1 ) + "_" + ( columnIndex + 1 )
              width = ( module.boardWidthRem / session.rowCount );
              newBox.style.width = (String(width) + "px");
              newBox.id = boxTag;
              parentBoardRow.appendChild(newBox);
            }
          }
          console.log("buildGameBoard");
        },//end buildGameBoard()
      };//end session object

    //remove play button
    module.goButton.remove();

    //place 'home' button on the page, move it to the left NOT DRY CODE NOT DRY CODE NOT DRY CODE
    var homeButton = document.createElement("div");
    session.homeButton = homeButton;
    session.homeButton.className = "goLeft button";
    session.homeButton.textContent = "Home";
    var parent = document.getElementsByClassName("boardRow")[0];
    parent.appendChild(homeButton);

    //place 'input field' on the page, move it to the center
    var inputButton = document.createElement("input");
    session.inputField = inputButton;
    session.inputField.className = "goCenter input";
    var parent = document.getElementsByClassName("boardRow")[0];
    parent.appendChild(inputButton);

    //place 'submit' button on the page, move it to the left NOT DRY CODE NOT DRY CODE NOT DRY CODE
    var submitButton = document.createElement("div");
    session.submitButton = submitButton;
    session.submitButton.className = "goRight button";
    session.submitButton.textContent = "Submit";
    var parent = document.getElementsByClassName("boardRow")[0];
    parent.appendChild(submitButton);

    //replace message with 'player one enter your name'
    module.message.textContent = "Enter Player One Name"

    //change go button event listener to submit player one name
    session.submitButton.addEventListener("click",function () { session.submitPlayerName(session.inputField.value) });

    //add homeButton event listener
    session.homeButton.addEventListener("click", session.returnHome);

    }//end buildNewSession()
  };//end module object

//add module event listeners
module.goButton.addEventListener("click",function () { module.buildNewSession() });

}//end buildNewModule()

//call build new module
buildNewModule();