import * as React from 'react';
import {Button, Box, CardMedia, CardContent, Card, Link, Paper, Typography} from "@mui/material";
import {useParams} from "react-router-dom";

function Curso(props){
const {curso} = useParams();

    return(
        <Paper sx={{display:'flex', margin:'2%'}}>
            <Typography variant={'h1'}>{curso}</Typography>
        </Paper>
    )
}

export default Curso;