# 🚢 Battleship

A browser-based implementation of the classic Battleship game. This project prioritized Test-Driven Development (TDD) using Jest, ensuring core game logic (ship logic, hit detection, and win/loss rules) was mathematically verified before starting any user interface (UI) work.

Key technical focus points include:
- Test-Driven Development (TDD) with Jest
- Factory Functions and the Module Pattern for code organization
- Strict Separation of Concerns (logic vs. DOM rendering)

## Live Demo

[View on GitHub Pages](https://inaladevi.github.io/battleship/)

## Project Features

- **Test-Driven Development (TDD):** All core logic for ships, gameboards, and players was built and verified using Jest before any UI was added.
- **Factory Function Architecture:** Objects are created using factory functions to keep data private and avoid issues with the `this` keyword.
- **Decoupled DOM Logic:** A strict separation is maintained between the game’s mathematical logic and the code that updates the browser interface.
- **Turn-Based Game Loop:** Manages the flow of the game, including player attacks, hit/miss tracking, and win condition checks.
- **Computer Opponent:** Includes logic for a computer player to make random, legal moves while ensuring it never shoots the same coordinate twice.
- **Randomized Ship Placement:** A system to deploy the fleet randomly while preventing ships from overlapping or going off the board edges.
- **Grid-Based UI:** Built with CSS Grid and HTML5 data attributes to bridge the visual board with the underlying JavaScript coordinate system.


## Built With

- **HTML5**
- **CSS3**
  - CSS Grid (Coordinate mapping)
  - CSS Flexbox
  - Custom Color Variables & Tactical HUD Styling
- **JavaScript (ES6+)**
  - Factory Functions & Modules
  - Event Delegation
  - Array Methods (`filter`, `some`, `forEach`)
- **Jest** (JavaScript Testing Framework)

## Preview

![Battleship Preview](battleship-preview.png)