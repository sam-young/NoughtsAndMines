Tic Tac Toe - Read Me

This project is a new interpretation of the popular game.

### Goals & Starting Philosophies

My key goals are to build a user experience that is seamless, and makes sense from start to finish.

I started development by building a wireframe map of the core html page with divs, with the intention that each stage of the game would stay true to this format (three horizontally opposed sections with internal elements, with a 1:2 height to width aspect ratio, positioned centrally on the page).

The welcome page of the app was planned to have a title for the game in the first section, a welcome message or description in the second, and something for the user to interact with in the third, such as a play button to start the game going. 

### Phase One

#### User Steps

I planned phase one to be building the basic flow of the game including the following steps:

- User clicks play
- User enters player one name and then continue
- User enters player two name and then continue
- The game board is built, and the user is given a message to indicate which player is to go first
- Each player then takes turns selecting a square until a winner is found or draw
- The user either opts to play again, or return home
- A count is kept of the winners & draws until the user returns home when it is reset

#### Development Plan Steps

- List all the user actions that will occur in the game
    - Click play
    - Submit player name
    - Return home
    - Select a square
    - Reset game

- List all the program actions that will occur in the game
    - Present dialog for name input
    - Update scoreboard name with inputted name
    - Create a 'game' object and set initial values
    - Update content of clicked square to indicate clicked by player 'x'
    - Check after selection if player 'x' has won the game
    - Reset all squares back to original state on reset
    - Increment the winning player's scorecard on win
    - Increment the draw scorecard on draw
    - Determine at random which player is to go first
    - Tell the user who's turn it is
    - Create a 'session' object and set initial values
    - Create a 'module' object and set initial values
    -

#### Development Decisions

I decided that each game would be created as a new object, and all persisting values such as scores and player names would be stored within an object known as a 'session'.

These variables would persist for as many games as the users wanted, and retained as long as they didn't return home or refresh their browser.

The user is to be guided to each step, and they wont be allowed to proceed to the next until they have successfully completed the current stage.

However, in the case of entering their name, if they do not enter a name, they will be given generic names so they can proceed with the game.

I intended to try to use as few css classes as possible, by trying to push a small number of conventions through the game, so similar items looked and behaved in a similar way, such as the play button and the clicked tiles.

This was partly because I wanted to reuse the same elements as much as possible.

Determined that it was necessary to have another object type 'module' to store all variables that need to be maintained before a session necessarily exists.

### Phase Two

Phase two was the styling and animation of events in the game, and the general formatting of elements to improve appearance.


### Sequence of events

1. The user lands on the welcome page.
    1. A new Module is created and initial values are set
2. The user may enter a value in the Grid Dimensions input and the Required To Win input, then must hit the Play button.
    1. A new Session is created and initial values are set
    2. If the user input for the Grid Dimensions and Required For Win inputs are greater than one, this value is assigned to global variables, otherwise the defaults of three are assigned.
    3. 
    3. The user interface is modified to show one input box for Player One's name entry, and buttons are changed to one Home button and one Submit button. The welcome message is changed to one reading "Enter Player One Name".
3. The user enters Player One's name, and clicks the Submit button.
    1. The input provided is validated as not empty, and if so, sets the property in the Session object to the entered value.
    2. The message is changed to ask the user for Player Two's name.
4. The user enters Player Two's name and clicks the Submit button.
    1. The input provided is validated as not empty, and if so, sets the property in the Session object to the entered value.
    2. The user interface is changed to remove the input box, move the home button to the top left hand corner, remove the submit button, place a new "New Game" button in the top right hand corner.
    3. The buildGameBoard() function is called, which appends row elements for the required number of rows, and image elements for the required columns.
    4. The standard blank image is set as src for each image element.
    5. A prototype array is built for the game board as a property in the Session object, which consists of nested arrays to represent the board grid.
    5. The buildNewGame() function is called, which clones the prototype array from the session into a global variable, this will be used to monitor the spaces occupied by each user as the game goes on.
    6. The determineFirstPlayer() function is called, which randomly selects which player shall go first and presents an indicative message on the message display, this message also shows which player number they have been allocated.
    7. The game then awaits user input in the form of the player clicking a square, the Home button, or the New Game Button.
