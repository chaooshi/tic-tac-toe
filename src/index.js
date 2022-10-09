import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "tachyons";

function Square(props) {
  return (
    <button className={props.class} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick(i);
        }}
        class={
          this.props.winSquares && this.props.winSquares.includes(i)
            ? "winSquare"
            : "square"
        }
      />
    );
  }

  render() {
    let boardSquares = [];
    for (let row = 0; row < 3; row++) {
      let boardRow = [];
      for (let col = 0; col < 3; col++) {
        boardRow.push(
          <span key={row * 3 + col}> {this.renderSquare(row * 3 + col)}</span>
        );
      }
      boardSquares.push(<div className="board-row">{boardRow}</div>);
    }
    return <div>{boardSquares}</div>;
  }
}

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
    console.log(winSquares);
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
            className="f6 link dim br1 ba ph3 pv2 mb2 mid-gray"
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
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
