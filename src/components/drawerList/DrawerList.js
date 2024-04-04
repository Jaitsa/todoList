import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import { Link } from 'react-router-dom';

export const toggleDrawer = (setOpen) => (newOpen) => {
    setOpen(newOpen);
};

const HomeIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
        </SvgIcon>
    );
}

const signOut = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
};

export const DrawerList = (
    <Drawer
        variant="permanent"
        sx={{
            '& .MuiDrawer-paper': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
        }}
    >
        <List sx={{ backgroundColor: 'pink' }}>
            {['Login Page', 'Todo List'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton component={Link} to={index === 0 ? '/login' : '/todo'} >
                        <ListItemIcon>
                            <Stack direction='row' spacing={3} alignItems='flex-end' >
                                <HomeIcon fontSize='medium' />
                            </Stack>
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
            <Divider />
            {['Sign Out'].map((text) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => signOut()}>
                        <ListItemIcon >
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
            {/* {['Sign Out', 'Sign In'].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton component={Link} to={index === 1 ? '/login' : '#'} onClick={index === 0 ? signOut : null}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
        ))} */}
        </List >
    </Drawer>
);


export default DrawerList;