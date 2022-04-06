import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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