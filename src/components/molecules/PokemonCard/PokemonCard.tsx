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
  IconButton,
  CardActions,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Pokemon } from "../../../redux/api/models/Pokemon";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useId } from "react";

type PokemonCardProps = {
  pokemon: Pokemon;
  isFavorite?: boolean;
  onToogleFavorite?: (pokemonId: number) => void;
  inComparison?: boolean;
  isComparisonFull?: boolean;
  onToogleCompare?: (pokemonId: number) => void;
  withActions?: boolean;
};
type PokemonCardStatProps = {
  name: string;
  value: number;
};

const StyledCardMedia = styled(CardMedia)`
  background-size: contain;
`;

export const PokemonCardStat = ({ name, value }: PokemonCardStatProps) => {
  return (
    <Stack gap={0}>
      <Typography variant="overline" noWrap gutterBottom>
        {name}
      </Typography>
      <Typography variant="caption">{value}</Typography>
    </Stack>
  );
};

export const PokemonCard = ({
  pokemon,
  isFavorite,
  onToogleFavorite,
  inComparison,
  onToogleCompare,
  isComparisonFull,
  withActions = true,
}: PokemonCardProps) => {
  const navigate = useNavigate();
  const id = useId();

  return (
    <Card
      elevation={withActions ? 2 : 0}
      sx={{
        width: 260,
        position: "relative",
        borderStyle: "solid",
        borderWidth: 2,
        transition: "border-color 0.5s ease-in",
        borderColor: inComparison ? "#9c27b0" : "transparent",
      }}
      key={pokemon.id}
    >
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          top: "15px",
          left: "15px",
        }}
      >{`#${pokemon.id}`}</Typography>
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
              <Chip label={type.type.name} key={`${id}_${type.type.name}`} />
            ))}
          </Stack>
          <Grid container gap={1} justifyContent="center">
            {pokemon.stats.map((stat) => (
              <Grid item xs={5} key={`${id}_${stat.stat.name}`}>
                <PokemonCardStat name={stat.stat.name} value={stat.base_stat} />
              </Grid>
            ))}
          </Grid>
        </Stack>
        {withActions && (
          <>
            <Divider />
            <CardActions>
              <Button onClick={() => navigate(`/details/${pokemon.name}`)}>
                Details
              </Button>
              <Button
                disabled={isComparisonFull && !inComparison}
                color={inComparison ? "secondary" : "primary"}
                onClick={() => onToogleCompare && onToogleCompare(pokemon.id)}
              >
                {inComparison ? "Remove" : "Compare"}
              </Button>
              <Tooltip title="Add to favorites">
                <IconButton
                  color={isFavorite ? "error" : "default"}
                  onClick={() =>
                    onToogleFavorite && onToogleFavorite(pokemon.id)
                  }
                >
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          </>
        )}
      </CardContent>
    </Card>
  );
};
