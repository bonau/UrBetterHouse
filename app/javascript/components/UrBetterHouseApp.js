import { CssBaseline } from '@mui/material';
import * as React from 'react';
import MainAppBar from './MainAppBar'
import MainContent from './MainContent';
export default function UrBetterHouseApp () {
  return (
    <>
      <CssBaseline />
      <MainAppBar />
      <MainContent />
    </>
  )
}