import { CssBaseline } from '@mui/material';
import * as React from 'react';
import MainAppBar from './MainAppBar'
import MainContent from './MainContent';
export default function UrBetterHouseApp () {
  const [authToken, setAuthToken] = React.useState("");

  const handleLogin = (token) => {
    setAuthToken(token)
  }

  return (
    <>
      <CssBaseline />
      <MainAppBar onLogin={handleLogin} />
      <MainContent authToken={authToken} />
    </>
  )
}