import { render, screen } from "@testing-library/react";
import UserRepos from "../components/UserRepos";

describe("UserRepos", () => {
  const repos = [
    {
      name: "repo1",
      language: "JavaScript",
      description: "Repo 1 description",
      html_url: "https://example.com/repo1",
      stargazers_count: 10,
      forks_count: 5,
      id: 1,
    },
    {
      name: "repo2",
      language: "TypeScript",
      description: "Repo 2 description",
      html_url: "https://example.com/repo2",
      stargazers_count: 20,
      forks_count: 8,
      id: 2,
    },
  ];

  it("renders the spinner when loading", () => {
    render(<UserRepos isLoading={true} repos={[]} />);

    const spinnerElement = screen.getByTestId("spinner");
    expect(spinnerElement).toBeInTheDocument();
  });

  it("renders the repositories when not loading and repos are available", () => {
    render(<UserRepos isLoading={false} repos={repos} />);

    const repoElements = screen.getAllByTestId("user-repo");
    expect(repoElements.length).toBe(repos.length);

    repoElements.forEach((element, index) => {
      const repo = repos[index];
      expect(element).toHaveTextContent(repo.name);
      expect(element).toHaveTextContent(repo.description);
      expect(element).toHaveTextContent(repo.language);
      expect(element).toHaveTextContent(repo.stargazers_count.toString());
      expect(element).toHaveTextContent(repo.forks_count.toString());
    });
  });

  it("renders the empty message when not loading and no repos are available", () => {
    render(<UserRepos isLoading={false} repos={[]} />);

    const emptyMessageElement = screen.getByText(
      /doesn't have any public repositories yet/i
    );
    expect(emptyMessageElement).toBeInTheDocument();
  });
});
