import { render, screen } from "@testing-library/react";
import UserRepo from "../components/UserRepo";

describe("UserRepo", () => {
  const repo = {
    name: "example-repo",
    language: "JavaScript",
    description: "Example description",
    html_url: "https://example.com/repo",
    stargazers_count: 10,
    forks_count: 5,
    id: 1,
  };

  it("renders the repository name as a link", () => {
    render(<UserRepo {...repo} />);

    const linkElement = screen.getByText(repo.name);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", repo.html_url);
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the repository description", () => {
    render(<UserRepo {...repo} />);

    const descriptionElement = screen.getByText(repo.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders the repository language when provided", () => {
    render(<UserRepo {...repo} />);

    const languageElement = screen.getByText(repo.language);
    expect(languageElement).toBeInTheDocument();
  });

  it("renders the repository stargazers count", () => {
    render(<UserRepo {...repo} />);

    const stargazersCountElement = screen.getByText(
      repo.stargazers_count.toString()
    );
    expect(stargazersCountElement).toBeInTheDocument();
  });

  it("renders the repository forks count", () => {
    render(<UserRepo {...repo} />);

    const forksCountElement = screen.getByText(repo.forks_count.toString());
    expect(forksCountElement).toBeInTheDocument();
  });
});
