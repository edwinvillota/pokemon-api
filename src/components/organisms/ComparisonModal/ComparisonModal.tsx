import {
  AppBar,
  Dialog,
  DialogContent,
  DialogProps,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useMemo } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useAppSelector } from "../../../redux/hooks";
import { useGetAllPokemonQuery } from "../../../redux/api/pokemonApi";
import { PokemonCard } from "../../molecules/PokemonCard";
import { ComparisonChart } from "./ComparisonChart";

export type ComparisonModalProps = DialogProps & {
  handleCloseModal: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ComparisonModal = ({
  handleCloseModal,
  ...props
}: ComparisonModalProps) => {
  const { data: pokemonList } = useGetAllPokemonQuery({});
  const comparison = useAppSelector((state) => state.pokemon.comparison);

  const pokemon1 = useMemo(() => {
    return pokemonList?.results?.find(
      (pokemon) => pokemon.id === comparison[0]
    );
  }, [comparison, pokemonList?.results]);

  const pokemon2 = useMemo(() => {
    return pokemonList?.results?.find(
      (pokemon) => pokemon.id === comparison[1]
    );
  }, [comparison, pokemonList?.results]);

  const Content = () => {
    if (pokemon1 && pokemon2) {
      return (
        <>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="close"
                onClick={handleCloseModal}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <Grid container justifyContent="center" gap={10}>
              <Grid item>
                <PokemonCard pokemon={pokemon1} withActions={false} />
              </Grid>
              <Grid item display="flex" alignItems="center">
                <Typography variant="h1" fontWeight="bold" height="auto">
                  VS
                </Typography>
              </Grid>
              <Grid item>
                <PokemonCard pokemon={pokemon2} withActions={false} />
              </Grid>
              <Grid item xs={12} md={8}>
                <ComparisonChart pokemonToCompare={[pokemon1, pokemon2]} />
              </Grid>
            </Grid>
          </DialogContent>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <Dialog {...props} fullScreen TransitionComponent={Transition}>
      <Content />
    </Dialog>
  );
};
