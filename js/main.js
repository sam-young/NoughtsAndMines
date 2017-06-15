var gameArray = [];
var gameWinner = "";

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
        rowCount: 10,
        requiredToWin: 3,
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
            checkIfWon: function (event) {
                //setup variables
                var win;
                var sequential;
                //across
                for ( rowIndex = 0 ; rowIndex < session.rowCount ; rowIndex++ ) {
                  for ( columnIndex = 0 ; columnIndex < session.rowCount ; columnIndex++ ) {
                    var occupied = ( gameArray[rowIndex][columnIndex] === game.playerCurrentTurn )
                    if ( occupied === true ) {
                      sequential++
                      if ( sequential === session.requiredToWin ) {
                        win = true;
                      }
                    } else {
                      sequential = 0;
                    }
                  }
                }
                //down
                for ( columnIndex = 0 ; columnIndex < session.rowCount ; columnIndex++ ) {
                  for ( rowIndex = 0 ; rowIndex < session.rowCount ; rowIndex++ ) {
                    var occupied = ( gameArray[rowIndex][columnIndex] === game.playerCurrentTurn )
                    if ( occupied === true ) {
                      sequential++
                      if ( sequential === session.requiredToWin ) {
                        win = true;
                      }
                    } else {
                      sequential = 0;
                    }
                  }
                }
                //diagonal top left to bottom right
                startArray = [];
                //set the starting row, subtract one due to the array indexing to zero, and one due to the corner square
                startArray[0] = ( ( session.rowCount - ( session.requiredToWin - 1 ) ) - 1  );
                //set the starting column to column 1
                startArray[1] = 0;
                //initial condition
                var columnIndexOuter = startArray[1];//only start from the far right
                var columnIndexInner = startArray[1]; //horizontal start of hunt
                rowIndexOuter = startArray[0]
                while ( columnIndexOuter < session.rowCount ) {
                  var rowIndexInner = rowIndexOuter;
                  var columnIndexInner = columnIndexOuter;
                  while ( ( rowIndexInner < session.rowCount ) && ( columnIndexInner < session.rowCount )) {
                    var occupied = ( gameArray[rowIndexInner][columnIndexInner] === game.playerCurrentTurn )
                    if ( occupied === true ) {
                      sequential++
                      if ( sequential === session.requiredToWin ) {
                        win = true;
                      }
                    } else {
                      sequential = 0;
                    }
                    if ( columnIndexInner !== session.rowCount ) {
                      columnIndexInner++;
                      rowIndexInner++;
                    }
                  }
                  //increment or decrement
                  if ( rowIndexOuter === 0 ) {
                    columnIndexOuter++
                  } else {
                    rowIndexOuter--
                  }
                }
                //diagonal top right to bottom left
                startArray = [];
                //set the starting row, subtract one due to the array indexing to zero, and one due to the corner square
                startArray[0] = ( ( session.rowCount - ( session.requiredToWin - 1 ) ) - 1  );
                //set the starting column to column 1
                startArray[1] = ( session.rowCount - 1 );
                //initial condition
                var columnIndexOuter = startArray[1];//only start from the far left
                var columnIndexInner = startArray[1]; //horizontal start of hunt
                rowIndexOuter = startArray[0]
                while ( columnIndexOuter > 0 ) {
                  var rowIndexInner = rowIndexOuter;
                  var columnIndexInner = columnIndexOuter;
                  while ( ( rowIndexInner < session.rowCount ) && ( columnIndexInner < session.rowCount )) {
                    var occupied = ( gameArray[rowIndexInner][columnIndexInner] === game.playerCurrentTurn )
                    if ( occupied === true ) {
                      sequential++
                      if ( sequential === session.requiredToWin ) {
                        win = true;
                      }
                    } else {
                      sequential = 0;
                    }
                    if ( columnIndexInner !== session.rowCount ) {
                      columnIndexInner--;
                      rowIndexInner++;
                    }
                  }
                  //increment or decrement
                  if ( rowIndexOuter === 0 ) {
                    columnIndexOuter--
                  } else {
                    rowIndexOuter--
                  }
                }
                return win;
            },
            clickSquare: function (event) {
              tag = event.target.id;
              className = event.target.className;
              if ( tag && !gameWinner ) { 
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
                //input player's name in the relevant space in gameArray
                gameArray[row][column] = game.playerCurrentTurn;

                //switch image to the selected image
                if ( game.playerCurrentTurn === 1 ) {
                  event.target.src = session.playerOneImage;
                } else {
                  event.target.src = session.playerTwoImage;
                }
                
                //check if winner
                gameWinner = game.checkIfWon(event);
                if ( gameWinner ) {
                  if ( game.playerCurrentTurn === 1 ) { winnerName = session.playerOneName } else { winnerName = session.playerTwoName };
                  module.message.textContent = ( winnerName + " Wins!" )
                } else {
                  //change message to indicate turn change
                  if ( game.playerCurrentTurn === 1 ) {
                    module.message.textContent = ( session.playerTwoName + "'s Turn" )
                    game.playerCurrentTurn = 2;
                  } else {
                    module.message.textContent = ( session.playerOneName + "'s Turn" )
                    game.playerCurrentTurn = 1;
                  };
                } 
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
          game.resetButton.textContent = "New";
          game.resetButton.id = "reset";
          var parent = document.getElementsByTagName("header")[0];
          parent.appendChild(resetButton);
        } else {
          game.resetButton = document.getElementById("reset")
        };

        //add resetButton event listener
        game.resetButton.addEventListener("click", function() { session.buildNewGame() } );

        //COPY blank session.boxIdsArray into game
        delete gameArray;
        gameArray = [];
        for ( index = 0 ; index < session.boxIdsArray.length ; index++ ) { //loop items in array
          gameArray.push([]);
          for ( ind = 0 ; ind < session.boxIdsArray[index].length ; ind++ ) { //loop items within each item
            gameArray[index].push(session.boxIdsArray[index][ind]);
          }
        }

        //reset images to blank
        for ( index = 0 ; index < document.getElementsByClassName('tile').length ; index++ ) {
          document.getElementsByClassName('tile')[index].src = "images/blank.png";
        }

        //clear out gameWinner variable
        gameWinner = "";

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
              document.getElementsByTagName('input')[0].focus();
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

    //add enterkey event listener
    document.addEventListener("keyup", function (event) { 
      if ( ( event.key === "Enter" ) && ( session.playerTwoName === "" )) {
        session.submitPlayerName(session.inputField.value) 
      } 
    });

    //send the cursor to input
    document.getElementsByTagName('input')[0].focus();

    }//end buildNewSession()
  };//end module object

//add module event listeners
module.goButton.addEventListener("click",function () { module.buildNewSession() });

}//end buildNewModule()

//call build new module
buildNewModule();