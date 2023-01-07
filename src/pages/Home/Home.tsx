import { Container } from "@mui/system";
import { PokemonList } from "../../components/organisms/PokemonList";

export const Home = () => {
  return (
    <Container
      disableGutters
      sx={{
        paddingY: 8,
      }}
    >
      <PokemonList />
    </Container>
  );
};
