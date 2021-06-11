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
import { ICarWashProps } from "../../types";
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

const CarWash = () => {
  const classes = useStyles();
  const history = useHistory();
  const [carWashes, setCarWashes] = useState<ICarWashProps[]>([]);

  const handleDelete = (id: number | undefined) => {
    try {
      const confirm = window.confirm("Deseja remover este carro?");
      confirm &&
      api.post("/carwash/remove", { id: id }).then(() => {
        getAllCarWashes();
      });
    } catch (error) {
      console.log("Ocorreu um erro", error);
    }
  }; 

  const getAllCarWashes = () => {
    try {
      api.get("/carwash/getAll").then((data: any) => {
        setCarWashes(data.data.records);
      });
    } catch (error) {
      console.log("Ocorreu um erro", error);
    }
  };

  useEffect(() => {
    getAllCarWashes();
  }, []);

  return (
    <LayoutContainer>
      <PageHeader 
        title="Gerenciamento de Lava Rápidos"
        button="Cadastrar Novo"
        action={() => history.push("/add-carwash")}
      /> 
      
      <TableContainer component={Paper} style={{ marginTop: 30 }}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Foto</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carWashes.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <img
                    src={row.photos}
                    alt={row.name}
                    className={classes.img}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" color="primary" 
                    onClick={() => history.push(`/update-carwash/${row.id}`)}>
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

export default CarWash;
