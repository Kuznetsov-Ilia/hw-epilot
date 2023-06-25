export interface Repo {
  name: string;
  language?: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  id: number;
}

export default function UserRepo(repo: Repo) {
  return (
    <div className="flex flex-col h-full gap-2" data-testid="user-repo">
      <a
        className="flex-none text-lg font-medium hover:underline"
        href={repo.html_url}
        rel="noopener noreferrer"
        target="_blank"
      >
        {repo.name}
      </a>
      <div className="flex-auto text-sm">{repo.description}</div>

      <div className="flex flex-none gap-3">
        <span className="mr-3 empty:hidden">{repo.language}</span>

        <div className="flex items-center gap-1">
          <svg role="img" height="16" viewBox="0 0 16 16" width="16">
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
          </svg>
          {repo.stargazers_count}
        </div>
        <div className="flex items-center gap-1">
          <svg role="img" height="16" viewBox="0 0 16 16" width="16">
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
          </svg>
          {repo.forks_count}
        </div>
      </div>
    </div>
  );
}
