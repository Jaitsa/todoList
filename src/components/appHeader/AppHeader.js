import React, { useState } from 'react';
import { Drawer, Button, Avatar } from '@mui/material';
import DrawerList from '../drawerList/DrawerList';

import './AppHeader.css';

const AppHeader = () => {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <header className='app-header'>
            <div className='container'>
                <h1 className='app-title'>TodoList</h1>
                <Button onClick={handleDrawerOpen}><Avatar sx={{ bgcolor: 'pink', position: 'fixed', right: 15 }}></Avatar></Button>
                <Drawer open={open} onClose={handleDrawerClose}>
                    {DrawerList}
                </Drawer>
            </div>
        </header>
    );
}

export default AppHeader;
