import { Box, Container, Pagination, styled } from "@mui/material";
import React, { useState } from "react";
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

  const handlePaginationChange = (_, p) => {
    if (props.onPaginationChange) {
      props.onPaginationChange(p);
    }
  };

  const handleValueChanged = (rid) => {
    return (key, oldValue, newValue) => {
      if (props.onResidentialValueChanged) {
        props.onResidentialValueChanged(rid, key, oldValue, newValue);
      }
    }
  }

  const onFavorite = (rid, liked) => {
    if (props.onFavorite) {
      props.onFavorite(rid, liked);
    }
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
        {
          props.datas.map((e) =>
            <ResidentialShowcase key={`rs-${e.id}`} data={e} onFavorite={onFavorite} onValueChanged={handleValueChanged(e.id)} />
          )
        }
      </Container>
      <Container>
        <StyledPagination
          count={props.totalPage}
          page={props.page}
          size="large"
          onChange={handlePaginationChange}
          display={props.totalPage <= 1 ? 'none' : 'block'}
        ></StyledPagination>
      </Container>
    </StyledBox>
  );
}
