import { renderWithProviders } from "../utils/testUtils";
import { PokemonList } from "../components/organisms/PokemonList";
import { fireEvent, screen, cleanup } from "@testing-library/react";
import { pokemonResponse } from "./mocks/pokemonResponse";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

const basePreloadedState = {
  api: {
    queries: {
      'getAllPokemon({"infinityScroll":true})': {
        status: "fulfilled",
        data: pokemonResponse,
      },
    },
  },
};

afterEach(cleanup);

test("Should render PokemonListSkeleton when isFetching", () => {
  renderWithProviders(<PokemonList />);
  const skeletons = screen.getAllByTestId(/skeleton/i);
  expect(screen.getByText(/Search/i)).toBeInTheDocument();
  expect(skeletons.length).toBe(20);
});

test("Should render PokemonCards when data is available", () => {
  renderWithProviders(<PokemonList />, {
    preloadedState: {
      ...basePreloadedState,
    },
  });

  const cardsImg = screen.getAllByRole("img");

  expect(cardsImg.length).toBe(2);
});

test("Should filter by favorites", () => {
  renderWithProviders(<PokemonList />, {
    preloadedState: {
      ...basePreloadedState,
      pokemon: {
        favorites: [2],
        comparison: [],
      },
    },
  });

  const cardsBeforeFilter = screen.getAllByRole("img");
  expect(cardsBeforeFilter.length).toBe(2);

  const favoriteCheckbox = screen.getByRole("checkbox");
  fireEvent.click(favoriteCheckbox);
  expect(favoriteCheckbox).toBeChecked();

  const cardsAfterFilter = screen.getAllByRole("img");
  expect(cardsAfterFilter.length).toBe(1);
  expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
});

test("Should filter by search key", () => {
  renderWithProviders(<PokemonList />, {
    preloadedState: {
      ...basePreloadedState,
    },
  });

  const cardsBeforeFilter = screen.getAllByRole("img");
  expect(cardsBeforeFilter.length).toBe(2);

  const searchInput = screen.getByRole("search") as HTMLInputElement;
  fireEvent.change(searchInput, { target: { value: "Bul" } });
  expect(searchInput.value).toBe("Bul");

  const cardsAfterFilter = screen.getAllByRole("img");
  expect(cardsAfterFilter.length).toBe(1);
  expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: "Invalid pokemon name" } });
  expect(searchInput.value).toBe("Invalid pokemon name");

  const cardsAfterInvalidSearch = screen.queryByRole("img");
  expect(cardsAfterInvalidSearch).not.toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: "" } });
  expect(searchInput.value).toBe("");

  const cardsAfterEmptySearch = screen.getAllByRole("img");
  expect(cardsAfterEmptySearch.length).toBe(2);
});
