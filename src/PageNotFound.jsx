import React from 'react';
import { makeStyles } from '@mui/styles';
import pic from './Images/nodatafound1.jpg';
import { Box, Stack, Typography } from '@mui/material';
import './App.css'
import { useTheme } from '@emotion/react';

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: '100%',
    height: 'auto',
    margin: '8.4375rem 0 1.5rem',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '80%', // Adjust as needed for smaller screens
    },
  },
}));

export default function PageNotFound() {
  const classes = useStyles();

  return (
    <Stack sx={{ width: '100%', height: '100%', position: 'relative', maxWidth: '47.5rem', padding: '1.5rem 1.5rem', margin: '0 auto' }} justifyContent={'center'} alignItems={'center'}>
      <Box
        component={'img'}
        width={350}
        src={pic}
        alt="No data found in Datamine folder"
        className={classes.image}
      />
      <Typography sx={{ marginBottom: '8px', fontSize: '0.875rem', color: '#3c4043', fontWeight: 500, lineHeight: '1.25rem' }}>
      No Data Found for Your Search
        </Typography>
      <Typography sx={{ fontSize: '0.875rem',maxWidth:'21.875rem', color: '#3c4043', fontWeight: 400, lineHeight: '1.25rem' }}>
        Please modify your search criteria or try a different state. We're currently expanding our database.
      </Typography>
    </Stack>
  );
}