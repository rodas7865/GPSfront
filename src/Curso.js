import * as React from 'react';
import {
    Box,
    Paper,
    Typography,
    Tabs,
    Tab,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
    TextField,
    Button,
    Snackbar,
    Alert
} from "@mui/material";
import withRouter from "./withRouter";
import {Add} from "@mui/icons-material";

class Curso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            texto: [], curso: {}, selected: 0, cadeiras: [], email: "", mensagem: "",
            emailError: false, mensagemError: false, showEmailError: false, showMessageError: false, showSucesso:false
        }
    }

    componentDidMount() {
        let curso = {}
        let texto = []
        let cadeiras = []
        this.props.curso(this.props.router.params.curso).then(result => {
            curso = result[0]
            texto = curso.texto;

            curso.cadeiras.map((result) => {
                result.ids.map((result) => {

                    this.props.cadeira(result).then(result => {
                        const index = cadeiras.some(object=>{
                            if (object._id===result[0]._id){
                                return true
                            }
                        })

                        if(!index){
                            cadeiras.push(result[0])
                        }

                    })

                })
            })

            this.setState({
                curso, texto, cadeiras
            })
            console.log()
        })
    }

    handlerChangeTab = (event, newValue) => {
        this.setState({
            selected: newValue
        })
    }

    handlerChangeForm = (e) => {
        let change = {}
        change[e.target.id] = e.target.value
        this.setState(change)
    }

    handlerClose = (e) => {
        let change = {}
        change[e.id] = false
        this.setState(change)
        console.log(e)
    }

    handlerSubmitForm = (e) => {
        e.preventDefault()
        let flag=true;
        if (RegExp("^\s+$").test(this.state.email)||this.state.email===""){
            this.setState({
                emailError:true,
                showEmailError:true
            })
            flag=false
        } else {
            this.setState({
                emailError:false,
            })
        }
        if (RegExp("^\s+$").test(this.state.mensagem)||this.state.mensagem===""){
            this.setState({
                mensagemError:true,
                showMessageError:true
            })
            flag=false
        } else {
            this.setState({
                mensagemError:false
            })
        }

        if(flag) {
            console.log('hi')
            const body = {
                email: this.state.email,
                curso: this.state.curso.nome,
                mensagem: this.state.mensagem
            }

            this.props.email(body).then((result) => {
                console.log(result)
                this.setState({
                    showSucesso: true
                })
            })
        }
    }

    render() {
        return (<Paper sx={{margin: '2%'}}>
            <Box sx={{paddingTop: '2%', paddingBottom: '2%'}}>
                <Typography align={'center'} variant={'h4'}>{this.state.curso.nome}</Typography>
            </Box>
            <Box sx={{margin: 'auto', marginTop: '2%', marginBottom: '2%'}}>
                <Tabs value={this.state.selected} onChange={this.handlerChangeTab} aria-label={"example"} centered>
                    <Tab label={'Resumo'}/>
                    <Tab label={'Ingresso/Acesso'}/>
                    <Tab label={'Plano Curricular'}/>
                    <Tab label={'Contacto'}/>
                </Tabs>
            </Box>
            <Box sx={{margin: '2%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%'}}>
                {(this.state.selected === 0) ? (this.state.texto.map((result, key) => {
                    return <Box sx={{paddingBottom:"2%"}}>
                        <Typography paragraph={true} fontWeight={'bold'}
                                    variant={'h5'}>{result.titulo}</Typography>
                        {result.texto.split("&#10;").map((result) => {
                            return <Typography variant={'body2'}>{result}</Typography>
                        })}
                    </Box>
                })) : (<p/>)}
                {(this.state.selected === 1) ? (<Box>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Add/>}
                        >
                            <Typography>C??digo do Curso</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{this.state.curso.codigoCurso}</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Add/>}
                        >
                            <Typography>Dura????o</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{this.state.curso.duracao}</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Add/>}
                        >
                            <Typography>ECTS</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{this.state.curso.ects}</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Add/>}
                        >
                            <Typography>Provas de Ingresso</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {this.state.curso.provasDeIngresso.cadeiras.map((result, key) => {
                                return <Typography>{result.nome} {result.avaliacao}</Typography>
                            })}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Add/>}
                        >
                            <Typography>Classifica????es Minimas</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>Nota de
                                Candidatura: {this.state.curso.classifica????es.notaDeCandidatura} Pontos</Typography>
                            <Typography>Prova de
                                Ingresso: {this.state.curso.classifica????es.provasDeIngresso} Pontos</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Add/>}
                        >
                            <Typography>F??rmula de C??lculo:</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>M??dia do secund??rio: {this.state.curso.formulas.notaDeCandidatura}%</Typography>
                            <Typography>Prova de Ingresso: {this.state.curso.formulas.provasDeIngresso}%</Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>) : (<p/>)}
                {(this.state.selected === 2) ? (
                    this.state.curso.cadeiras.map((result) => {
                        return (
                            <Box sx={{paddingBottom: '2%'}}>
                                <Typography paragraph={true} variant={'h5'}
                                            fontWeight={'bold'}>{result.nome}</Typography>
                                <Table sx={{minWidth: '100%'}}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nome</TableCell>
                                            <TableCell align="right">ECTS</TableCell>
                                            <TableCell align="right">HT</TableCell>
                                            <TableCell align="right">HTP</TableCell>
                                            <TableCell align="right">HPL</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {result.ids.map((result) => {
                                        let id = result
                                        return (
                                            this.state.cadeiras.map((result) => {
                                                if (result !== undefined)
                                                    if (result._id === id) {
                                                        return (
                                                            <TableBody>
                                                                <TableCell component={"th"}
                                                                           scope={"row"}>{result.nome}</TableCell>
                                                                <TableCell align={"right"}>{result.ects}</TableCell>
                                                                <TableCell align={"right"}>{result.ht}</TableCell>
                                                                <TableCell align={"right"}>{result.htp}</TableCell>
                                                                <TableCell align={"right"}>{result.hpl}</TableCell>
                                                            </TableBody>
                                                        )
                                                    }
                                            })
                                        )
                                    })}
                                </Table>
                            </Box>
                        )
                    })
                ) : (<p/>)}
                {(this.state.selected === 3) ? (
                    <Box sx={{paddingBottom: '2%'}}>
                        <Typography paragraph={true} variant={'h4'} align={'center'}>Enviar mensagem</Typography>
                        <form onSubmit={(e)=>{this.handlerSubmitForm(e)}}>
                            <Box sx={{paddingBottom: '2%'}}>
                                <TextField
                                    id={'email'}
                                    error={this.state.emailError}
                                    label={"Email"}
                                    variant={'outlined'}
                                    type={'email'}
                                    onChange={(e) => {this.handlerChangeForm(e)}}
                                />
                            </Box>
                            <Box sx={{paddingBottom: '2%'}}>
                                <TextField
                                    error={this.state.mensagemError}
                                    id={'mensagem'}
                                    label="Mensagem"
                                    multiline
                                    rows={10}
                                    sx={{width: '100%'}}
                                    helperText={'Uma copia da mensagem sera enviada para si.'}
                                    onChange={(e) => {this.handlerChangeForm(e)}}
                                />
                            </Box>
                            <Box sx={{paddingBottom: '2%'}}>
                                <Button type="submit">Enviar</Button>
                            </Box>
                        </form>
                    </Box>
                ) : (<p/>)}
            </Box>
            <Snackbar
                id={'showMessageError'}
                open={this.state.showMessageError}
                autoHideDuration={1000}
                sx={{width:'25%'}}
            >
                <Alert id={'showMessageError'} onClose={(e)=>{e.id='showMessageError';this.handlerClose(e)}} severity="error" sx={{ width: '100%' }}>
                    Mensagem n??o pode estar vazia!
                </Alert>
            </Snackbar>
            <Snackbar
                id={'showEmailError'}
                open={this.state.showEmailError}
                autoHideDuration={1000}
                sx={{width:'25%'}}
            >
                <Alert onClose={(e)=>{e.id='showEmailError';this.handlerClose(e)}} severity="error" sx={{ width: '100%' }}>
                    Email invalido!
                </Alert>
            </Snackbar>
            <Snackbar
                id={'showSucesso'}
                open={this.state.showSucesso}
                autoHideDuration={1000}
                sx={{width:'25%'}}
            >
                <Alert onClose={(e)=>{e.id='showSucesso';this.handlerClose(e)}} severity="info" sx={{ width: '100%' }}>
                    Email enviado!
                </Alert>
            </Snackbar>
        </Paper>)
    }
}

export default withRouter(Curso);