import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Pokemon } from "../../../redux/api/models/Pokemon";
import styled from "styled-components";

type PokemonCardProps = { pokemon: Pokemon };

const StyledCardMedia = styled(CardMedia)`
  background-size: contain;
`;

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Card sx={{ minWidth: 260 }}>
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
        >
          {pokemon.name}
        </Typography>
      </CardContent>
    </Card>
  );
};
