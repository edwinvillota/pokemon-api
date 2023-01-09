import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useMemo, useState } from "react";
import { useSearchPokemon } from "../../../hooks/useSearch";
import { Pokemon } from "../../../redux/api/models/Pokemon";
import {
  addToCompare,
  addToFavorites,
  removeFromCompare,
  removeFromFavorites,
} from "../../../redux/features/pokemon/pokemonSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { PokemonCard } from "../../molecules/PokemonCard";
import { PokemonListSkeleton } from "./PokemonListSkeleton";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

type PokemonCardsProps = {
  pokemonList: Pokemon[] | undefined;
  getIsFavorite: (pokemonId: number) => boolean;
  onToogleFavorite?: (pokemonId: number) => void;
  getInComparison: (pokemonId: number) => boolean;
  onToogleCompare?: (pokemonId: number) => void;
  isComparisonFull?: boolean;
};

const PokemonCards = ({
  pokemonList,
  onToogleFavorite,
  getIsFavorite,
  onToogleCompare,
  getInComparison,
  isComparisonFull,
}: PokemonCardsProps) => {
  const cards = useMemo(() => {
    return pokemonList?.map((pokemon) => (
      <Grid item key={pokemon.id}>
        <PokemonCard
          pokemon={pokemon}
          onToogleFavorite={onToogleFavorite}
          onToogleCompare={onToogleCompare}
          isFavorite={getIsFavorite(pokemon.id)}
          inComparison={getInComparison(pokemon.id)}
          isComparisonFull={isComparisonFull}
        />
      </Grid>
    ));
  }, [
    getInComparison,
    getIsFavorite,
    isComparisonFull,
    onToogleCompare,
    onToogleFavorite,
    pokemonList,
  ]);

  return <>{cards}</>;
};

export const PokemonList = () => {
  const [searchKey, setSearchKey] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const { pokemonList, refetch, isFetching } = useSearchPokemon({
    key: searchKey,
    onlyFavorites,
  });

  const dispatch = useAppDispatch();

  const { favorites, comparison, isComparisonFull } = useAppSelector(
    (state) => state.pokemon
  );

  const getIsFavorite = (pokemonId: number) => favorites.includes(pokemonId);

  const getInComparison = (pokemonId: number) => comparison.includes(pokemonId);

  const handleLoadMore = () => {
    refetch();
  };

  const handleToogleFavorite = (pokemonId: number) => {
    if (getIsFavorite(pokemonId)) {
      dispatch(removeFromFavorites(pokemonId));
    } else {
      dispatch(addToFavorites(pokemonId));
    }
  };

  const handleToogleCompare = (pokemonId: number) => {
    if (getInComparison(pokemonId)) {
      dispatch(removeFromCompare(pokemonId));
    } else {
      dispatch(addToCompare(pokemonId));
    }
  };

  return (
    <Stack gap={4}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <FormControl fullWidth>
            <InputLabel>Search</InputLabel>
            <Input
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={4} container justifyContent="flex-end">
          <Checkbox
            checked={onlyFavorites}
            onChange={(e) => setOnlyFavorites(e.target.checked)}
            icon={<FavoriteBorderIcon />}
            checkedIcon={<FavoriteIcon />}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <PokemonCards
          pokemonList={pokemonList}
          getIsFavorite={getIsFavorite}
          getInComparison={getInComparison}
          onToogleFavorite={handleToogleFavorite}
          onToogleCompare={handleToogleCompare}
          isComparisonFull={isComparisonFull}
        />
        {isFetching && <PokemonListSkeleton />}
      </Grid>
      <Stack direction="row" justifyContent="center" marginY={4}>
        <Button variant="text" onClick={handleLoadMore}>
          Load more
        </Button>
      </Stack>
    </Stack>
  );
};
