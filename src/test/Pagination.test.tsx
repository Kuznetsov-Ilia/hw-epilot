import { vi, describe, afterEach, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../components/Pagination";

describe("Pagination", () => {
  const handlePageChangeMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the correct number of buttons based on count and itemsPerPage", () => {
    render(
      <Pagination
        count={15}
        itemsPerPage={6}
        handlePageChange={handlePageChangeMock}
      />
    );
    // Assert that the correct number of buttons are rendered
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  it("renders the current page button with the correct styles", () => {
    render(
      <Pagination
        count={15}
        currentPage={2}
        handlePageChange={handlePageChangeMock}
      />
    );
    // Assert that the current page button has the correct styles
    const currentPageButton = screen.getByText("2");
    expect(currentPageButton).toHaveClass("bg-orange text-white");
  });

  it("calls handlePageChange when a button is clicked", () => {
    render(
      <Pagination
        count={15}
        currentPage={2}
        handlePageChange={handlePageChangeMock}
      />
    );

    // Simulate a button click
    const nextPageButton = screen.getByText("3");
    fireEvent.click(nextPageButton);

    // Assert that handlePageChange is called with the correct arguments
    expect(handlePageChangeMock).toHaveBeenCalledWith(3);
  });
});
