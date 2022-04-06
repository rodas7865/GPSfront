import * as React from 'react';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import { BrowserRouter as Router,Routes,Route, NavLink } from "react-router-dom";
import Header from './Header';
import NotFound from './NotFound';
import Home from './Home';
import Cursos from "./Cursos";
import Curso from "./Curso";

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


function App(props) {
  return (
      <body>
          <ThemeProvider theme={theme}>
            <Header></Header>
              <Router>
                  <Routes>
                      <Route path={'/'} element={<Home/>}/>
                      <Route path={'/cursos'} element={<Cursos/>}/>
                      <Route path={'/contactos'} element={<p>c</p>}/>
                      <Route path={'/cursos/:curso'} element={<p><Curso/></p>}/>
                      <Route path={'*'} element={<p><NotFound/></p>}/>
                  </Routes>
              </Router>
          </ThemeProvider>
      </body>
  );
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
