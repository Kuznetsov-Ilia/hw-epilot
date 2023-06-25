import UserRepo, { type Repo } from "./UserRepo";

export default function UserRepos({
  isLoading,
  repos,
}: {
  isLoading: boolean;
  repos: Repo[];
}) {
  return isLoading ? (
    <Spinner />
  ) : repos.length > 0 ? (
    <ol className="flex flex-row flex-wrap justify-center gap-4 mt-5 text-black list-style-none">
      {repos.map((repo) => (
        <li key={repo.name} className="flex">
          <div className="w-56 p-3 border-2 rounded bg-gray">
            <UserRepo {...repo} />
          </div>
        </li>
      ))}
    </ol>
  ) : (
    <Empty />
  );
}

function Spinner() {
  return (
    <svg
      data-testid="spinner"
      xmlns="http://www.w3.org/2000/svg"
      className="w-32 h-32 animate-spin"
      viewBox="0 0 24 24"
    >
      <path
        className="opacity-25"
        fill="currentColor"
        d="M12 0a2 2 0 0 1 2 2v2a8 8 0 0 1 8 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-2a8 8 0 0 1-8-8H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h8zm-2 4H4v16h16V4h-6z"
      ></path>
    </svg>
  );
}

function Empty() {
  return <p>doesn't have any public repositories yet</p>;
}
