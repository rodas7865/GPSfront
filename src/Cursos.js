import * as React from 'react';
import {Grid, CardMedia, CardContent, Card, Link, Typography, Box, Button, Icon} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";

class Cursos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cursos: [],
            overed: [],
            edit: false,
            delete: false
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

    handleDelete() {
        this.setState({
            delete: !this.state.delete,
        })
    }

    handleNovoCurso(e) {
        e.preventDefault()
        const curso = {
            nome: "Edit",
            imagemAtiva: "editMe",
            imagemInativa: "editMe",
            cadeira: [],
            codigoCurso: 0,
            duracao: "6 semestres",
            ects: 0,
            provasDeIngresso: {
                tipo: 1,
                cadeiras: []
            },
            classificações: {
                notaDeCandidatura: 0,
                provasDeIngresso: 0
            },
            formulas: {
                notaDeCandidatura: 0,
                provasDeIngresso: 0
            },
            texto: []
        }

        this.props.createCurso(curso).finally(() => {
            window.location.reload()
        })

    }

    handleDeleteCurso(e,id) {
        e.preventDefault()
        this.props.deleteCurso(id).finally(() => {
            window.location.reload()
        })
    }

    render() {
        return (
            <Box>
                <Box sx={{display: 'flex', margin: '2%'}}>
                    <Button onClick={() => {
                        this.handleEdit()
                    }}>Editar</Button>
                    <Button onClick={(e) => {
                        this.handleNovoCurso(e)
                    }}>Novo</Button>
                    <Button onClick={(e) => {
                        this.handleDelete(e)
                    }}>Delete</Button>
                </Box>
                <Box sx={{display: 'flex', margin: '2%'}}>
                    <Grid container spacing={0.1}>
                        {this.state.cursos.map((result, key) =>
                            <Grid item xs={6}>
                                <div onMouseOver={() => this.handleMouseEnter(key)}
                                     onMouseOut={() => this.handleMouseOut(key)}>
                                    {(this.state.edit) ? (
                                        <Link href={'edit/' + result._id} underline="none">
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
                                        (this.state.delete)?(
                                            <Link underline={'none'} onClick={(e)=>{this.handleDeleteCurso(e,result._id)}}>
                                                <Card sx={{margin: '1%', padding: '5%', height: '15vw'}}>
                                                    <Box height={'10vw'}>
                                                        {(this.state.delete) ? (<Delete/>) : (<></>)}
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
                                        ):(
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
                                        ))}
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