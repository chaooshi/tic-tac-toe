import { render, screen, fireEvent } from "@testing-library/react";
import { Game } from "../components/Game";
import "@testing-library/jest-dom";

describe("Game", () => {
  test("updates the state when a square is clicked", () => {
    render(<Game />);
    const firstSquare = screen.getAllByRole("button")[0];
    fireEvent.click(firstSquare);
    expect(firstSquare).toHaveTextContent("X");
  });

  test("declares a player as the winner", () => {
    render(<Game />);
    const squares = screen.getAllByRole("button");
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X wins
    expect(screen.getByText(/winner: x/i)).toBeInTheDocument();
  });

  test("jumpTo method resets the game correctly", () => {
    render(<Game />);

    const squares = screen.getAllByRole("button");
    const button0 = squares[0];

    fireEvent.click(button0); // Simulate a move by Player X on the first square
    expect(button0).toHaveTextContent("X"); // Ensure the button has 'X' after the click

    fireEvent.click(screen.getByText("Go to game start"));
    expect(screen.getByText("Next player: X")).toBeInTheDocument();

    // Indicating a reset
    expect(button0).toHaveTextContent("");
  });

  test("displays a draw when all squares are filled without a winner", () => {
    render(<Game />);
    const moveSequence = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    moveSequence.forEach((index, move) => {
      const button = screen.getAllByRole("button")[index];
      fireEvent.click(button);
    });
    expect(screen.getByText("game is a draw")).toBeInTheDocument();
  });

  test("clicking move button jumps to the correct state", () => {
    render(<Game />);
    // Simulate a few moves
    const button0 = screen.getAllByRole("button")[0];
    fireEvent.click(button0); // move #1 : X

    const button1 = screen.getAllByRole("button")[1];
    fireEvent.click(button1); // move #2 : O

    const button2 = screen.getAllByRole("button")[2];
    fireEvent.click(button2); // move #3 : X

    // Now jump to move #1
    const firstMoveButton = screen.getAllByText("Go to move #1")[0];
    fireEvent.click(firstMoveButton);
    const gameInfo = screen.getByText("Next player: O");
    expect(gameInfo).toBeInTheDocument();
  });

  test("handleClick function returns early when square is already filled", () => {
    render(<Game />);
    const button0 = screen.getAllByRole("button")[0];
    fireEvent.click(button0); // move #1 : X
    expect(screen.getByText("X")).toBeInTheDocument();

    // It's O turn but it clicks on repetitive button
    const button1 = screen.getAllByRole("button")[0];
    fireEvent.click(button1); // move #2 : O

    // Since O's move was not accepted, it is still its turn
    const gameInfo = screen.getByText("Next player: O");
    expect(gameInfo).toBeInTheDocument();
  });

  test("handleClick function returns early when game is finished", () => {
    render(<Game />);
    const moveSequence = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    moveSequence.forEach((index, move) => {
      const button = screen.getAllByRole("button")[index];
      fireEvent.click(button);
    });
    const initialButtons = screen.getAllByRole("button");
    // Two extra move after game is draw
    fireEvent.click(screen.getAllByRole("button")[3]);
    fireEvent.click(screen.getAllByRole("button")[7]);

    const finalButtons = screen.getAllByRole("button");
    expect(finalButtons).toEqual(initialButtons);
  });
});
