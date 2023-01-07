import { Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetAllPokemonQuery } from "../../redux/api/pokemonApi";
import { DetailsImage } from "./DetailsImage";
import { DetailsStats } from "./DetailsStats";
import { StatsChart } from "./StatsChart";

export const Details = () => {
  const { name } = useParams();
  const { data } = useGetAllPokemonQuery({});

  const pokemon = useMemo(() => {
    return data?.results.find((pokemon) => pokemon.name === name);
  }, [data?.results, name]);

  if (!pokemon) return null;

  return (
    <Container disableGutters sx={{ paddingY: 8 }}>
      <Stack gap={4}>
        <Typography variant="h5" textTransform="capitalize">
          {pokemon.name}
        </Typography>

        <Grid container rowGap={4} justifyContent="center">
          <Grid item md={6}>
            <DetailsImage
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsStats pokemon={pokemon} />
          </Grid>
          <Grid item xs={12}>
            <StatsChart stats={pokemon.stats} />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};
