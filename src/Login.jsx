import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, IconButton, InputAdornment, TextField, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './App.css';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

function App() {

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to main application page if token is found
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.get(`https://central-hub-itullu7wmq-uc.a.run.app/login?user='${values['email']}'&pass='${values['password']}'&remember_me=${values['remember']} `);
      if (response.data.token) {
        // Successful login, you can redirect or perform other actions.
        localStorage.setItem('token', response.data.token);
        navigate('/'); 
      }
    } catch (error) {

      if (error.code === 'ERR_NETWORK') {
        setError('Error while connecting to server please try later.');
      }
      else {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          setError('Unauthorized. Please check your credentials.');
        }
        else if (statusCode === 500) {
          setError('Internal Server Error. Please try again later.');
        } else {
          setError('An error occurred. Please try again.');
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false
    },
    validationSchema: SignInSchema,
    onSubmit: handleSubmit,
  });


  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright ©'}
        {new Date().getFullYear()}
        {' '}
        <strong>Cyber Intel Firm</strong>
        {'. '}All rights reserved.
      </Typography>
    );
  }


  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const theme = createTheme({

    palette: {
      primary: {
        main: "#2368f5",
        dark: "#1e58d0"
      },
      error: {
        main: "#E63232",
      }
    },
    typography: {
      fontFamily: "GT Haptik"
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            "&.MuiFilledInput": {
              "&-root": {
                backgroundColor: '#c1c1c1',
                borderRadius: '1.6rem',
                "&:hover": {
                  backgroundColor: '#c1c1c1',
                },
                "&.Mui-focused": {
                  backgroundColor: '#c1c1c1',
                },
              }
            }
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '1.2rem',
            borderRadius: '1.6rem',
            fontFamily: 'GT Haptik Black',
            width: '100%',
            marginTop: '1rem',
            textTransform: 'capitalize',
          },
        }
      },

    }
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container maxWidth='xs' sx={{
          borderRadius: '1em',
          bgcolor: '#fff',
          boxShadow: '3.72943px 7.45887px 7.45887px rgba(0, 0, 0, .1), 3.72943px 7.45887px 29.8355px rgba(0, 0, 0, .25)'
        }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

            }}
          >
            <Toolbar />

            <Typography component='h1' color={"#323232"} fontSize={"2.6rem"} fontFamily={"GT Haptik Black"} align="center" gutterBottom>
              Login
            </Typography>
            <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={formik.handleSubmit}>

              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                autoComplete='off'
                variant='filled'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
                InputProps={{ disableUnderline: true }}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                variant='filled'
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox sx={{
                  marginLeft: '1.2rem',
                }} name='remember' color="primary"
                  checked={formik.values.remember}
                  onChange={formik.handleChange}
                />}
                label="Remember me"
                name='remember'
              />
              <Button variant='contained' type='submit'>Login</Button>
              {error && (
                <Typography color="error" textAlign={'center'} variant="body2">
                  {error}
                </Typography>
              )}
            </form>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
