import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useMemo } from "react";
import { PokemonCard } from "../../components/molecules/PokemonCard";
import { useGetAllPokemonQuery } from "../../redux/api/pokemonApi";

export const Home = () => {
  const { data, isLoading, isSuccess, isError } = useGetAllPokemonQuery();

  const pokemonCards = useMemo(() => {
    return data?.results.map((pokemon) => (
      <Grid item>
        <PokemonCard pokemon={pokemon} />
      </Grid>
    ));
  }, [data]);

  if (isLoading) return <span>Loading...</span>;

  return (
    <Container
      disableGutters
      sx={{
        paddingY: 8,
      }}
    >
      <Grid container spacing={2} justifyContent="space-between">
        {pokemonCards}
      </Grid>
    </Container>
  );
};
