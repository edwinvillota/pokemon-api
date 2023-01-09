import { renderWithProviders } from "../utils/testUtils";
import { PokemonList } from "../components/organisms/PokemonList";
import { fireEvent, screen } from "@testing-library/react";

test("Should render PokemonListSkeleton when isFetching", () => {
  renderWithProviders(<PokemonList />);

  const skeletons = screen.getAllByTestId(/skeleton/i);

  expect(screen.getByText(/Search/i)).toBeInTheDocument();
  expect(skeletons.length).toBe(20);
});