5. The user may then click a square.
    1. The program then determines which square the user clicked, and to which element of the Game Array the square corresponds.
    2. The program then replaces the image of the clicked square with the player's own image, and adds the player's player number to the square's corresponding element in the Game Array.
    3. The program then systematically checks for winning combinations on the board in four stages:
        - Across
        - Vertically
        - Diagonally Sloping Down
        - Diagonally Sloping Up
        
         In each stage, each element in the Game Array is examined in order, proceeding from in order according to the stage, and a sequential square counter is held. If the sequential square counter at any point reaches the win threshold, the function returns the result of True, which is set to a global variable. If no win combination is found, the central message is changed to indicate a player turn change.
6. The user may click the New Game button.
    1. This calls the buildNewGame() function, which clears out the Game Array and replaces it with the prototype from the Session object. The first player is determined as normal.
7. The user may click the Home button.
    1. This calls the returnHome() function, which reloads the app, setting all values to their defaults and presenting the initial welcome screen.



### General Notes/Realisations

- The function for new game should be stored within the session object, and the function for new session within the module object.
- Set the return home button to reload the page as a first step.
- Realised that there will never be more than two players in any one game, so the abstraction of the submitPlayerName functions is of little benefit, especially because the process of submitting player one name vs player two's is so different.
- Decided buildGameBoard should be part of the setup and not part of the buildNewGame function.
- Determined the resetButton should be created as part of the buildNewGame function as this is a property of the game object.
- I'm finding placing the various items as properties of their most logical object is helpful as it assists to know where they are stored, born, and modified.
- Moved all functions to the top of the property definitions list.
- Discovered that you cannot reference anything in an object until the object has been fully defined.
- Decided to index boxes with ids (rowNumber_columnNumber)

#### Major Realisation

I realised that making the app into a 'staircase', with each function and object having access to progressively more functions and object properties, had been a major mistake, as now it was very difficult to test, as the items are only available within their own limited scopes.

A better way of doing it would have been to have one global app object, where all functions and monitors were housed, and for this to be used to call all other functions.

## Game

The game is the common game of Tic Tac Toe, with some minor expansions, such as allowing for customisable grid sizes, and customisable win thresholds.

The user interface has been styled to be reminiscent of an early incantation of Microsoft Minesweeper.

The game has two players, and revolves around attempting to select a specified number of items in a row, either vertically, horizontally, or diagonally.

As the game is turn based, users can opt to either block the opposing player's attempts to win, or try to make their own sequence without them noticing.


## Usage Notes

The user is greeted by a welcome screen, with a play button and two inputs.

One input is for a user specified width for the grid, and the other for the total number of sequential boxes required for a win.

The user is not required to enter a figure in these boxes, as the default value for each is three.

Non-number values will be ignored, and the default will persist.

The next stage, after the user has clicked Play, is the entry of Player One's name. The user must enter some text and then hit the enter key or click submit.

A value is required for this field before the user will be taken to the next stage.

Following Player One name entry is Player Two name entry, which behaves in an identical manner.

Once the user has submitted a value for Player Two name, a new game is created, and the first player is randomly decided.

A message is printed to the screen to show who should go first.

When the user clicks a square, the square will change to either a one or a two, for player one and two respectively.

When the required win threshold is reached, a message will be printed to the screen indicating who has won.

At this stage no further squares can be clicked.

The user will be then able to click the New Game button, which will retain their player names and start a fresh game.

Once again the first player will be randomly decided and advised via the central message box.

At any time, the user can click the Home button, which will return them to the welcome screen and reset the user inputted values.



