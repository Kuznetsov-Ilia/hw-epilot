import { render, screen } from "@testing-library/react";
import UserData from "../components/UserData";

describe("UserData", () => {
  it("renders the user data when not loading and user exists", () => {
    const user = {
      login: "John Doe",
      avatar_url: "https://example.com/avatar.jpg",
      html_url: "https://example.com/johndoe",
      public_repos: 10,
    };

    render(<UserData {...user} isLoading={false} />);

    // Assert that the user data is rendered correctly
    const nameElement = screen.getByText(user.login);
    const avatarElement = screen.getByAltText(user.login);
    const reposCountElement = screen.getByText(
      `Repositories Count: ${user.public_repos}`
    );
    const githubProfileLinkElement = screen.getByText("Visit Github Profile");

    expect(nameElement).toBeInTheDocument();
    expect(avatarElement).toBeInTheDocument();
    expect(reposCountElement).toBeInTheDocument();
    expect(githubProfileLinkElement).toBeInTheDocument();
    expect(githubProfileLinkElement).toHaveAttribute("href", user.html_url);
  });

  it("renders the loading spinner when loading", () => {
    render(<UserData isLoading={true} />);

    // Assert that the loading spinner is rendered
    const spinnerElement = screen.getByTestId("spinner");

    expect(spinnerElement).toBeInTheDocument();
  });

  it("renders nothing when not loading and user does not exist", () => {
    render(<UserData isLoading={false} />);

    // Assert that nothing is rendered
    const userDataElement = screen.queryByTestId("user-data");

    expect(userDataElement).toBeNull();
  });
});
