import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import logo from './Images/Logo.png';
import Link from '@mui/material/Link';

function Header(props){
    return(
        <AppBar position={'static'}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{margin:1}}>
                        <Link href={'/'}><img src={logo} width={'25%'}></img></Link>
                    </Box>
                    <Box sx={{margin:1, display: 'flex', align: 'center'}}>
                        <Typography variant={'h6'} sx={{margin:2}}><Link href={'/cursos'} underline="none" color={'secondary'}>Cursos</Link> </Typography>
                        <Typography variant={'h6'} sx={{margin:2}}><Link href={'/contactos'} underline="none" color={'secondary'}>Contactos</Link> </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;