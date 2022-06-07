import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Header(props){
    return(
        <AppBar position={'static'}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{margin:1}}>
                        <Link href={'/'}><img src={'/logo.png'} width={'25%'}></img></Link>
                    </Box>
                    <Box sx={{margin:1, display: 'flex', align: 'center'}}>
                        <Typography variant={'h6'} sx={{margin:2}}><Link href={'/'} underline="none" color={'secondary'}>Cursos</Link> </Typography>
                        <Typography variant={'h6'} sx={{margin:2}}><Link href={'/sobre'} underline="none" color={'secondary'}>Sobre</Link> </Typography>
                    </Box>
                    </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;