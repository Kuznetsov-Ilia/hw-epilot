import { render, screen, fireEvent } from "@testing-library/react";
import Popup from "../components/Popup";
import { vi, describe, afterEach, it } from "vitest";

describe("Popup", () => {
  const onCloseMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title and message correctly", () => {
    render(
      <Popup
        title="Error"
        message="Something went wrong"
        onClose={onCloseMock}
      />
    );
    // Assert that the title and message are rendered correctly
    const titleElement = screen.getByText("Error");
    const messageElement = screen.getByText("Something went wrong");
    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });

  it("calls onClose when the Close button is clicked", () => {
    render(<Popup onClose={onCloseMock} />);

    // Simulate a button click
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // Assert that onClose is called
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
