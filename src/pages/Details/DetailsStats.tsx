import { Chip, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useId } from "react";
import { PokemonCardStat } from "../../components/molecules/PokemonCard/PokemonCard";
import { Pokemon } from "../../redux/api/models/Pokemon";

export type DetailsStatsProps = {
  pokemon: Pokemon;
};

export const DetailsStats = ({ pokemon }: DetailsStatsProps) => {
  const id = useId();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="overline">Types</Typography>
        <Stack direction="row" gap={2}>
          {pokemon.types.map((type) => (
            <Chip key={`${id}_${type.type.name}`} label={type.type.name} />
          ))}
        </Stack>
      </Grid>
      <Grid item container>
        {pokemon.stats.map((stat) => (
          <Grid item xs={5} key={`${id}_${stat.stat.name}`}>
            <PokemonCardStat name={stat.stat.name} value={stat.base_stat} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
