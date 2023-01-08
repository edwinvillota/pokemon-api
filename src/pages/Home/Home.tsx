import { Alert, Button, Snackbar } from "@mui/material";
import { Container } from "@mui/system";
import { ComparisonModal } from "../../components/organisms/ComparisonModal";
import { PokemonList } from "../../components/organisms/PokemonList";
import {
  closeModal,
  openModal,
} from "../../redux/features/pokemon/pokemonSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export const Home = () => {
  const { isComparisonFull, isModalOpen } = useAppSelector(
    (state) => state.pokemon
  );
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Container
        disableGutters
        sx={{
          paddingY: 8,
        }}
      >
        <PokemonList />
      </Container>
      <Snackbar
        open={isComparisonFull}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert
          severity="info"
          action={
            <Button color="inherit" size="small" onClick={handleOpenModal}>
              OPEN
            </Button>
          }
        >
          Open comparison modal
        </Alert>
      </Snackbar>
      <ComparisonModal open={isModalOpen} handleCloseModal={handleCloseModal} />
    </>
  );
};
