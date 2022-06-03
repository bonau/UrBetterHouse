import { Box, Container, Pagination, styled } from "@mui/material";
import React from "react";

export default function MainContent() {
  const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2, 2),
    display: "flex"
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
