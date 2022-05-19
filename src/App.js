import * as React from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import Header from './Header';
import NotFound from './NotFound';
import Cursos from "./Cursos";
import Curso from "./Curso";
import Contactos from "./Contactos";

import disciplinas from './data/disciplinas.json'
import Sobre from "./Sobre";


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

    get

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
                        <Route path={'/cursos/:curso'}
                               element={<Curso disciplinas={this.state.disciplinas} cursos={this.getCursos}/>}/>
                        <Route path={'*'} element={<p><NotFound/></p>}/>
                    </Routes>
                </Router>
            </ThemeProvider>
            </body>
        );
    }
}

export default App;

/*
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { green, orange } from '@mui/material/colors';

const outerTheme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

const innerTheme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

export default function ThemeNesting() {
  return (
    <ThemeProvider theme={outerTheme}>
      <Checkbox defaultChecked />
      <ThemeProvider theme={innerTheme}>
        <Checkbox defaultChecked />
      </ThemeProvider>
    </ThemeProvider>
  );
}
 */
