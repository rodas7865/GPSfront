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
    IconButton,
    Tooltip,
    Modal,
    Select,
    MenuItem,
    InputLabel,
    Link
} from "@mui/material";
import withRouter from "./withRouter";
import {Add, AddBox, Delete, Edit} from "@mui/icons-material";

class EditarCurso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            texto: [],
            curso: {},
            selected: 0,
            cadeiras: [],
            email: "",
            mensagem: "",
            nomeValorSelecionado: "",
            valorSelecionado: 0,
            allCadeiras: [],
            popupEditarTexto: false,
            textoSelecionado: 0,
            popupCriarTexto: false,
            popupDeletarTexto: false,
            popupDeletarPlano: false,
            popupEditarValor: false,
            popupEditarPlano: false,
            popupEditarCadeira: false,
            popupCriarCadeira: false,
            popupCriarPlano: false,
            planoSelecionado: {
                nome:"edit",
                ids:[0]
            },
            novoTexto: "",
            novoTitulo: "",
            key: -1
        }
    }

    componentDidMount() {
        let curso = {}
        let texto = []
        let cadeiras = []
        let allCadeiras = []

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

        this.props.allCadeiras().then(result => {
            allCadeiras = result

            this.setState({
                allCadeiras
            })
        })
    }

    handlerChangeTab = (event, newValue) => {
        this.setState({
            selected: newValue
        })
    }

    handlerClosePopup = (e) => {
        this.setState({
            [e.target.id]: false
        })
    }

    handlerOpenTextPopup = (e, index) => {
        this.setState({
            [e.target.id]: true,
            textoSelecionado: index
        })
    }

    handlerOpenPlanoPopup = (e, index) => {
        const planoSelecionado = this.state.curso.cadeiras[index];
        this.setState({
            [e.target.id]: true,
            planoSelecionado
        })
    }

    handlerOpenCriarPlanoPopup = (e,index) => {
        const planoSelecionado = {
            nome:"",
            ids:[""]
        }
        this.setState({
            [e.target.id]: true,
            key:index,
            planoSelecionado
        })
        console.log(planoSelecionado)
    }

    popupEditarValor = (nome, valor, key) => {
        this.setState({
            popupEditarValor: true,
            valorSelecionado: valor,
            nomeValorSelecionado: nome,
            key,
        })
    }

    handlerChangeForm = (e) => {

        let change = this.state.curso

        if(e.target.id === "nomePlano") {
            let planoSelecionado = this.state.planoSelecionado
            planoSelecionado.nome = e.target.value

            this.setState({
                planoSelecionado
            })
        } else {
            if (e.target.id === "texto") {
                change.texto[this.state.textoSelecionado].texto = e.target.value
            } else if (e.target.id === "titulo") {
                change.texto[this.state.textoSelecionado].titulo = e.target.value
            } else if (this.state.nomeValorSelecionado === "FormulasprovasDeIngresso") {
                change.formulas.provasDeIngresso = e.target.value
            } else if (this.state.nomeValorSelecionado === "FormulasnotaDeCandidatura") {
                change.formulas.notaDeCandidatura = e.target.value
            } else if (this.state.nomeValorSelecionado === "ClassificacoesprovasDeIngresso") {
                change.classificações.provasDeIngresso = e.target.value
            } else if (this.state.nomeValorSelecionado === "ClassificacoesnotaDeCandidatura") {
                change.classificações.notaDeCandidatura = e.target.value
            } else if (this.state.nomeValorSelecionado === "Nomecadeiras") {
                change.provasDeIngresso.cadeiras[this.state.key].nome = e.target.value
            } else if (this.state.nomeValorSelecionado === "Avaliacaocadeiras") {
                change.provasDeIngresso.cadeiras[this.state.key].avaliacao = e.target.value
            } else if (this.state.nomeValorSelecionado === "ects") {
                change.ects = e.target.value
            } else if (this.state.nomeValorSelecionado === "duracao") {
                change.duracao = e.target.value
            } else if (this.state.nomeValorSelecionado === "codigoCurso") {
                change.codigoCurso = e.target.value
            } else if (this.state.nomeValorSelecionado === "") {
                change.provasDeIngresso.cadeiras.push({
                    nome: "edit",
                    avaliacao: [20]
                })
            } else if (this.state.nomeValorSelecionado === "imagemAtiva") {
                change.imagemAtiva = e.target.value
            } else if (this.state.nomeValorSelecionado === "imagemInativa") {
                change.imagemInativa = e.target.value
            } else if (this.state.nomeValorSelecionado === "nome") {
                change.nome = e.target.value
            }
            this.setState(change)
        }
    }

    handlerChangeFormNovoTexto = (e) => {
        if (e.target.id === "texto") {
            this.setState({
                novoTexto: e.target.value
            })
        }
        if (e.target.id === "titulo") {
            this.setState({
                novoTitulo: e.target.value
            })
        }
    }

    handlerSelectCadeiras = (e) => {
        let change = this.state.planoSelecionado
        change.ids = e.target.value
        this.setState({
            planoSelecionado: change
        })
    }

    getTexto = () => {
        if (this.state.texto.length !== 0) {
            const texto = this.state.texto[this.state.textoSelecionado]
            return texto.texto
        }
    }
    getTitulo = () => {
        if (this.state.texto.length !== 0) {
            const texto = this.state.texto[this.state.textoSelecionado]
            return texto.titulo
        }
    }

    handlerSubmitForm = (e) => {
        e.preventDefault()
        this.props.updateCurso(this.props.router.params.curso, this.state.curso).finally(() => {
            window.location.reload()
        })

    }

    handlerSubmitFormNovoTexto = (e) => {
        e.preventDefault()
        let change = this.state.curso
        change.texto.splice((this.state.textoSelecionado + 1), 0, {
            titulo: this.state.novoTitulo,
            texto: this.state.novoTexto
        })

        this.props.updateCurso(this.props.router.params.curso, this.state.curso).finally(() => {
            window.location.reload()
        })

    }

    handlerSubmitFormDeleteTexto = (e) => {
        e.preventDefault()
        let change = this.state.curso
        change.texto.splice((this.state.textoSelecionado), 1)
        console.log(change)
        this.props.updateCurso(this.props.router.params.curso, change).finally(() => {
            window.location.reload()
        })

    }

    handlerSubmitFormDeletePlano = (e) => {
        e.preventDefault()
        let curso =this.state.curso

        const index = curso.cadeiras.findIndex(object=>{
            return object.nome === this.state.planoSelecionado.nome
        })

        curso.cadeiras.splice(index,1)

        this.props.updateCurso(this.props.router.params.curso, this.state.curso).finally(() => {
            window.location.reload()
        })
    }

    handlerSubmitCriarPlano = (e) => {
        e.preventDefault()
        let curso =this.state.curso

        curso.cadeiras.splice(this.state.key,0,this.state.planoSelecionado)

        console.log(curso)
        this.setState({
            curso
        })


    }

    handlerSubmitEditarPlano = (e) => {
        e.preventDefault()
        let curso =this.state.curso
        const index = this.state.curso.cadeiras.findIndex(object => {
            return object.nome === this.state.planoSelecionado.nome
        });
        curso.cadeiras[index] = this.state.planoSelecionado
        this.setState(
            curso
        )
        this.props.updateCurso(this.props.router.params.curso, this.state.curso).finally(() => {
            window.location.reload()
        })
    }


    handlerSubmitFormDeleteProvaDeIngresso = (e, key) => {
        e.preventDefault()
        let change = this.state.curso
        change.provasDeIngresso.cadeiras.splice(key, 1)
        console.log(change)
        this.props.updateCurso(this.props.router.params.curso, change).finally(() => {
            window.location.reload()
        })

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
                    <Tab label={'Detalhes'}/>
                </Tabs>
            </Box>
            <Box sx={{margin: '2%', paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%'}}>
                {(this.state.selected === 0) ? ((this.state.texto.length === 0) ? (
                    <Box sx={{padding: '0.5%'}}>
                        <Tooltip title={'Novo texto'}>
                            <IconButton onClick={(e) => {
                                e.target.id = "popupCriarTexto";
                                this.handlerOpenTextPopup(e)
                            }}>
                                <AddBox/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                ) : (
                    this.state.texto.map((result, key) => {
                            return <Box>
                                <Box
                                    sx={{
                                        border: '1px solid #26c6da',
                                        padding: '1%',
                                        marginBottom: '1%',
                                        borderRadius: '1em'
                                    }}>
                                    <Box sx={{padding: '0.5%'}}>
                                        <Tooltip title={'Deletar'}>
                                            <IconButton onClick={(e) => {
                                                e.target.id = "popupDeletarTexto";
                                                this.handlerOpenTextPopup(e, key)
                                            }}>
                                                <Delete/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={'Editar'}>
                                            <IconButton onClick={(e) => {
                                                e.target.id = "popupEditarTexto";
                                                this.handlerOpenTextPopup(e, key)
                                            }}>
                                                <Edit/>
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Typography paragraph={true} fontWeight={'bold'}
                                                variant={'h5'}>{result.titulo}</Typography>
                                    {result.texto.split("&#10;").map((result) => {
                                        return <Typography variant={'body2'}>{result}</Typography>
                                    })}
                                    <Box sx={{padding: '0.5%'}}>
                                        <Tooltip title={'Novo texto'}>
                                            <IconButton onClick={(e) => {
                                                e.target.id = "popupCriarTexto";
                                                this.handlerOpenTextPopup(e, key)
                                            }}>
                                                <AddBox/>
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Box>
                        }
                    ))) : (
                    <p></p>
                )}
                {(this.state.selected === 1) ? (<Box>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Add/>}
                        >
                            <Typography>Código do Curso</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{this.state.curso.codigoCurso}
                                <Tooltip title={'Editar'}>
                                    <IconButton
                                        onClick={() => this.popupEditarValor("codigoCurso", this.state.curso.codigoCurso, -1)}>
                                        <Edit/>
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Add/>}
                        >
                            <Typography>Duração</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{this.state.curso.duracao}
                                <Tooltip title={'Editar'}>
                                    <IconButton
                                        onClick={() => this.popupEditarValor("duracao", this.state.curso.duracao, -1)}>
                                        <Edit/>
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Add/>}
                        >
                            <Typography>ECTS</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{this.state.curso.ects}
                                <Tooltip title={'Editar'}>
                                    <IconButton
                                        onClick={() => this.popupEditarValor("ects", this.state.curso.ects, -1)}>
                                        <Edit/>
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Add/>}
                        >
                            <Typography>Provas de Ingresso</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                <Tooltip title={'Nova cadeira'}>
                                    <IconButton onClick={(e) => this.handlerChangeForm(e)}>
                                        <AddBox/>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            {this.state.curso.provasDeIngresso.cadeiras.map((result, key) => {
                                return <Typography>
                                    {result.nome}
                                    <Tooltip title={'Editar'}>
                                        <IconButton
                                            onClick={() => this.popupEditarValor('Nomecadeiras', result.nome, key)}>
                                            <Edit/>
                                        </IconButton>
                                    </Tooltip>
                                    {result.avaliacao}
                                    <Tooltip title={'Editar'}>
                                        <IconButton
                                            onClick={() => this.popupEditarValor('Avaliacaocadeiras', result.avaliacao, key)}>
                                            <Edit/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={'Deletar'}>
                                        <IconButton onClick={(e) => {
                                            this.handlerSubmitFormDeleteProvaDeIngresso(e, key)
                                        }}>
                                            <Delete/>
                                        </IconButton>
                                    </Tooltip>
                                </Typography>
                            })}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Add/>}
                        >
                            <Typography>Classificações Minimas</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>Nota de
                                Candidatura: {this.state.curso.classificações.notaDeCandidatura} Pontos
                                <Tooltip title={'Editar'}>
                                    <IconButton
                                        onClick={() => this.popupEditarValor("ClassificacoesnotaDeCandidatura", this.state.curso.classificações.notaDeCandidatura, -1)}>
                                        <Edit/>
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                            <Typography>Prova de
                                Ingresso: {this.state.curso.classificações.provasDeIngresso} Pontos
                                <Tooltip title={'Editar'}>
                                    <IconButton
                                        onClick={() => this.popupEditarValor("ClassificacoesprovasDeIngresso", this.state.curso.classificações.provasDeIngresso, -1)}>
                                        <Edit/>
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<Add/>}
                        >
                            <Typography>Fórmula de Cálculo:</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>Média do secundário: {this.state.curso.formulas.notaDeCandidatura}%
                                <Tooltip title={'Editar'}>
                                    <IconButton
                                        onClick={() => this.popupEditarValor("FormulasnotaDeCandidatura", this.state.curso.formulas.notaDeCandidatura, -1)}>
                                        <Edit/>
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                            <Typography>Prova de Ingresso: {this.state.curso.formulas.provasDeIngresso}%
                                <Tooltip title={'Editar'}>
                                    <IconButton
                                        onClick={() => this.popupEditarValor("FormulasprovasDeIngresso", this.state.curso.formulas.provasDeIngresso, -1)}>
                                        <Edit/>
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>) : (<p/>)}
                {(this.state.selected === 2) ? ((this.state.curso.cadeiras.length===0)?(
                    <Tooltip title={'Adicionar Plano'}>
                        <IconButton onClick={(e) => {
                            e.target.id = "popupCriarPlano";
                            this.handlerOpenCriarPlanoPopup(e,(Math.random()*Number.MAX_SAFE_INTEGER))
                        }}>
                            <AddBox/>
                        </IconButton>
                    </Tooltip>
                ):(
                    this.state.curso.cadeiras.map((result, key) => {
                        return (
                            <Box sx={{
                                border: '1px solid #26c6da',
                                padding: '1%',
                                marginBottom: '1%',
                                borderRadius: '1em'
                            }}>
                                <Typography paragraph={true} variant={'h5'}
                                            fontWeight={'bold'}>{result.nome}
                                    <Tooltip title={'Editar'}>
                                        <IconButton onClick={(e) => {
                                            e.target.id = "popupEditarPlano";
                                            this.handlerOpenPlanoPopup(e, key)
                                        }}>
                                            <Edit/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={'Adicionar Plano'}>
                                        <IconButton onClick={(e) => {
                                            e.target.id = "popupCriarPlano";
                                            this.handlerOpenCriarPlanoPopup(e)
                                        }}>
                                            <AddBox/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={'Deletar Plano'}>
                                        <IconButton onClick={(e) => {
                                            e.target.id = "popupDeletarPlano";
                                            this.handlerOpenPlanoPopup(e, key)
                                        }}>
                                            <Delete/>
                                        </IconButton>
                                    </Tooltip>
                                </Typography>
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
                                                                <TableRow onClick={""}>
                                                                    <TableCell component={"th"}
                                                                               scope={"row"}>{result.nome}</TableCell>
                                                                    <TableCell align={"right"}>{result.ects}</TableCell>
                                                                    <TableCell align={"right"}>{result.ht}</TableCell>
                                                                    <TableCell align={"right"}>{result.htp}</TableCell>
                                                                    <TableCell align={"right"}>{result.hpl}</TableCell>
                                                                </TableRow>
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
                )) : (<p/>)}
                {(this.state.selected === 3) ? (
                    <Box sx={{paddingBottom: '2%'}}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<Add/>}
                            >
                                <Typography>Imagem Inativa</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {this.state.curso.imagemAtiva}
                                    <Tooltip title={'Editar'}>
                                        <IconButton
                                            onClick={() => this.popupEditarValor("imagemAtiva", this.state.curso.imagemAtiva)}>
                                            <Edit/>
                                        </IconButton>
                                    </Tooltip>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<Add/>}
                            >
                                <Typography>Imagem Ativa</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {this.state.curso.imagemInativa}
                                    <Tooltip title={'Editar'}>
                                        <IconButton
                                            onClick={() => this.popupEditarValor("imagemInativa", this.state.curso.imagemInativa)}>
                                            <Edit/>
                                        </IconButton>
                                    </Tooltip>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<Add/>}
                            >
                                <Typography>Nome do Curso</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {this.state.curso.nome}
                                    <Tooltip title={'Editar'}>
                                        <IconButton
                                            onClick={() => this.popupEditarValor("nome", this.state.curso.nome)}>
                                            <Edit/>
                                        </IconButton>
                                    </Tooltip>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                ) : (<p/>)}
            </Box>

            <Modal open={this.state.popupEditarTexto} onClose={(e) => {
                e.target.id = "popupEditarTexto";
                this.handlerClosePopup(e)
            }}>
                <Box sx={{margin: 'auto', width: '50%', padding: '5%'}}>
                    <Paper sx={{padding: '2%'}}>
                        <Typography align={'center'} variant={'h4'}>Editar texto</Typography>
                        <form onSubmit={(e) => {
                            this.handlerSubmitForm(e)
                        }}>
                            <Box sx={{paddingBottom: '2%'}}>
                                <TextField
                                    id={'titulo'}
                                    label={"Titulo"}
                                    defaultValue={this.getTitulo()}
                                    variant={'outlined'}
                                    onChange={(e) => {
                                        this.handlerChangeForm(e)
                                    }}
                                />
                            </Box>
                            <Box sx={{paddingBottom: '2%'}}>
                                <TextField
                                    id={'texto'}
                                    label="Texto"
                                    defaultValue={this.getTexto()}
                                    multiline
                                    rows={10}
                                    sx={{width: '100%'}}
                                    helperText={'Caso queira mudar de linha use "&#10;" '}
                                    onChange={(e) => {
                                        this.handlerChangeForm(e)
                                    }}
                                />
                            </Box>
                            <Box sx={{paddingBottom: '2%'}}>
                                <Button type="submit">Editar</Button>
                            </Box>
                        </form>
                    </Paper>
                </Box>
            </Modal>

            <Modal open={this.state.popupCriarTexto} onClose={(e) => {
                e.target.id = "popupCriarTexto";
                this.handlerClosePopup(e)
            }}>
                <Box sx={{margin: 'auto', width: '50%', padding: '5%'}}>
                    <Paper sx={{padding: '2%'}}>
                        <Typography align={'center'} variant={'h4'}>Criar texto</Typography>
                        <form onSubmit={(e) => {
                            this.handlerSubmitFormNovoTexto(e)
                        }}>
                            <Box sx={{paddingBottom: '2%'}}>
                                <TextField
                                    id={'titulo'}
                                    label={"Titulo"}
                                    variant={'outlined'}
                                    onChange={(e) => {
                                        this.handlerChangeFormNovoTexto(e)
                                    }}
                                />
                            </Box>
                            <Box sx={{paddingBottom: '2%'}}>
                                <TextField
                                    id={'texto'}
                                    label="Texto"
                                    multiline
                                    rows={10}
                                    sx={{width: '100%'}}
                                    helperText={'Caso queira mudar de linha use "&#10;" '}
                                    onChange={(e) => {
                                        this.handlerChangeFormNovoTexto(e)
                                    }}
                                />
                            </Box>
                            <Box sx={{paddingBottom: '2%'}}>
                                <Button type="submit">Enviar</Button>
                            </Box>
                        </form>
                    </Paper>
                </Box>
            </Modal>

            <Modal open={this.state.popupDeletarTexto} onClose={(e) => {
                e.target.id = "popupDeletarTexto";
                this.handlerClosePopup(e)
            }}>
                <Box sx={{margin: 'auto', width: '50%', padding: '5%'}}>
                    <Paper sx={{padding: '2%'}}>
                        <Typography align={'center'} variant={'h4'}>Deletar texto?</Typography>
                        <Box sx={{marginLeft: 'auto', marginRight: 'auto', width: '100%'}}>
                            <form onSubmit={(e) => {
                                this.handlerSubmitFormDeleteTexto(e)
                            }}>
                                <Button variant={'contained'} type="submit">
                                    <Typography>Sim</Typography>
                                </Button>
                            </form>
                        </Box>
                    </Paper>
                </Box>
            </Modal>

            <Modal open={this.state.popupEditarValor} onClose={(e) => {
                e.target.id = "popupEditarValor";
                this.handlerClosePopup(e)
            }}>
                <Box sx={{margin: 'auto', width: '50%', padding: '5%'}}>
                    <Paper sx={{padding: '2%'}}>
                        <Typography align={'center'} variant={'h4'}>Editar Valor</Typography>
                        <form onSubmit={(e) => {
                            this.handlerSubmitForm(e)
                        }}>
                            <Box sx={{paddingBottom: '2%'}}>
                                <TextField
                                    id={this.state.idValorSelecionado}
                                    label={"Valor"}
                                    variant={'outlined'}
                                    defaultValue={this.state.valorSelecionado}
                                    onChange={(e) => {
                                        this.handlerChangeForm(e)
                                    }}
                                />
                            </Box>
                            <Box sx={{paddingBottom: '2%'}}>
                                <Button type="submit">Editar</Button>
                            </Box>
                        </form>
                    </Paper>
                </Box>
            </Modal>

            <Modal open={this.state.popupEditarCadeira} onClose={(e) => {
                e.target.id = "popupEditarCadeira";
                this.handlerClosePopup(e)
            }}>
                <Box sx={{margin: 'auto', width: '50%', padding: '5%'}}>
                    <Paper sx={{padding: '2%'}}>
                        <Typography align={'center'} variant={'h4'}>Editar Valor</Typography>
                        <form>
                            <Box sx={{paddingBottom: '2%', width: '100%'}}>
                                <TextField
                                    id={'valor'}
                                    label={"Valor"}
                                    variant={'outlined'}
                                    sx={{width: '100%'}}
                                    defaultValue={this.state.valorSelecionado}
                                    onChange={(e) => {
                                        this.handlerChangeForm(e)
                                    }}
                                />
                            </Box>
                            <Box sx={{paddingBottom: '2%'}}>
                                <Button type="submit">Editar</Button>
                            </Box>
                        </form>
                    </Paper>
                </Box>
            </Modal>

            <Modal open={this.state.popupEditarPlano} onClose={(e) => {
                e.target.id = "popupEditarPlano";
                this.handlerClosePopup(e)
            }}>
                <Box sx={{margin: 'auto', width: '50%', padding: '5%'}}>
                    <Paper sx={{padding: '2%'}}>
                        <Typography align={'center'} variant={'h4'}>Editar Plano</Typography>
                        <form onSubmit={(e)=>{this.handlerSubmitEditarPlano(e)}}>
                            <Box sx={{paddingBottom: '2%'}}>
                                <TextField
                                    id={'nome'}
                                    label={"Nome"}
                                    defaultValue={this.state.planoSelecionado.nome}
                                    variant={'outlined'}
                                    onChange={(e) => {
                                        e.target.id="nomePlano"
                                        this.handlerChangeForm(e)
                                    }}
                                />
                            </Box>
                            <Box sx={{paddingBottom: '2%'}}>
                                <InputLabel id="test-select-label">Cadeiras</InputLabel>
                                <Select
                                    labelId="test-select-label"
                                    label="Cadeiras"
                                    multiple={true}
                                    value={this.state.planoSelecionado.ids}
                                    sx={{width: '100%'}}
                                    onChange={(e) => {
                                        this.handlerSelectCadeiras(e)
                                    }}
                                >

                                    {this.state.allCadeiras.map((result, key) => {
                                        return <MenuItem key={key} value={result._id}>
                                            {result.nome}
                                        </MenuItem>
                                    })}
                                </Select>
                            </Box>
                            <Box sx={{paddingBottom: '2%'}}>
                                <Link underline="none" href={'/cadeiras'}><Button>Editar Cadeiras</Button></Link>
                                <Button type="submit">Salvar</Button>
                            </Box>
                        </form>
                    </Paper>
                </Box>
            </Modal>

            <Modal open={this.state.popupCriarPlano} onClose={(e) => {
                e.target.id = "popupCriarPlano";
                this.handlerClosePopup(e)
            }}>
                <Box sx={{margin: 'auto', width: '50%', padding: '5%'}}>
                    <Paper sx={{padding: '2%'}}>
                        <Typography align={'center'} variant={'h4'}>Criar Plano</Typography>
                        <form onSubmit={(e)=>{this.handlerSubmitCriarPlano(e)}}>
                            <Box sx={{paddingBottom: '2%'}}>
                                <TextField
                                    id={'nome'}
                                    label={"Nome"}
                                    variant={'outlined'}
                                    onChange={(e) => {
                                        e.target.id="nomePlano"
                                        this.handlerChangeForm(e)
                                    }}
                                />
                            </Box>
                            <Box sx={{paddingBottom: '2%'}}>
                                <InputLabel id="test-select-label">Cadeiras</InputLabel>
                                <Select
                                    labelId="test-select-label"
                                    label="Cadeiras"
                                    multiple={true}
                                    value={this.state.planoSelecionado.ids}
                                    sx={{width: '100%'}}
                                    onChange={(e) => {
                                        this.handlerSelectCadeiras(e)
                                    }}
                                >

                                    {this.state.allCadeiras.map((result, key) => {
                                        return <MenuItem key={key} value={result._id}>
                                            {result.nome}
                                        </MenuItem>
                                    })}
                                </Select>
                            </Box>
                            <Box sx={{paddingBottom: '2%'}}>
                                <Link underline="none" href={'/cadeiras'}><Button>Editar Cadeiras</Button></Link>
                                <Button type="submit">Salvar</Button>
                            </Box>
                        </form>
                    </Paper>
                </Box>
            </Modal>

            <Modal open={this.state.popupDeletarPlano} onClose={(e) => {
                e.target.id = "popupDeletarPlano";
                this.handlerClosePopup(e)
            }}>
                <Box sx={{margin: 'auto', width: '50%', padding: '5%'}}>
                    <Paper sx={{padding: '2%'}}>
                        <Typography align={'center'} variant={'h4'}>Deletar plano?</Typography>
                        <Box sx={{marginLeft: 'auto', marginRight: 'auto', width: '100%'}}>
                            <form onSubmit={(e) => {
                                this.handlerSubmitFormDeletePlano(e)
                            }}>
                                <Button variant={'contained'} type="submit">
                                    <Typography>Sim</Typography>
                                </Button>
                            </form>
                        </Box>
                    </Paper>
                </Box>
            </Modal>
        </Paper>)
    }
}

export default withRouter(EditarCurso);