import { Box, Container, Pagination, styled } from "@mui/material";
import React from "react";
import ResidentialShowcase from "./ResidentialShowcase";

export default function MainContent(props) {
  const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2, 2),
    display: "flex",
    flexDirection: "column"
  }));

  const StyledPagination = styled(Pagination)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }));

  const paginationCallback = (_, p) => {
    console.log(p);
  };

  return (
    <StyledBox>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: "1em",
          flexWrap: "wrap",
          "> *": {
            flex: {
              xs: "1 1 auto",
              md: "1 1 30%"
            }
          }
        }}
      >
        <ResidentialShowcase />
        <ResidentialShowcase />
        <ResidentialShowcase />
        <ResidentialShowcase />
        <ResidentialShowcase />
        <ResidentialShowcase />
      </Container>
      <Container>
        <StyledPagination
          count={10}
          size="large"
          onChange={paginationCallback}
        ></StyledPagination>
      </Container>
    </StyledBox>
  );
}
