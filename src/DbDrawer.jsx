import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Box, Divider, Drawer, Link, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Button } from "@mui/material";
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useState } from "react";
import {useNavigate} from "react-router-dom";



export default function DbDrawer(props) {
    const indianStates = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Lakshadweep",
        "Delhi",
        "Puducherry"
    ];

    const drawerWidth = useMediaQuery(useTheme().breakpoints.up('sm')) ? 300 : 240;
    const [drawerOpen, setDrawerOpen] = useState(true)
    const [activeColor, setColor] = useState('inherit')

    const navigate = useNavigate();

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={props.drawerOpen}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <List sx={{}}>
                <ListItem button onClick={()=>navigate('/app')} sx={{ width: '80%', margin: "5px 0", borderRadius: '0px 20px 20px  0px' }} >
                    <ListItemIcon>
                        <HomeRoundedIcon sx={{ color: '#3c4043' }} />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography fontSize={'0.875rem'} fontWeight={500} lineHeight={'1.25rem'} color={'#3c4043'}>
                            Home
                        </Typography>
                    </ListItemText>
                </ListItem>
                <Divider />
                {indianStates.map((state, index) => (
                    <ListItem button key={index} component='a' href={`#/${index}`} sx={{ width: '80%', margin: "5px 0", borderRadius: '0px 20px 20px  0px' }} >
                        <ListItemIcon>
                            <FolderRoundedIcon sx={{ color: "#3c4043" }} />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography fontSize={'0.875rem'} fontWeight={500} lineHeight={'1.25rem'} color={'#3c4043'}>
                                {state}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}