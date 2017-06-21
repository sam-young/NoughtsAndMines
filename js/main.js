//functions
var buildGameBoard = function () {
  //set reasonable limits for grid size and win threshold
  if ( module.gridWidth > 25 ) { module.gridWidth = 25 };
  if ( module.winThreshold > module.gridWidth ) { module.winThreshold = module.gridWidth };
  var total = ( module.gridWidth * module.gridWidth )
  for ( index = 0 ; index < total ; index++ ) {
    var newImg = document.createElement("img");
    newImg.src = "images/blank.png";
    imgDim = ( (40/module.gridWidth) * .98 ) + "rem";
    newImg.style.width = imgDim;
    newImg.style.height = imgDim;
    newImg.id = index;
    document.getElementById("board").appendChild(newImg);
    module.gameArray.push(index);
    module.occupiedArray.push(0);
    document.getElementById("board").addEventListener("click",clickSquare)
    document.getElementById("board").style.display = "inline-block";
    document.getElementById("newGameButton").style.color = "black";
    document.getElementById("newGameButton").style.cursor = "pointer";
    document.getElementById("newGameButton").addEventListener("click", function() { newGame(true) });
  }
};

var clickSquare = function (event) {
  squareId = event.target.id;
  if ( squareId !== "board" && module.occupiedArray[squareId] === 0 && module.gameWinner === "" ) {
    if ( module.currentPlayer === 1 ) {
      event.target.src = "images/1.png";
    } else {
      event.target.src = "images/2.png";
    }
    module.occupiedArray[squareId] = module.currentPlayer;
    var playerWon = checkIfWon();
    if ( playerWon ) {
      if ( module.currentPlayer === 1 ) {
        module.gameWinner = module.playerOneName;
        document.getElementById("instructions").textContent = module.playerOneName + " Wins!";
      } else {
        module.gameWinner = module.playerTwoName;
        document.getElementById("instructions").textContent = module.playerTwoName + " Wins!";
      }
      document.getElementById("board").style.cursor = "not-allowed";
    } else {
      // switch Player
      selectPlayer(false);
    }
  }
};

var checkIfWon = function () {

  //build array of both players' sequences - diagonal Right To Left
  
  var outerColumnIndex = ( module.gridWidth - 1 )
  var outerRowIndex = ( module.gridWidth - 1 )
  while ( outerColumnIndex >= 0 ) {
    var innerColumnIndex = outerColumnIndex
    var innerRowIndex = outerRowIndex
    while ( innerRowIndex < module.gridWidth && innerColumnIndex >= 0 ){
      //calculate item No.
      item = ( ( innerRowIndex ) * module.gridWidth ) + ( innerColumnIndex )
      module.diagR2LSequences.push(module.occupiedArray[item]);
      // increment Inner Loop
      innerColumnIndex--;
      innerRowIndex++;
    }
    // insert break value
    module.diagR2LSequences.push("");
    // increment Outer Loop
    if ( outerRowIndex == 0 ) {
      outerColumnIndex--;
    } else {
      outerRowIndex--;
    }
  }

  var outerColumnIndex = 0
  var outerRowIndex = ( module.gridWidth - 1 )
  //build array of both players' sequences - diagonal Left To Right
  while ( outerColumnIndex < module.gridWidth ) {
    var innerColumnIndex = outerColumnIndex
    var innerRowIndex = outerRowIndex
    while (  innerRowIndex < module.gridWidth && innerColumnIndex < module.gridWidth  ){
      //calculate item No.
      item = ( ( innerRowIndex ) * module.gridWidth ) + ( innerColumnIndex )
      module.diagL2RSequences.push(module.occupiedArray[item]);
      // increment Inner Loop
      innerColumnIndex++;
      innerRowIndex++;
    }
    // insert break value
    module.diagL2RSequences.push("");
    // increment Outer Loop
    if ( outerRowIndex == 0 ) {
      outerColumnIndex++;
    } else {
      outerRowIndex--;
    }
  }

  //build array of both players' sequences - across
  var total = ( module.gridWidth * module.gridWidth );
  for ( index = 0 ; index <= ( module.occupiedArray.length - module.gridWidth ) ; index = ( index + module.gridWidth ) ) {
    for ( ind = 0 ; ind < module.gridWidth ; ind++ ) {
      var item = ( index + ind );
      module.acrossSequences.push(module.occupiedArray[item]);
    }
    // insert break value
    module.acrossSequences.push("");
  }

  //build array of both players' sequences - down
  var total = ( module.gridWidth * module.gridWidth );
  for ( index = 0 ; index < module.gridWidth ; index++ ) {
    for ( ind = 0 ; ind <= ( total - module.gridWidth ) ; ind = ( ind + module.gridWidth ) ) {
      var item = ( ind + index );
      module.downSequences.push(module.occupiedArray[item]);
    }
    // insert break value
    module.downSequences.push("");
  }

  //initialise and clear win variable
  var winDetected = false;

  //iterate through each array, noting win if sequence reaches win threshold
  var sequential = 0;
  for ( seqInd = 0 ; seqInd < module.acrossSequences.length ; seqInd++ ) {
    if ( module.acrossSequences[seqInd] === module.currentPlayer ) {
      sequential++;
    } else {
      sequential = 0;
    }
    if ( sequential === module.winThreshold ) {
      winDetected = true;
    }
  }

  //iterate through each array, noting win if sequence reaches win threshold
  var sequential = 0;
  for ( seqInd = 0 ; seqInd < module.downSequences.length ; seqInd++ ) {
    if ( module.downSequences[seqInd] === module.currentPlayer ) {
      sequential++;
    } else {
      sequential = 0;
    }
    if ( sequential === module.winThreshold ) {
      winDetected = true;
    }
  }

  //iterate through each array, noting win if sequence reaches win threshold
  var sequential = 0;
  for ( seqInd = 0 ; seqInd < module.diagL2RSequences.length ; seqInd++ ) {
    if ( module.diagL2RSequences[seqInd] === module.currentPlayer ) {
      sequential++;
    } else {
      sequential = 0;
    }
    if ( sequential === module.winThreshold ) {
      winDetected = true;
    }
  }

  //iterate through each array, noting win if sequence reaches win threshold
  var sequential = 0;
  for ( seqInd = 0 ; seqInd < module.diagR2LSequences.length ; seqInd++ ) {
    if ( module.diagR2LSequences[seqInd] === module.currentPlayer ) {
      sequential++;
    } else {
      sequential = 0;
    }
    if ( sequential === module.winThreshold ) {
      winDetected = true;
    }
  }

  //clear out all sequences arrays
  module.acrossSequences.length = 0;
  module.downSequences.length = 0;
  module.diagR2LSequences.length = 0;
  module.diagL2RSequences.length = 0;

  return winDetected;

};

