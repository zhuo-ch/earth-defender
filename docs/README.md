## Missile Command

### Game

Missile Command is a web game made with vanilla JS and Canvas. Players will control an Earth defense turret with the goal of shooting down all incoming missiles.

- Missiles are generated and will fall to the ground.
- Player's turret is static and clicks will shoot player missiles to the point clicked.
- Player missiles will explode upon reaching destination, destroying everything in the blast radius.

### MVP

- [ ] Start game with incoming missiles
- [ ] Player can shoot missiles with proper destination/explosion logic
- [ ] Running timers and high scores

### Technologies and challenges

This app will be built with vanilla JS and Canvas. There will be lot of things flying around and figuring out how to put it together will be tough. The best way to approach this this issues would be to separate out all the parts and have math and logic done as soon as possible.

* board.js handles the initialization of the game.
* missiles.js handles all the logic involved with missile movement and interaction
* player.js handles player input and instantiates missiles accordingly

### Wireframes

This app is a single page app with a title, main canvas grid, where all controls will be handled, and a footer for personal links



### Implementation Timeline

#### Day 1

* Initial setup of page
* Deploy canvas board
* Generate Missiles

#### Day 2

* Player input handling
* Missile interaction

####

* Timers and high scores
* Finalize artwork
