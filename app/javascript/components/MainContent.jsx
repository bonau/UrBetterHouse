import { Box, Container, Pagination, styled } from "@mui/material";
import React, { useState } from "react";
import ResidentialShowcase from "./ResidentialShowcase";

export default function MainContent(props) {
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [authToken, setAuthToken] = useState("");

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

  const fetchPage = (p) => {
    fetch('/api/v1/residentials?page=' + parseInt(p)).then((res) => {
      res.json().then((data) => {
        setDatas(data.datas);
        setPage(p);
        setTotalPage(data.total_page);
      });
    })
  }

  const paginationCallback = (_, p) => {
    fetchPage(p);
  };

  const onFavorite = (rid) => {
    opt = {method: "POST", body: JSON.stringify({auth_token: authToken})}
    fetch('/api/v1/residentials/' + parseInt(rid) + '/like').then((res) => {
      res.json().then((data) => {
        // TODO validate
        setFavo(true);
      })
    })
  };

  const onUnfavorite = () => {
    opt = {method: "DELETE", body: JSON.stringify({auth_token: authToken})}
    fetch('/api/v1/residentials/' + parseInt(rid) + '/like').then((res) => {
      res.json().then((data) => {
        // TODO validate
        setFavo(false);
      })
    })
  };

  React.useEffect(() => {
    if (datas.length == 0) {
      fetchPage(1);
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
            <ResidentialShowcase data={e} onFavorite={onFavorite} onUnfavorite={onUnfavorite} />
          )
        }
      </Container>
      <Container>
        <StyledPagination
          count={totalPage}
          page={page}
          size="large"
          onChange={paginationCallback}
        ></StyledPagination>
      </Container>
    </StyledBox>
  );
}