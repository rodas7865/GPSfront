import * as React from 'react';
import {Grid, CardMedia, CardContent, Card, Link, Typography, Box} from "@mui/material";


class Cursos extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            cursos:this.props.cursos,
            overed:[]
        }

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    componentDidMount() {
        let overed = new Array(this.state.cursos.length).fill(false)
        this.setState({
            overed
        })
    }

    handleMouseOut(key){
        let overed = this.state.overed
        overed[key]=false
        this.setState({
            overed
        })
    }

    handleMouseEnter(key){
        let overed = this.state.overed
        overed[key]=true
        this.setState({
            overed
        })
    }

    render(){
        return(
            <Box sx={{display:'flex', margin:'2%'}}>
                <Grid container spacing={0.1}>
                    {this.state.cursos.map((result, key)=>
                        <Grid item xs={6}>
                            <div onMouseOver={()=>this.handleMouseEnter(key)} onMouseOut={()=>this.handleMouseOut(key)}>
                                <Link href={'/cursos/'+result.id} underline="none">
                                    <Card sx={{margin:'1%', padding:'5%',height:'15vw'}}>
                                        <Box height={'10vw'}>
                                            <CardMedia
                                                component={'img'}
                                                image={(this.state.overed[key]===true)?(result.imagemInativa):(result.imagemAtiva)}
                                                alt={'Ei logo foto'}
                                                sx={{width:'40%', margin:'auto', height:'60%'}}
                                            />
                                        </Box>
                                        <CardContent>
                                            <Box height={'3vw'} position={'relative'}>
                                                <Typography variant={'h6'} align={'center'} fontSize={'1.5vw'} component={'div'}>
                                                    {result.nome}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </div>
                        </Grid>
                    )}
                </Grid>
            </Box>
        )
    }
}

export default Cursos;