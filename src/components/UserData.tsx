export interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
}

type Props = Partial<User> & {
  isLoading: boolean;
};
export default function UserData({
  avatar_url,
  login,
  public_repos,
  html_url,
  isLoading,
}: Props) {
  return isLoading ? (
    <Spinner />
  ) : login ? (
    <>
      <img src={avatar_url} alt={login} className="w-32 h-32 rounded-full" />
      <h2 className="text-xl font-bold ">{login}</h2>

      <p>Repositories Count: {public_repos}</p>
      <a
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className=" hover:underline"
      >
        Visit Github Profile
      </a>
    </>
  ) : null;
}

function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-24 h-24 text-gray-500 animate-spin"
      viewBox="0 0 24 24"
      data-testid="spinner"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"
      ></path>
    </svg>
  );
}
