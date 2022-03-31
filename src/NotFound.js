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
import Paper from '@mui/material/Paper';

function NotFound(props){
    return(
        <Box sx={{margin:'auto', width:'50%', padding:'5%'}}>
            <Paper elevation={5} sx={{padding:'100px'}}>
                <Typography align={'center'} variant={'h1'} sx={{fontWeight:'Bold'}}>404</Typography>
                <Typography align={'center'} variant={'h4'} color={'secondary'}>PAGINA NÃO ENCONTRADA</Typography>
            </Paper>
        </Box>
    )
}

export default NotFound;