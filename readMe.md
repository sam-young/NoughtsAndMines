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


### General Notes/Realisations

- The function for new game should be stored within the session object, and the function for new session within the module object.
- Set the return home button to reload the page as a first step.
- Realised that there will never be more than two players in any one game, so the abstraction of the submitPlayerName functions is of little benefit, especially because the process of submitting player one name vs player two's is so different.
- Decided buildGameBoard should be part of the setup and not part of the buildNewGame function.
- Determined the resetButton should be created as part of the buildNewGame function as this is a property of the game object.
