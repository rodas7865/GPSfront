import * as React from "react";
import {Button, Box, CardMedia, CardContent, Card, Link} from "@mui/material";
import {ArrowForward} from '@mui/icons-material';

function Home(props) {
    return (
        <Card sx={{display:'flex',margin:'2%'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', width:'60%'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <img src={'/Logo.png'} width={'50%'}/>
                    <Box sx={{marginTop:'40%', position:'relative'}}>
                        <Link href={'/cursos'}>
                            <Button variant="contained" sx={{}}>Ver Cursos <ArrowForward sx={{marginLeft:'0.01%'}}/></Button>
                        </Link>
                    </Box>
                </CardContent>
            </Box>
            <Box sx={{ width:'80%' }}>
                <CardMedia
                    component={'img'}
                    image={'/Image.jpg'}
                    alt={'Estgv photo'}
                />
            </Box>
        </Card>
    );
}

export default Home