import * as React from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import Header from './Header';
import NotFound from './NotFound';
import Cursos from "./Cursos";
import Curso from "./Curso";
import Cadeiras from "./Cadeiras";
import disciplinas from './data/disciplinas.json'
import Sobre from "./Sobre";
import EditarCurso from "./EditarCurso";


const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#26c6da',
            light: '#ffffff',
        },
        secondary: {
            main: '#006064',
        },
        background: {
            default: '#fafafa',
            paper: '#f5f5f5',
        },
        text: {
            primary: 'rgba(18,18,18,0.87)',
        },
    },
});


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cursos: [],
            disciplinas: disciplinas
        }

    }

    componentDidMount() {
        let cursos = this.getCursos()
        this.setState({
            cursos,
        })
    }

    getCursos = async () => {
        const data = await fetch("server/cursos");
        const parsedData = await data.json();
        return await parsedData;
    }

    getCurso = async (id) => {
        const data = await fetch('/server/cursos/' + id);
        const parsedData = await data.json();
        return await parsedData;
    }

    getCadeira = async (id) => {
        const data = await fetch('/server/cadeiras/' + id);
        const parsedData = await data.json();
        return await parsedData;
    }

    getCadeiras = async () => {
        const data = await fetch('/server/cadeiras/');
        const parsedData = await data.json();
        return await parsedData;
    }

    sendEmail = async (body) => {
        const data = await fetch('/server/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return data;
    }

    updateCurso = async (id, body) => {
        const data = await fetch('/server/cursos/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const parsedData = await data.json();
        return await parsedData;
    }


    updateCadeiras = (cadeirasUpdate) => {
        let cadeiras = []
        this.getCadeiras().then(
            (result) => {
                cadeiras = result
                cadeiras.forEach((result)=>{
                    let flag = cadeirasUpdate.some(object =>{
                        return object.id===result._id
                    })

                    if(flag){
                        const id = result.id
                        const body = {
                            "_id": result.id,
                            "nome": result.nome,
                            "ects": result.ects,
                            "ht": result.ht,
                            "htp": result.htp,
                            "hpl": result.hpl
                        }
                        fetch('/server/cadeiras/' + id, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(body)
                        }).then((result) => {
                            console.log(result)
                        })
                    }else{
                        const id = result._id
                        console.log(result)
                        fetch('/server/cadeiras/' + id, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }).then((result) => {
                            console.log(result)
                        })
                    }

                })

                cadeirasUpdate.forEach((result)=>{
                    let flag = cadeiras.some(object =>{
                        return object._id===result.id
                    })

                    console.log("CRIA? "+flag)

                    if(flag===false){
                        const body = {
                            "nome": result.nome,
                            "ects": result.ects,
                            "ht": result.ht,
                            "htp": result.htp,
                            "hpl": result.hpl
                        }

                        fetch('/server/cadeiras/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(body)
                        }).then((result) => {
                            console.log(result)
                        })
                    }
                })
            })
    }

    render() {
        return (
            <body>
            <ThemeProvider theme={theme}>
                <Header/>
                <Router>
                    <Routes>
                        <Route path={'/'} element={<Cursos cursos={this.getCursos}/>}/>
                        <Route path={'/sobre'} element={<Sobre/>}/>
                        <Route path={'/:curso'}
                               element={<Curso cadeiras={this.getCadeiras} curso={this.getCurso}
                                               email={this.sendEmail}/>}/>
                        <Route path={'/edit/:curso'}
                               element={<EditarCurso allCadeiras={this.getCadeiras} cadeira={this.getCadeira}
                                                     curso={this.getCurso} updateCurso={this.updateCurso}/>}/>

                        <Route path={'/cadeiras'}
                               element={<Cadeiras cadeiras={this.getCadeiras} updateCadeiras={this.updateCadeiras}/>}/>

                        <Route path={'*'} element={<p><NotFound/></p>}/>
                    </Routes>
                </Router>
            </ThemeProvider>
            </body>
        );
    }
}

export default (App);