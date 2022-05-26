import * as React from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import Header from './Header';
import NotFound from './NotFound';
import Cursos from "./Cursos";
import Curso from "./Curso";
import Contactos from "./Contactos";
import withRouter from "./withRouter";
import disciplinas from './data/disciplinas.json'
import Sobre from "./Sobre";
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";


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

    getCurso = async  (id) => {
        const data = await fetch('/server/cursos/'+id);
        const parsedData = await data.json();
        return await parsedData;
    }

    getCadeiras = async (id)=>{
        const data = await fetch('/server/cadeiras/'+id);
        const parsedData = await data.json();
        return await parsedData;
    }

    render() {
        return (
            <body>
            <ThemeProvider theme={theme}>
                <Header/>
                <Router>
                    <Routes>
                        <Route path={'/'} element={<Cursos cursos={this.getCursos}/>}/>
                        <Route path={'/contactos'} element={<Contactos/>}/>
                        <Route path={'/sobre'} element={<Sobre/>}/>
                        <Route path={'/:curso'}
                               element={<Curso cadeiras={this.getCadeiras} curso={this.getCurso}/>}/>
                        <Route path={'*'} element={<p><NotFound/></p>}/>
                    </Routes>
                </Router>
            </ThemeProvider>
            </body>
        );
    }
}

export default (App);