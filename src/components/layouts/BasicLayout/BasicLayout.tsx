import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../../molecules/Header";
import { Footer } from "../../molecules/Footer";
import { Container } from "@mui/system";

export const StyledContainer = styled.main`
  display: flex;
  justify-content: stretch;
  flex-direction: column;
  min-height: 100vh;
`;

export const BasicLayout = () => {
  return (
    <StyledContainer>
      <Header />
      <Container>
        <Outlet />
        <Footer />
      </Container>
    </StyledContainer>
  );
};
