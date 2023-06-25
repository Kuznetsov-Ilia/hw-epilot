import { useEffect, useState } from "react";
import { fetchWithCache } from "../utils/request";
import { Repo } from "../components/UserRepo";
interface ReposError {
  title: string;
  message: string;
}
export default function useUserRepos(
  username: string | undefined,
  currentPage: number,
  itemsPerPage: number
) {
  const [reposAreLoading, setReposAreLoading] = useState(true);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<ReposError>();

  useEffect(() => {
    setReposAreLoading(true);
    fetchWithCache<Repo[]>(
      `https://api.github.com/users/${username}/repos?per_page=${itemsPerPage}&page=${currentPage}`
    )
      .then(setRepos, (error) => {
        if (error instanceof Error) {
          setError({
            title: "Error fetching user repos",
            message: error.message,
          });
        } else {
          setError({
            title: "Error fetching user repos",
            message: String(error),
          });
        }
      })
      .finally(() => {
        setReposAreLoading(false);
      });
  }, [username, currentPage, itemsPerPage]);
  return {
    data: repos,
    isLoading: reposAreLoading,
    error,
  };
}
