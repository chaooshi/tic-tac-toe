import React from "react";
import { Square } from "./Square";

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

export { Board };
