# Tic Tac Toe in React

## Project Overview

This is a simple Tic Tac Toe game built with React. The backbone of the application is based on the [React tutorial](https://react.dev/learn/tutorial-tic-tac-toe). The project follows a component-based architecture and includes unit tests for all components to ensure reliability and maintainability. Styling is handled using Tachyons, a functional CSS toolkit, and Jest is used for unit testing.

## Project Structure

The project directory is organized as follows:

```
tic-tac-toe
├── src
│ ├── tests
│ │ ├── Board.spec.js
│ │ ├── Game.spec.js
│ │ └── Square.spec.js
│ ├── components
│ │ ├── Board.js
│ │ ├── Game.js
│ │ └── Square.js
│ ├── index.css
│ └── index.js
├── package.json
```

### Components

- **Board.js**: Represents the Tic Tac Toe board.
- **Game.js**: Manages the game state and logic.
- **Square.js**: Represents an individual square on the board.

### Tests

- **Board.spec.js**: Unit tests for the Board component.
- **Game.spec.js**: Unit tests for the Game component.
- **Square.spec.js**: Unit tests for the Square component.

## Styling

Tachyons is used for styling the components. It provides a set of CSS utility classes that help in quickly building responsive and visually appealing UI components.

## Unit Testing

Jest is used to write and run unit tests. The tests ensure that each component functions correctly and that changes do not introduce any regressions.

### Running Tests

To run the tests and see the coverage report, use the following command:

```sh
npm run test:coverage
```

This command will run all the tests and generate a coverage report, which will show <strong>100% coverage </strong>for the project.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/chaooshi/tic-tac-toe.git
   ```

2. Navigate to the project directory:

   ```sh
   cd tic-tac-toe
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

### Running the Application

To start the application, run:

```sh
npm start

```

The application will be available at http://localhost:3000.

### Running Tests

To run the unit tests:

```sh
npm test

```

To run the tests and see the coverage report:

```sh
npm run test:coverage
```

## Contact

If you have any questions or feedback, feel free to reach out at [my mail](mailto:chaooshi@gmail.com).

---

Enjoy playing Tic Tac Toe!
