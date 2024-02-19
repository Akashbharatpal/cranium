import React from 'react';
import { AppBar, TextField, InputAdornment, IconButton, Typography, Tooltip, Fade, Divider, Stack, Box, Link, useMediaQuery, Button, Select, MenuItem, InputLabel, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo2 from './Images/Picture1.png'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/LogoutRounded';


const Navbar = (props) => {

    const handleSubmit = async (values) => {
        try {
            // console.log(values)
            props.loading(true);
            const response = await axios.get(`https://central-hub-itullu7wmq-uc.a.run.app/search?option=${values['option']}&value='${values['value']}' `);
            // console.log(selectTerm)
            console.log(response.data)
            if (response.data) {
                props.loading(false);
                props.sendData(response.data)
                if (Boolean(searchTerm)) { props.noData(true); }
                else { props.noData(false); }
            }
        } catch (error) {
            props.loading(false);
            const statusCode = error.response.status;
            console.log(statusCode)
        } finally {
            props.loading(false);
        }
    };

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('token');

        // Redirect the user to the login page or perform any other action
        window.location.href = '/login';
    };

    const [searchTerm, setTerm] = React.useState('');
    const [selectTerm, setSelect] = React.useState(1);
    const [mobSearch, setMobSearch] = React.useState(false);
    const [elevation, setElevation] = React.useState(0);
    const theme = createTheme({
        palette: {
            primary: {
                main: "#2368f5",
                dark: "#1e58d0"
            }
        },
        typography: {
            fontFamily: 'Inter',
        },
        components: {
            MuiMenu: {
                styleOverrides: {
                    paper: {
                        borderRadius: "0.6rem"
                    }
                }
            },
            MuiSelect: {
                styleOverrides: {
                    select: {
                        padding: '8px',
                        color: "#236BF5",
                        border: 'none',
                        borderRadius: '0px',
                        borderRight: '2px solid #CCD4E3',
                        fontFamily: 'Inter Semibold',
                        minWidth: '60px', // Adjust the width as needed
                        '&:focus': {
                            // background:'#D3E1FD',
                            backgroundColor: 'transparent', // Remove the focus background color
                        },
                        '&::placeholder':{
                            color: "#236BF5"
                        }
                    },
                }
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        "&.MuiOutlinedInput": {
                            "&-root": {
                                padding: '4px 0px',
                                // backgroundColor: '#CCD4E3',
                                backgroundColor: '#E9F0F5',
                                borderRadius: '0.6rem',
                            },
                        },
                    },
                    input: {
                        '&.MuiOutlinedInput': {
                            "&-input": {
                                padding: "auto",
                                paddingLeft: "10px"
                            }
                        },
                        '&::placeholder': {
                            fontFamily: 'Inter Medium',
                            color: '#34518F'
                        },
                    },
                },
            },

            MuiOutlinedInput: {
                input: {
                    padding: '5px',
                },
                styleOverrides: {
                    notchedOutline: {
                        borderStyle: "none"
                    },
                }
            },

            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "capitalize",
                        margin: '0px 0.6rem',
                        fontSize: '1rem',
                        fontFamily: "Inter Semibold",
                        // color: "#34518F",
                        color: 'primary.main',
                        "&:hover": {
                            // color: "#012673"
                            color: 'primary.dark'
                        }
                    }
                }
            }
        }
    });
    const isSmall = useMediaQuery(theme.breakpoints.down(550));
    const smIcon = useMediaQuery(theme.breakpoints.down(300));

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setElevation(2); // Set the desired elevation when scrolled
            } else {
                setElevation(0); // Reset elevation when at the top
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <AppBar sx={{
                    backgroundColor: "#fff",
                    color: 'inherit',
                    borderBottom: '0.0625rem solid #e0e0e0',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    height: '64px'
                }} elevation={elevation}>

                    {(!mobSearch || !isSmall) && <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ width: '100%', marginRight: "0.75rem" }}>
                        <Box
                            component={'img'}
                            width={smIcon ? 180 : 200}
                            src={logo2}
                            alt="Demo"
                        />
                        {!isSmall &&
                            <form style={{ margin: "0px 5px", minWidth: '200px', width: '60%' }} onSubmit={(e) => { e.preventDefault(); handleSubmit({ value: searchTerm, option: selectTerm }) }}>
                                <TextField
                                    placeholder='Search for Email, UID and Mobile no.'
                                    size='small'
                                    autoComplete='off'
                                    value={searchTerm}
                                    onChange={(e) => setTerm(e.target.value)}
                                    sx={{ width: '90%' }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='start'>
                                                <Tooltip title="Search" disableInteractive
                                                    TransitionComponent={Fade}
                                                    TransitionProps={{ timeout: 600 }}
                                                    enterDelay={1000}
                                                    enterNextDelay={1000}
                                                    leaveDelay={500}
                                                >
                                                    <IconButton type='submit' onClick={() => handleSubmit({ value: searchTerm, option: selectTerm })} >
                                                        <SearchIcon sx={{ color: 'primary.main' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </InputAdornment>
                                        ),
                                        startAdornment: (
                                            <InputAdornment position='end'>
                                                <Tooltip title="Filter" disableInteractive
                                                    TransitionComponent={Fade}
                                                    TransitionProps={{ timeout: 600 }}
                                                    enterDelay={1000}
                                                    enterNextDelay={1000}
                                                    leaveDelay={500}
                                                >
                                                    <Select
                                                        name="searchType"
                                                        displayEmpty
                                                        sx={{ minWidth: '100px' }}
                                                        value={selectTerm}
                                                        onChange={(e) => setSelect(e.target.value)}
                                                        inputProps={{ 'aria-label': 'Select an option' }}
                                                    >
                                                    {/* <MenuItem sx={{display:'none'}} value={""}>Filter</MenuItem> */}
                                                    <MenuItem value={0}>Email</MenuItem>
                                                    <MenuItem value={1}>Mobile</MenuItem>
                                                    <MenuItem value={2}>UID</MenuItem>
                                                    </Select>
                                                </Tooltip>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </form>
                        }

                        <Stack direction={'row'} justifyContent={'center'}>
                            {isSmall &&
                                <Tooltip title="Search" disableInteractive
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    enterDelay={1000}
                                    enterNextDelay={1000}
                                    leaveDelay={500}
                                >
                                    <IconButton sx={{ margin: '0px 10px' }} onClick={() => setMobSearch(true)} size='large' edge='end' color='primary'>
                                        <SearchIcon />
                                    </IconButton>
                                </Tooltip>}
                            {!isSmall ?
                                <Tooltip title="Logout" disableInteractive
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    enterDelay={1000}
                                    enterNextDelay={1000}
                                    leaveDelay={500}
                                ><Button onClick={handleLogout}>Logout</Button></Tooltip> :
                                <Tooltip title="Logout" disableInteractive
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    enterDelay={1000}
                                    enterNextDelay={1000}
                                    leaveDelay={500}
                                ><IconButton onClick={handleLogout}><LogoutIcon sx={{ color: 'primary.main' }} /></IconButton></Tooltip>}
                        </Stack>
                    </Stack>}
                    {mobSearch && isSmall &&
                        <form onSubmit={(e) => { e.preventDefault(); setMobSearch(false); setTerm(''); handleSubmit({ value: searchTerm, option:selectTerm }) }}>
                            <TextField
                                // fullWidth
                                sx={{ width: '90%' }}
                                placeholder='Search for Email, UID and Mobile no.'
                                size='small'
                                value={searchTerm}
                                autoComplete='off'
                                onChange={(e) => setTerm(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='start'>
                                            <IconButton type='submit' onClick={() => { setMobSearch(false); handleSubmit({ value: searchTerm, option:selectTerm }) }} >
                                                <SearchIcon sx={{ color: 'primary.main' }} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    startAdornment: (
                                        <InputAdornment position='end'>
                                            <Select
                                                name="searchType"
                                                displayEmpty
                                                sx={{ minWidth: '100px' }}
                                                value={selectTerm}
                                                onChange={(e) => setSelect(e.target.value)}
                                                inputProps={{ 'aria-label': 'Select an option' }}
                                            >
                                                {/* <MenuItem sx={{display:'none'}} value={""}>Filter</MenuItem> */}
                                                <MenuItem value={0}>Email</MenuItem>
                                                <MenuItem value={1}>Mobile</MenuItem>
                                                <MenuItem value={2}>UID</MenuItem>
                                            </Select>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </form>}
                </AppBar >
            </ThemeProvider>
        </React.Fragment>

    );
}


export default Navbar;