



//present welcome screen with introduction and play button

//click play

  //present player one name entry input

  //click submit player one name

    //present player two name entry input

    //click submit player two name

    //present game board with instructions beneath

      //randomly determine which player is to go first

      //indicate to player x that its their turn

      //player click a board section

        //change graphic of clicked section to indicate clicked

        //CHECK if player has won the game

          //if so --- present winning messsage, ask 'Play again?'

            //if yes:

              //reset board

              //randomly determine which player is to go first

              //indicate to player x that its their turn

            //if no:

              //return to welcome screen

          //if no --- CHECK if only one space remains

            //if so --- mark remaining space as clicked by opposing player

              //CHECK if opposing player has won the game

                //if so --- present winning message to opposing player

                //if no --- present draw message

      //player click 'restart game'

        //present confirmation message

          //if yes:

            //reset board

            //randomly determine which player is to go first

            //indicate to player x that its their turn

          //if no:

            //return to game

      //player click 'home'

            //return to welcome screen
