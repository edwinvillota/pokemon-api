import { Grid } from "@mui/material";
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
  const { data, isLoading } = useGetAllPokemonQuery();

  return (
    <Grid container spacing={2} justifyContent="center">
      {isLoading ? (
        <PokemonListSkeleton />
      ) : (
        <PokemonCards pokemonList={data?.results} />
      )}
    </Grid>
  );
};
