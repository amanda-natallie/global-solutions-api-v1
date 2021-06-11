import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import LayoutContainer from "../../components/LayoutContainer";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import { ICarProps } from "../../types";
import api from "../../api";
import PageHeader from "../../components/PageHeader";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  img: {
    maxWidth: 200,
  },
});

const Car = () => {
  const classes = useStyles();
  const history = useHistory();
  const [cars, setCars] = useState<ICarProps[]>([]);

  const handleDelete = (id: number | undefined) => {
    try {
      const confirm = window.confirm("Deseja remover este carro?");
      confirm &&
      api.post("/car/remove", { id: id }).then(() => {
        getAllCars();
      });
    } catch (error) {
      console.log("Ocorreu um erro", error);
    }
  };
  const getAllCars = () => {
    try {
      api.get("/car/getAll").then((data: any) => {
        setCars(data.data.records);
      });
    } catch (error) {
      console.log("Ocorreu um erro", error);
    }
  };

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <LayoutContainer>
      <PageHeader 
        title="Gerenciamento de Carros"
        button="Cadastrar Novo"
        action={() => history.push("/add-car")}
      /> 
      
      <TableContainer component={Paper} style={{ marginTop: 30 }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Foto</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Ano</TableCell>
              <TableCell>Km Rodados</TableCell>
              <TableCell>Dono</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <img
                    src={row.foto}
                    alt={row.modelo}
                    className={classes.img}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.modelo}</TableCell>
                <TableCell>{row.ano}</TableCell>
                <TableCell>{row.kmRodado}</TableCell>
                <TableCell>{row.dono}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" color="primary" 
                    onClick={() => history.push(`/update-car/${row.id}`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete"
                    onClick={() => handleDelete(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutContainer>
  );
};

export default Car;
