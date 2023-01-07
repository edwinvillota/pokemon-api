import { Box } from "@mui/material";
import styled from "styled-components";

const StyledImg = styled.img`
  object-fit: contain;
`;

export type DetailsImageProps = {
  src: string;
  alt: string;
};

export const DetailsImage = (props: DetailsImageProps) => {
  return (
    <Box
      height={300}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <StyledImg {...props} />
    </Box>
  );
};
