import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { ICarProps } from "../../types";
import LayoutContainer from "../../components/LayoutContainer";
import PageHeader from "../../components/PageHeader";
import { Grid, Button, TextField } from "@material-ui/core";
import api from "../../api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mgTop: {
        marginBlock: 30
    },
  })
);

const AddCar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [car, setCar] = useState<ICarProps>({
    foto: undefined,
    modelo: undefined,
    ano: undefined,
    kmRodado: undefined,
    placa: undefined,
    dono: undefined,
  });

  const handleSave = async () => {
    try {
        await api.post("/car/create", car).then(() => {
            history.push("/car");
        });
      } catch (error) {
        console.log("Ocorreu um erro", error);
      }
  }

const isEmpty = !car.foto || 
                !car.modelo ||    
                !car.ano ||    
                !car.kmRodado ||    
                !car.dono ||    
                !car.placa;   
  return (
    <LayoutContainer>
      <PageHeader
        title="Adicionar Novo Carro"
        button="Voltar"
        action={() => history.push("/car")}
      />

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            label="Foto do Carro (URL apenas)"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setCar({ ...car, foto: e.target.value })}
            variant="outlined"
            fullWidth
            type="url"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Modelo do Carro"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setCar({ ...car, modelo: e.target.value })}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Ano de Lançamento do Carro"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setCar({ ...car, ano: e.target.value })}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Km Rodados"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setCar({ ...car, kmRodado: e.target.value })}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Placa do Carro"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setCar({ ...car, placa: e.target.value })}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Nome do Dono do Carro"
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setCar({ ...car, dono: e.target.value })}
            variant="outlined"
            fullWidth
          /> 
        </Grid>
      </Grid>
      <Grid container justify="flex-end" className={classes.mgTop}>
        <Button 
        variant="outlined" 
        color="primary" disabled={isEmpty} onClick={() => handleSave()}>
          Salvar Novo Carro
        </Button>
      </Grid>
    </LayoutContainer>
  );
};

export default AddCar;
