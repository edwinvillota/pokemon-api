import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { useMemo } from "react";
import { Pokemon } from "../../../redux/api/models/Pokemon";
import { useGetAllPokemonQuery } from "../../../redux/api/pokemonApi";
import {
  addToCompare,
  addToFavorites,
  removeFromCompare,
  removeFromFavorites,
} from "../../../redux/features/pokemon/pokemonSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { PokemonCard } from "../../molecules/PokemonCard";
import { PokemonListSkeleton } from "./PokemonListSkeleton";

type PokemonCardsProps = {
  pokemonList: Pokemon[] | undefined;
  getIsFavorite: (pokemonId: number) => boolean;
  onToogleFavorite?: (pokemonId: number) => void;
  getInComparison: (pokemonId: number) => boolean;
  onToogleCompare?: (pokemonId: number) => void;
  isComparisonFull?: boolean;
};

const PokemonCards = ({
  pokemonList,
  onToogleFavorite,
  getIsFavorite,
  onToogleCompare,
  getInComparison,
  isComparisonFull,
}: PokemonCardsProps) => {
  const cards = useMemo(() => {
    return pokemonList?.map((pokemon) => (
      <Grid item key={pokemon.id}>
        <PokemonCard
          pokemon={pokemon}
          onToogleFavorite={onToogleFavorite}
          onToogleCompare={onToogleCompare}
          isFavorite={getIsFavorite(pokemon.id)}
          inComparison={getInComparison(pokemon.id)}
          isComparisonFull={isComparisonFull}
        />
      </Grid>
    ));
  }, [
    getInComparison,
    getIsFavorite,
    isComparisonFull,
    onToogleCompare,
    onToogleFavorite,
    pokemonList,
  ]);

  return <>{cards}</>;
};

export const PokemonList = () => {
  const { data, refetch, isFetching } = useGetAllPokemonQuery({
    infinityScroll: true,
  });
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.pokemon.favorites);
  const comparison = useAppSelector((state) => state.pokemon.comparison);
  const isComparisonFull = useAppSelector(
    (state) => state.pokemon.isComparisonFull
  );

  const getIsFavorite = (pokemonId: number) => favorites.includes(pokemonId);

  const getInComparison = (pokemonId: number) => comparison.includes(pokemonId);

  const handleLoadMore = () => {
    refetch();
  };

  const handleToogleFavorite = (pokemonId: number) => {
    if (getIsFavorite(pokemonId)) {
      dispatch(removeFromFavorites(pokemonId));
    } else {
      dispatch(addToFavorites(pokemonId));
    }
  };

  const handleToogleCompare = (pokemonId: number) => {
    if (getInComparison(pokemonId)) {
      dispatch(removeFromCompare(pokemonId));
    } else {
      dispatch(addToCompare(pokemonId));
    }
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <PokemonCards
          pokemonList={data?.results}
          getIsFavorite={getIsFavorite}
          getInComparison={getInComparison}
          onToogleFavorite={handleToogleFavorite}
          onToogleCompare={handleToogleCompare}
          isComparisonFull={isComparisonFull}
        />
        {isFetching && <PokemonListSkeleton />}
      </Grid>
      <Stack direction="row" justifyContent="center" marginY={4}>
        <Button variant="text" onClick={handleLoadMore}>
          Load more
        </Button>
      </Stack>
    </>
  );
};
