import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import { vi, describe, it } from "vitest";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("SearchPage", () => {
  const getInputElement = () => screen.getByPlaceholderText(/enter username/i);
  const getButtonElement = () => screen.getByText(/^search$/i);
  it("renders the search page correctly", () => {
    render(<SearchPage />);

    const headingElement = screen.getByText(/github user search/i);
    expect(headingElement).toBeInTheDocument();

    const inputElement = getInputElement();
    expect(inputElement).toBeInTheDocument();

    const buttonElement = getButtonElement();
    expect(buttonElement).toBeInTheDocument();
  });

  it("navigates to the user page on search with a non-empty username", () => {
    const navigate = vi.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useNavigate.mockReturnValue(navigate);

    render(<SearchPage />);

    const inputElement = getInputElement();
    const buttonElement = getButtonElement();

    const username = "john_doe";
    fireEvent.change(inputElement, { target: { value: username } });
    fireEvent.click(buttonElement);

    expect(navigate).toHaveBeenCalledWith(`/user/${username}`);
  });

  it("does not navigate on search with an empty username", () => {
    const navigate = vi.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useNavigate.mockReturnValue(navigate);

    render(<SearchPage />);

    const inputElement = getInputElement();
    const buttonElement = getButtonElement();

    fireEvent.change(inputElement, { target: { value: "" } });
    fireEvent.click(buttonElement);

    expect(navigate).not.toHaveBeenCalled();
  });
});
