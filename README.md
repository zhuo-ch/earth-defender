### Earth Defender

A turret defense game inspired by Atari's "Missile Command" and built with JavaScript and HTML5 Canvas.
[Earth Defender](https://zhuo-ch.github.io/earth-defender/)

![Earth Defender GIF](/docs/earthDefender.gif)

The alien attack on earth has commenced and you're our only hope. You command the latest missile defense system known to man and have access to the world's most highly classified weapons - released for use by order of the *United Defense Initiation Edict* or UnDefInEd for short. Godspeed commander, we're counting on you.

## Instructions

* At the splash screen, players can either start a new game or view current high scores (local high scores only).
* Once a game has been initiated, players will have to defend against incoming enemy missiles.
* Missiles will appear at the top of the screen with a trajectory toward the ground.
* Intercept these missiles before they hit the ground and reduce your shields!
* Click on the screen to shoot at that point.
* Use keyboard keys ASDF to toggle weapons (Rocket, Cluster Bomb, Gravity Gun, and Laser, respectively).
* Take care, incoming missiles will be sent with increasing speed as the aliens adjust their tactics.
* We need you to hold out as long as possible but they're aiming for your shields and you're a sitting duck once your shields are depleted.

* Toggle music on/off by clicking on the music icon
* Toggle sound on/off by clicking on the speaker icon

## Technology and Implementation

Earth Defender was built with vanilla JavaScript and HTML5 Canvas. Most of the components are separated into their own classes with the major ones being:

* GameView - entry point, game initialization/ end/ restart, as well as user input difficulty timers.
* Game - handles gameplay, render cycles, and acts as a conduit for object interactions (missiles, collisions, etc.).
* Nav - display and sound handler. Tracks items that are rendered but do not affect actual gameplay (score, timer, shields, icons, sound, etc.)

JavaScript Structure: Each projectile is an instance of that projectile's class. This allows for delegation of drawing and collision logic to the object itself as well as an efficient way to handle sound effects. Each object instantiates a "new Audio()" object, allowing for sound layering. This separation of concerns also allowed for a robust utility file where many functions are shared between the various objects.

Canvas: With the exception of background images, gun icons, and sound icons, Earth Defender is drawn entirely on canvas. The basic shapes in use made this implementation feasible. However, canvas can be very unforgiving when trying to stylize elements. Rounded corners for buttons are a staple in today's web but drawing out something mildly complex can become laborious.

Misc: Collisions are handled by individual objects by sending properties to a universal collision function in the Util file. Object velocities are calculated with a trigonometric algorithm that standardizes velocity rather than using slope. This keeps objects moving at the same speed while allowing for incremental increases in speed.

## Future Implementations

Precision Mode: Players progress through "rounds" rather than a running countdown for shields (this feature is already in development but is not polished enough for release).

* Each round can be survived by shooting down ALL enemy missiles.
* Players will not have infinite ammo. The number of times the player can shoot is equal to the number of enemy missiles for that round.
* Each round will add an additional incoming missile.

More Weapons!! Several weapons were brainstormed for the initial game but never made it past the planning stage. These include:

* A fast shooting, high accuracy/low explosion radius, gun akin to Anti-Air/Flak.
* Homing rockets - long cool-down rockets that do the aiming for you.
