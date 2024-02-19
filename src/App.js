import './App.css';
import Navbar from './Navbar';
import TableView from './TableView';
import Guideline from './Guideline';
import NoDataFound from './NoDataFound'
import { useEffect, useRef, useState } from 'react';
import { Box, CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

const theme = createTheme({
  palette: {
    primary: {
      main: "#2368f5",
      dark: "#1e58d0"
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif', // Use "Inter" font as the default
  },
});

function App() {
  // const initial = [{name:'bharat', email:'akashbharatpal@gmail.com', mobile:'9987780963', UID:'432756422451'}];
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [height, setHeight] = useState(null);
  const handleNoData = (nodata) => {
    setNoData(nodata);
  }

  const handleDataReceived = (receivedData) => {
    setData(receivedData);
  };

  const [loading, setLoading] = useState(false);
  const handleLoading = (load) => {
    setLoading(load);
  }

  function Copyright(props) {
    
    return (
      <Box sx={{
        position: 'fixed', bottom: '0px', //to fix it below
        width: '100%',
        bgcolor: "primary.dark",
        display: 'flex',
        alignItems: 'center'
      }}>
        <Typography padding={1.2} variant="body2" color="#fff" align="center" {...props}>
          {'Copyright ©'}
          {new Date().getFullYear()}
          {' '}
          Cyber Intel Firm
          {'. '}All rights reserved.
        </Typography>
      </Box>
    );
  }


  return (
    <div className='App' >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar sendData={handleDataReceived} loading={handleLoading} noData={handleNoData} />
        {loading && <Box sx={{ position: 'relative', top: '64px', width: '100%' }}>
          <LinearProgress sx={{ width: '100vw' }} />
        </Box>}
        {/* <DbDrawer drawerOpen={drawerOpen} /> */}
        {data.length ? <TableView data={data}/> :
          noData ? <NoDataFound /> : <Guideline />}
        <Copyright />
      </ThemeProvider>
    </div>
  );
}

export default App;