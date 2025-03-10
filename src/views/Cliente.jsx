import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import '../assets/css/tablecliente.css';
import api from '../ApiDesafio';
import { useEffect } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom'


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        whiteSpace: 'nowrap',
    },
    body: {
        fontSize: 11,
    },

}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    wrow: {
        width: '555px',
    }


}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
        marginTop: 30,
        maxWidth: 400,
        marginLeft: 300,
    }, icons: {
        width: 33,
        cursor: "pointer",
    },
    acoesIcons: {
        display: "flex",
        justifyContent: "space-around"
    },
    addcliente: {
        marginTop: 100,
        marginLeft: 300,

    },
    button: {
        whiteSpace: 'nowrap'

    }


});


export default function Cliente() {
    const classes = useStyles();


    const [error, setError] = useState('');
    const [clients, setClients] = useState([]);

    const getClients = async () => {
        const clients = await api.getClients();
        setClients(clients)

    };

    useEffect(() => {
        getClients();
    }, []);




    const handleDel = async (dados) => {
        const json = await api.DelCliente(dados.idclients)
        if (json.error) {
            setError(json.error);
        } else {
            window.location.href = '/cliente';
        }
    };





    return (
        <>
          <Paper>
            <Container>

                <Grid className={classes.addcliente}>
                    <Link to={{ pathname: "/cadastro", state: { dados: false, create: true } }}>
                        <Button variant="contained" color="primary" className={classes.button} >
                            Adicionar CLiente</Button>
                    </Link>
                </Grid>
                <TableContainer >
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell  >Nome</StyledTableCell>
                                <StyledTableCell align="center">Tipo de Pessoa</StyledTableCell>
                                <StyledTableCell align="center">CPF/CNPJ</StyledTableCell>
                                <StyledTableCell align="center">Cep</StyledTableCell>
                                <StyledTableCell align="center">Cidade</StyledTableCell>
                                <StyledTableCell align="center">Estado</StyledTableCell>
                                <StyledTableCell align="center">Pais</StyledTableCell>
                                <StyledTableCell align="center">Ações</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients.map((dados) => (
                                <StyledTableRow key={dados}>
                                    <StyledTableCell className={classes.wrow} component="th" scope="row">
                                        {dados.nome}
                                    </StyledTableCell>
                                    <StyledTableCell className={classes.wrow} align="center">{dados.tipodepessoa}</StyledTableCell>
                                    <StyledTableCell className={classes.wrow} align="center">{dados.cpf_cnpj}</StyledTableCell>
                                    <StyledTableCell className={classes.wrow} align="right">{dados.cep}</StyledTableCell>
                                    <StyledTableCell className={classes.wrow} align="right">{dados.cidade}</StyledTableCell>
                                    <StyledTableCell className={classes.wrow} align="right">{dados.estado}</StyledTableCell>
                                    <StyledTableCell className={classes.wrow} align="right">{dados.pais}</StyledTableCell>
                                    <StyledTableCell className={classes.wrow} align="center" className={classes.acoesIcons} >
                                        <Link to={{ pathname: "/cadastro", state: { dados, create: false } }}>
                                            <EditIcon className={classes.icons} />
                                        </Link>
                                        <DeleteIcon onClick={() => handleDel(dados)} className={classes.icons} />
                                    </StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Paper>
        </>
      
    );
}
