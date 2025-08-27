import { getUser } from "@/app/services/fetchers";

global.fetch = jest.fn();

describe("fetchUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("throws on network error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await expect(getUser("1")).rejects.toThrow("Network error");
  });

  it("returns data when successful", async () => {
    const mockData = { id: "1", name: "John" };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData, // must be a function returning promise
      text: async () => JSON.stringify(mockData),
    });

    const result = await getUser("1");
    expect(result).toEqual(mockData);
  });
});
