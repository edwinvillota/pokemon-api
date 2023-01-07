import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { useMemo } from "react";
import { Pokemon } from "../../../redux/api/models/Pokemon";
import { useGetAllPokemonQuery } from "../../../redux/api/pokemonApi";
import { PokemonCard } from "../../molecules/PokemonCard";
import { PokemonListSkeleton } from "./PokemonListSkeleton";

type PokemonCardsProps = {
  pokemonList: Pokemon[] | undefined;
};

const PokemonCards = ({ pokemonList }: PokemonCardsProps) => {
  const cards = useMemo(() => {
    return pokemonList?.map((pokemon) => (
      <Grid item key={pokemon.id}>
        <PokemonCard pokemon={pokemon} />
      </Grid>
    ));
  }, [pokemonList]);

  return <>{cards}</>;
};

export const PokemonList = () => {
  const { data, refetch, isFetching } = useGetAllPokemonQuery({
    infinityScroll: true,
  });

  const handleLoadMore = () => {
    refetch();
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <PokemonCards pokemonList={data?.results} />
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
