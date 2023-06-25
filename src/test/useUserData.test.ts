import { vi, describe, it } from "vitest";
import { waitFor, renderHook } from "@testing-library/react";
import useUserData from "../hooks/useUserData";

vi.mock("./utils/request");

describe("useUserData", () => {
  const mockUsername = "testuser";
  const mockUserData = {
    name: "Test User",
    avatar_url: "https://example.com/avatar.jpg",
    html_url: "https://example.com/testuser",
    public_repos: 10,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetch = (global.fetch = vi.fn<any>());

  it("fetches user data successfully", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockUserData),
    });

    const { result } = renderHook(() => useUserData(mockUsername));
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).not.toBe(true);
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockUserData);
    expect(result.current.notFound).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("handles user not found error", async () => {
    const errorMessage = "Not Found";
    fetch.mockResolvedValueOnce({
      ok: false,
      json: vi.fn().mockResolvedValueOnce({
        message: errorMessage,
      }),
    });

    const { result } = renderHook(() => useUserData(mockUsername));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).not.toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.notFound).toBe(true);
    expect(result.current.error).toBeUndefined();
  });

  it("handles other errors", async () => {
    const errorMessage = "Unknown error";
    fetch.mockRejectedValueOnce(errorMessage);

    const { result } = renderHook(() => useUserData(mockUsername));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).not.toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.notFound).toBe(false);
    expect(result.current.error).toEqual({
      title: "Error fetching user data",
      message: errorMessage,
    });
  });
});
