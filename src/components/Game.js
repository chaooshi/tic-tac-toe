import React from "react";
import { Board } from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  jumpTo(i) {
    this.setState({
      stepNumber: i,
      xIsNext: i % 2 === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winSquares = calculateWinner(current.squares);
    const winner = winSquares ? current.squares[winSquares[0]] : null;
    const status =
      this.state.history.length === 10
        ? "game is a draw"
        : winner
        ? `Winner: ${winner}`
        : `Next player: ${this.state.xIsNext ? "X" : "O"}`;

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : "Go to game start";
      return (
        <div key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className={
              this.state.stepNumber === move
                ? "f6 b link dim br1 ba ph3 pv2 mb2 mid-gray"
                : "f6 link dim br1 ba ph3 pv2 mb2 mid-gray"
            }
          >
            {desc}
          </button>
        </div>
      );
    });

    return (
      <div className="game bg-washed-yellow">
        <div className="game-board">
          <Board
            onClick={(i) => this.handleClick(i)}
            squares={current.squares}
            winSquares={winSquares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{moves}</div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];
  for (let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

export { Game };