var newGame = function (reset) {
  document.getElementById("newGameButton").removeEventListener("click", function() { newGame(true) });
  if ( reset ) {
    var total = ( module.gridWidth * module.gridWidth )
    for ( index = 0 ; index < total ; index++ ) {
      var currentImg = document.getElementsByTagName("img")[index];
      currentImg.src = "images/blank.png";
      module.occupiedArray[index] = 0;
    }
  }
  module.gameWinner = "";
  selectPlayer(true);
  document.getElementById("newGameButton").addEventListener("click", function() { newGame(true) });
  document.getElementById("board").style.cursor = "pointer";
}

var selectPlayer = function (random) {
  if ( random ) {
    module.currentPlayer = Math.round(Math.random()) + 1;
  } else {
    if ( module.currentPlayer === 1 ) {
      module.currentPlayer = 2;
    } else {
      module.currentPlayer = 1;
    }
  }
  if ( module.currentPlayer === 1 ) {
    document.getElementById("instructions").textContent = ( module.playerOneName + "'s Turn (Crosses)" )
  } else {
    document.getElementById("instructions").textContent = ( module.playerTwoName + "'s Turn (Noughts)" )
  }
}

var newInput = function (object,key,label,message) {
  document.getElementById("inputWrapper").style.display = "block";
  document.getElementById("inputMessage").textContent = message;
  document.getElementById("inputBox").placeholder = label;
  if (label === "Enter Grid Width/Height & Hit Enter" || label === "Enter Win Threshold & Hit Enter") {
    document.getElementById("inputBox").type = "number";
  } else {
    document.getElementById("inputBox").type = "text";
  }
  document.getElementById("inputBox").focus();
};

var submitP1 = function (event) { submitInput(event,document.getElementById("inputBox").type,document.getElementById("inputBox").value,module,"playerOneName"); };
var submitP2 = function (event) { submitInput(event,document.getElementById("inputBox").type,document.getElementById("inputBox").value,module,"playerTwoName"); };
var submitGW = function (event) { submitInput(event,document.getElementById("inputBox").type,document.getElementById("inputBox").value,module,"gridWidth"); };
var submitWT = function (event) { submitInput(event,document.getElementById("inputBox").type,document.getElementById("inputBox").value,module,"winThreshold"); };

var submitInput = function (event,type,value,object,key) {
  if ( ( event.key === "Enter" ) || ( event.type === "click" ) ) {
    if ( value ) {
      //submit value
      switch ( type ) {
        case "number":
          object[key] = Number(value);
          break;
        case "text":
          object[key] = String(value);
          break;
        default:
          object[key] = String(value);
      }
      document.getElementById("inputBox").value = "";
      var submitButton = document.getElementById("submitButton");
      var inputBox = document.getElementById("inputBox");
      //determine which config to apply next
      switch ( key ) {
        case "playerOneName":
          //changeup new input config
          newInput(module,"playerTwoName","Enter Player Two Name & Hit Enter","Please enter Player Two's name.");
          //change eventlistener on submit button
          inputBox.removeEventListener("keydown",submitP1);
          inputBox.addEventListener("keydown",submitP2);
          break;
        case "playerTwoName":
          //changeup new input config
          newInput(module,"gridWidth","Enter Grid Width/Height & Hit Enter","Please enter your desired Grid Width.");
          //change eventlistener on submit button
          inputBox.removeEventListener("keydown",submitP2);
          inputBox.addEventListener("keydown",submitGW);
          break;
        case "gridWidth":
          //changeup new input config
          newInput(module,"winThreshold","Enter Win Threshold & Hit Enter","Please enter your desired Win Threshold");
          //change eventlistener on submit button
          inputBox.removeEventListener("keydown",submitGW);
          inputBox.addEventListener("keydown",submitWT);
          break;
        default:
          //remove input config
          document.getElementById("inputWrapper").style.display = "none";
          //build grid
          buildGameBoard(false);
          newGame(false);
      }
    }
  }
}

//run on load
module = {
  gameArray: [],
  occupiedArray: [],
  acrossSequences: [],
  downSequences: [],
  diagL2RSequences: [],
  diagR2LSequences: [],
  currentPlayer: null,
  gameWinner: ""
};
newInput(module,"playerOneName","Enter Player One Name & Hit Enter","Please enter Player One's name.");

//add event listeners
document.getElementById("inputBox").addEventListener("keydown",submitP1);
document.getElementById("resetButton").addEventListener("click", function () { location.reload() });

