import { Box, Container, Pagination, styled } from "@mui/material";
import React, { useState } from "react";
import ResidentialShowcase from "./ResidentialShowcase";

export default function MainContent(props) {
  const [datas, setDatas] = useState([]);

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

  React.useEffect(() => {
    if (datas.length == 0) {
      fetch('/api/v1/residentials').then((res) => {
        res.json().then((data) => {
          setDatas(data);
        });
      })
    }
  });

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
          datas.map((e) =>
            <ResidentialShowcase data={e} />
          )
        }
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
