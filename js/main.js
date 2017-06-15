var buildNewModule = function () {
  //object
  var module = {
    //module stored elements
    goButton: document.getElementById("goButton"),
    message: document.getElementsByClassName("message")[0],
    //module variables
    boardWidthRem: 30,
    boardHeightRem: 30,
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
        playerOneImage: "images/1.png",
        playerTwoImage: "images/2.png",
        blankImage: "images/blank.png",
        drawScore: 0,
        nameEntryPlayer: 1,
        rowCount: 3,
        boxIdsArray: [],
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
            checkIfWon: function () {
              //check if any patterns touching the most recent move are winners
              
                //across
                var win;
                var sequential;
                for ( rowIndex = 0 ; rowIndex < session.rowCount ; rowIndex++ ) {
                  for ( columnIndex = 0 ; columnIndex < session.rowCount ; columnIndex++ ) {
                    var occupied = ( game.boxIdsArray[rowIndex][columnIndex] === game.playerCurrentTurn )
                    if ( occupied === true ) {
                      sequential++
                      if ( sequential === 3 ) {
                        win = true;
                      } else {
                        win = false;
                      }
                    } else {
                      sequential = 0;
                    }
                  }
                }

                //across
                var win;
                var sequential;
                for ( columnIndex = 0 ; rowIndex < session.rowCount ; rowIndex++ ) {
                  for ( rowIndex = 0 ; rowIndex < session.rowCount ; rowIndex++ ) {
                    var occupied = ( game.boxIdsArray[rowIndex][columnIndex] === game.playerCurrentTurn )
                    if ( occupied === true ) {
                      sequential++
                      if ( sequential === 3 ) {
                        win = true;
                      } else {
                        win = false;
                      }
                    } else {
                      sequential = 0;
                    }
                  }
                }
                if (win) {
                debugger;
                }
                //diagonal

              //if yes
                //set game.winner to <playerNumber>
                //increment <playerNumber>'s score
                //present winner's message (includes 'play again?')
              //else
                //switch game.playerCurrentTurn to <otherPlayer>
                //present message to <otherPlayer> indicating its their turn
              console.log("checkIfWon");
            },
            clickSquare: function (event) {
              tag = event.target.id;
              className = event.target.className;
              if ( tag ) { 
                //get the row of the target
                var child = document.getElementById(tag);
                var parent = child.parentNode;
                var children = parent.children;
                var count = children.length;
                var child_index;
                for (var i = 0; i < count; ++i) {
                  if (child === children[i]) {
                    column = i;
                    break;
                  }
                }
                //get the column of the target
                var child = document.getElementById(tag).parentNode;
                var parent = child.parentNode;
                var children = parent.children;
                var count = children.length;
                var child_index;
                for (var i = 0; i < count; ++i) {
                  if (child === children[i]) {
                    row = i;
                    break;
                  }
                }
                //input player's name in the relevant space in game.boxIdsArray
                game.boxIdsArray[row][column] = game.playerCurrentTurn;

                //switch image to the selected image
                if ( game.playerCurrentTurn === 1 ) {
                  event.target.src = session.playerOneImage;
                } else {
                  event.target.src = session.playerTwoImage;
                }
                
                //check if winner
                game.checkIfWon();
              }
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

        //stamp blank session.boxIdsArray into game
        game.boxIdsArray = session.boxIdsArray;

        //add event listener for boxes
        var board = document.getElementsByClassName("board")[0];
        board.addEventListener("click",game.clickSquare);

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
            newRow.style.height = (String(height) + "rem");
            parentBoard.appendChild(newRow);
            session.boxIdsArray.push([]);
            for ( var columnIndex = 0 ; columnIndex < session.rowCount ; columnIndex++ ) {
              var parentBoardRow = document.getElementsByClassName("boardRow")[rowIndex];
              var newBox = document.createElement("img");
              newBox.className = "goCenter tile";
              newBox.src = "images/blank.png";
              boxTag = "_" + ( rowIndex + 1 ) + "_" + ( columnIndex + 1 )
              width = ( module.boardWidthRem / session.rowCount );
              newBox.style.width = (String(width) + "rem");
              newBox.id = boxTag;
              parentBoardRow.appendChild(newBox);
              //add boxTag to session.boxIdsArray
              session.boxIdsArray[rowIndex].push("");
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