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

type PokemonCardProps = {
  pokemon: Pokemon;
  isFavorite?: boolean;
  onToogleFavorite?: (pokemonId: number) => void;
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
}: PokemonCardProps) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 260, position: "relative" }} key={pokemon.id}>
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
        </Stack>
        <Divider />
        <CardActions>
          <Button onClick={() => navigate(`/details/${pokemon.name}`)}>
            Details
          </Button>
          <Button>Compare</Button>
          <Tooltip title="Add to favorites">
            <IconButton
              color={isFavorite ? "error" : "default"}
              onClick={() => onToogleFavorite && onToogleFavorite(pokemon.id)}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </CardContent>
    </Card>
  );
};
