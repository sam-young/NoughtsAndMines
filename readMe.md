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

#### Development Decisions

I decided that each game would be created as a new object, and all persisting values such as scores and player names would be global variables.

The user is to be guided to each step, and they wont be allowed to proceed to the next until they have successfully completed the current stage.

However, in the case of entering their name, if they do not enter a name, they will be given generic names so they can proceed with the game.


