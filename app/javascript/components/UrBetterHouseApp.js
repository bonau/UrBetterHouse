import { CssBaseline } from '@mui/material';
import * as React from 'react';
import MainAppBar from './MainAppBar'
import MainContent from './MainContent';
export default function UrBetterHouseApp () {
  const [authToken, setAuthToken] = React.useState("");

  const handleOnLogin = (token) => {
    setAuthToken(token);
    storeToken(token);
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
  })

  return (
    <>
      <CssBaseline />
      <MainAppBar onLogin={handleOnLogin} authToken={authToken} />
      <MainContent authToken={authToken} />
    </>
  )
}