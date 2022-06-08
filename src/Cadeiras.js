import * as React from 'react';
import {
    Box, Button,
    IconButton,
    Paper,
    Tooltip,
    Typography
} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import {AddBox, Delete} from "@mui/icons-material";

class Cadeiras extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            cadeiras: [],
            columns: [
                {field: 'id', headerName: 'ID', hide: true, editable: true},
                {field: 'nome', headerName: 'Nome', width: 800, editable: true},
                {field: 'ects', headerName: 'Ects', width: 100, editable: true},
                {field: 'ht', headerName: 'Ht', width: 100, editable: true},
                {field: 'htp', headerName: 'Htp', width: 100, editable: true},
                {field: 'hpl', headerName: 'Hpl', width: 100, editable: true},
            ],
            rows: [],
            selectedIds: []

        }

    }

    componentDidMount = () => {
        let rows = []
        this.props.cadeiras().then((result) => {
            result.map((row) => {
                rows.push({
                    id: row._id,
                    nome: row.nome,
                    ects: row.ects,
                    ht: row.ht,
                    htp: row.htp,
                    hpl: row.hpl
                })
            })
            this.setState({
                rows
            })
        })

    }

    handlerNovaCadeira = () => {
        let rows = []
        this.state.rows.map((row) => {
            rows.push(row)
        })

        rows.unshift({
            id: (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(),
            nome: "editMe",
            ects: 999,
            ht: 999,
            htp: 999,
            hpl: 999
        })

        this.setState({
            rows
        })
    }

    handlerDeleteCadeira = () => {
        let rows = []
        this.state.rows.map((row) => {
            rows.push(row)
        })

        console.log(this.state.ids)

        this.state.selectedIds.forEach((id) => {
            const index = rows.findIndex((result) => {
                    return result.id === id
                }
            )

            rows.splice(index, 1)
        })

        this.setState({
            rows
        })
    }

    handlerSelectedIds = (ids) => {
        this.setState({
            selectedIds: ids
        })
    }

    handlerSubmitForm = (e) => {
        e.preventDefault()
        console.log(this.state.rows)
        this.props.updateCadeiras(this.state.rows).finally(() => {
            window.location.reload()
        })
    }

    handlerOnEdit = async (e) => {
        let rows = []
        this.state.rows.forEach(row => {
            rows.push(row)
        })
        const index = rows.findIndex(object => {
            return object.id === e.id;
        });

        const row = rows[index]
        row[e.field]=e.value
    }

    render() {
        return (
            <Paper sx={{margin: '2%'}}>
                <Box sx={{paddingTop: '2%', paddingBottom: '2%'}}>
                    <Typography align={'center'} variant={'h4'}>Cadeiras</Typography>
                </Box>
                <Box sx={{margin: '2%', paddingBottom: '2%'}}>
                    <Typography align={'left'} variant={'body2'}>"Enter" ou "Duplo clique" para editar a
                        celula</Typography>
                    <Tooltip title={'Nova cadeira'}>
                        <IconButton onClick={this.handlerNovaCadeira}>
                            <AddBox/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Deletar cadeiras selecionadas'}>
                        <IconButton onClick={this.handlerDeleteCadeira}>
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                    <div style={{height: 400, width: '100%'}}>
                        <DataGrid
                            rows={this.state.rows}
                            columns={this.state.columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            onSelectionModelChange={(ids) => {
                                this.handlerSelectedIds(ids)
                            }}
                            onCellEditCommit={(e) => {
                                this.handlerOnEdit(e)
                            }}
                            disableSelectionOnClick
                        />
                    </div>
                    <form onSubmit={(e) => this.handlerSubmitForm(e)}>
                        <Box sx={{margin: '2%', paddingBottom: '2%'}}>
                            <Button type="submit">
                                <Typography>Salvar Alterações</Typography>
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Paper>
        );
    }
}

export default (Cadeiras);