import { vi, describe, it } from "vitest";
import { waitFor, renderHook } from "@testing-library/react";
import useUserRepos from "../hooks/useUserRepos";

describe("useUserRepos", () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([]),
    });
  });

  it("should fetch user repos", async () => {
    const username = "exampleUser";
    const currentPage = 1;
    const itemsPerPage = 10;

    const { result } = renderHook(() =>
      useUserRepos(username, currentPage, itemsPerPage)
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).not.toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeUndefined();

    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.github.com/users/${username}/repos?per_page=${itemsPerPage}&page=${currentPage}`,
      undefined
    );
  });

  it("should handle error when fetching user repos", async () => {
    const username = "exampleUser";
    const currentPage = 1;
    const itemsPerPage = 10;

    const errorMessage = "Error fetching repos";

    global.fetch = vi.fn().mockRejectedValue(errorMessage);

    const { result } = renderHook(() =>
      useUserRepos(username, currentPage, itemsPerPage)
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).not.toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toEqual({
      title: "Error fetching user repos",
      message: errorMessage,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.github.com/users/${username}/repos?per_page=${itemsPerPage}&page=${currentPage}`,
      undefined
    );
  });

  it("should handle unknown error when fetching user repos", async () => {
    const username = "exampleUser";
    const currentPage = 1;
    const itemsPerPage = 10;

    global.fetch = vi.fn().mockRejectedValue("Unknown error");

    const { result } = renderHook(() =>
      useUserRepos(username, currentPage, itemsPerPage)
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).not.toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toEqual({
      title: "Error fetching user repos",
      message: "Unknown error",
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.github.com/users/${username}/repos?per_page=${itemsPerPage}&page=${currentPage}`,
      undefined
    );
  });
});
