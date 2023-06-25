import { render, screen } from "@testing-library/react";
import { useParams } from "react-router-dom";
import UserResultPage from "../pages/UserResultPage";
import useUserData from "../hooks/useUserData";
import useUserRepos from "../hooks/useUserRepos";
import { vi, describe, beforeEach, it } from "vitest";

vi.mock("react-router-dom", () => ({
  Link: vi
    .fn()
    .mockImplementation(({ to, children }) => <a href={to}>{children}</a>),
  useParams: vi.fn(),
}));

vi.mock("../hooks/useUserData");
vi.mock("../hooks/useUserRepos");

describe("UserResultPage", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useParams.mockReturnValue({ username: "testuser" });
  });

  it("renders the user result page correctly", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useUserData.mockReturnValue({
      isLoading: false,
      data: {
        login: "Test User",
        avatar_url: "https://example.com/avatar.jpg",
        html_url: "https://example.com/testuser",
        public_repos: 10,
      },
      error: undefined,
      notFound: false,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useUserRepos.mockReturnValue({
      isLoading: false,
      data: [
        {
          name: "Repo 1",
          language: "JavaScript",
          description: "Test repository",
          html_url: "https://example.com/repo1",
          stargazers_count: 10,
          forks_count: 5,
          id: 1,
        },
      ],
      error: undefined,
    });

    render(<UserResultPage />);

    const backButtonElement = screen.getByText(/back to search/i);
    expect(backButtonElement).toBeInTheDocument();

    const userDataElement = screen.getByText(/test user/i);
    expect(userDataElement).toBeInTheDocument();

    const userRepoElement = screen.getByText(/repo 1/i);
    expect(userRepoElement).toBeInTheDocument();
  });

  it("renders user not found message if user is not found", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useUserData.mockReturnValue({
      isLoading: false,
      data: undefined,
      error: undefined,
      notFound: true,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useUserRepos.mockReturnValue({
      isLoading: false,
      data: [],
      error: undefined,
    });

    render(<UserResultPage />);

    const notFoundElement = screen.getByText(/user not found/i);
    expect(notFoundElement).toBeInTheDocument();
  });
});
