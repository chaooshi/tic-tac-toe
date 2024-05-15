import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Board } from "../components/Board";

describe("Board", () => {
  const squares = Array(9).fill(null);
  test("renders 9 squares", () => {
    render(<Board squares={squares} onClick={() => {}} />);
    expect(screen.getAllByRole("button").length).toBe(9);
  });

  test("applies winSquare class to winning squares", () => {
    render(
      <Board squares={squares} onClick={() => {}} winSquares={[0, 1, 2]} />
    );

    // Check if the squares that should have the winSquare class actually have it
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveClass("winSquare");
    expect(buttons[1]).toHaveClass("winSquare");
    expect(buttons[2]).toHaveClass("winSquare");

    // Ensure that other squares do not have the winSquare class
    expect(buttons[3]).not.toHaveClass("winSquare");
    expect(buttons[4]).not.toHaveClass("winSquare");
    expect(buttons[5]).not.toHaveClass("winSquare");
    expect(buttons[6]).not.toHaveClass("winSquare");
    expect(buttons[7]).not.toHaveClass("winSquare");
    expect(buttons[8]).not.toHaveClass("winSquare");
  });
});
