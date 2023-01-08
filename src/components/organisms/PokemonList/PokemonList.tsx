import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { useMemo } from "react";
import { Pokemon } from "../../../redux/api/models/Pokemon";
import { useGetAllPokemonQuery } from "../../../redux/api/pokemonApi";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/features/pokemon/pokemonSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { PokemonCard } from "../../molecules/PokemonCard";
import { PokemonListSkeleton } from "./PokemonListSkeleton";

type PokemonCardsProps = {
  pokemonList: Pokemon[] | undefined;
  getIsFavorite: (pokemonId: number) => boolean;
  onToogleFavorite?: (pokemonId: number) => void;
};

const PokemonCards = ({
  pokemonList,
  onToogleFavorite,
  getIsFavorite,
}: PokemonCardsProps) => {
  const cards = useMemo(() => {
    return pokemonList?.map((pokemon) => (
      <Grid item key={pokemon.id}>
        <PokemonCard
          pokemon={pokemon}
          onToogleFavorite={onToogleFavorite}
          isFavorite={getIsFavorite(pokemon.id)}
        />
      </Grid>
    ));
  }, [onToogleFavorite, pokemonList]);

  return <>{cards}</>;
};

export const PokemonList = () => {
  const { data, refetch, isFetching } = useGetAllPokemonQuery({
    infinityScroll: true,
  });
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.pokemon.favorites);

  const getIsFavorite = (pokemonId: number) => {
    return favorites.includes(pokemonId);
  };

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

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <PokemonCards
          pokemonList={data?.results}
          getIsFavorite={getIsFavorite}
          onToogleFavorite={handleToogleFavorite}
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
