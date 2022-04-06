import * as React from 'react';
import {Button, Box, CardMedia, CardContent, Card, Link, Paper, Typography} from "@mui/material";

function Cursos(props){
    const eiImageData= ['/variavel_48_imagemInativa.png','/variavel_48_imagemAtiva.png']
    let eiImage=eiImageData[1]

    return(
        <Paper sx={{display:'flex', margin:'2%'}}>
            <table width={'100%'}>
                <tr>
                    <th>
                        <Link href={'/cursos/ei'} sx={{}} >
                            <Card sx={{margin:'1%', padding:'5%'}}>
                                <CardMedia
                                    component={'img'}
                                    image={eiImage}
                                    alt={'Ei logo foto'}
                                    sx={{width:'30%',margin:'auto'}}
                                />
                                <CardContent>
                                    <Typography variant={'h6'}>
                                        Engenharia Informática (licenciatura)
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </th>
                    <th>
                        <Card sx={{margin:'1%', padding:'5%'}}>
                            <CardMedia
                                component={'img'}
                                image={eiImage}
                                alt={'Ei logo foto'}
                                sx={{width:'30%',margin:'auto'}}
                            />
                            <CardContent>
                                <Typography variant={'h6'}>
                                    Engenharia Informática (licenciatura)
                                </Typography>
                            </CardContent>
                        </Card>
                    </th>
                </tr>
            </table>
        </Paper>
    )
}

export default Cursos;