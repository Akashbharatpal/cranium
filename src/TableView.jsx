import { IconButton, Stack, Fade, Snackbar, Box, Typography, Popper, ClickAwayListener, Card, Accordion, AccordionSummary, AccordionDetails, Divider, ListItem, List, useMediaQuery, } from "@mui/material";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import './App.css';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
// import generatePDFBlob from "./PdfDownloader";
import { useTheme } from "@emotion/react";


const Row = (props) => {

    const row = props.row;
    const key = props.key;
    const [open, setOpen] = useState(false);
    const [snackMsg, setMsg] = useState(undefined);
    const [snackPack, setSnackPack] = useState([]);
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down(620));

    useEffect(() => {
        if (snackPack.length && !snackMsg) {
            // Set a new snack when we don't have an active one
            setMsg({ ...snackPack[0] });
            setSnackPack((prev) => prev.slice(1));
            setOpen(true);
        } else if (snackPack.length && snackMsg && open) {
            // Close an active snack when a new one is added
            setOpen(false);
        }
    }, [snackPack, snackMsg, open]);


    const [anchorEl, setAnchorEl] = useState(null);

    const [expanded, setExpanded] = useState(null);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleDocumentClick = (event) => {
        if (!event.target.closest('.MuiAccordion-root')) {
            setExpanded(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const classes = useStyles();
    const details = [{
        "Father's Name": row.fname ? row.fname.toLowerCase().replace(/(?:^|\s)\w/g, match => match.toUpperCase()) : "No data available",
        "Email": row.email ? row.email : "No data available",
        "Date-of-Birth": row.dob ? (isNaN(new Date(row.dob).getDate()) ? "No data available" : new Date(row.dob).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })) : "No data available"
    },
    {
        "UID": /^[0-9]+$/.test(row.uid) ? row.uid.replace(/(\d{4})(?=\d)/g, "$1-") : "No data available",
        "Alternative no": row.altno ? row.altno : "No data available",
        "Date-of-Admission": row.doa ? (isNaN(new Date(row.doa).getDate()) ? "No data available" : new Date(row.doa).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })) : "No data available"
    }];

    return (
        <React.Fragment>
            <Accordion key={key} style={{ borderRadius: '7px'}} component={Card}
                expanded={expanded === `panel-${row.id}`}
                onChange={handleChange(`panel-${row.id}`)}
                elevation={expanded === `panel-${row.id}` ? 3 : 0}>
                <AccordionSummary className={classes.accordionDetailsClasses} sx={{ height: 59, minWidth:'280px' }}>
                    <Stack direction={"row"} width={'100%'} alignItems={"center"} justifyContent={"space-between"}>
                        <AccountCircleRoundedIcon fontSize="large" sx={{ color: "#5f6368" }} />
                        <Box className={classes.NameMobile}>
                            <Typography textAlign={'start'} component='h1' variant='h5' style={{ fontSize: '0.875rem', fontWeight: '500', color: '#3c4043' }}>
                                {row.cname.toLowerCase().replace(/(?:^|\s)\w/g, match => match.toUpperCase())}
                            </Typography>
                            <Typography component='h1' variant='h5' style={{ fontSize: '0.75rem', fontWeight: '400', color: '#0000008c' }}>
                                {row.mobile}
                            </Typography>
                        </Box>

                        <IconButton size="large" onClick={(event) => { event.stopPropagation(); setAnchorEl(anchorEl ? null : event.currentTarget) }}>
                            <MoreVertRoundedIcon />
                        </IconButton>
                        <Popper id={Boolean(anchorEl) ? 'simple-popper' : undefined} open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-end">
                            <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                                <Card sx={{ padding: '5px 0px', width: 112 }}>
                                    <List>
                                        <ListItem button sx={{ color: '#3c4043', justifyContent: "space-evenly", ['&:hover']: { bgcolor: '#C0C0C070' } }} onClick={() => {
                                            setAnchorEl(null);
                                            navigator.clipboard.writeText(JSON.stringify(row));
                                            setSnackPack((prev) => [...prev, { message: "Content copied to Clipboard", key: new Date().getTime() }]);
                                        }}> <ContentCopyIcon fontSize="small" />
                                            <Typography component='h1' sx={{ fontSize: 14, fontWeight: 500 }}>
                                                Copy
                                            </Typography>
                                        </ListItem>
                                        <ListItem button sx={{ color: '#3c4043', justifyContent: 'space-evenly', ['&:hover']: { bgcolor: '#C0C0C070' } }} onClick={() => {
                                            setAnchorEl(null);
                                            // generatePDFBlob(row);
                                            setSnackPack((prev) => [...prev, { message: "Printing...", key: new Date().getTime() }]);
                                        }}>
                                            <PrintRoundedIcon fontSize="small" />
                                            <Typography margin={'normal'} component='h1' sx={{ fontSize: 14, fontWeight: 500 }}>
                                                Print
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </Card>
                            </ClickAwayListener>
                        </Popper>
                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            key={snackMsg ? snackMsg.key : undefined}
                            open={open}
                            TransitionComponent={Fade}
                            autoHideDuration={2000}
                            TransitionProps={{ onExited: () => setMsg(undefined) }}
                            onClose={() => setOpen(false)}
                            message={snackMsg ? snackMsg.message : undefined}
                        />
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" textAlign={'start'} gutterBottom component="div">
                            Details
                        </Typography>
                        {!isSmall ? <Stack direction={"row"} marginBottom={1} justifyContent={'space-between'}
                            divider={<Divider orientation="vertical" flexItem />} style={{ width: '100%' }}>
                            {details.map((data) => (
                                <Stack textAlign={'left'} marginLeft={1.2} marginRight={0.5} style={{ width: '100%' }}>
                                    {Object.keys(data).map((key) => (
                                        <Stack key={key} spacing={1} direction={'row'}>
                                            <Typography variant="h6" color={'#3c4043'} fontSize={'.875em'}>{String(key)}:</Typography>
                                            <Typography fontSize={'.875em'} fontWeight={400} color={"#0000008c"}>{String(data[key])}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            ))}
                        </Stack> :
                            details.map((data) => (
                                Object.keys(data).map((key) => (
                                    <Stack key={key} spacing={1} justifyContent={'flex-start'} direction={'row'}>
                                        <Typography textAlign={'start'} style={{ minWidth: '100px' }} variant="h6" color={"#3c4043"} fontSize={'.875em'}>{String(key)}:</Typography>
                                        <Typography textAlign={'start'} fontSize={'.875em'} fontWeight={400} color={"#0000008c"}>{String(data[key])}</Typography>
                                    </Stack>
                                ))
                            ))}
                        <Typography textAlign={'start'} fontSize={'0.875rem'}>
                            <span style={{ minWidth: '135px', fontWeight: 500, color: '#3c4043' }}>Local Address:</span>
                            <span style={{ marginLeft: 10, fontWeight: 400, color: '#0000008c', wordWrap: 'break-word' }}>{row.ladd?row.ladd.toLowerCase().replace(/(?:^|\s)\w/g, match => match.toUpperCase()):"No data available"}</span>
                        </Typography>
                        <Typography textAlign={'start'} fontSize={'0.875rem'}>
                            <span style={{ minWidth: '135px', fontWeight: 500, color: '#3c4043' }}>Permenant Address:</span>
                            <span style={{ marginLeft: 10, fontWeight: 400, color: '#0000008c', wordWrap: 'break-word' }}>{row.padd?row.padd.toLowerCase().replace(/(?:^|\s)\w/g, match => match.toUpperCase()):"No data available"}</span>
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </React.Fragment>

    );
}

const useStyles = makeStyles((theme) => ({
    breakpoints: {
        values: {
            xs: 0,
            sm: 480,
            md: 700,
            lg: 1000,
            xl: 1536,
        },
    },
    accordionDetailsClasses: {
        // borderRadius:'20px',
        '&.Mui-expanded': {
            backgroundColor: "#2196f350",
            // Background color when expanded
        },
        '&:hover': {
            backgroundColor: '#2196f330', // Change this to your desired hover color
        },
    },
    tableContainer: {
        position: 'relative',
        top:'64px',
        margin:'0px auto',
        padding: '8px',
        paddingBottom:'60px',
        border: 'none',
        width: '100%', // Default width for smaller screens
        [theme.breakpoints.up('sm')]: {
            maxWidth: '700px',
            width: '700px', // 50% width on screens with medium breakpoint and above
        },
    },
    NameMobile: {
        padding: '0px 30px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start'
        }
    }
}));

export default function TableView(props) {

    const data = props.data;
    const classes = useStyles();

    return (
        <Stack className={classes.tableContainer} spacing={0} divider={<Divider variant="middle" />}>
            {data.map((row, index) => (
                <Row key={index} row={row} />
            ))}
        </Stack>
    )
}