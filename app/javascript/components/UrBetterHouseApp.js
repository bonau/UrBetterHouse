import { CssBaseline } from '@mui/material';
import * as React from 'react';
import MainAppBar from './MainAppBar'
import MainContent from './MainContent';
import FilterBox from './FilterBox';
import qs from 'qs';

export default function UrBetterHouseApp () {
  const [inited, setInited] = React.useState(false);
  const [authToken, setAuthToken] = React.useState("");
  const [role, setRole] = React.useState("");
  const [datas, setDatas] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [filters, setFilters] = React.useState({
    city: "",
    dist: "",
    netSize: [10, 50],
    pricePerMonth: [10000, 40000],
  });
  const [availableFilters, setAvailableFilters] = React.useState({
    city: ["台北市", "新北市"],
    dist: [],
  });

  let lastFilterChangeTime = Date.now()

  const handleOnLogin = (data) => {
    let token = data["token"];
    let role = data["role"];
    setAuthToken(token);
    setRole(role);
    storeCredential(token, role);
  }

  const delay = (n) => {
    return new Promise((resolve) => {
        setTimeout(resolve,n * 1000);
    });
  }

  const handleFilterChanged = (filters) => {
    lastFilterChangeTime = Date.now();
    delay(0.5).then(() => { // to make sure not to request massively when value of silder changed
      setFilters(filters);
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

  const handleResidentialValueChanged = (rid, key, oldValue, newValue) => {
    updateResidentialPropertyChange(rid, key, newValue).then((value) => {
      let newDatas = [...datas];
      newDatas.forEach((e) => {
        if (e.id == rid) {
          e[key] = newValue;
        }
      });
      setDatas(newDatas);
    });
  }

  const updateResidentialPropertyChange = async (rid, key, value) => {
    return new Promise((resolve, reject) => {
      let body = {};
      body[key] = value;
      let opt = {method: "PUT", body: JSON.stringify(body), headers: {"CONTENT-TYPE": "application/json"}};
      let url = `/api/v1/residentials/${rid}`;
      fetch(url, opt).then((res) => {
        resolve(value);
      }).catch((e) => {
        console.log(e);
      })
    })
  }

  const fetchPage = (p = 1, argFilters = {}) => {
    let query = new URLSearchParams();
    let newFilters = {...filters, ...argFilters};
    if (Object.keys(argFilters).length > 0) {
      setFilters(newFilters);
    }
    query.set("page", p);
    query.set("auth_token", authToken);
    query.set("filters", qs.stringify(newFilters));
    let url = `/api/v1/residentials?${query}`;

    fetch(`/api/v1/residentials?${query}`).then((res) => {
      res.json().then((data) => {
        setDatas(data.datas);
        setPage(p);
        setTotalPage(data.total_page);
        setAvailableFilters(data.available_filters[0]); // TODO cannot present hash
      }).catch((e) => {
        console.log(e);
      });
    })
  }

  const storeCredential = (token, role) => {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('role', role);
  }

  const restoreToken = () => {
    setAuthToken(window.localStorage.getItem('token'));
    setRole(window.localStorage.getItem('role'));
  }

  React.useEffect(() => {
    restoreToken();
    if (!inited) {
      setInited(true);
      fetchPage(1);
    }
  })

  return (
    <>
      <CssBaseline />
      <MainAppBar onLogin={handleOnLogin} authToken={authToken} />
      <FilterBox filters={filters} availableFilters={availableFilters} onDataChanged={handleFilterChanged} />
      <MainContent
        authToken={authToken}
        role={role}
        datas={datas}
        page={page}
        totalPage={totalPage}
        onFavorite={handleOnFavorite}
        onPaginationChange={handlePaginationChange}
        onResidentialValueChanged={handleResidentialValueChanged}
      />
    </>
  )
}