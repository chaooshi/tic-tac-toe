import { fireEvent, render, screen } from "@testing-library/react";
import { Square } from "../components/Square";
import "@testing-library/jest-dom";

describe("Square", () => {
  test("renders the button with value", () => {
    render(<Square value="X" onClick={() => {}} />);
    expect(screen.getByRole("button")).toHaveTextContent("X");
  });

  test("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<Square value="X" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
