import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Popup, { type PopupProps } from "../components/Popup";
import UserData from "../components/UserData";
import Pagination from "../components/Pagination";
import UserRepos from "../components/UserRepos";
import useUserData from "../hooks/useUserData";
import useUserRepos from "../hooks/useUserRepos";

export default function UserResultPage() {
  const { username } = useParams<{ username: string }>();
  const user = useUserData(username);
  const [popup, setPopup] = useState<PopupProps>();
  const closePopup = () => setPopup(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const repos = useUserRepos(username, currentPage, itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    document.title = `${username}'s repositories`;
  }, [username]);

  useEffect(() => {
    // display errors
    if (user.error) {
      setPopup(user.error);
    } else if (repos.error) {
      setPopup(repos.error);
    } else {
      setPopup(undefined);
    }
  }, [user.error, repos.error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 py-16 text-white bg-black">
      <Link to="/" className="mb-4 text-gray hover:underline">
        Back to Search
      </Link>
      {user.notFound ? (
        <h1 className="text-4xl font-bold">User not found</h1>
      ) : (
        <>
          <UserData isLoading={user.isLoading} {...user.data} />
          <UserRepos isLoading={repos.isLoading} repos={repos.data} />
          {user.data && (
            <Pagination
              count={user.data.public_repos}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
        </>
      )}

      {popup && <Popup {...popup} onClose={closePopup} />}
    </div>
  );
}
