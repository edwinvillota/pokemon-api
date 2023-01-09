import { Alert, Button, Snackbar } from "@mui/material";
import { Container } from "@mui/system";
import { ComparisonModal } from "../../components/organisms/ComparisonModal";
import { PokemonList } from "../../components/organisms/PokemonList";
import {
  closeModal,
  openModal,
  resetComparison,
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

  const handleResetComparison = () => {
    dispatch(resetComparison());
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
        open={isComparisonFull && !isModalOpen}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert
          severity="info"
          action={[
            <Button
              color="inherit"
              size="small"
              onClick={handleOpenModal}
              key={"open_modal"}
            >
              OPEN MODAL
            </Button>,
            <Button
              color="inherit"
              size="small"
              onClick={handleResetComparison}
              key={"reset_comparison"}
            >
              RESET COMPARISON
            </Button>,
          ]}
        >
          Comparison is ready
        </Alert>
      </Snackbar>
      <ComparisonModal open={isModalOpen} handleCloseModal={handleCloseModal} />
    </>
  );
};
