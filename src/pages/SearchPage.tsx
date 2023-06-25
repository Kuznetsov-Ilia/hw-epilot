import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (username.trim() !== "") {
      navigate(`/user/${username}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="mb-8 text-xl font-bold text-white">Github User Search</h1>
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="font-sans text-xl font-medium text-white bg-black focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-1 ml-2 font-sans text-xl font-medium text-black rounded bg-orange focus:outline-none"
        >
          Search
        </button>
      </form>
    </div>
  );
}
