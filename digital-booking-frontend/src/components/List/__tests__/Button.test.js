import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Button from "../index";
import { defaultMock } from "./mocks";

describe("Button Component", () => {
  test("should render component", () => {
   const { container } = render(<Button {...defaultMock} />);
   expect(container).toMatchSnapshot();
  });

  test("should call onClick", () => {
    const props = {
      ...defaultMock,
      onClick: jest.fn(),
    }
  render(<Button {...props} />);
    const button = screen.getByText('Example');
    fireEvent.click(button);
    expect(props.onClick).toHaveBeenCalled();
   });
});
