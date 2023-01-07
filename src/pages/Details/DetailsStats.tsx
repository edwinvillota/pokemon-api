import { Chip, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { PokemonCardStat } from "../../components/molecules/PokemonCard/PokemonCard";
import { Pokemon } from "../../redux/api/models/Pokemon";

export type DetailsStatsProps = {
  pokemon: Pokemon;
};

export const DetailsStats = ({ pokemon }: DetailsStatsProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="overline">Types</Typography>
        <Stack direction="row" gap={2}>
          {pokemon.types.map((type) => (
            <Chip label={type.type.name} />
          ))}
        </Stack>
      </Grid>
      <Grid item container>
        {pokemon.stats.map((stat) => (
          <Grid item xs={5}>
            <PokemonCardStat name={stat.stat.name} value={stat.base_stat} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
