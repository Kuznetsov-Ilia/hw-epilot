import { useEffect, useState } from "react";
import { User } from "../components/UserData";
import { fetchWithCache } from "../utils/request";
interface UserError {
  title: string;
  message: string;
}
export default function useUserData(username: string | undefined) {
  const [userData, setUserData] = useState<User | null>(null);
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<UserError>();
  useEffect(() => {
    if (!username) {
      return;
    }
    setUserIsLoading(true);
    fetchWithCache<User>(`https://api.github.com/users/${username}`)
      .then(
        (data) => {
          setNotFound(false);
          setUserData(data);
        },
        (error) => {
          if (error instanceof Error) {
            if (error.message === "Not Found") {
              setNotFound(true);
            } else {
              setError({
                title: "Error fetching user data",
                message: error.message,
              });
            }
          } else {
            setError({
              title: "Error fetching user data",
              message: String(error),
            });
          }
        }
      )
      .finally(() => {
        setUserIsLoading(false);
      });
  }, [username]);
  return { data: userData, isLoading: userIsLoading, notFound, error };
}
