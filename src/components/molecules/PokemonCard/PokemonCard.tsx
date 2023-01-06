import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Stack,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { Pokemon } from "../../../redux/api/models/Pokemon";
import styled from "styled-components";

type PokemonCardProps = { pokemon: Pokemon };
type PokemonCardStat = {
  name: string;
  value: number;
};

const StyledCardMedia = styled(CardMedia)`
  background-size: contain;
`;

export const PokemonCardStat = ({ name, value }: PokemonCardStat) => {
  return (
    <Stack gap={0}>
      <Typography variant="overline" noWrap gutterBottom>
        {name}
      </Typography>
      <Typography variant="caption">{value}</Typography>
    </Stack>
  );
};

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Card sx={{ minWidth: 260, maxWidth: 260 }}>
      <StyledCardMedia
        sx={{ height: 150 }}
        image={pokemon.sprites.other["official-artwork"].front_default}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textTransform="capitalize"
          align="center"
        >
          {pokemon.name}
        </Typography>
        <Divider />
        <Stack paddingY={2} gap={2}>
          <Stack direction="row" gap={1} justifyContent="center">
            {pokemon.types.map((type) => (
              <Chip label={type.type.name} />
            ))}
          </Stack>
          <Grid container gap={1} justifyContent="center">
            {pokemon.stats.map((stat) => (
              <Grid item xs={5}>
                <PokemonCardStat name={stat.stat.name} value={stat.base_stat} />
              </Grid>
            ))}
          </Grid>
          <Divider />
          <Stack direction="row" justifyContent="space-between" gap={2}>
            <Button variant="contained" fullWidth>
              Details
            </Button>
            <Button variant="contained" fullWidth color="secondary">
              Compare
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};