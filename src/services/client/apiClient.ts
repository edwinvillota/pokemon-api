export const apiClient = {
  baseUrl: "https://pokeapi.co/api/v2",
  get: async function () {
    const response = await fetch(`${this.baseUrl}/pokemon`);
    const json = await response.json();
    return json;
  },
};
