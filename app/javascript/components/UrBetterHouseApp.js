import { CssBaseline } from '@mui/material';
import * as React from 'react';
import MainAppBar from './MainAppBar'
import MainContent from './MainContent';
import FilterBox from './FilterBox';

export default function UrBetterHouseApp () {
  const [authToken, setAuthToken] = React.useState("");
  const [datas, setDatas] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [filters, setFilters] = React.useState({});

  let lastFilterChangeTime = Date.now()

  const handleOnLogin = (token) => {
    setAuthToken(token);
    storeToken(token);
  }

  const delay = (n) => {
    return new Promise((resolve) => {
        setTimeout(resolve,n * 1000);
    });
}

  const handleFilterChanged = (filters) => {
    lastFilterChangeTime = Date.now();
    delay(0.5).then(() => { // to make sure not to request massively when value of silder changed
      if ((Date.now() - lastFilterChangeTime) / 1000 >= 0.5) {
        fetchPage(1, filters);
      }
    });
  }

  const handleOnFavorite = (rid, liked = true) => {
    let opt = {
      method: (liked ? "POST" : "DELETE"),
      body: JSON.stringify({ auth_token: authToken }),
      headers: { 'Content-Type': "application/json" }
    }
    fetch(`/api/v1/residentials/${parseInt(rid)}/like`, opt).then((res) => {
      res.json().then((data) => {
        datas.filter((e) => {
          return e.id == rid;
        }).forEach((e) => {
          e.liked = liked;
        })

        // FIXME can cause performance problem
        setDatas([...datas]);
      }).catch((e) => {
        console.log(e);
        // TODO catch exception
      })
    })
  }

  const handlePaginationChange = (p) => {
    fetchPage(p);
  }

  const fetchPage = (p = 1, argFilters = {}) => {
    let query = new URLSearchParams();
    if (argFilters.length > 0) {
      setFilters({...filters, ...argFilters})
    }
    query.set("page", p);
    query.set("auth_token", authToken);
    query.set("filters", filters);
    let url = `/api/v1/residentials?${query}`;

    fetch(`/api/v1/residentials?${query}`).then((res) => {
      res.json().then((data) => {
        setDatas(data.datas);
        setPage(p);
        setTotalPage(data.total_page);
      }).catch((e) => {
        console.log(e);
      });
    })
  }

  const storeToken = (token) => {
    window.localStorage.setItem('token', token);
  }

  const restoreToken = () => {
    return window.localStorage.getItem('token');
  }

  React.useEffect(() => {
    let token = restoreToken();
    setAuthToken(token);

    if (datas.length == 0) {
      fetchPage();
    }
  })

  return (
    <>
      <CssBaseline />
      <MainAppBar onLogin={handleOnLogin} authToken={authToken} />
      <FilterBox filters={filters} onDataChanged={handleFilterChanged} />
      <MainContent
        authToken={authToken}
        datas={datas}
        page={page}
        totalPage={totalPage}
        onFavorite={handleOnFavorite}
        onPaginationChange={handlePaginationChange}
      />
    </>
  )
}