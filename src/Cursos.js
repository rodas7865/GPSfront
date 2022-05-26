import * as React from 'react';
import {Grid, CardMedia, CardContent, Card, Link, Typography, Box, Button, Icon} from "@mui/material";
import {Edit} from "@mui/icons-material";

class Cursos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cursos: [],
            overed: [],
            edit: false
        }

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    componentDidMount() {
        let overed = new Array(this.state.cursos.length).fill(false)
        let cursos = []
        this.props.cursos().then(result => {
            cursos = result
            this.setState({
                overed,
                cursos
            })
        })
    }

    handleMouseOut(key) {
        let overed = this.state.overed
        overed[key] = false
        this.setState({
            overed
        })
    }

    handleMouseEnter(key) {
        let overed = this.state.overed
        overed[key] = true
        this.setState({
            overed
        })
    }

    handleEdit() {
        this.setState({
            edit: !this.state.edit
        })
    }

    render() {
        return (
            <Box>
                <Box sx={{display: 'flex', margin: '2%'}}>
                    <Button onClick={() => {
                        this.handleEdit()
                    }}>Editar</Button>
                    <Button href={'/cursos/novo'}>Novo</Button>
                </Box>
                <Box sx={{display: 'flex', margin: '2%'}}>
                    <Grid container spacing={0.1}>
                        {this.state.cursos.map((result, key) =>
                            <Grid item xs={6}>
                                <div onMouseOver={() => this.handleMouseEnter(key)}
                                     onMouseOut={() => this.handleMouseOut(key)}>
                                    {(this.state.edit) ? (
                                        <Link href={'/cursos/edit/' + result._id} underline="none">
                                            <Card sx={{margin: '1%', padding: '5%', height: '15vw'}}>
                                                <Box height={'10vw'}>
                                                    {(this.state.edit) ? (<Edit/>) : (<></>)}
                                                    <CardMedia
                                                        component={'img'}
                                                        image={(this.state.overed[key] === true) ? (result.imagemInativa) : (result.imagemAtiva)}
                                                        alt={'Ei logo foto'}
                                                        sx={{width: '40%', margin: 'auto', height: '60%'}}
                                                    />
                                                </Box>
                                                <CardContent>
                                                    <Box height={'3vw'} position={'relative'}>
                                                        <Typography variant={'h6'} align={'center'} fontSize={'1.5vw'}
                                                                    component={'div'}>
                                                            {result.nome}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ) : (
                                        <Link href={'/' + result._id} underline="none">
                                            <Card sx={{margin: '1%', padding: '5%', height: '15vw'}}>
                                                <Box height={'10vw'}>
                                                    {(this.state.edit) ? (<Edit/>) : (<></>)}
                                                    <CardMedia
                                                        component={'img'}
                                                        image={(this.state.overed[key] === true) ? (result.imagemInativa) : (result.imagemAtiva)}
                                                        alt={'Ei logo foto'}
                                                        sx={{width: '40%', margin: 'auto', height: '60%'}}
                                                    />
                                                </Box>
                                                <CardContent>
                                                    <Box height={'3vw'} position={'relative'}>
                                                        <Typography variant={'h6'} align={'center'} fontSize={'1.5vw'}
                                                                    component={'div'}>
                                                            {result.nome}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    )}
                                </div>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Box>
        )
    }
}

export default Cursos;