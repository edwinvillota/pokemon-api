import { Grid, Skeleton } from "@mui/material";
import { useId } from "react";

export type PokemonListSkeletonProps = {
  cardsNumber?: number;
};

export const PokemonListSkeleton = ({
  cardsNumber = 20,
}: PokemonListSkeletonProps) => {
  const id = useId();
  const skeletons = Array(cardsNumber).fill("");

  return (
    <>
      {skeletons.map((_, index) => (
        <Grid item key={`${id}-${index}`} data-testid="skeleton">
          <Skeleton
            variant="rectangular"
            height={564}
            width={260}
            animation="wave"
          />
        </Grid>
      ))}
    </>
  );
};
