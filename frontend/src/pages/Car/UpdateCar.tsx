import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { ICarProps } from "../../types";
import LayoutContainer from "../../components/LayoutContainer";
import PageHeader from "../../components/PageHeader";
import { Grid, Button, TextField } from "@material-ui/core";
import api from "../../api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mgTop: {
      marginBlock: 30,
    },
  })
);

const UpdateCar = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();
  const [car, setCar] = useState<ICarProps>();

  useEffect(() => {
    try {
      api.post("/car/getById", { id }).then((data: any) => {
        setCar(data.data.records[0]);
      });
    } catch (error) {
      console.log("Ocorreu um erro", error);
    }
  }, [id]);

  const handleSave = async () => {
    try {
      await api.post("/car/update", car).then(() => {
        history.push("/car");
      });
    } catch (error) {
      console.log("Ocorreu um erro", error);
    }
  };

  const isEmpty =
    !car?.foto ||
    !car?.modelo ||
    !car?.ano ||
    !car?.kmRodado ||
    !car?.dono ||
    !car?.placa;

  return (
    <LayoutContainer>
      <PageHeader
        title="Editar Carro"
        button="Voltar"
        action={() => history.push("/car")}
      />

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            value={car?.foto}
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
            InputLabelProps={{
              shrink: true,
            }}
            value={car?.modelo}
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
            InputLabelProps={{
              shrink: true,
            }}
            value={car?.ano}
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
            InputLabelProps={{
              shrink: true,
            }}
            value={car?.kmRodado}
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
            InputLabelProps={{
              shrink: true,
            }}
            value={car?.placa}
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
            InputLabelProps={{
              shrink: true,
            }}
            value={car?.dono}
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
          color="primary"
          disabled={isEmpty}
          onClick={() => handleSave()}
        >
          Atualizar Carro
        </Button>
      </Grid>
    </LayoutContainer>
  );
};

export default UpdateCar;
